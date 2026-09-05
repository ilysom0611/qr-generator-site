export const defaultLocale = 'en' as const;
export const locales = ['en', 'cn', 'th'] as const;
export type Locale = (typeof locales)[number];

export const localeLabels: Record<Locale, string> = {
  en: 'English',
  cn: '简体中文',
  th: 'ไทย',
};

export const localeHtmlLang: Record<Locale, string> = {
  en: 'en',
  cn: 'zh-CN',
  th: 'th',
};

export const localeOgLocale: Record<Locale, string> = {
  en: 'en_US',
  cn: 'zh_CN',
  th: 'th_TH',
};

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}
