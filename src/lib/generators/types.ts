export type QRType =
  | 'url' | 'wifi' | 'vcard'
  | 'email' | 'phone' | 'sms' | 'location';

export type QRPayload =
  | { type: 'url'; url: string }
  | { type: 'wifi'; ssid: string; password: string; security: 'WPA' | 'WEP' | 'nopass'; hidden: boolean }
  | { type: 'vcard'; firstName: string; lastName: string; phone: string; email: string; org?: string; url?: string }
  | { type: 'email'; to: string; subject?: string; body?: string }
  | { type: 'phone'; number: string }
  | { type: 'sms'; number: string; body: string }
  | { type: 'location'; lat: number; lng: number; label?: string };

export interface QRStyle {
  fgColor: string;
  bgColor: string;
  errorCorrection: 'L' | 'M' | 'Q' | 'H';
  margin: number;
  logo?: { dataUrl: string; sizePercent: number };
}

export interface QRSpec {
  type: QRType;
  payload: QRPayload;
  style: QRStyle;
}

export type OutputFormat = 'png' | 'svg' | 'jpg';

export interface Generator {
  format: OutputFormat;
  filename: (spec: QRSpec) => string;
  generate: (spec: QRSpec) => Promise<Blob>;
}
