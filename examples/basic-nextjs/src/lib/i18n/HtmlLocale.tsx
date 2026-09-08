'use client';

import { useEffect } from 'react';
import { isRtlLocale } from './locale';

type HtmlLocaleProps = {
  locale: string;
};

export const HtmlLocale = ({ locale }: HtmlLocaleProps) => {
  useEffect(() => {
    const root = document.documentElement;
    const rtl = isRtlLocale(locale);
    root.lang = locale;
    root.dir = rtl ? 'rtl' : 'ltr';
    root.style.fontFamily = rtl ? 'var(--brand-arabic-font)' : '';
  }, [locale]);

  return null;
};
