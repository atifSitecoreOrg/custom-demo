'use client';

import React, { JSX, useState, useCallback, useEffect } from 'react';
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

interface FeatureCardItemFields {
  id: string;
  cardTitle: { jsonValue: Field<string> };
  cardDescription: { jsonValue: Field<string> };
  cardImage: { jsonValue: ImageField };
  cardLink: { jsonValue: LinkField };
}

interface FeatureCardsGridDatasource {
  title: { jsonValue: Field<string> };
  description: { jsonValue: Field<string> };
  ctaLink?: { jsonValue: LinkField };
  ctaLabel?: { jsonValue: Field<string> };
  children: {
    results: FeatureCardItemFields[];
  };
}

interface FeatureCardsGridFields {
  data: {
    datasource: FeatureCardsGridDatasource;
  };
}

type FeatureCardsGridProps = ComponentProps & {
  fields: FeatureCardsGridFields;
};

const FeatureCardsGridDefaultComponent = (): JSX.Element => (
  <div className="component feature-cards-grid">
    <div className="component-content">
      <span className="is-empty-hint">FeatureCardsGrid</span>
    </div>
  </div>
);

const SectionHeader = ({
  datasource,
  isEditing,
}: {
  datasource: FeatureCardsGridDatasource;
  isEditing?: boolean;
}) => (
  <div className="mx-auto mb-12 max-w-3xl text-center">
    {(datasource.title?.jsonValue?.value || isEditing) && (
      <Text
        field={datasource.title?.jsonValue}
        tag="h2"
        className="text-3xl font-bold tracking-tight sm:text-4xl font-[var(--brand-heading-font,inherit)]"
        style={{ color: 'var(--brand-fg, #111111)' }}
      />
    )}
    {(datasource.description?.jsonValue?.value || isEditing) && (
      <ContentSdkRichText
        field={datasource.description?.jsonValue}
        className="mt-4 text-lg opacity-70 font-[var(--brand-body-font,inherit)]"
        style={{ color: 'var(--brand-fg, #111111)' }}
      />
    )}
  </div>
);

/* ────────────────────────────────────────────
   Default — 3-column grid, icon top
   ──────────────────────────────────────────── */
