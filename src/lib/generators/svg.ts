import type { Generator, QRSpec } from './types';
import { qrToSvgString } from '../qr-engine';
import { filenameFor } from '../filename';

export const SvgGenerator: Generator = {
  format: 'svg',
  filename: (spec) => filenameFor(spec, 'svg'),
  async generate(spec: QRSpec): Promise<Blob> {
    const svg = await qrToSvgString(spec.payload, spec.style);
    return new Blob([svg], { type: 'image/svg+xml' });
  }
};