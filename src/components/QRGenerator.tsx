import { useMemo, useState } from 'react';
import type { QRType, QRPayload, QRSpec, QRStyle } from '@/lib/generators/types';
import { validatePayload } from '@/lib/validation';
import { getDictionary } from '@/i18n/utils';
import type { Locale } from '@/i18n/config';
import { TypePicker } from './TypePicker';
import { InputForm } from './InputForm';
import { QRPreview } from './QRPreview';
import { CustomizationPanel } from './CustomizationPanel';
import { DownloadButtons } from './DownloadButtons';

const DEFAULT_STYLE: QRStyle = {
  fgColor: '#000000',
  bgColor: '#ffffff',
  errorCorrection: 'M',
  margin: 4
};

const DEFAULT_PAYLOADS: Record<QRType, QRPayload> = {
  url: { type: 'url', url: '' },
  text: { type: 'text', text: '' },
  wifi: { type: 'wifi', ssid: '', password: '', security: 'WPA', hidden: false },
  vcard: { type: 'vcard', firstName: '', lastName: '', phone: '', email: '' },
  email: { type: 'email', to: '', subject: '', body: '' },
  phone: { type: 'phone', number: '' },
  sms: { type: 'sms', number: '', body: '' },
  location: { type: 'location', lat: 0, lng: 0 }
};

interface Props {
  locale: Locale;
}

function formatError(dict: Record<string, string>, err: { key: string; params?: Record<string, string | number> }): string {
  let raw = dict[err.key] ?? err.key;
  if (err.params) raw = raw.replace(/\{(\w+)\}/g, (_, k) => (err.params![k] !== undefined ? String(err.params![k]) : `{${k}}`));
  return raw;
}

export function QRGenerator({ locale }: Props) {
  const dict = getDictionary(locale);
  const t = (k: string) => dict[k] ?? k;

  const initialType = (() => {
    if (typeof window === 'undefined') return 'url' as QRType;
    const m = /type=([a-z]+)/.exec(window.location.hash);
    if (m && m[1] in DEFAULT_PAYLOADS) return m[1] as QRType;
    return 'url' as QRType;
  })();

  const [type, setType] = useState<QRType>(initialType);
  const [payload, setPayload] = useState<QRPayload>(DEFAULT_PAYLOADS[initialType]);
  const [style, setStyle] = useState<QRStyle>(DEFAULT_STYLE);

  const isUnsupported = useMemo(() => {
    if (typeof window === 'undefined') return false;
    return !('createObjectURL' in URL) || !('Blob' in window);
  }, []);

  const spec: QRSpec = { type, payload, style };

  const validation = validatePayload(payload);
  const fieldErrors: Record<string, string> = {};
  if (!validation.ok) fieldErrors[validation.field] = formatError(dict, validation.error);
  const canDownload = validation.ok;

  return (
    <div className="tool-page">
      <div className="container">
        <h1>{t('tool.h1')}</h1>
        <p style={{ color: '#555' }}>{t('tool.subtitle')}</p>
        {isUnsupported ? (
          <div role="alert" style={{ padding: '1rem', background: '#fee', borderRadius: 4 }}>
            {t('tool.unsupported')}
          </div>
        ) : (
          <div className="tool-grid">
            <div className="tool-section">
              <TypePicker active={type} onChange={(t) => { setType(t); setPayload(DEFAULT_PAYLOADS[t]); }} locale={locale} />
              <InputForm type={type} payload={payload} onChange={setPayload} errors={fieldErrors} locale={locale} />
              <CustomizationPanel style={style} onChange={setStyle} locale={locale} />
            </div>
            <div className="tool-section">
              <QRPreview spec={spec} locale={locale} />
              <DownloadButtons spec={spec} disabled={!canDownload} locale={locale} />
              {!canDownload && (
                <div style={{ fontSize: '0.75rem', color: '#666', marginTop: '0.5rem' }}>
                  {t('tool.fixErrors')}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
