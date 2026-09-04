import { useState } from 'react';
import type { QRSpec, OutputFormat } from '@/lib/generators/types';
import { getGenerator } from '@/lib/generators';

const FORMATS: Array<{ id: OutputFormat; label: string }> = [
  { id: 'png', label: 'Download PNG' },
  { id: 'svg', label: 'Download SVG' },
  { id: 'jpg', label: 'Download JPG' }
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
    <div className="download-buttons">
      {FORMATS.map((f) => (
        <button
          key={f.id}
          onClick={() => handle(f.id)}
          disabled={disabled || busy !== null}
          type="button"
        >
          {busy === f.id ? 'Generating…' : f.label}
        </button>
      ))}
    </div>
  );
}