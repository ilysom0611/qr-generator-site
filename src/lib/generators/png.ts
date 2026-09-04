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
  return canvas;
}

export const PngGenerator: Generator = {
  format: 'png',
  filename: (spec) => filenameFor(spec, 'png'),
  async generate(spec: QRSpec): Promise<Blob> {
    const canvas = await renderToCanvas(spec);
    return new Promise<Blob>((resolve, reject) => {
      canvas.toBlob(
        (blob) => (blob ? resolve(blob) : reject(new Error('PNG generation failed'))),
        'image/png'
      );
    });
  }
};