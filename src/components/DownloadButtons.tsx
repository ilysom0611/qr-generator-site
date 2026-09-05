import { useState } from 'react';
import type { QRSpec, OutputFormat } from '@/lib/generators/types';
import { getGenerator } from '@/lib/generators';

const FORMATS: Array<{ id: OutputFormat; label: string; mime: string }> = [
  { id: 'png', label: 'Download PNG', mime: 'PNG image' },
  { id: 'svg', label: 'Download SVG', mime: 'SVG vector image' },
  { id: 'jpg', label: 'Download JPG', mime: 'JPG image' }
];

interface Props {
  spec: QRSpec;
  disabled?: boolean;
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

export function DownloadButtons({ spec, disabled }: Props) {
  const [busy, setBusy] = useState<OutputFormat | null>(null);

  const handle = async (format: OutputFormat) => {
    setBusy(format);
    try {
      const gen = getGenerator(format);
      const blob = await gen.generate(spec);
      downloadBlob(blob, gen.filename(spec));
    } catch (e) {
      alert(e instanceof Error ? e.message : 'Generation failed');
    } finally {
      setBusy(null);
    }
  };

  return (
    <div className="download-buttons" role="group" aria-label="Download QR code">
      {FORMATS.map((f) => {
        const isBusy = busy === f.id;
        const isDisabled = disabled || busy !== null;
        const label = disabled
          ? `${f.label} (fix form errors to enable)`
          : isBusy
            ? `Generating ${f.mime}…`
            : f.label;
        return (
          <button
            key={f.id}
            onClick={() => handle(f.id)}
            disabled={isDisabled}
            aria-busy={isBusy}
            aria-label={label}
            type="button"
          >
            {isBusy ? 'Generating…' : f.label}
          </button>
        );
      })}
    </div>
  );
}