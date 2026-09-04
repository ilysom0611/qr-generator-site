import { useEffect, useRef, useState } from 'react';
import type { QRSpec } from '@/lib/generators/types';
import { qrToCanvas } from '@/lib/qr-engine';
import { compositeLogo } from '@/lib/generators/logo';

interface Props {
  spec: QRSpec;
}

export function QRPreview({ spec }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const handle = setTimeout(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      qrToCanvas(canvas, spec.payload, spec.style)
        .then(async () => {
          if (spec.style.logo) {
            await compositeLogo(canvas, spec.style.logo);
          }
          setError(null);
        })
        .catch((e) => setError(e instanceof Error ? e.message : 'Generation failed'));
    }, 300);
    return () => clearTimeout(handle);
  }, [spec]);

  return (
    <div className="preview-canvas-wrapper">
      {error ? (
        <div role="alert" style={{ color: 'var(--color-error)' }}>{error}</div>
      ) : (
        <canvas ref={canvasRef} aria-label="QR code preview" />
      )}
    </div>
  );
}