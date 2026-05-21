'use client';

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

interface CarModelHeroDatasource {
  modelName?: { jsonValue?: Field<string> };
  tagline?: { jsonValue?: Field<string> };
  description?: { jsonValue?: Field<string> };
  emiText?: { jsonValue?: Field<string> };
  backgroundImage?: { jsonValue?: ImageField };
  primaryLink?: { jsonValue?: LinkField };
  secondaryLink?: { jsonValue?: LinkField };
}

type CarModelHeroProps = ComponentProps & {
  fields?: {
    data?: {
      datasource?: CarModelHeroDatasource;
    };
  };
};

const CarModelHeroDefaultComponent = (): JSX.Element => (
  <div className="component car-model-hero">
    <span className="is-empty-hint">Car Model Hero</span>
  </div>
);

export const Default = ({ fields, params, page }: CarModelHeroProps): JSX.Element => {
  const { styles, RenderingIdentifier } = params;
  const isEditing = page?.mode?.isEditing;
  const datasource = fields?.data?.datasource;

  if (!datasource) return <CarModelHeroDefaultComponent />;

  return (
    <div className={cn('component car-model-hero', styles)} id={RenderingIdentifier}>
      <section
        className="relative w-full overflow-hidden"
        style={{ height: '88vh', minHeight: '560px' }}
      >
        {/* Background image */}
        <div className="absolute inset-0">
          <ContentSdkImage
            field={datasource.backgroundImage?.jsonValue}
            className="h-full w-full object-cover object-center"
          />
        </div>

        {/* Gradient overlays — pointer-events-none for Page Builder editability */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent rtl:bg-gradient-to-l" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

        {/* Content — bottom-left (flips to bottom-right in RTL) */}
        <div className="absolute bottom-0 left-0 z-10 max-w-2xl px-8 pb-20 rtl:left-auto rtl:right-0 rtl:text-right md:px-16 md:pb-24">
          {(datasource.modelName?.jsonValue?.value || isEditing) && (
            <Text
              field={datasource.modelName?.jsonValue}
              tag="h1"
              className="text-5xl font-bold uppercase tracking-tight text-white font-[var(--brand-heading-font,inherit)] md:text-6xl lg:text-7xl"
            />
          )}
          {(datasource.tagline?.jsonValue?.value || isEditing) && (
            <Text
              field={datasource.tagline?.jsonValue}
              tag="p"
              className="mt-3 text-lg font-light italic text-white/75 md:text-xl"
            />
          )}
          {(datasource.description?.jsonValue?.value || isEditing) && (
            <ContentSdkRichText
              field={datasource.description?.jsonValue}
              className="mt-4 max-w-lg text-sm leading-relaxed text-white/60 font-[var(--brand-body-font,inherit)]"
            />
          )}
          {(datasource.emiText?.jsonValue?.value || isEditing) && (
            <div className="mt-5 flex items-center gap-2 rtl:flex-row-reverse rtl:justify-end">
              <span
                className="h-0.5 w-6 shrink-0"
                style={{ backgroundColor: 'var(--brand-accent, #c8102e)' }}
              />
              <Text
                field={datasource.emiText?.jsonValue}
                tag="span"
                className="text-xs font-semibold uppercase tracking-widest text-white/70"
              />
            </div>
          )}
          <div className="mt-7 flex flex-wrap gap-3 rtl:flex-row-reverse">
            {datasource.primaryLink?.jsonValue && (datasource.primaryLink.jsonValue.value?.href || isEditing) && (
              <ContentSdkLink
                field={datasource.primaryLink.jsonValue}
                className="inline-flex items-center justify-center px-7 py-3 text-sm font-bold uppercase tracking-wider text-white transition-opacity hover:opacity-90"
                style={{ backgroundColor: 'var(--brand-accent, #c8102e)', borderRadius: '2px' }}
              />
            )}
            {datasource.secondaryLink?.jsonValue && (datasource.secondaryLink.jsonValue.value?.href || isEditing) && (
              <ContentSdkLink
                field={datasource.secondaryLink.jsonValue}
                className="inline-flex items-center justify-center border border-white/40 px-7 py-3 text-sm font-semibold uppercase tracking-wider text-white transition-all hover:border-white hover:bg-white/10"
                style={{ borderRadius: '2px' }}
              />
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export const JetourUAE = Default;
