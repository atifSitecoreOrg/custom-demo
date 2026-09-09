'use client';

import React, { JSX, useMemo, useState } from 'react';
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
  ProductBrand?: Field<string>;
  ProductBadge?: Field<string>;
  ProductSku?: Field<string>;
  ProductId?: Field<string>;
  ProductPrice?: Field<string>;
  ProductColor?: Field<string>;
  ProductSizes?: Field<string>;
  ProductDescription?: Field<string>;
  ProductDetailsCare?: Field<string>;
  ProductAboutBrand?: Field<string>;
  ProductSizeFit?: Field<string>;
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

function splitSizes(value?: string): string[] {
  if (!value) return [];
  return value
    .split('|')
    .map((size) => size.trim())
    .filter(Boolean);
}

const SectionBlock = ({
  title,
  field,
  isEditing,
}: {
  title: string;
  field?: Field<string>;
  isEditing?: boolean;
}) => {
  if (!field?.value && !isEditing) return null;
  return (
    <div
      className="border-t py-6"
      style={{ borderColor: 'var(--brand-border, #e8e8e8)' }}
    >
      <h2
        className="text-sm font-medium uppercase leading-relaxed ltr:tracking-[0.12em] rtl:tracking-normal font-[var(--brand-body-font,inherit)]"
        style={{ color: 'var(--brand-fg, #1a1a1a)' }}
      >
        {title}
      </h2>
      <ContentSdkRichText
        field={field}
        className="mt-3 text-sm leading-relaxed font-[var(--brand-body-font,inherit)]"
        style={{ color: 'var(--brand-muted-foreground, #4a4a4a)' }}
      />
    </div>
  );
};

/**
 * Context-only PDP. Matches Bloomingdale's UAE product structure:
 * gallery, brand, title, badge, price, color, sizes, qty, add-to-bag,
 * description, details & care, product ID, about brand, size & fit.
 */
