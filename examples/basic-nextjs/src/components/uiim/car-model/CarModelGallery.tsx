'use client';

/**
 * CarModelGallery
 * A simple, purpose-built gallery component for car model interior/exterior showcases.
 * Reuses the same FeatureCardsGrid datasource structure — no new template needed.
 *
 * Variants:
 *   Default    — Full-width horizontal carousel with large landscape images + captions
 *   Grid       — Responsive image grid with hover overlay and title
 */

import React, { JSX, useState, useCallback } from 'react';
import {
  Field,
  ImageField,
  LinkField,
  NextImage as ContentSdkImage,
  Link as ContentSdkLink,
  Text,
  RichText as ContentSdkRichText,
} from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from 'lib/component-props';
import { cn } from '@/lib/utils';

interface GalleryCardFields {
  id: string;
  cardTitle: { jsonValue: Field<string> };
  cardDescription: { jsonValue: Field<string> };
  cardImage: { jsonValue: ImageField };
  cardLink: { jsonValue: LinkField };
}

interface CarModelGalleryDatasource {
  title: { jsonValue: Field<string> };
  description: { jsonValue: Field<string> };
  children: { results: GalleryCardFields[] };
}

interface CarModelGalleryFields {
  data: { datasource: CarModelGalleryDatasource };
}

type CarModelGalleryProps = ComponentProps & {
  fields: CarModelGalleryFields;
};

const EmptyHint = (): JSX.Element => (
  <div className="component car-model-gallery">
    <span className="is-empty-hint">CarModelGallery</span>
  </div>
);

/* ──────────────────────────────────────────────────────────────
   Default — full-width carousel with large landscape images
   ────────────────────────────────────────────────────────────── */