export const Default = ({ fields, params, page }: FeatureCardsGridProps): JSX.Element => {
  const { styles, RenderingIdentifier } = params;
  const isEditing = page?.mode?.isEditing;
  const datasource = fields?.data?.datasource;
  if (!datasource) return <FeatureCardsGridDefaultComponent />;
  const cards = datasource.children?.results || [];

  return (
    <div className={cn('component feature-cards-grid', styles)} id={RenderingIdentifier}>
      <section
        className="w-full px-4 py-16 md:py-24"
        style={{ backgroundColor: 'var(--brand-bg, #ffffff)' }}
      >
        <div className="mx-auto max-w-7xl">
          <SectionHeader datasource={datasource} isEditing={isEditing} />
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {cards.map((card) => (
              <div
                key={card.id}
                className="flex flex-col p-6 rounded-[var(--brand-card-radius,0.75rem)]"
                style={{
                  backgroundColor: 'var(--brand-bg, #ffffff)',
                  border: '1px solid var(--brand-border, #e5e7eb)',
                }}
              >
                {(card.cardImage?.jsonValue?.value?.src || isEditing) && (
                  <div className="mb-4 h-12 w-12 overflow-hidden">
                    <ContentSdkImage
                      field={card.cardImage?.jsonValue}
                      className="h-full w-full object-contain"
                    />
                  </div>
                )}
                {(card.cardTitle?.jsonValue?.value || isEditing) && (
                  <Text
                    field={card.cardTitle?.jsonValue}
                    tag="h3"
                    className="text-lg font-semibold font-[var(--brand-heading-font,inherit)]"
                    style={{ color: 'var(--brand-fg, #111111)' }}
                  />
                )}
                {(card.cardDescription?.jsonValue?.value || isEditing) && (
                  <ContentSdkRichText
                    field={card.cardDescription?.jsonValue}
                    className="mt-2 flex-1 text-sm opacity-70 font-[var(--brand-body-font,inherit)]"
                    style={{ color: 'var(--brand-fg, #111111)' }}
                  />
                )}
                {(card.cardLink?.jsonValue?.value?.href || isEditing) && (
                  <ContentSdkLink
                    field={card.cardLink?.jsonValue}
                    className="mt-4 inline-flex text-sm font-medium underline underline-offset-4 transition-opacity hover:opacity-70"
                    style={{ color: 'var(--brand-primary)' }}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

/* ────────────────────────────────────────────
   TwoColumn — 2 wider cards
   ──────────────────────────────────────────── */
export const TwoColumn = ({ fields, params, page }: FeatureCardsGridProps): JSX.Element => {
  const { styles, RenderingIdentifier } = params;
  const isEditing = page?.mode?.isEditing;
  const datasource = fields?.data?.datasource;
  if (!datasource) return <FeatureCardsGridDefaultComponent />;
  const cards = datasource.children?.results || [];

  return (
    <div className={cn('component feature-cards-grid', styles)} id={RenderingIdentifier}>
      <section
        className="w-full px-4 py-16 md:py-24"
        style={{ backgroundColor: 'var(--brand-bg, #ffffff)' }}
      >
        <div className="mx-auto max-w-5xl">
          <SectionHeader datasource={datasource} isEditing={isEditing} />
          <div className="grid gap-8 md:grid-cols-2">
            {cards.map((card) => (
              <div
                key={card.id}
                className="flex flex-col p-8 rounded-[var(--brand-card-radius,0.75rem)]"
                style={{
                  backgroundColor: 'var(--brand-bg, #ffffff)',
                  border: '1px solid var(--brand-border, #e5e7eb)',
                }}
              >
                {(card.cardImage?.jsonValue?.value?.src || isEditing) && (
                  <div className="mb-5 h-14 w-14 overflow-hidden">
                    <ContentSdkImage
                      field={card.cardImage?.jsonValue}
                      className="h-full w-full object-contain"
                    />
                  </div>
                )}
                {(card.cardTitle?.jsonValue?.value || isEditing) && (
                  <Text
                    field={card.cardTitle?.jsonValue}
                    tag="h3"
                    className="text-xl font-semibold font-[var(--brand-heading-font,inherit)]"
                    style={{ color: 'var(--brand-fg, #111111)' }}
                  />
                )}
                {(card.cardDescription?.jsonValue?.value || isEditing) && (
                  <ContentSdkRichText
                    field={card.cardDescription?.jsonValue}
                    className="mt-3 flex-1 text-base opacity-70 font-[var(--brand-body-font,inherit)]"
                    style={{ color: 'var(--brand-fg, #111111)' }}
                  />
                )}
                {(card.cardLink?.jsonValue?.value?.href || isEditing) && (
                  <ContentSdkLink
                    field={card.cardLink?.jsonValue}
                    className="mt-5 inline-flex text-sm font-medium underline underline-offset-4 transition-opacity hover:opacity-70"
                    style={{ color: 'var(--brand-primary)' }}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

/* ────────────────────────────────────────────
   WithImages — larger images at top of each card
   ──────────────────────────────────────────── */
export const WithImages = ({ fields, params, page }: FeatureCardsGridProps): JSX.Element => {
  const { styles, RenderingIdentifier } = params;
  const isEditing = page?.mode?.isEditing;
  const datasource = fields?.data?.datasource;
  if (!datasource) return <FeatureCardsGridDefaultComponent />;
  const cards = datasource.children?.results || [];

  return (
    <div className={cn('component feature-cards-grid', styles)} id={RenderingIdentifier}>
      <section
        className="w-full px-4 py-16 md:py-24"
        style={{ backgroundColor: 'var(--brand-bg, #ffffff)' }}
      >
        <div className="mx-auto max-w-7xl">
          <SectionHeader datasource={datasource} isEditing={isEditing} />
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {cards.map((card) => (
              <div
                key={card.id}
                className="flex flex-col overflow-hidden rounded-[var(--brand-card-radius,0.75rem)]"
                style={{
                  backgroundColor: 'var(--brand-bg, #ffffff)',
                  border: '1px solid var(--brand-border, #e5e7eb)',
                }}
              >
                {(card.cardImage?.jsonValue?.value?.src || isEditing) && (
                  <ContentSdkImage
                    field={card.cardImage?.jsonValue}
                    className="h-48 w-full object-cover"
                  />
                )}
                <div className="flex flex-1 flex-col p-6">
                  {(card.cardTitle?.jsonValue?.value || isEditing) && (
                    <Text
                      field={card.cardTitle?.jsonValue}
                      tag="h3"
                      className="text-lg font-semibold font-[var(--brand-heading-font,inherit)]"
                      style={{ color: 'var(--brand-fg, #111111)' }}
                    />
                  )}
                  {(card.cardDescription?.jsonValue?.value || isEditing) && (
                    <ContentSdkRichText
                      field={card.cardDescription?.jsonValue}
                      className="mt-2 flex-1 text-sm opacity-70 font-[var(--brand-body-font,inherit)]"
                      style={{ color: 'var(--brand-fg, #111111)' }}
                    />
                  )}
                  {(card.cardLink?.jsonValue?.value?.href || isEditing) && (
                    <ContentSdkLink
                      field={card.cardLink?.jsonValue}
                      className="mt-4 inline-flex text-sm font-medium underline underline-offset-4 transition-opacity hover:opacity-70"
                      style={{ color: 'var(--brand-primary)' }}
                    />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

/* ────────────────────────────────────────────
   JetourUAEModels — dark automotive carousel, portrait cards with gradient overlay
   ──────────────────────────────────────────── */
export const JetourUAEModels = ({ fields, params, page }: FeatureCardsGridProps): JSX.Element => {
  const { styles, RenderingIdentifier } = params;
  const isEditing = page?.mode?.isEditing;
  const datasource = fields?.data?.datasource;
  const cards = datasource?.children?.results || [];

  const VISIBLE = { sm: 1, md: 2, lg: 3 };
  const [pageIndex, setPageIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(VISIBLE.lg);

  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      setVisibleCount(w < 640 ? VISIBLE.sm : w < 1024 ? VISIBLE.md : VISIBLE.lg);
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  const totalPages = Math.max(1, Math.ceil(cards.length / visibleCount));
  const clampedPage = Math.min(pageIndex, totalPages - 1);

  const goTo = useCallback(
    (idx: number) => setPageIndex(((idx % totalPages) + totalPages) % totalPages),
    [totalPages]
  );

  if (!datasource) return <FeatureCardsGridDefaultComponent />;

  return (
    <div className={cn('component feature-cards-grid', styles)} id={RenderingIdentifier}>
      <section
        className="w-full px-4 py-16 md:py-20"
        style={{ backgroundColor: 'var(--brand-dark, #1a1a1a)' }}
      >
        <div className="mx-auto max-w-7xl">
          {/* Section header + arrows */}
          <div className="mb-8 flex items-end justify-between">
            <div>
              {(datasource.title?.jsonValue?.value || isEditing) && (
                <Text
                  field={datasource.title?.jsonValue}
                  tag="h2"
                  className="text-3xl font-bold tracking-tight text-white uppercase font-[var(--brand-heading-font,inherit)] md:text-4xl"
                />
              )}
              {(datasource.description?.jsonValue?.value || isEditing) && (
                <ContentSdkRichText
                  field={datasource.description?.jsonValue}
                  className="mt-2 text-sm text-white/50 font-[var(--brand-body-font,inherit)]"
                />
              )}
            </div>
            {/* Arrow controls — top-right */}
            {totalPages > 1 && !isEditing && (
              <div className="flex gap-2 shrink-0 ml-4">
                <button
                  type="button"
                  onClick={() => goTo(clampedPage - 1)}
                  className="flex h-10 w-10 items-center justify-center border border-white/30 text-white transition hover:border-white"
                  aria-label="Previous models"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="15 18 9 12 15 6" />
                  </svg>
                </button>
                <button
                  type="button"
                  onClick={() => goTo(clampedPage + 1)}
                  className="flex h-10 w-10 items-center justify-center border border-white/30 text-white transition hover:border-white"
                  aria-label="Next models"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="9 6 15 12 9 18" />
                  </svg>
                </button>
              </div>
            )}
          </div>

          {/* Carousel track */}
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${clampedPage * 100}%)` }}
            >
              {cards.map((card) => (
                <div
                  key={card.id}
                  className="flex-shrink-0 px-2"
                  style={{ width: `${100 / visibleCount}%` }}
                >
                  <div
                    className="group relative flex flex-col overflow-hidden"
                    style={{ borderRadius: '2px' }}
                  >
                    <div className="relative overflow-hidden" style={{ aspectRatio: '3/4' }}>
                      {/* Always render so Page Builder editing chrome activates on click */}
                      <ContentSdkImage
                        field={card.cardImage?.jsonValue}
                        className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                      />
                      {/* pointer-events-none keeps editing overlays clickable */}
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                      <div className="absolute bottom-0 left-0 right-0 p-4">
                        {(card.cardTitle?.jsonValue?.value || isEditing) && (
                          <Text
                            field={card.cardTitle?.jsonValue}
                            tag="h3"
                            className="text-white font-bold uppercase tracking-wide text-lg font-[var(--brand-heading-font,inherit)]"
                          />
                        )}
                        {(card.cardDescription?.jsonValue?.value || isEditing) && (
                          <ContentSdkRichText
                            field={card.cardDescription?.jsonValue}
                            className="mt-1 text-white/70 text-xs font-[var(--brand-body-font,inherit)]"
                          />
                        )}
                        {(card.cardLink?.jsonValue?.value?.href || isEditing) && (
                          <ContentSdkLink
                            field={card.cardLink?.jsonValue}
                            className="mt-3 inline-flex items-center border border-white/60 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-white transition-colors hover:bg-white hover:text-black"
                            style={{ borderRadius: '2px' }}
                          />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dot indicators */}
          {totalPages > 1 && (
            <div className="mt-6 flex gap-1.5">
              {Array.from({ length: totalPages }).map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => goTo(i)}
                  className="h-0.5 transition-all"
                  style={{
                    width: i === clampedPage ? '32px' : '16px',
                    backgroundColor: i === clampedPage
                      ? 'var(--brand-accent, #e63900)'
                      : 'rgba(255,255,255,0.25)',
                  }}
                  aria-label={`Go to page ${i + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

/* JetourUAEServices — white bg, full-width image-top service cards matching jetouruae.com */
export const JetourUAEServices = ({ fields, params, page }: FeatureCardsGridProps): JSX.Element => {
  const { styles, RenderingIdentifier } = params;
  const isEditing = page?.mode?.isEditing;
  const datasource = fields?.data?.datasource;
  if (!datasource) return <FeatureCardsGridDefaultComponent />;
  const cards = datasource.children?.results || [];

  return (
    <div className={cn('component feature-cards-grid', styles)} id={RenderingIdentifier}>
      <section className="w-full px-4 py-16 md:py-20" style={{ backgroundColor: '#ffffff' }}>
        <div className="mx-auto max-w-7xl">
          {/* Section header — left-aligned with accent underline */}
          <div className="mb-10">
            {(datasource.title?.jsonValue?.value || isEditing) && (
              <Text
                field={datasource.title?.jsonValue}
                tag="h2"
                className="text-2xl font-bold uppercase tracking-tight font-[var(--brand-heading-font,inherit)] md:text-3xl"
                style={{ color: 'var(--brand-fg, #1a1a1a)' }}
              />
            )}
            {/* Red accent underline */}
            <div className="mt-3 h-0.5 w-12" style={{ backgroundColor: 'var(--brand-accent, #c8102e)' }} />
            {(datasource.description?.jsonValue?.value || isEditing) && (
              <ContentSdkRichText
                field={datasource.description?.jsonValue}
                className="mt-4 text-sm opacity-55 font-[var(--brand-body-font,inherit)]"
                style={{ color: 'var(--brand-fg, #1a1a1a)' }}
              />
            )}
          </div>

          {/* Cards — full-width image on top */}
          <div className="grid gap-6 md:grid-cols-3">
            {cards.map((card) => (
              <div
                key={card.id}
                className="group flex flex-col overflow-hidden"
                style={{ border: '1px solid var(--brand-border, #e5e7eb)' }}
              >
                {/* Full-width image */}
                <div className="relative overflow-hidden" style={{ aspectRatio: '16/9' }}>
                  {card.cardImage?.jsonValue ? (
                    <ContentSdkImage
                      field={card.cardImage?.jsonValue}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div
                      className="flex h-full w-full items-center justify-center"
                      style={{ backgroundColor: 'var(--brand-muted, #f5f5f5)' }}
                    >
                      <span className="text-xs opacity-30 font-[var(--brand-body-font,inherit)]">Image</span>
                    </div>
                  )}
                  {/* pointer-events-none so editing overlays receive clicks */}
                  <div className="pointer-events-none absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/10" />
                </div>

                {/* Card body */}
                <div className="flex flex-1 flex-col p-6">
                  {/* Accent bar */}
                  <div className="mb-4 h-0.5 w-8" style={{ backgroundColor: 'var(--brand-accent, #c8102e)' }} />
                  {(card.cardTitle?.jsonValue?.value || isEditing) && (
                    <Text
                      field={card.cardTitle?.jsonValue}
                      tag="h3"
                      className="text-base font-bold uppercase tracking-wide font-[var(--brand-heading-font,inherit)]"
                      style={{ color: 'var(--brand-fg, #1a1a1a)' }}
                    />
                  )}
                  {(card.cardDescription?.jsonValue?.value || isEditing) && (
                    <ContentSdkRichText
                      field={card.cardDescription?.jsonValue}
                      className="mt-3 flex-1 text-sm leading-relaxed opacity-60 font-[var(--brand-body-font,inherit)]"
                      style={{ color: 'var(--brand-fg, #1a1a1a)' }}
                    />
                  )}
                  {(card.cardLink?.jsonValue?.value?.href || isEditing) && (
                    <ContentSdkLink
                      field={card.cardLink?.jsonValue}
                      className="mt-5 inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider transition-opacity hover:opacity-70"
                      style={{ color: 'var(--brand-accent, #c8102e)' }}
                    />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

/* ────────────────────────────────────────────
   JetourUAENews — dark section header + white/image cards matching jetouruae.com screenshot
   ──────────────────────────────────────────── */
export const JetourUAENews = ({ fields, params, page }: FeatureCardsGridProps): JSX.Element => {
  const { styles, RenderingIdentifier } = params;
  const isEditing = page?.mode?.isEditing;
  const datasource = fields?.data?.datasource;
  const cards = datasource?.children?.results || [];

  const VISIBLE = { sm: 1, md: 2, lg: 3 };
  const [pageIndex, setPageIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(VISIBLE.lg);

  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      setVisibleCount(w < 640 ? VISIBLE.sm : w < 1024 ? VISIBLE.md : VISIBLE.lg);
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  const totalPages = Math.max(1, Math.ceil(cards.length / visibleCount));
  const clampedPage = Math.min(pageIndex, totalPages - 1);

  const goTo = useCallback(
    (idx: number) => setPageIndex(((idx % totalPages) + totalPages) % totalPages),
    [totalPages]
  );

  if (!datasource) return <FeatureCardsGridDefaultComponent />;

  return (
    <div className={cn('component feature-cards-grid', styles)} id={RenderingIdentifier}>
      <section className="w-full" style={{ backgroundColor: '#111111' }}>
        {/* Section heading — centred on dark bg */}
        <div className="px-4 pt-12 pb-8 text-center">
          <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.35em] text-white/35 font-[var(--brand-heading-font,inherit)]">
            Media Centre
          </p>
          {(datasource.title?.jsonValue?.value || isEditing) && (
            <Text
              field={datasource.title?.jsonValue}
              tag="h2"
              className="text-2xl font-bold text-white font-[var(--brand-heading-font,inherit)] md:text-3xl"
            />
          )}
          {(datasource.description?.jsonValue?.value || isEditing) && (
            <ContentSdkRichText
              field={datasource.description?.jsonValue}
              className="mx-auto mt-2 max-w-lg text-xs text-white/40 font-[var(--brand-body-font,inherit)]"
            />
          )}
        </div>

        {/* Carousel — full width with edge arrows */}
        <div className="relative">
          {/* Prev arrow */}
          {!isEditing && (
            <button
              type="button"
              onClick={() => goTo(clampedPage - 1)}
              className="absolute left-3 top-1/2 z-10 -translate-y-1/2 flex h-8 w-8 items-center justify-center border border-white/20 text-white/50 transition hover:border-white/60 hover:text-white rtl:left-auto rtl:right-3"
              aria-label="Previous articles"
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>
          )}

          <div className="overflow-hidden px-10 md:px-14">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${clampedPage * 100}%)` }}
            >
              {cards.map((card) => {
                const hasImage = !!card.cardImage?.jsonValue?.value?.src;
                return (
                  <div
                    key={card.id}
                    className="flex-shrink-0 px-1.5"
                    style={{ width: `${100 / visibleCount}%` }}
                  >
                    {/* Card: full image fill OR white text card */}
                    <div
                      className="group relative flex flex-col overflow-hidden"
                      style={{ aspectRatio: '3/4', backgroundColor: '#ffffff' }}
                    >
                      {hasImage || isEditing ? (
                        /* Image card — image fills entire area */
                        <>
                          <ContentSdkImage
                            field={card.cardImage?.jsonValue}
                            className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                          {/* Bottom gradient + title */}
                          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                          <div className="absolute bottom-0 left-0 right-0 p-4 rtl:text-right">
                            {(card.cardTitle?.jsonValue?.value || isEditing) && (
                              <Text
                                field={card.cardTitle?.jsonValue}
                                tag="h3"
                                className="text-sm font-bold leading-snug text-white font-[var(--brand-heading-font,inherit)]"
                              />
                            )}
                            {(card.cardLink?.jsonValue?.value?.href || isEditing) && (
                              <ContentSdkLink
                                field={card.cardLink?.jsonValue}
                                className="mt-2 inline-flex items-center text-[10px] font-bold uppercase tracking-widest text-white/70 transition-colors hover:text-white"
                              />
                            )}
                          </div>
                        </>
                      ) : (
                        /* Text card — white bg, brand marks, dark title */
                        <div className="flex h-full flex-col p-5">
                          {/* Brand identity marks */}
                          <div className="mb-4 flex items-center gap-2 rtl:flex-row-reverse">
                            <span
                              className="inline-flex items-center px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-white"
                              style={{ backgroundColor: 'var(--brand-accent, #c8102e)' }}
                            >
                              JETOUR
                            </span>
                            <span className="text-[8px] font-semibold uppercase tracking-wider text-gray-400">
                              Elite Group Holding
                            </span>
                          </div>
                          {(card.cardTitle?.jsonValue?.value || isEditing) && (
                            <Text
                              field={card.cardTitle?.jsonValue}
                              tag="h3"
                              className="flex-1 text-sm font-bold leading-snug text-gray-900 font-[var(--brand-heading-font,inherit)]"
                            />
                          )}
                          {(card.cardDescription?.jsonValue?.value || isEditing) && (
                            <ContentSdkRichText
                              field={card.cardDescription?.jsonValue}
                              className="mt-2 text-xs leading-relaxed text-gray-500 font-[var(--brand-body-font,inherit)] line-clamp-3"
                            />
                          )}
                          {(card.cardLink?.jsonValue?.value?.href || isEditing) && (
                            <ContentSdkLink
                              field={card.cardLink?.jsonValue}
                              className="mt-auto pt-5 inline-flex items-center text-[11px] font-bold uppercase tracking-widest text-gray-500 transition-colors hover:text-gray-900"
                            />
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Next arrow */}
          {!isEditing && (
            <button
              type="button"
              onClick={() => goTo(clampedPage + 1)}
              className="absolute right-3 top-1/2 z-10 -translate-y-1/2 flex h-8 w-8 items-center justify-center border border-white/20 text-white/50 transition hover:border-white/60 hover:text-white rtl:right-auto rtl:left-3"
              aria-label="Next articles"
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="9 6 15 12 9 18" />
              </svg>
            </button>
          )}
        </div>

        {/* Dots + Read All News */}
        <div className="flex flex-col items-center gap-5 py-8">
          {totalPages > 1 && (
            <div className="flex gap-2">
              {Array.from({ length: totalPages }).map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => goTo(i)}
                  className="h-0.5 transition-all"
                  style={{
                    width: i === clampedPage ? '28px' : '14px',
                    backgroundColor: i === clampedPage ? 'rgba(255,255,255,0.6)' : 'rgba(255,255,255,0.18)',
                  }}
                  aria-label={`Go to page ${i + 1}`}
                />
              ))}
            </div>
          )}
          {(datasource.ctaLink?.jsonValue?.value?.href || isEditing) && datasource.ctaLink?.jsonValue && (
            <ContentSdkLink
              field={datasource.ctaLink.jsonValue}
              className="inline-flex items-center justify-center px-7 py-2.5 text-[11px] font-bold uppercase tracking-widest text-white border border-white/25 transition-colors hover:border-white/60 hover:bg-white/10"
            />
          )}
        </div>
      </section>
    </div>
  );
};

/* ────────────────────────────────────────────
   Carousel — horizontal scrolling cards with dots + arrows
   ──────────────────────────────────────────── */
export const Carousel = ({ fields, params, page }: FeatureCardsGridProps): JSX.Element => {
  const { styles, RenderingIdentifier } = params;
  const isEditing = page?.mode?.isEditing;
  const datasource = fields?.data?.datasource;
  const cards = datasource?.children?.results || [];

  // How many cards visible at once per breakpoint
  const VISIBLE = { sm: 1, md: 2, lg: 4 };
  const [pageIndex, setPageIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(VISIBLE.lg);

  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      setVisibleCount(w < 640 ? VISIBLE.sm : w < 1024 ? VISIBLE.md : VISIBLE.lg);
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  const totalPages = Math.max(1, Math.ceil(cards.length / visibleCount));
  const clampedPage = Math.min(pageIndex, totalPages - 1);

  const goTo = useCallback(
    (idx: number) => setPageIndex(((idx % totalPages) + totalPages) % totalPages),
    [totalPages]
  );

  if (!datasource) return <FeatureCardsGridDefaultComponent />;

  return (
    <div className={cn('component feature-cards-grid', styles)} id={RenderingIdentifier}>
      <section
        className="w-full px-4 py-16 md:py-24"
        style={{ backgroundColor: 'var(--brand-bg, #ffffff)' }}
      >
        <div className="mx-auto max-w-7xl">
          <SectionHeader datasource={datasource} isEditing={isEditing} />

          {/* Carousel track */}
          <div className="relative">
            <div className="overflow-hidden">
              <div
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${clampedPage * 100}%)` }}
              >
                {/* Render all cards in a single row; each card takes 1/visibleCount width */}
                {cards.map((card) => (
                  <div
                    key={card.id}
                    className="flex-shrink-0 px-3"
                    style={{ width: `${100 / visibleCount}%` }}
                  >
                    <div className="group relative flex flex-col overflow-hidden rounded-[var(--brand-card-radius,0.75rem)] h-full">
                      {/* Card image — tall portrait ratio */}
                      {(card.cardImage?.jsonValue?.value?.src || isEditing) && (
                        <div className="relative aspect-[3/4] overflow-hidden">
                          <ContentSdkImage
                            field={card.cardImage?.jsonValue}
                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                          {/* Bottom gradient for text readability */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                          {/* Overlay content */}
                          <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
                            {(card.cardTitle?.jsonValue?.value || isEditing) && (
                              <Text
                                field={card.cardTitle?.jsonValue}
                                tag="h3"
                                className="text-lg font-bold tracking-tight font-[var(--brand-heading-font,inherit)] uppercase"
                              />
                            )}
                            {(card.cardLink?.jsonValue?.value?.href || isEditing) && (
                              <ContentSdkLink
                                field={card.cardLink?.jsonValue}
                                className="mt-3 inline-flex items-center justify-center rounded-[var(--brand-button-radius,0.375rem)] border border-white px-5 py-2 text-xs font-semibold uppercase tracking-wider text-white transition-colors hover:bg-white hover:text-black"
                              />
                            )}
                          </div>
                        </div>
                      )}
                      {/* Fallback: show title + description below if no image */}
                      {!card.cardImage?.jsonValue?.value?.src && !isEditing && (
                        <div className="flex flex-1 flex-col p-6">
                          {(card.cardTitle?.jsonValue?.value || isEditing) && (
                            <Text
                              field={card.cardTitle?.jsonValue}
                              tag="h3"
                              className="text-lg font-semibold font-[var(--brand-heading-font,inherit)]"
                              style={{ color: 'var(--brand-fg, #111111)' }}
                            />
                          )}
                          {(card.cardDescription?.jsonValue?.value || isEditing) && (
                            <ContentSdkRichText
                              field={card.cardDescription?.jsonValue}
                              className="mt-2 flex-1 text-sm opacity-70"
                              style={{ color: 'var(--brand-fg, #111111)' }}
                            />
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Prev / Next arrows */}
            {totalPages > 1 && !isEditing && (
              <>
                <button
                  type="button"
                  onClick={() => goTo(clampedPage - 1)}
                  className="absolute -left-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/90 p-2 shadow-md transition hover:bg-white"
                  style={{ color: 'var(--brand-fg, #111)' }}
                  aria-label="Previous cards"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="15 6 9 12 15 18" />
                  </svg>
                </button>
                <button
                  type="button"
                  onClick={() => goTo(clampedPage + 1)}
                  className="absolute -right-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/90 p-2 shadow-md transition hover:bg-white"
                  style={{ color: 'var(--brand-fg, #111)' }}
                  aria-label="Next cards"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="9 6 15 12 9 18" />
                  </svg>
                </button>
              </>
            )}
          </div>

          {/* Dot indicators */}
          {totalPages > 1 && (
            <div className="mt-6 flex justify-start gap-2">
              {Array.from({ length: totalPages }).map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => goTo(i)}
                  className={cn(
                    'h-2.5 w-2.5 rounded-full transition-all',
                    i === clampedPage
                      ? 'scale-110'
                      : 'opacity-40 hover:opacity-70'
                  )}
                  style={{
                    backgroundColor: i === clampedPage
                      ? 'var(--brand-fg, #111)'
                      : 'var(--brand-fg, #111)',
                  }}
                  aria-label={`Go to page ${i + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};


/* JetourUAEAbout - three-column dark brand pillars (About section) */
/* JetourUAEAbout — 3-column light-background about section matching jetouruae.com */
export const JetourUAEAbout = ({ fields, params, page }: FeatureCardsGridProps): JSX.Element => {
  const { styles, RenderingIdentifier } = params;
  const isEditing = page?.mode?.isEditing;
  const datasource = fields?.data?.datasource;
  if (!datasource) return <FeatureCardsGridDefaultComponent />;
  const cards = datasource.children?.results || [];

  return (
    <div className={cn('component feature-cards-grid', styles)} id={RenderingIdentifier}>
      <section className="w-full px-4 py-16 md:py-20 bg-white">
        <div className="mx-auto max-w-7xl">
          {(datasource.title?.jsonValue?.value || isEditing) && (
            <Text
              field={datasource.title?.jsonValue}
              tag="p"
              className="mb-10 text-xs font-bold uppercase tracking-[0.3em] font-[var(--brand-heading-font,inherit)]"
              style={{ color: 'var(--brand-accent, #c8102e)' }}
            />
          )}
          <div className="grid gap-12 md:grid-cols-3 md:gap-10">
            {cards.map((card, idx) => (
              <div key={card.id} className="flex flex-col">
                <div className="mb-4 h-0.5 w-10" style={{ backgroundColor: idx === 0 ? 'var(--brand-accent, #c8102e)' : 'var(--brand-fg, #212121)' }} />
                {(card.cardTitle?.jsonValue?.value || isEditing) && (
                  <Text
                    field={card.cardTitle?.jsonValue}
                    tag="h3"
                    className="mb-4 text-lg font-bold uppercase tracking-tight font-[var(--brand-heading-font,inherit)] leading-snug"
                    style={{ color: 'var(--brand-fg, #212121)' }}
                  />
                )}
                {(card.cardDescription?.jsonValue?.value || isEditing) && (
                  <ContentSdkRichText
                    field={card.cardDescription?.jsonValue}
                    className="flex-1 text-sm leading-relaxed font-[var(--brand-body-font,inherit)]"
                    style={{ color: 'var(--brand-fg-muted, #555555)' }}
                  />
                )}
                {(card.cardLink?.jsonValue?.value?.href || isEditing) && (
                  <ContentSdkLink
                    field={card.cardLink?.jsonValue}
                    className="mt-6 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest transition-opacity hover:opacity-70"
                    style={{ color: 'var(--brand-accent, #c8102e)' }}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

/* JetourUAELocations — dark section with patterned background + location cards */
export const JetourUAELocations = ({ fields, params, page }: FeatureCardsGridProps): JSX.Element => {
  const { styles, RenderingIdentifier } = params;
  const isEditing = page?.mode?.isEditing;
  const datasource = fields?.data?.datasource;
  if (!datasource) return <FeatureCardsGridDefaultComponent />;
  const cards = datasource.children?.results || [];

  return (
    <div className={cn('component feature-cards-grid', styles)} id={RenderingIdentifier}>
      <section
        className="relative w-full px-4 py-16 md:py-24 overflow-hidden"
        style={{ backgroundColor: '#111111' }}
      >
        {/* Subtle geometric background pattern */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `repeating-linear-gradient(0deg, #fff 0px, #fff 1px, transparent 1px, transparent 60px),
              repeating-linear-gradient(90deg, #fff 0px, #fff 1px, transparent 1px, transparent 60px)`,
          }}
        />
        {/* Red accent bar at bottom edge */}
        <div className="absolute bottom-0 left-0 right-0 h-0.5" style={{ backgroundColor: 'var(--brand-accent, #c8102e)' }} />

        <div className="relative mx-auto max-w-7xl">
          <div className="mb-10 flex items-end justify-between gap-4">
            <div>
              {(datasource.title?.jsonValue?.value || isEditing) && (
                <Text
                  field={datasource.title?.jsonValue}
                  tag="h2"
                  className="text-3xl font-bold tracking-tight text-white uppercase font-[var(--brand-heading-font,inherit)] md:text-4xl"
                />
              )}
              {(datasource.description?.jsonValue?.value || isEditing) && (
                <ContentSdkRichText
                  field={datasource.description?.jsonValue}
                  className="mt-2 text-sm text-white/50 font-[var(--brand-body-font,inherit)]"
                />
              )}
            </div>
          </div>

          <div className="grid gap-px md:grid-cols-2 lg:grid-cols-3" style={{ backgroundColor: 'rgba(255,255,255,0.07)' }}>
            {cards.map((card) => (
              <div
                key={card.id}
                className="group flex flex-col gap-3 p-7 transition-colors"
                style={{ backgroundColor: '#161616' }}
              >
                {(card.cardImage?.jsonValue?.value?.src || isEditing) && (
                  <div className="overflow-hidden" style={{ aspectRatio: '4/3' }}>
                    <ContentSdkImage
                      field={card.cardImage?.jsonValue}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                )}
                <div className="mt-1 h-0.5 w-8" style={{ backgroundColor: 'var(--brand-accent, #c8102e)' }} />
                {(card.cardTitle?.jsonValue?.value || isEditing) && (
                  <Text
                    field={card.cardTitle?.jsonValue}
                    tag="h3"
                    className="text-sm font-bold uppercase tracking-wider text-white font-[var(--brand-heading-font,inherit)]"
                  />
                )}
                {(card.cardDescription?.jsonValue?.value || isEditing) && (
                  <ContentSdkRichText
                    field={card.cardDescription?.jsonValue}
                    className="flex-1 text-xs leading-relaxed text-white/50 font-[var(--brand-body-font,inherit)]"
                  />
                )}
                {(card.cardLink?.jsonValue?.value?.href || isEditing) && (
                  <ContentSdkLink
                    field={card.cardLink?.jsonValue}
                    className="mt-2 inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest transition-opacity hover:opacity-70"
                    style={{ color: 'var(--brand-accent, #c8102e)' }}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};