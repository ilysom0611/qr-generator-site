import type { QRPayload } from './types';

export function payloadToString(payload: QRPayload): string {
  switch (payload.type) {
    case 'url': {
      const url = payload.url.trim();
      if (/^https?:\/\//i.test(url)) return url;
      return `https://${url}`;
    }
    case 'wifi': {
      const T = payload.security;
      const S = escapeWifi(payload.ssid);
      const P = payload.security === 'nopass' ? '' : escapeWifi(payload.password);
      const H = payload.hidden ? 'true' : 'false';
      return `WIFI:T:${T};S:${S};P:${P};H:${H};;`;
    }
    case 'vcard': {
      const lines = [
        'BEGIN:VCARD',
        'VERSION:3.0',
        `FN:${payload.firstName} ${payload.lastName}`.trim(),
        payload.org ? `ORG:${payload.org}` : '',
        payload.phone ? `TEL:${payload.phone}` : '',
        payload.email ? `EMAIL:${payload.email}` : '',
        payload.url ? `URL:${payload.url}` : '',
        'END:VCARD'
      ].filter(Boolean);
      return lines.join('\n');
    }
    case 'email': {
      const params = new URLSearchParams();
      if (payload.subject) params.set('subject', payload.subject);
      if (payload.body) params.set('body', payload.body);
      const qs = params.toString();
      return `mailto:${payload.to}${qs ? `?${qs}` : ''}`;
    }
    case 'phone':
      return `tel:${payload.number}`;
    case 'sms':
      return `SMSTO:${payload.number}:${payload.body}`;
    case 'location': {
      const coord = `${payload.lat},${payload.lng}`;
      const label = payload.label ? `(${payload.label})` : '';
      return `geo:${coord}?q=${coord}${label}`;
    }
  }
}

function escapeWifi(s: string): string {
  return s.replace(/[\\;,":]/g, '\\$&');
}
