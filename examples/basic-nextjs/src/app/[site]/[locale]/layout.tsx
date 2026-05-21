const RTL_LOCALES = ['ar', 'ar-AE', 'ar-SA', 'he', 'fa', 'ur'];

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string; site: string }>;
}) {
  const { locale } = await params;
  const dir = RTL_LOCALES.some((l) => locale.startsWith(l.split('-')[0])) ? 'rtl' : 'ltr';

  return (
    <div dir={dir} lang={locale} className="locale-root">
      {children}
    </div>
  );
}
