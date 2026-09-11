import React, { JSX } from 'react';
import {
  Field,
  ImageField,
  LinkField,
  NextImage as ContentSdkImage,
  Link as ContentSdkLink,
  Text,
} from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from 'lib/component-props';
import { cn } from '@/lib/utils';

interface CategoryQuickLinkItemFields {
  id: string;
  label: { jsonValue: Field<string> };
  image: { jsonValue: ImageField };
  link: { jsonValue: LinkField };
}

interface CategoryQuickLinksDatasource {
  title: { jsonValue: Field<string> };
  items?: {
    targetItems?: CategoryQuickLinkItemFields[];
  };
}

interface CategoryQuickLinksFields {
  data: {
    datasource: CategoryQuickLinksDatasource;
  };
}

type CategoryQuickLinksProps = ComponentProps & {
  fields: CategoryQuickLinksFields;
};

const CategoryQuickLinksDefaultComponent = (): JSX.Element => (
  <div className="component category-quick-links">
    <div className="component-content">
      <span className="is-empty-hint">CategoryQuickLinks</span>
    </div>
  </div>
);

/* ────────────────────────────────────────────
   Default — six circular category tiles
   ──────────────────────────────────────────── */
export const Default = ({ fields, params, page }: CategoryQuickLinksProps): JSX.Element => {
  const { styles, RenderingIdentifier } = params;
  const isEditing = page?.mode?.isEditing;
  const datasource = fields?.data?.datasource;
  if (!datasource) return <CategoryQuickLinksDefaultComponent />;
  const items = datasource.items?.targetItems || [];

  return (
    <div className={cn('component category-quick-links', styles)} id={RenderingIdentifier}>
      <section
        className="w-full px-6 py-10 md:py-14"
        style={{ backgroundColor: 'var(--brand-bg, #ffffff)' }}
      >
        <div className="mx-auto max-w-[1440px]">
          {(datasource.title?.jsonValue?.value || isEditing) && (
            <Text
              field={datasource.title?.jsonValue}
              tag="h2"
              className="mb-10 text-center text-3xl font-normal font-[var(--brand-heading-font,inherit)]"
              style={{ color: 'var(--brand-fg, #1a1a1a)' }}
            />
          )}
          <ul className="grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-3 lg:grid-cols-6">
            {items.map((item) => (
              <li key={item.id} className="flex flex-col items-center text-center">
                {(item.image?.jsonValue?.value?.src || isEditing) && (
                  <div className="mb-4 aspect-square w-full max-w-[168px] overflow-hidden rounded-full">
                    <ContentSdkImage
                      field={item.image?.jsonValue}
                      className="h-full w-full object-cover"
                    />
                  </div>
                )}
                {(item.label?.jsonValue?.value || isEditing) && (
                  <Text
                    field={item.label?.jsonValue}
                    tag="h3"
                    className="text-[15px] font-normal font-[var(--brand-heading-font,inherit)]"
                    style={{ color: 'var(--brand-fg, #1a1a1a)' }}
                  />
                )}
                {(item.link?.jsonValue?.value?.href || isEditing) && (
                  <ContentSdkLink
                    field={item.link?.jsonValue}
                    className="mt-1 text-sm underline underline-offset-4 font-[var(--brand-body-font,inherit)]"
                    style={{ color: 'var(--brand-fg, #1a1a1a)' }}
                  />
                )}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
};
