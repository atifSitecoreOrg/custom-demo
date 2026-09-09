'use client';

import React, { JSX, useState } from 'react';
import { Field, Text, RichText as ContentSdkRichText } from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from 'lib/component-props';
import { cn } from '@/lib/utils';

interface CategoryHeroRouteFields {
  CategoryName?: Field<string>;
  CategoryDescription?: Field<string>;
  CategoryResultsCount?: Field<string>;
  CategoryQuickNav?: Field<string>;
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

function splitChips(value?: string): string[] {
  if (!value) return [];
  return value
    .split('|')
    .map((chip) => chip.trim())
    .filter(Boolean);
}

/**
 * Category listing header — Bloomingdale's UAE /women structure:
 * H1, intro + Read More, department chips, results + filter/sort chrome.
 * Context-only: reads route fields, not a reusable datasource.
 */
export const Default = ({ params, page }: ComponentProps): JSX.Element => {
  const { styles, RenderingIdentifier } = params;
  const isEditing = page?.mode?.isEditing;
  const fields = getRouteFields(page);
  const [isExpanded, setIsExpanded] = useState(false);

  if (!fields) return <CategoryHeroDefaultComponent />;

  const nameField = fields.CategoryName || fields.Title;
  const hasName = Boolean(nameField?.value);
  const hasDescription = Boolean(fields.CategoryDescription?.value);
  const hasResults = Boolean(fields.CategoryResultsCount?.value);
  const chips = splitChips(fields.CategoryQuickNav?.value);

  if (!hasName && !hasDescription && !hasResults && chips.length === 0 && !isEditing) {
    return <CategoryHeroDefaultComponent />;
  }

  return (
    <div className={cn('component category-hero', styles)} id={RenderingIdentifier}>
      <section
        className="w-full border-b px-4 py-10 md:px-8 md:py-14"
        style={{
          backgroundColor: 'var(--brand-bg, #ffffff)',
          borderColor: 'var(--brand-border, #e8e8e8)',
        }}
      >
        <div className="mx-auto max-w-[1440px]">
          {(hasName || isEditing) && (
            <Text
              field={nameField}
              tag="h1"
              className="text-4xl font-normal leading-relaxed text-[var(--brand-fg,#1a1a1a)] sm:text-5xl md:text-6xl md:leading-tight ltr:tracking-tight rtl:tracking-normal font-[var(--brand-heading-font,inherit)]"
            />
          )}

          {(hasDescription || isEditing) && (
            <div className="mt-5 max-w-4xl">
              <div
                className={cn(
                  'text-sm leading-relaxed font-[var(--brand-body-font,inherit)]',
                  !isEditing && !isExpanded && 'line-clamp-3'
                )}
                style={{ color: 'var(--brand-muted-foreground, #5c5c5c)' }}
              >
                <ContentSdkRichText field={fields.CategoryDescription} />
              </div>
              {!isEditing && hasDescription && (
                <button
                  type="button"
                  onClick={() => setIsExpanded((open) => !open)}
                  className="mt-3 text-sm underline underline-offset-4 font-[var(--brand-body-font,inherit)]"
                  style={{ color: 'var(--brand-fg, #1a1a1a)' }}
                >
                  {isExpanded ? 'Read Less' : 'Read More'}
                </button>
              )}
            </div>
          )}

          {(chips.length > 0 || isEditing) && (
            <div className="mt-8 flex flex-wrap gap-2">
              {chips.map((chip) => (
                <span
                  key={chip}
                  className="inline-flex border px-4 py-2 text-xs uppercase leading-relaxed ltr:tracking-[0.08em] rtl:tracking-normal font-[var(--brand-body-font,inherit)]"
                  style={{
                    borderColor: 'var(--brand-border, #d6d6d6)',
                    color: 'var(--brand-fg, #1a1a1a)',
                  }}
                >
                  {chip}
                </span>
              ))}
            </div>
          )}

          <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t pt-5"
            style={{ borderColor: 'var(--brand-border, #e8e8e8)' }}
          >
            {(hasResults || isEditing) && (
              <Text
                field={fields.CategoryResultsCount}
                tag="p"
                className="text-sm leading-relaxed font-[var(--brand-body-font,inherit)]"
                style={{ color: 'var(--brand-fg, #1a1a1a)' }}
              />
            )}
            <div className="flex flex-wrap items-center gap-3 text-sm font-[var(--brand-body-font,inherit)]">
              <span
                className="inline-flex items-center border px-4 py-2"
                style={{
                  borderColor: 'var(--brand-border, #d6d6d6)',
                  color: 'var(--brand-fg, #1a1a1a)',
                }}
              >
                Filter
              </span>
              <span style={{ color: 'var(--brand-muted-foreground, #6b6b6b)' }}>Recommended</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
