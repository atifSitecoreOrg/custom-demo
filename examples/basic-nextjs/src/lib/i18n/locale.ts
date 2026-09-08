export const DEFAULT_LOCALE = 'en';
export const LOCALES = ['en', 'ar-AE'] as const;

export type AppLocale = (typeof LOCALES)[number];

export const isRtlLocale = (locale?: string): boolean => locale === 'ar-AE';