export const Default = ({ params, page }: ComponentProps): JSX.Element => {
  const { styles, RenderingIdentifier } = params;
  const isEditing = page?.mode?.isEditing;
  const fields = getRouteFields(page);
  const gallery = useMemo(() => {
    if (!fields) return [];
    return [fields.ProductImage, fields.ProductImageSecondary, fields.ProductImageTertiary].filter(
      (image) => hasImageSrc(image)
    );
  }, [fields]);
  const [activeImage, setActiveImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);

  if (!fields) return <ProductDetailDefaultComponent />;

  const nameField = fields.ProductName || fields.Title;
  const hasName = Boolean(nameField?.value);
  const hasBrand = Boolean(fields.ProductBrand?.value);
  const hasBadge = Boolean(fields.ProductBadge?.value);
  const hasSku = Boolean(fields.ProductSku?.value);
  const hasId = Boolean(fields.ProductId?.value);
  const hasPrice = Boolean(fields.ProductPrice?.value);
  const hasColor = Boolean(fields.ProductColor?.value);
  const sizes = splitSizes(fields.ProductSizes?.value);
  const hasDescription = Boolean(fields.ProductDescription?.value);
  const hasPrimary = hasImageSrc(fields.ProductImage);

  if (
    !hasName &&
    !hasBrand &&
    !hasSku &&
    !hasPrice &&
    !hasDescription &&
    !hasPrimary &&
    !isEditing
  ) {
    return <ProductDetailDefaultComponent />;
  }

  const activeField = gallery[activeImage] || fields.ProductImage;

  return (
    <div className={cn('component product-detail', styles)} id={RenderingIdentifier}>
      <section
        className="w-full px-4 py-8 md:px-8 md:py-12"
        style={{ backgroundColor: 'var(--brand-bg, #ffffff)' }}
      >
        <div className="mx-auto grid max-w-[1440px] gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <div className="flex flex-col gap-3 md:flex-row">
              {(gallery.length > 1 || isEditing) && (
                <div className="flex gap-2 md:w-20 md:flex-col">
                  {gallery.map((image, index) => (
                    <button
                      key={image?.value?.src || index}
                      type="button"
                      onClick={() => setActiveImage(index)}
                      className={cn(
                        'overflow-hidden border',
                        index === activeImage ? 'border-[var(--brand-fg,#1a1a1a)]' : 'border-transparent'
                      )}
                    >
                      <ContentSdkImage
                        field={image}
                        className="aspect-[3/4] w-16 object-contain md:w-full"
                        style={{ backgroundColor: 'var(--brand-muted, #f5f5f5)' }}
                      />
                    </button>
                  ))}
                </div>
              )}
              {(hasPrimary || isEditing) && (
                <ContentSdkImage
                  field={activeField}
                  className="aspect-[3/4] w-full object-contain"
                  style={{ backgroundColor: 'var(--brand-muted, #f5f5f5)' }}
                />
              )}
            </div>
          </div>

          <div className="flex flex-col text-start lg:col-span-5">
            {(hasBrand || isEditing) && (
              <Text
                field={fields.ProductBrand}
                tag="p"
                className="text-3xl font-normal leading-relaxed font-[var(--brand-heading-font,inherit)]"
                style={{ color: 'var(--brand-fg, #1a1a1a)' }}
              />
            )}
            {(hasName || isEditing) && (
              <Text
                field={nameField}
                tag="h1"
                className="mt-2 text-xl font-normal leading-relaxed font-[var(--brand-body-font,inherit)]"
                style={{ color: 'var(--brand-fg, #1a1a1a)' }}
              />
            )}
            {(hasBadge || isEditing) && (
              <Text
                field={fields.ProductBadge}
                tag="p"
                className="mt-4 text-[11px] uppercase leading-relaxed ltr:tracking-[0.14em] rtl:tracking-normal font-[var(--brand-body-font,inherit)]"
                style={{ color: 'var(--brand-muted-foreground, #6b6b6b)' }}
              />
            )}
            {(hasPrice || isEditing) && (
              <Text
                field={fields.ProductPrice}
                tag="p"
                className="mt-3 text-base leading-relaxed font-[var(--brand-body-font,inherit)]"
                style={{ color: 'var(--brand-fg, #1a1a1a)' }}
              />
            )}

            {(hasColor || isEditing) && (
              <div className="mt-8 flex items-center gap-3">
                <span
                  className="text-sm font-[var(--brand-body-font,inherit)]"
                  style={{ color: 'var(--brand-fg, #1a1a1a)' }}
                >
                  Color:
                </span>
                <Text
                  field={fields.ProductColor}
                  tag="span"
                  className="text-sm font-[var(--brand-body-font,inherit)]"
                  style={{ color: 'var(--brand-fg, #1a1a1a)' }}
                />
              </div>
            )}

            {(sizes.length > 0 || isEditing) && (
              <div className="mt-6">
                <p
                  className="mb-3 text-sm font-[var(--brand-body-font,inherit)]"
                  style={{ color: 'var(--brand-fg, #1a1a1a)' }}
                >
                  Size
                </p>
                <div className="flex flex-wrap gap-2">
                  {sizes.map((size) => (
                    <button
                      key={size}
                      type="button"
                      onClick={() => setSelectedSize(size)}
                      className={cn(
                        'min-w-16 border px-3 py-2 text-xs font-[var(--brand-body-font,inherit)]',
                        selectedSize === size
                          ? 'border-[var(--brand-fg,#1a1a1a)] bg-[var(--brand-fg,#1a1a1a)] text-[var(--brand-bg,#ffffff)]'
                          : 'border-[var(--brand-border,#d6d6d6)]'
                      )}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-6 flex flex-wrap items-center gap-4">
              <div
                className="inline-flex items-center border"
                style={{ borderColor: 'var(--brand-border, #d6d6d6)' }}
              >
                <button
                  type="button"
                  className="px-3 py-2 text-sm"
                  onClick={() => setQuantity((value) => Math.max(1, value - 1))}
                  aria-label="Decrease quantity"
                >
                  −
                </button>
                <span className="min-w-8 text-center text-sm font-[var(--brand-body-font,inherit)]">
                  {quantity}
                </span>
                <button
                  type="button"
                  className="px-3 py-2 text-sm"
                  onClick={() => setQuantity((value) => value + 1)}
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>
              <label
                className="inline-flex items-center gap-2 text-sm font-[var(--brand-body-font,inherit)]"
                style={{ color: 'var(--brand-fg, #1a1a1a)' }}
              >
                <input type="checkbox" className="size-4" />
                Click and Collect
              </label>
            </div>

            <button
              type="button"
              className="mt-6 w-full px-6 py-3 text-sm uppercase leading-relaxed ltr:tracking-[0.14em] rtl:tracking-normal font-[var(--brand-body-font,inherit)]"
              style={{
                backgroundColor: 'var(--brand-fg, #1a1a1a)',
                color: 'var(--brand-bg, #ffffff)',
              }}
            >
              Add to Bag
            </button>

            {(hasDescription || isEditing) && (
              <div
                className="mt-10 border-t pt-6"
                style={{ borderColor: 'var(--brand-border, #e8e8e8)' }}
              >
                <h2
                  className="text-sm font-medium uppercase leading-relaxed ltr:tracking-[0.12em] rtl:tracking-normal font-[var(--brand-body-font,inherit)]"
                  style={{ color: 'var(--brand-fg, #1a1a1a)' }}
                >
                  Description
                </h2>
                <ContentSdkRichText
                  field={fields.ProductDescription}
                  className="mt-3 text-sm leading-relaxed font-[var(--brand-body-font,inherit)]"
                  style={{ color: 'var(--brand-muted-foreground, #4a4a4a)' }}
                />
              </div>
            )}

            <SectionBlock title="Details & Care" field={fields.ProductDetailsCare} isEditing={isEditing} />

            {(hasId || hasSku || isEditing) && (
              <div
                className="border-t py-6 text-sm leading-relaxed font-[var(--brand-body-font,inherit)]"
                style={{
                  borderColor: 'var(--brand-border, #e8e8e8)',
                  color: 'var(--brand-muted-foreground, #4a4a4a)',
                }}
              >
                <p
                  className="text-sm font-medium uppercase leading-relaxed ltr:tracking-[0.12em] rtl:tracking-normal"
                  style={{ color: 'var(--brand-fg, #1a1a1a)' }}
                >
                  Product ID
                </p>
                <p className="mt-3">
                  {(hasId || isEditing) && <Text field={fields.ProductId} tag="span" />}
                  {hasId && hasSku ? ' / ' : null}
                  {(hasSku || isEditing) && <Text field={fields.ProductSku} tag="span" />}
                </p>
              </div>
            )}

            <SectionBlock title="About the Brand" field={fields.ProductAboutBrand} isEditing={isEditing} />
            <SectionBlock title="Size & Fit" field={fields.ProductSizeFit} isEditing={isEditing} />

            <div
              className="border-t py-6"
              style={{ borderColor: 'var(--brand-border, #e8e8e8)' }}
            >
              <h2
                className="text-sm font-medium uppercase leading-relaxed ltr:tracking-[0.12em] rtl:tracking-normal font-[var(--brand-body-font,inherit)]"
                style={{ color: 'var(--brand-fg, #1a1a1a)' }}
              >
                Shipping & Delivery
              </h2>
              <p
                className="mt-3 text-sm leading-relaxed font-[var(--brand-body-font,inherit)]"
                style={{ color: 'var(--brand-muted-foreground, #4a4a4a)' }}
              >
                Standard delivery across the UAE. Click and Collect is available at selected
                Bloomingdale&apos;s stores. Returns are accepted within 14 days in original condition.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
