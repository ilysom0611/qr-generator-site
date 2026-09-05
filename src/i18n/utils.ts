import en from './messages/en.json';
import cn from './messages/cn.json';
import th from './messages/th.json';
import { defaultLocale, locales, isLocale, type Locale } from './config';

const dictionaries = { en, cn, th } as const;

export function getLocaleFromUrl(url: URL, currentLocale?: string): Locale {
  // Prefer Astro.currentLocale (correct under i18n rewrites), then URL prefix, then default.
  if (currentLocale && isLocale(currentLocale)) return currentLocale;
  const seg = url.pathname.split('/').filter(Boolean)[0];
  return isLocale(seg) ? seg : defaultLocale;
}

export function getDictionary(locale: Locale): Record<string, string> {
  return (dictionaries[locale] ?? dictionaries[defaultLocale]) as Record<string, string>;
}

export function useTranslations(locale: Locale) {
  const dict = getDictionary(locale);
  const fallback = dictionaries[defaultLocale] as Record<string, string>;
  return function t(key: string, vars?: Record<string, string | number>): string {
    let raw = dict[key] ?? fallback[key] ?? key;
    if (vars) {
      raw = raw.replace(/\{(\w+)\}/g, (_, k) => (vars[k] !== undefined ? String(vars[k]) : `{${k}}`));
    }
    return raw;
  };
}

export function getLocalizedPath(pathname: string, target: Locale): string {
  const segments = pathname.split('/').filter(Boolean);
  const head = segments[0];
  const hasPrefix = isLocale(head);
  const rest = hasPrefix ? segments.slice(1) : segments;

  if (target === defaultLocale) {
    return '/' + rest.join('/');
  }
  return '/' + target + (rest.length ? '/' + rest.join('/') : '');
}

export { locales, defaultLocale, type Locale };
