import { HtmlLocale } from 'src/lib/i18n/HtmlLocale';
import { isRtlLocale } from 'src/lib/i18n/locale';

type LocaleLayoutProps = {
  children: React.ReactNode;
  params: Promise<{ site: string; locale: string }>;
};

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale } = await params;
  const dir = isRtlLocale(locale) ? 'rtl' : 'ltr';
  const fontFamily = isRtlLocale(locale) ? 'var(--brand-arabic-font)' : '';

  return (
    <>
      <script
        dangerouslySetInnerHTML={{
          __html: `(()=>{var e=document.documentElement;e.lang=${JSON.stringify(locale)};e.dir=${JSON.stringify(dir)};e.style.fontFamily=${JSON.stringify(fontFamily)};})();`,
        }}
      />
      <HtmlLocale locale={locale} />
      {children}
    </>
  );
}
