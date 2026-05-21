'use client';

/**
 * CarModelSpecGrid
 * A simple, purpose-built tech-specification component for car model pages.
 * Reuses the same FeatureCardsGrid datasource structure:
 *   CardTitle       → spec label  (e.g. "Engine")
 *   CardDescription → spec value  (e.g. "2.0T Turbo PHEV, 263 kW")
 *   CardImage       → optional icon (small icon for the spec)
 *   CardLink        → optional deep-link (rarely used)
 *
 * Variants:
 *   Default    — Alternating label/value rows, like an automotive spec sheet
 *   Highlights — 2-up or 4-up big-number callouts for headline specs (power, range, speed)
 */

import React, { JSX } from 'react';
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

interface SpecItemFields {
  id: string;
  cardTitle: { jsonValue: Field<string> };
  cardDescription: { jsonValue: Field<string> };
  cardImage: { jsonValue: ImageField };
  cardLink: { jsonValue: LinkField };
}

interface CarModelSpecGridDatasource {
  title: { jsonValue: Field<string> };
  description: { jsonValue: Field<string> };
  children: { results: SpecItemFields[] };
}

interface CarModelSpecGridFields {
  data: { datasource: CarModelSpecGridDatasource };
}

type CarModelSpecGridProps = ComponentProps & {
  fields: CarModelSpecGridFields;
};

const EmptyHint = (): JSX.Element => (
  <div className="component car-model-spec-grid">
    <span className="is-empty-hint">CarModelSpecGrid</span>
  </div>
);

/* ──────────────────────────────────────────────────────────────
   Default — clean two-column spec sheet (label | value rows)
   ────────────────────────────────────────────────────────────── */
