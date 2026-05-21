'use client';

import React, { JSX, useState, useEffect, useCallback } from 'react';
import {
  Field,
  ImageField,
  NextImage as ContentSdkImage,
  RichText as ContentSdkRichText,
  Text,
} from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from 'lib/component-props';
import { cn } from '@/lib/utils';

interface FeatureSlideItem {
  id: string;
  featureTitle?: { jsonValue?: Field<string> };
  featureDescription?: { jsonValue?: Field<string> };
  featureImage?: { jsonValue?: ImageField };
}

interface CarModelFeatureSliderDatasource {
  sectionTitle?: { jsonValue?: Field<string> };
  sectionLabel?: { jsonValue?: Field<string> };
  children?: { results: FeatureSlideItem[] };
}

type CarModelFeatureSliderProps = ComponentProps & {
  fields?: {
    data?: {
      datasource?: CarModelFeatureSliderDatasource;
    };
  };
};

const CarModelFeatureSliderDefaultComponent = (): JSX.Element => (
  <div className="component car-model-feature-slider">
    <span className="is-empty-hint">Car Model Feature Slider</span>
  </div>
);

export const Default = ({ fields, params, page }: CarModelFeatureSliderProps): JSX.Element => {
  const { styles, RenderingIdentifier } = params;
  const isEditing = page?.mode?.isEditing;
  const datasource = fields?.data?.datasource;
  const slides = datasource?.children?.results || [];

  const [activeIndex, setActiveIndex] = useState(0);

  const goTo = useCallback(
    (idx: number) => setActiveIndex(((idx % slides.length) + slides.length) % slides.length),
    [slides.length]
  );

  useEffect(() => {
    if (isEditing || slides.length <= 1) return;
    const timer = setTimeout(() => goTo(activeIndex + 1), 5000);
    return () => clearTimeout(timer);
  }, [activeIndex, isEditing, slides.length, goTo]);

  if (!datasource) return <CarModelFeatureSliderDefaultComponent />;

  const active = slides[activeIndex];

  return (
    <div className={cn('component car-model-feature-slider', styles)} id={RenderingIdentifier}>
      <section className="w-full bg-white py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-6 sm:px-8">
          {/* Section label + title */}
          {(datasource.sectionLabel?.jsonValue?.value || isEditing) && (
            <Text
              field={datasource.sectionLabel?.jsonValue}
              tag="p"
              className="mb-2 text-[10px] font-bold uppercase tracking-[0.3em] font-[var(--brand-heading-font,inherit)]"
              style={{ color: 'var(--brand-accent, #c8102e)' }}
            />
          )}
          {(datasource.sectionTitle?.jsonValue?.value || isEditing) && (
            <Text
              field={datasource.sectionTitle?.jsonValue}
              tag="h2"
              className="mb-10 text-3xl font-bold uppercase tracking-tight font-[var(--brand-heading-font,inherit)] md:text-4xl"
              style={{ color: 'var(--brand-fg, #212121)' }}
            />
          )}

          {/* Main feature display */}
          {slides.length > 0 && (
            <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
              {/* Image */}
              <div
                className="relative overflow-hidden"
                style={{ aspectRatio: '4/3' }}
              >
                {active?.featureImage?.jsonValue && (
                  <ContentSdkImage
                    field={active.featureImage.jsonValue}
                    className="h-full w-full object-cover transition-opacity duration-500"
                  />
                )}
              </div>

              {/* Text + tab selectors */}
              <div className="flex flex-col justify-center">
                {/* Tab indicators */}
                {slides.length > 1 && (
                  <div className="mb-6 flex flex-wrap gap-2 rtl:flex-row-reverse">
                    {slides.map((slide, i) => (
                      <button
                        key={slide.id}
                        type="button"
                        onClick={() => goTo(i)}
                        className={cn(
                          'h-0.5 transition-all',
                          i === activeIndex ? 'w-10' : 'w-4 opacity-30'
                        )}
                        style={{
                          backgroundColor:
                            i === activeIndex
                              ? 'var(--brand-accent, #c8102e)'
                              : 'var(--brand-fg, #212121)',
                        }}
                        aria-label={`Feature ${i + 1}`}
                      />
                    ))}
                  </div>
                )}

                {active?.featureTitle?.jsonValue && (
                  <Text
                    field={active.featureTitle.jsonValue}
                    tag="h3"
                    className="mb-4 text-xl font-bold uppercase tracking-wide font-[var(--brand-heading-font,inherit)]"
                    style={{ color: 'var(--brand-fg, #212121)' }}
                  />
                )}
                {active?.featureDescription?.jsonValue && (
                  <ContentSdkRichText
                    field={active.featureDescription.jsonValue}
                    className="text-sm leading-relaxed font-[var(--brand-body-font,inherit)]"
                    style={{ color: 'var(--brand-fg-muted, #555555)' }}
                  />
                )}

                {/* Prev / Next */}
                {slides.length > 1 && !isEditing && (
                  <div className="mt-8 flex gap-2 rtl:flex-row-reverse">
                    <button
                      type="button"
                      onClick={() => goTo(activeIndex - 1)}
                      className="flex h-10 w-10 items-center justify-center border transition hover:bg-gray-50"
                      style={{
                        borderColor: 'var(--brand-border, #e0e0e0)',
                        color: 'var(--brand-fg, #212121)',
                      }}
                      aria-label="Previous feature"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="15 18 9 12 15 6" />
                      </svg>
                    </button>
                    <button
                      type="button"
                      onClick={() => goTo(activeIndex + 1)}
                      className="flex h-10 w-10 items-center justify-center border transition hover:bg-gray-50"
                      style={{
                        borderColor: 'var(--brand-border, #e0e0e0)',
                        color: 'var(--brand-fg, #212121)',
                      }}
                      aria-label="Next feature"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="9 6 15 12 9 18" />
                      </svg>
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Editing mode: list all slides */}
          {isEditing && slides.length > 1 && (
            <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {slides.slice(1).map((slide) => (
                <div
                  key={slide.id}
                  className="flex flex-col gap-2 rounded border p-4"
                  style={{ borderColor: 'var(--brand-border, #e0e0e0)' }}
                >
                  {slide.featureImage?.jsonValue && (
                    <div className="overflow-hidden" style={{ aspectRatio: '4/3' }}>
                      <ContentSdkImage
                        field={slide.featureImage.jsonValue}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  )}
                  {slide.featureTitle?.jsonValue && (
                    <Text
                      field={slide.featureTitle.jsonValue}
                      tag="p"
                      className="text-xs font-bold uppercase"
                    />
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export const JetourUAE = Default;
