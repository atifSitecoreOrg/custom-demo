import { isDesignLibraryPreviewData } from "@sitecore-content-sdk/nextjs/editing";
import { notFound } from "next/navigation";
import { draftMode, headers as nextHeaders } from "next/headers";
import { SiteInfo } from "@sitecore-content-sdk/nextjs";
import sites from ".sitecore/sites.json";
import { routing } from "src/i18n/routing";
import scConfig from "sitecore.config";
import client from "src/lib/sitecore-client";
import Layout, { RouteFields } from "src/Layout";
import components from ".sitecore/component-map";
import Providers from "src/Providers";
import { NextIntlClientProvider } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { getBaseUrl } from "lib/utils";

type PageProps = {
  params: Promise<{
    site: string;
    locale: string;
    path?: string[];
    [key: string]: string | string[] | undefined;
  }>;
};

async function getPageForLocale(
  path: string[] | undefined,
  site: string,
  locale: string,
) {
  try {
    const page = await client.getPage(path ?? [], { site, locale });
    if (page) {
      return page;
    }
  } catch {
    // Locale may not exist in Sitecore yet (e.g. ar-AE).
  }

  if (locale !== routing.defaultLocale) {
    try {
      return await client.getPage(path ?? [], {
        site,
        locale: routing.defaultLocale,
      });
    } catch {
      return null;
    }
  }

  return null;
}

export default async function Page({ params }: PageProps) {
  const { site, locale, path } = await params;
  const draft = await draftMode();

  // Set site and locale to be available in src/i18n/request.ts for fetching the dictionary
  setRequestLocale(`${site}_${locale}`);

  // Fetch the page data from Sitecore
  let page;
  if (draft.isEnabled) {
    const headers = await nextHeaders();
    const previewData = client.getPreviewData(headers);
    if (isDesignLibraryPreviewData(previewData)) {
      page = await client.getDesignLibraryData(previewData);
    } else {
      page = await client.getPreview(previewData);
    }
  } else {
    page = await getPageForLocale(path, site, locale);
  }

  // If the page is not found, return a 404
  if (!page) {
    notFound();
  }

  // Fetch the component data from Sitecore (Likely will be deprecated)
  const componentProps = await client.getComponentData(
    page.layout,
    {},
    components,
  );

  return (
    <NextIntlClientProvider>
      <Providers page={page} componentProps={componentProps}>
        <Layout page={page} />
      </Providers>
    </NextIntlClientProvider>
  );
}

// This function gets called at build and export time to determine
// pages for SSG ("paths", as tokenized array).
export const generateStaticParams = async () => {
  const defaultSite = scConfig.defaultSite;
  const allowedSites = defaultSite
    ? sites
        .filter((site: SiteInfo) => site.name === defaultSite)
        .map((site: SiteInfo) => site.name)
    : sites.map((site: SiteInfo) => site.name);

  const seedLocaleParams = allowedSites.flatMap((site) =>
    routing.locales.map((locale) => ({ site, locale, path: [] as string[] })),
  );

  if (process.env.NODE_ENV === "development" || !scConfig.generateStaticPaths) {
    return seedLocaleParams;
  }

  try {
    const params = await client.getAppRouterStaticParams(
      allowedSites,
      routing.locales.slice(),
    );
    const seen = new Set(
      params.map(
        (entry: { site: string; locale: string; path?: string[] }) =>
          `${entry.site}:${entry.locale}:${(entry.path ?? []).join("/")}`,
      ),
    );
    for (const seed of seedLocaleParams) {
      const key = `${seed.site}:${seed.locale}:`;
      if (!seen.has(key)) {
        params.push(seed);
      }
    }
    return params;
  } catch {
    try {
      const params = await client.getAppRouterStaticParams(allowedSites, [
        routing.defaultLocale,
      ]);
      const seen = new Set(
        params.map((entry: { site: string; locale: string }) => `${entry.site}:${entry.locale}:`),
      );
      for (const seed of seedLocaleParams) {
        const key = `${seed.site}:${seed.locale}:`;
        if (!seen.has(key)) {
          params.push(seed);
        }
      }
      return params;
    } catch {
      return seedLocaleParams;
    }
  }
};

// Metadata fields for the page.
export const generateMetadata = async ({ params }: PageProps) => {
  const baseUrl = getBaseUrl();

  const { path, site, locale } = await params;

  // Canonical URL: base URL + content path only (no site/locale segments)
  const pathSegment = path?.length ? `/${path.join("/")}` : "";
  const canonicalUrl = baseUrl ? `${baseUrl}${pathSegment}` : undefined;

  // The same call as for rendering the page. Should be cached by default react behavior
  const page = await getPageForLocale(path, site, locale);
  const fields = page?.layout.sitecore.route?.fields as RouteFields;

  // Parse keywords from comma-separated string to array
  const keywordsString = fields?.metadataKeywords?.value?.toString() || "";
  const keywords = keywordsString
    ? keywordsString.split(",").map((k: string) => k.trim())
    : [];

  return {
    title: fields?.Title?.value?.toString() || "Page",
    description:
      fields?.ogDescription?.value?.toString() ||
      fields?.metadataDescription?.value?.toString() ||
      "Sitecore Next.js Basic Example",
    keywords,
    ...(canonicalUrl && {
      alternates: {
        canonical: canonicalUrl,
      },
    }),
    openGraph: {
      title: fields?.ogTitle?.value?.toString() || "Page",
      description:
        fields?.ogDescription?.value?.toString() ||
        fields?.metadataDescription?.value?.toString() ||
        "Sitecore Next.js Basic Example",
      url: canonicalUrl,
      images: fields?.ogImage?.value?.src || fields?.thumbnailImage?.value?.src,
    },
  };
};
