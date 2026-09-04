import { describe, it, expect } from 'vitest';
import { filenameFor } from '@/lib/filename';
import type { QRSpec } from '@/lib/generators/types';

describe('filenameFor', () => {
  it('returns qr-<type>-<shortId>.png for URL type', () => {
    const spec: QRSpec = {
      type: 'url',
      payload: { type: 'url', url: 'https://example.com' },
      style: { fgColor: '#000', bgColor: '#fff', errorCorrection: 'M', margin: 4 }
    };
    const filename = filenameFor(spec, 'png');
    expect(filename).toMatch(/^qr-url-[a-z0-9]{6}\.png$/);
  });

  it('returns qr-<type>-<shortId>.svg for WiFi type', () => {
    const spec: QRSpec = {
      type: 'wifi',
      payload: { type: 'wifi', ssid: 'MyNet', password: 'secret', security: 'WPA', hidden: false },
      style: { fgColor: '#000', bgColor: '#fff', errorCorrection: 'M', margin: 4 }
    };
    const filename = filenameFor(spec, 'svg');
    expect(filename).toMatch(/^qr-wifi-[a-z0-9]{6}\.svg$/);
  });
});