export const Default = ({ fields, params, page }: CarModelSpecGridProps): JSX.Element => {
  const { styles, RenderingIdentifier } = params;
  const isEditing = page?.mode?.isEditing;
  const { datasource } = fields?.data || {};
  const specs = datasource?.children?.results || [];

  if (!datasource) return <EmptyHint />;

  return (
    <div className={cn('component car-model-spec-grid', styles)} id={RenderingIdentifier}>
      <section className="w-full px-4 py-14" style={{ backgroundColor: '#ffffff' }}>
        <div className="mx-auto max-w-4xl">
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

          {/* Spec rows */}
          <div className="divide-y" style={{ borderColor: 'var(--brand-border,#e5e7eb)' }}>
            {specs.map((spec, i) => (
              <div
                key={spec.id}
                className="flex items-start gap-4 py-4"
                style={{ backgroundColor: i % 2 === 0 ? 'transparent' : 'rgba(0,0,0,0.02)' }}
              >
                {/* Optional icon */}
                {(spec.cardImage?.jsonValue?.value?.src || isEditing) && (
                  <div className="flex-shrink-0 mt-0.5">
                    <ContentSdkImage
                      field={spec.cardImage?.jsonValue}
                      className="h-6 w-6 object-contain opacity-60"
                    />
                  </div>
                )}
                {/* Label */}
                <div className="w-44 flex-shrink-0">
                  {(spec.cardTitle?.jsonValue?.value || isEditing) && (
                    <Text
                      field={spec.cardTitle?.jsonValue}
                      tag="dt"
                      className="text-xs font-bold uppercase tracking-wider font-[var(--brand-heading-font,inherit)]"
                      style={{ color: 'var(--brand-accent,#c8102e)' }}
                    />
                  )}
                </div>
                {/* Value */}
                <div className="flex-1">
                  {(spec.cardDescription?.jsonValue?.value || isEditing) && (
                    <ContentSdkRichText
                      field={spec.cardDescription?.jsonValue}
                      tag="dd"
                      className="text-sm leading-relaxed font-[var(--brand-body-font,inherit)]"
                      style={{ color: 'var(--brand-fg,#1a1a1a)' }}
                    />
                  )}
                  {spec.cardLink?.jsonValue && (spec.cardLink.jsonValue.value?.href || isEditing) && (
                    <ContentSdkLink
                      field={spec.cardLink.jsonValue}
                      className="mt-1 inline-flex text-xs underline underline-offset-2 transition-opacity hover:opacity-60"
                      style={{ color: 'var(--brand-accent,#c8102e)' }}
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

/* ──────────────────────────────────────────────────────────────
   Highlights — big-number callouts for headline specs
   (e.g. "263 kW", "70 km", "0–100 in 5.9s")
   CardTitle       → the big number / short value  ("263 kW")
   CardDescription → the label below               ("Combined Output")
   ────────────────────────────────────────────────────────────── */
export const Highlights = ({ fields, params, page }: CarModelSpecGridProps): JSX.Element => {
  const { styles, RenderingIdentifier } = params;
  const isEditing = page?.mode?.isEditing;
  const { datasource } = fields?.data || {};
  const specs = datasource?.children?.results || [];

  if (!datasource) return <EmptyHint />;

  return (
    <div className={cn('component car-model-spec-grid', styles)} id={RenderingIdentifier}>
      <section className="w-full px-4 py-16" style={{ backgroundColor: '#111111' }}>
        <div className="mx-auto max-w-7xl">
          {/* Section header */}
          <div className="mb-12 text-center">
            {(datasource.title?.jsonValue?.value || isEditing) && (
              <Text
                field={datasource.title?.jsonValue}
                tag="h2"
                className="text-2xl font-bold uppercase tracking-tight text-white font-[var(--brand-heading-font,inherit)] md:text-3xl"
              />
            )}
            <div className="mx-auto mt-3 h-0.5 w-10" style={{ backgroundColor: 'var(--brand-accent,#c8102e)' }} />
            {(datasource.description?.jsonValue?.value || isEditing) && (
              <ContentSdkRichText
                field={datasource.description?.jsonValue}
                className="mx-auto mt-4 max-w-xl text-sm text-white/50 font-[var(--brand-body-font,inherit)]"
              />
            )}
          </div>

          {/* Highlight cards */}
          <div className="grid gap-px sm:grid-cols-2 lg:grid-cols-4" style={{ backgroundColor: 'rgba(255,255,255,0.08)' }}>
            {specs.map((spec) => (
              <div
                key={spec.id}
                className="flex flex-col items-center justify-center p-8 text-center"
                style={{ backgroundColor: '#111111' }}
              >
                {/* Optional icon */}
                {(spec.cardImage?.jsonValue?.value?.src || isEditing) && (
                  <div className="mb-4">
                    <ContentSdkImage
                      field={spec.cardImage?.jsonValue}
                      className="h-8 w-8 object-contain opacity-60"
                    />
                  </div>
                )}
                {/* The headline number/value */}
                {(spec.cardTitle?.jsonValue?.value || isEditing) && (
                  <Text
                    field={spec.cardTitle?.jsonValue}
                    tag="div"
                    className="text-4xl font-black tracking-tight text-white font-[var(--brand-heading-font,inherit)] md:text-5xl"
                    style={{ color: 'var(--brand-accent,#c8102e)' }}
                  />
                )}
                {/* Label */}
                {(spec.cardDescription?.jsonValue?.value || isEditing) && (
                  <ContentSdkRichText
                    field={spec.cardDescription?.jsonValue}
                    className="mt-2 text-xs uppercase tracking-widest text-white/50 font-[var(--brand-body-font,inherit)]"
                  />
                )}
                {spec.cardLink?.jsonValue && (spec.cardLink.jsonValue.value?.href || isEditing) && (
                  <ContentSdkLink
                    field={spec.cardLink.jsonValue}
                    className="mt-3 inline-flex text-[10px] font-bold uppercase tracking-widest text-white/30 underline underline-offset-2 transition hover:text-white/70"
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
