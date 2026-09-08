import React, { JSX } from 'react';
import {
  Field,
  ImageField,
  Text,
  RichText as ContentSdkRichText,
  NextImage as ContentSdkImage,
} from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from 'lib/component-props';
import { cn } from '@/lib/utils';

interface CategoryHeroRouteFields {
  CategoryName?: Field<string>;
  CategoryDescription?: Field<string>;
  CategoryHeroImage?: ImageField;
  Title?: Field<string>;
}

const CategoryHeroDefaultComponent = (): JSX.Element => (
  <div className="component category-hero">
    <div className="component-content">
      <span className="is-empty-hint">CategoryHero</span>
    </div>
  </div>
);

function getRouteFields(page: ComponentProps['page']): CategoryHeroRouteFields | null {
  const fields = page?.layout?.sitecore?.route?.fields;
  return fields ? (fields as unknown as CategoryHeroRouteFields) : null;
}

/**
 * Context-only category banner. Visual language matches CTABanner / BloomingdalesCampaign
 * (full-bleed photo, oversized serif, centered copy) but reads route fields — a category
 * page is a route, not a reusable datasource block.
 */
export const Default = ({ params, page }: ComponentProps): JSX.Element => {
  const { styles, RenderingIdentifier } = params;
  const isEditing = page?.mode?.isEditing;
  const fields = getRouteFields(page);

  if (!fields) return <CategoryHeroDefaultComponent />;

  const nameField = fields.CategoryName || fields.Title;
  const hasImage = Boolean(fields.CategoryHeroImage?.value?.src);
  const hasName = Boolean(nameField?.value);
  const hasDescription = Boolean(fields.CategoryDescription?.value);

  if (!hasImage && !hasName && !hasDescription && !isEditing) {
    return <CategoryHeroDefaultComponent />;
  }

  return (
    <div className={cn('component category-hero', styles)} id={RenderingIdentifier}>
      <section className="relative w-full overflow-hidden">
        {(hasImage || isEditing) && (
          <div className="absolute inset-0">
            <ContentSdkImage
              field={fields.CategoryHeroImage}
              className="h-full w-full object-cover"
            />
          </div>
        )}
        <div className="absolute inset-0 bg-black/25" />
        <div className="relative z-10 flex min-h-[420px] items-center justify-center px-6 py-20 text-center md:min-h-[560px]">
          <div className="max-w-3xl">
            {(hasName || isEditing) && (
              <Text
                field={nameField}
                tag="h1"
                className="text-5xl font-normal leading-relaxed text-white sm:text-6xl md:text-7xl md:leading-none ltr:tracking-tight rtl:tracking-normal font-[var(--brand-heading-font,inherit)]"
              />
            )}
            {(hasDescription || isEditing) && (
              <ContentSdkRichText
                field={fields.CategoryDescription}
                className="mt-5 text-sm leading-relaxed text-white font-[var(--brand-body-font,inherit)]"
              />
            )}
          </div>
        </div>
      </section>
    </div>
  );
};
