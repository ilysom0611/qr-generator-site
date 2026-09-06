import type { Locale } from '@/i18n/config';
import { getDictionary } from '@/i18n/utils';

export type ShortenState =
  | { longUrl: string; shortUrl?: undefined; status: 'idle' }
  | { longUrl: string; shortUrl: string; status: 'shortened' }
  | { longUrl: string; status: 'shortening' }
  | { longUrl: string; status: 'error'; error: string };

interface Props {
  value: ShortenState;
  onShortenRequest: () => void;
  onCopy: () => void;
  disabled?: boolean;
  locale: Locale;
}

export function ShortenUrlControl({ value, onShortenRequest, onCopy, disabled, locale }: Props) {
  const dict = getDictionary(locale);
  const t = (k: string) => dict[k] ?? k;
  return (
    <div className="shorten-control">
      <button
        type="button"
        onClick={onShortenRequest}
        disabled={disabled || value.status === 'shortening'}
      >
        {value.status === 'shortening' ? t('shorten.shortening') : t('shorten.button')}
      </button>

      {value.status === 'shortened' && (
        <div className="shorten-result">
          <label>{t('shorten.resultLabel')}</label>
          <div className="shorten-result-row">
            <input type="text" readOnly value={value.shortUrl} />
            <button type="button" onClick={onCopy}>
              {t('shorten.copy')}
            </button>
            <a href={value.shortUrl} target="_blank" rel="noopener noreferrer">
              {t('shorten.open')}
            </a>
          </div>
        </div>
      )}

      {value.status === 'error' && (
        <div role="alert" className="shorten-error">
          {value.error}
        </div>
      )}

      <p className="shorten-disclaimer">
        {t('shorten.disclaimer')}{' '}
        <a href={`/${locale === 'en' ? '' : locale + '/'}privacy#short-url-service`.replace('//', '/')}>
          {t('shorten.privacyLink')}
        </a>
        .
      </p>
    </div>
  );
}
