import type { Generator, QRSpec } from './types';
import { qrToCanvas } from '../qr-engine';
import { compositeLogo } from './logo';
import { filenameFor } from '../filename';

async function renderToCanvas(spec: QRSpec): Promise<HTMLCanvasElement> {
  const canvas = document.createElement('canvas');
  await qrToCanvas(canvas, spec.payload, spec.style);
  if (spec.style.logo) {
    await compositeLogo(canvas, spec.style.logo);
  }
  // Fill any transparency with bgColor for JPG (no alpha support)
  const ctx = canvas.getContext('2d');
  if (ctx) {
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const bg = hexToRgb(spec.style.bgColor);
    if (bg) {
      const data = imageData.data;
      for (let i = 0; i < data.length; i += 4) {
        if (data[i + 3] === 0) {
          data[i] = bg.r; data[i + 1] = bg.g; data[i + 2] = bg.b; data[i + 3] = 255;
        }
      }
      ctx.putImageData(imageData, 0, 0);
    }
  }
  return canvas;
}

function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const m = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!m) return null;
  return { r: parseInt(m[1], 16), g: parseInt(m[2], 16), b: parseInt(m[3], 16) };
}

export const JpgGenerator: Generator = {
  format: 'jpg',
  filename: (spec) => filenameFor(spec, 'jpg'),
  async generate(spec: QRSpec): Promise<Blob> {
    const canvas = await renderToCanvas(spec);
    return new Promise<Blob>((resolve, reject) => {
      canvas.toBlob(
        (blob) => (blob ? resolve(blob) : reject(new Error('JPG generation failed'))),
        'image/jpeg',
        0.92
      );
    });
  }
};