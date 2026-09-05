import { useState } from 'react';
import type { QRSpec, OutputFormat } from '@/lib/generators/types';
import { getGenerator } from '@/lib/generators';
import { getDictionary } from '@/i18n/utils';
import type { Locale } from '@/i18n/config';

const FORMATS: Array<{ id: OutputFormat; labelKey: string; mime: string }> = [
  { id: 'png', labelKey: 'download.png', mime: 'PNG image' },
  { id: 'svg', labelKey: 'download.svg', mime: 'SVG vector image' },
  { id: 'jpg', labelKey: 'download.jpg', mime: 'JPG image' }
];

interface Props {
  spec: QRSpec;
  disabled?: boolean;
  locale: Locale;
}

function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 0);
}

function substitute(raw: string, params: Record<string, string | number>): string {
  return raw.replace(/\{(\w+)\}/g, (_, k) => (params[k] !== undefined ? String(params[k]) : `{${k}}`));
}

export function DownloadButtons({ spec, disabled, locale }: Props) {
  const dict = getDictionary(locale);
  const t = (k: string, params?: Record<string, string | number>) => {
    const raw = dict[k] ?? k;
    return params ? substitute(raw, params) : raw;
  };
  const [busy, setBusy] = useState<OutputFormat | null>(null);

  const handle = async (format: OutputFormat) => {
    setBusy(format);
    try {
      const gen = getGenerator(format);
      const blob = await gen.generate(spec);
      downloadBlob(blob, gen.filename(spec));
    } catch (e) {
      alert(e instanceof Error ? e.message : t('download.failed'));
    } finally {
      setBusy(null);
    }
  };

  return (
    <div className="download-buttons" role="group" aria-label={t('download.ariaLabel')}>
      {FORMATS.map((f) => {
        const isBusy = busy === f.id;
        const isDisabled = disabled || busy !== null;
        const label = disabled
          ? t('download.disabled', { label: t(f.labelKey) })
          : isBusy
            ? t('download.busy', { mime: f.mime })
            : t(f.labelKey);
        return (
          <button
            key={f.id}
            onClick={() => handle(f.id)}
            disabled={isDisabled}
            aria-busy={isBusy}
            aria-label={label}
            type="button"
          >
            {isBusy ? t('download.generating') : t(f.labelKey)}
          </button>
        );
      })}
    </div>
  );
}