export const Default = ({ fields, params, page }: CarModelGalleryProps): JSX.Element => {
  const { styles, RenderingIdentifier } = params;
  const isEditing = page?.mode?.isEditing;
  const { datasource } = fields?.data || {};
  const cards = datasource?.children?.results || [];

  const [active, setActive] = useState(0);

  const goTo = useCallback(
    (idx: number) => setActive(((idx % cards.length) + cards.length) % cards.length),
    [cards.length]
  );

  if (!datasource) return <EmptyHint />;

  const currentCard = cards[active];

  return (
    <div className={cn('component car-model-gallery', styles)} id={RenderingIdentifier}>
      <section className="w-full" style={{ backgroundColor: '#0d0d0d' }}>
        {/* Section header */}
        <div className="mx-auto max-w-7xl px-4 pt-14 pb-8">
          {(datasource.title?.jsonValue?.value || isEditing) && (
            <Text
              field={datasource.title?.jsonValue}
              tag="h2"
              className="text-2xl font-bold uppercase tracking-tight text-white font-[var(--brand-heading-font,inherit)] md:text-3xl"
            />
          )}
          <div className="mt-2 h-0.5 w-10" style={{ backgroundColor: 'var(--brand-accent,#c8102e)' }} />
          {(datasource.description?.jsonValue?.value || isEditing) && (
            <ContentSdkRichText
              field={datasource.description?.jsonValue}
              className="mt-3 text-sm text-white/50 font-[var(--brand-body-font,inherit)]"
            />
          )}
        </div>

        {/* Main image — always render so Page Builder editing chrome activates */}
        <div className="relative overflow-hidden" style={{ aspectRatio: '16/7' }}>
          {cards.map((card, i) => (
            <div
              key={card.id}
              className="absolute inset-0 transition-opacity duration-700"
              style={{ opacity: i === active || isEditing ? 1 : 0, zIndex: i === active || isEditing ? 1 : 0 }}
            >
              <ContentSdkImage
                field={card.cardImage?.jsonValue}
                className="h-full w-full object-cover"
              />
              {/* Gradient overlay — pointer-events-none so Page Builder chrome works */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-transparent" />
              {/* Caption */}
              <div className="absolute bottom-0 left-0 p-8 max-w-lg" style={{ zIndex: 2 }}>
                {(card.cardTitle?.jsonValue?.value || isEditing) && (
                  <Text
                    field={card.cardTitle?.jsonValue}
                    tag="h3"
                    className="text-xl font-bold text-white uppercase tracking-wide font-[var(--brand-heading-font,inherit)]"
                  />
                )}
                {(card.cardDescription?.jsonValue?.value || isEditing) && (
                  <ContentSdkRichText
                    field={card.cardDescription?.jsonValue}
                    className="mt-1 text-sm text-white/70 font-[var(--brand-body-font,inherit)]"
                  />
                )}
                {card.cardLink?.jsonValue && (card.cardLink.jsonValue.value?.href || isEditing) && (
                  <ContentSdkLink
                    field={card.cardLink.jsonValue}
                    className="mt-4 inline-flex items-center border border-white/50 px-5 py-2 text-xs font-semibold uppercase tracking-widest text-white transition hover:bg-white hover:text-black"
                  />
                )}
              </div>
            </div>
          ))}

          {/* Prev / Next — hidden in editing mode */}
          {!isEditing && cards.length > 1 && (
            <>
              <button
                type="button"
                onClick={() => goTo(active - 1)}
                className="absolute left-4 top-1/2 z-10 -translate-y-1/2 flex h-10 w-10 items-center justify-center border border-white/30 text-white transition hover:border-white hover:bg-white/10"
                aria-label="Previous image"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6" /></svg>
              </button>
              <button
                type="button"
                onClick={() => goTo(active + 1)}
                className="absolute right-4 top-1/2 z-10 -translate-y-1/2 flex h-10 w-10 items-center justify-center border border-white/30 text-white transition hover:border-white hover:bg-white/10"
                aria-label="Next image"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 6 15 12 9 18" /></svg>
              </button>
            </>
          )}
        </div>

        {/* Thumbnail strip */}
        {cards.length > 1 && (
          <div className="mx-auto max-w-7xl px-4 py-5">
            <div className="flex gap-2 overflow-x-auto pb-1">
              {cards.map((card, i) => (
                <button
                  key={card.id}
                  type="button"
                  onClick={() => setActive(i)}
                  className="relative flex-shrink-0 overflow-hidden transition"
                  style={{
                    width: 96,
                    height: 60,
                    outline: i === active ? '2px solid var(--brand-accent,#c8102e)' : '2px solid transparent',
                    outlineOffset: 2,
                  }}
                  aria-label={`View image ${i + 1}`}
                >
                  <ContentSdkImage
                    field={card.cardImage?.jsonValue}
                    className="h-full w-full object-cover"
                  />
                  <div
                    className="absolute inset-0 transition-opacity"
                    style={{ backgroundColor: 'rgba(0,0,0,' + (i === active ? '0' : '0.45') + ')' }}
                  />
                </button>
              ))}
            </div>
          </div>
        )}
        {/* Counter */}
        {cards.length > 1 && !isEditing && (
          <div className="pb-10 text-center text-xs text-white/30 font-[var(--brand-body-font,inherit)]">
            {active + 1} / {cards.length}
          </div>
        )}
      </section>
    </div>
  );
};

/* ──────────────────────────────────────────────────────────────
   Grid — responsive image grid, hover reveals title
   ────────────────────────────────────────────────────────────── */
export const Grid = ({ fields, params, page }: CarModelGalleryProps): JSX.Element => {
  const { styles, RenderingIdentifier } = params;
  const isEditing = page?.mode?.isEditing;
  const { datasource } = fields?.data || {};
  const cards = datasource?.children?.results || [];

  if (!datasource) return <EmptyHint />;

  return (
    <div className={cn('component car-model-gallery', styles)} id={RenderingIdentifier}>
      <section className="w-full px-4 py-14" style={{ backgroundColor: '#f8f8f8' }}>
        <div className="mx-auto max-w-7xl">
          {/* Section header */}
          <div className="mb-10">
            {(datasource.title?.jsonValue?.value || isEditing) && (
              <Text
                field={datasource.title?.jsonValue}
                tag="h2"
                className="text-2xl font-bold uppercase tracking-tight font-[var(--brand-heading-font,inherit)] md:text-3xl"
                style={{ color: 'var(--brand-fg,#1a1a1a)' }}
              />
            )}
            <div className="mt-2 h-0.5 w-10" style={{ backgroundColor: 'var(--brand-accent,#c8102e)' }} />
            {(datasource.description?.jsonValue?.value || isEditing) && (
              <ContentSdkRichText
                field={datasource.description?.jsonValue}
                className="mt-3 text-sm opacity-60 font-[var(--brand-body-font,inherit)]"
                style={{ color: 'var(--brand-fg,#1a1a1a)' }}
              />
            )}
          </div>

          {/* Grid */}
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {cards.map((card) => (
              <div
                key={card.id}
                className="group relative overflow-hidden"
                style={{ aspectRatio: '4/3' }}
              >
                <ContentSdkImage
                  field={card.cardImage?.jsonValue}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {/* pointer-events-none overlay */}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <div className="absolute bottom-0 left-0 right-0 translate-y-2 p-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                  {(card.cardTitle?.jsonValue?.value || isEditing) && (
                    <Text
                      field={card.cardTitle?.jsonValue}
                      tag="h3"
                      className="text-sm font-bold text-white uppercase tracking-wide font-[var(--brand-heading-font,inherit)]"
                    />
                  )}
                  {card.cardLink?.jsonValue && (card.cardLink.jsonValue.value?.href || isEditing) && (
                    <ContentSdkLink
                      field={card.cardLink.jsonValue}
                      className="mt-1 inline-flex text-xs text-white/70 underline underline-offset-2 transition hover:text-white"
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
