import React, { JSX } from 'react';
import {
  Field,
  ImageField,
  NextImage as ContentSdkImage,
  RichText as ContentSdkRichText,
  Text,
} from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from 'lib/component-props';
import { cn } from '@/lib/utils';

interface SpecPoint {
  id: string;
  specTitle?: { jsonValue?: Field<string> };
  specDescription?: { jsonValue?: Field<string> };
}

interface CarModelSpecHighlightDatasource {
  sectionTitle?: { jsonValue?: Field<string> };
  bodyText?: { jsonValue?: Field<string> };
  backgroundImage?: { jsonValue?: ImageField };
  children?: { results: SpecPoint[] };
}

type CarModelSpecHighlightProps = ComponentProps & {
  fields?: {
    data?: {
      datasource?: CarModelSpecHighlightDatasource;
    };
  };
};

const CarModelSpecHighlightDefaultComponent = (): JSX.Element => (
  <div className="component car-model-spec-highlight">
    <span className="is-empty-hint">Car Model Spec Highlight</span>
  </div>
);

export const Default = ({ fields, params, page }: CarModelSpecHighlightProps): JSX.Element => {
  const { styles, RenderingIdentifier } = params;
  const isEditing = page?.mode?.isEditing;
  const datasource = fields?.data?.datasource;
  const specPoints = datasource?.children?.results || [];

  if (!datasource) return <CarModelSpecHighlightDefaultComponent />;

  return (
    <div className={cn('component car-model-spec-highlight', styles)} id={RenderingIdentifier}>
      <section className="relative w-full overflow-hidden" style={{ minHeight: '520px' }}>
        {/* Full-width background image */}
        <div className="absolute inset-0">
          <ContentSdkImage
            field={datasource.backgroundImage?.jsonValue}
            className="h-full w-full object-cover object-center"
          />
        </div>

        {/* Dark gradient overlay — pointer-events-none for Page Builder */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/85 via-black/55 to-black/25 rtl:bg-gradient-to-l" />

        {/* Content */}
        <div className="relative z-10 mx-auto flex max-w-7xl flex-col px-8 py-20 rtl:text-right md:px-16 md:py-28">
          {(datasource.sectionTitle?.jsonValue?.value || isEditing) && (
            <Text
              field={datasource.sectionTitle?.jsonValue}
              tag="h2"
              className="mb-6 max-w-2xl text-3xl font-bold uppercase tracking-tight text-white font-[var(--brand-heading-font,inherit)] md:text-4xl"
            />
          )}
          {(datasource.bodyText?.jsonValue?.value || isEditing) && (
            <ContentSdkRichText
              field={datasource.bodyText?.jsonValue}
              className="mb-12 max-w-xl text-sm leading-relaxed text-white/65"
            />
          )}

          {/* Spec points */}
          {specPoints.length > 0 && (
            <ul className="flex flex-col gap-6 border-t border-white/20 pt-10 sm:flex-row sm:gap-10">
              {specPoints.map((point) => (
                <li key={point.id} className="flex flex-col gap-1.5">
                  <span
                    className="h-0.5 w-8 mb-2"
                    style={{ backgroundColor: 'var(--brand-accent, #c8102e)' }}
                  />
                  {point.specTitle?.jsonValue && (
                    <Text
                      field={point.specTitle.jsonValue}
                      tag="h4"
                      className="text-sm font-bold uppercase tracking-wide text-white"
                    />
                  )}
                  {point.specDescription?.jsonValue && (
                    <ContentSdkRichText
                      field={point.specDescription.jsonValue}
                      className="text-xs leading-relaxed text-white/55"
                    />
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </div>
  );
};

export const JetourUAE = Default;
