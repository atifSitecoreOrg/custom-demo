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

interface LegalComplianceBannerFields {
  Title: Field<string>;
  Description: Field<string>;
  BannerImage: ImageField;
  PrimaryLink: LinkField;
}

type LegalComplianceBannerProps = ComponentProps & {
  fields: LegalComplianceBannerFields;
};

const LegalComplianceBannerDefaultComponent = (): JSX.Element => (
  <div className="component legal-compliance-banner">
    <div className="component-content">
      <span className="is-empty-hint">LegalComplianceBanner</span>
    </div>
  </div>
);

/* ────────────────────────────────────────────
   Default — centered text on muted background
   ──────────────────────────────────────────── */
export const Default = ({ fields, params, page }: LegalComplianceBannerProps): JSX.Element => {
  const { styles, RenderingIdentifier } = params;
  const isEditing = page?.mode?.isEditing;

  if (!fields) return <LegalComplianceBannerDefaultComponent />;

  return (
    <div className={cn('component legal-compliance-banner', styles)} id={RenderingIdentifier}>
      <section
        className="w-full px-4 py-16"
        style={{ backgroundColor: 'var(--brand-muted, #f5f5f5)' }}
      >
        <div className="mx-auto max-w-3xl text-center">
          {(fields.Title?.value || isEditing) && (
            <Text
              field={fields.Title}
              tag="h2"
              className="text-2xl font-bold font-[var(--brand-heading-font,inherit)]"
              style={{ color: 'var(--brand-fg, #111111)' }}
            />
          )}
          {(fields.Description?.value || isEditing) && (
            <ContentSdkRichText
              field={fields.Description}
              className="mt-4 text-base font-[var(--brand-body-font,inherit)]"
              style={{ color: 'var(--brand-muted-foreground, #6b7280)' }}
            />
          )}
          {(fields.PrimaryLink?.value?.href || isEditing) && (
            <div className="mt-6">
              <ContentSdkLink
                field={fields.PrimaryLink}
                className="text-sm font-semibold underline underline-offset-4 transition-opacity hover:opacity-70 font-[var(--brand-body-font,inherit)]"
                style={{ color: 'var(--brand-primary)' }}
              />
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

/* ────────────────────────────────────────────
   JetourUAE — dark compact strip with warranty/compliance info
   ──────────────────────────────────────────── */
export const JetourUAE = ({ fields, params, page }: LegalComplianceBannerProps): JSX.Element => {
  const { styles, RenderingIdentifier } = params;
  const isEditing = page?.mode?.isEditing;

  if (!fields) return <LegalComplianceBannerDefaultComponent />;

  return (
    <div className={cn('component legal-compliance-banner', styles)} id={RenderingIdentifier}>
      <section
        className="w-full px-4 py-10"
        style={{ backgroundColor: 'var(--brand-dark, #1a1a1a)' }}
      >
        <div className="mx-auto max-w-7xl md:px-6">
          <div className="flex flex-col items-center gap-4 text-center md:flex-row md:justify-between md:text-left">
            <div className="flex-1">
              {(fields.Title?.value || isEditing) && (
                <Text
                  field={fields.Title}
                  tag="h3"
                  className="text-lg font-bold uppercase tracking-wide text-white font-[var(--brand-heading-font,inherit)]"
                />
              )}
              {(fields.Description?.value || isEditing) && (
                <ContentSdkRichText
                  field={fields.Description}
                  className="mt-2 text-sm text-white/60 font-[var(--brand-body-font,inherit)]"
                />
              )}
            </div>
            {(fields.BannerImage?.value?.src || isEditing) && (
              <div className="shrink-0">
                <ContentSdkImage
                  field={fields.BannerImage}
                  className="h-16 w-auto object-contain brightness-0 invert opacity-70"
                />
              </div>
            )}
            {(fields.PrimaryLink?.value?.href || isEditing) && (
              <div className="shrink-0">
                <ContentSdkLink
                  field={fields.PrimaryLink}
                  className="inline-flex items-center border border-white/30 px-5 py-2 text-xs font-semibold uppercase tracking-wider text-white transition-colors hover:border-white"
                  style={{ borderRadius: '2px' }}
                />
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

/* ────────────────────────────────────────────
   WithImage — text left, badge/seal image right
   ──────────────────────────────────────────── */
export const WithImage = ({ fields, params, page }: LegalComplianceBannerProps): JSX.Element => {
  const { styles, RenderingIdentifier } = params;
  const isEditing = page?.mode?.isEditing;

  if (!fields) return <LegalComplianceBannerDefaultComponent />;

  return (
    <div className={cn('component legal-compliance-banner', styles)} id={RenderingIdentifier}>
      <section
        className="w-full px-4 py-16"
        style={{ backgroundColor: 'var(--brand-muted, #f5f5f5)' }}
      >
        <div className="mx-auto grid max-w-7xl items-center gap-8 md:grid-cols-2 md:px-6">
          <div>
            {(fields.Title?.value || isEditing) && (
              <Text
                field={fields.Title}
                tag="h2"
                className="text-2xl font-bold font-[var(--brand-heading-font,inherit)]"
                style={{ color: 'var(--brand-fg, #111111)' }}
              />
            )}
            {(fields.Description?.value || isEditing) && (
              <ContentSdkRichText
                field={fields.Description}
                className="mt-4 text-base font-[var(--brand-body-font,inherit)]"
                style={{ color: 'var(--brand-muted-foreground, #6b7280)' }}
              />
            )}
            {(fields.PrimaryLink?.value?.href || isEditing) && (
              <div className="mt-6">
                <ContentSdkLink
                  field={fields.PrimaryLink}
                  className="text-sm font-semibold underline underline-offset-4 transition-opacity hover:opacity-70 font-[var(--brand-body-font,inherit)]"
                  style={{ color: 'var(--brand-primary)' }}
                />
              </div>
            )}
          </div>
          <div className="flex items-center justify-center">
            {(fields.BannerImage?.value?.src || isEditing) && (
              <ContentSdkImage
                field={fields.BannerImage}
                className="max-h-64 w-auto object-contain"
              />
            )}
          </div>
        </div>
      </section>
    </div>
  );
};
