import React, { JSX } from 'react';
import {
  Field,
  ImageField,
  LinkField,
  NextImage as ContentSdkImage,
  Link as ContentSdkLink,
  RichText as ContentSdkRichText,
  Text,
} from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from 'lib/component-props';
import { cn } from '@/lib/utils';

interface CarModelBrochureDatasource {
  sectionTitle?: { jsonValue?: Field<string> };
  sectionLabel?: { jsonValue?: Field<string> };
  description?: { jsonValue?: Field<string> };
  coverImage?: { jsonValue?: ImageField };
  brochureLink?: { jsonValue?: LinkField };
  brochureLinkLabel?: { jsonValue?: Field<string> };
  primaryLink?: { jsonValue?: LinkField };
  primaryLinkLabel?: { jsonValue?: Field<string> };
}

type CarModelBrochureProps = ComponentProps & {
  fields?: {
    data?: {
      datasource?: CarModelBrochureDatasource;
    };
  };
};

const CarModelBrochureDefaultComponent = (): JSX.Element => (
  <div className="component car-model-brochure">
    <span className="is-empty-hint">Car Model Brochure Download</span>
  </div>
);

const DownloadIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="7 10 12 15 17 10" />
    <line x1="12" y1="15" x2="12" y2="3" />
  </svg>
);

export const Default = ({ fields, params, page }: CarModelBrochureProps): JSX.Element => {
  const { styles, RenderingIdentifier } = params;
  const isEditing = page?.mode?.isEditing;
  const datasource = fields?.data?.datasource;

  if (!datasource) return <CarModelBrochureDefaultComponent />;

  return (
    <div className={cn('component car-model-brochure', styles)} id={RenderingIdentifier}>
      <section
        className="w-full py-20"
        style={{ backgroundColor: 'var(--brand-dark, #111111)' }}
      >
        <div className="mx-auto max-w-7xl px-6 sm:px-8">
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
            {/* Cover image */}
            <div
              className="relative overflow-hidden"
              style={{ aspectRatio: '4/3' }}
            >
              <ContentSdkImage
                field={datasource.coverImage?.jsonValue}
                className="h-full w-full object-cover"
              />
              {/* PDF badge */}
              <div
                className="absolute bottom-4 left-4 flex items-center gap-2 px-3 py-1.5 rtl:left-auto rtl:right-4"
                style={{ backgroundColor: 'var(--brand-accent, #c8102e)' }}
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="2"
                  aria-hidden="true"
                >
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                </svg>
                <span className="text-xs font-bold uppercase tracking-widest text-white">
                  PDF Brochure
                </span>
              </div>
            </div>

            {/* Text + CTAs */}
            <div className="rtl:text-right">
              {(datasource.sectionLabel?.jsonValue?.value || isEditing) && (
                <Text
                  field={datasource.sectionLabel?.jsonValue}
                  tag="p"
                  className="mb-2 text-[10px] font-bold uppercase tracking-[0.3em]"
                  style={{ color: 'var(--brand-accent, #c8102e)' }}
                />
              )}
              {(datasource.sectionTitle?.jsonValue?.value || isEditing) && (
                <Text
                  field={datasource.sectionTitle?.jsonValue}
                  tag="h2"
                  className="mb-4 text-3xl font-bold uppercase tracking-tight text-white font-[var(--brand-heading-font,inherit)] md:text-4xl"
                />
              )}
              {(datasource.description?.jsonValue?.value || isEditing) && (
                <ContentSdkRichText
                  field={datasource.description?.jsonValue}
                  className="mb-8 text-sm leading-relaxed text-white/60"
                />
              )}

              <div className="flex flex-wrap gap-4 rtl:flex-row-reverse">
                {/* Download brochure CTA */}
                {datasource.brochureLink?.jsonValue && (datasource.brochureLink.jsonValue.value?.href || isEditing) && (
                  <ContentSdkLink
                    field={datasource.brochureLink.jsonValue}
                    className="group inline-flex items-center gap-2.5 px-7 py-3.5 text-sm font-bold uppercase tracking-wider text-white transition-opacity hover:opacity-90"
                    style={{ backgroundColor: 'var(--brand-accent, #c8102e)', borderRadius: '2px' }}
                  >
                    <DownloadIcon />
                    {datasource.brochureLinkLabel?.jsonValue?.value ||
                      'Download Brochure'}
                  </ContentSdkLink>
                )}

                {/* Secondary CTA (e.g. Book Now) */}
                {datasource.primaryLink?.jsonValue && (datasource.primaryLink.jsonValue.value?.href || isEditing) && (
                  <ContentSdkLink
                    field={datasource.primaryLink.jsonValue}
                    className="inline-flex items-center gap-2 border border-white/30 px-7 py-3.5 text-sm font-semibold uppercase tracking-wider text-white transition-all hover:border-white/60 hover:bg-white/5"
                    style={{ borderRadius: '2px' }}
                  >
                    {datasource.primaryLinkLabel?.jsonValue?.value || 'Book Now'}
                  </ContentSdkLink>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export const JetourUAE = Default;
