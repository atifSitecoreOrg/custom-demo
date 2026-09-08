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

interface ProductDetailRouteFields {
  ProductName?: Field<string>;
  ProductSku?: Field<string>;
  ProductPrice?: Field<string>;
  ProductDescription?: Field<string>;
  ProductImage?: ImageField;
  ProductImageSecondary?: ImageField;
  ProductImageTertiary?: ImageField;
  Title?: Field<string>;
}

const ProductDetailDefaultComponent = (): JSX.Element => (
  <div className="component product-detail">
    <div className="component-content">
      <span className="is-empty-hint">ProductDetail</span>
    </div>
  </div>
);

function getRouteFields(page: ComponentProps['page']): ProductDetailRouteFields | null {
  const fields = page?.layout?.sitecore?.route?.fields;
  return fields ? (fields as unknown as ProductDetailRouteFields) : null;
}

function hasImageSrc(field?: ImageField): boolean {
  return Boolean(field?.value?.src);
}

/**
 * Context-only PDP identity. Reads route fields — a product page is one SKU
 * per URL, not a reusable datasource. ProductImage is a standard Image field
 * so a later prompt can point it at a Content Hub asset (including usage-rights
 * metadata) without changing the template.
 */
export const Default = ({ params, page }: ComponentProps): JSX.Element => {
  const { styles, RenderingIdentifier } = params;
  const isEditing = page?.mode?.isEditing;
  const fields = getRouteFields(page);

  if (!fields) return <ProductDetailDefaultComponent />;

  const nameField = fields.ProductName || fields.Title;
  const hasName = Boolean(nameField?.value);
  const hasSku = Boolean(fields.ProductSku?.value);
  const hasPrice = Boolean(fields.ProductPrice?.value);
  const hasDescription = Boolean(fields.ProductDescription?.value);
  const hasPrimary = hasImageSrc(fields.ProductImage);
  const hasSecondary = hasImageSrc(fields.ProductImageSecondary);
  const hasTertiary = hasImageSrc(fields.ProductImageTertiary);

  if (
    !hasName &&
    !hasSku &&
    !hasPrice &&
    !hasDescription &&
    !hasPrimary &&
    !hasSecondary &&
    !hasTertiary &&
    !isEditing
  ) {
    return <ProductDetailDefaultComponent />;
  }

  return (
    <div className={cn('component product-detail', styles)} id={RenderingIdentifier}>
      <section
        className="w-full px-4 py-10 md:px-8 md:py-16"
        style={{ backgroundColor: 'var(--brand-bg, #ffffff)' }}
      >
        <div className="mx-auto grid max-w-[1440px] gap-10 md:grid-cols-2 md:items-start md:gap-16">
          <div className="flex flex-col gap-3">
            {(hasPrimary || isEditing) && (
              <ContentSdkImage
                field={fields.ProductImage}
                className="aspect-[3/4] w-full object-contain"
                style={{ backgroundColor: 'var(--brand-muted, #f5f5f5)' }}
              />
            )}
            {(hasSecondary || hasTertiary || isEditing) && (
              <div className="grid grid-cols-2 gap-3">
                {(hasSecondary || isEditing) && (
                  <ContentSdkImage
                    field={fields.ProductImageSecondary}
                    className="aspect-[3/4] w-full object-contain"
                    style={{ backgroundColor: 'var(--brand-muted, #f5f5f5)' }}
                  />
                )}
                {(hasTertiary || isEditing) && (
                  <ContentSdkImage
                    field={fields.ProductImageTertiary}
                    className="aspect-[3/4] w-full object-contain"
                    style={{ backgroundColor: 'var(--brand-muted, #f5f5f5)' }}
                  />
                )}
              </div>
            )}
          </div>

          <div className="flex flex-col text-start md:pt-4">
            {(hasSku || isEditing) && (
              <Text
                field={fields.ProductSku}
                tag="p"
                className="text-[11px] uppercase leading-relaxed ltr:tracking-[0.16em] rtl:tracking-normal font-[var(--brand-body-font,inherit)]"
                style={{ color: 'var(--brand-muted-foreground, #6b6b6b)' }}
              />
            )}
            {(hasName || isEditing) && (
              <Text
                field={nameField}
                tag="h1"
                className="mt-3 text-4xl font-normal leading-relaxed text-[var(--brand-fg,#1a1a1a)] sm:text-5xl md:leading-tight ltr:tracking-tight rtl:tracking-normal font-[var(--brand-heading-font,inherit)]"
              />
            )}
            {(hasPrice || isEditing) && (
              <Text
                field={fields.ProductPrice}
                tag="p"
                className="mt-5 text-lg leading-relaxed font-[var(--brand-body-font,inherit)]"
                style={{ color: 'var(--brand-fg, #1a1a1a)' }}
              />
            )}
            {(hasDescription || isEditing) && (
              <ContentSdkRichText
                field={fields.ProductDescription}
                className="mt-6 max-w-xl text-sm leading-relaxed font-[var(--brand-body-font,inherit)]"
                style={{ color: 'var(--brand-fg, #1a1a1a)' }}
              />
            )}
          </div>
        </div>
      </section>
    </div>
  );
};
