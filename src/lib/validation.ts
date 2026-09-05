import type { QRPayload } from './generators/types';

export type ValidationError = { key: string; params?: Record<string, string | number> };

export type ValidationResult =
  | { ok: true }
  | { ok: false; field: string; error: ValidationError };

export function validatePayload(payload: QRPayload): ValidationResult {
  switch (payload.type) {
    case 'url': {
      const url = payload.url.trim();
      if (!url) return { ok: false, field: 'url', error: { key: 'validation.url.required' } };
      if (/\s/.test(url)) return { ok: false, field: 'url', error: { key: 'validation.url.noSpaces' } };
      const withScheme = /^https?:\/\//i.test(url) ? url : `https://${url}`;
      try {
        new URL(withScheme);
        return { ok: true };
      } catch {
        return { ok: false, field: 'url', error: { key: 'validation.url.invalid' } };
      }
    }
    case 'text':
      if (!payload.text.trim()) {
        return { ok: false, field: 'text', error: { key: 'validation.text.required' } };
      }
      return { ok: true };
    case 'wifi': {
      if (!payload.ssid.trim()) {
        return { ok: false, field: 'ssid', error: { key: 'validation.wifi.ssidRequired' } };
      }
      if (payload.security !== 'nopass') {
        if (!payload.password) {
          return { ok: false, field: 'password', error: { key: 'validation.wifi.passwordRequired' } };
        }
        if (/[\\;,":]/.test(payload.password)) {
          return { ok: false, field: 'password', error: { key: 'validation.wifi.illegalChars' } };
        }
      }
      return { ok: true };
    }
    case 'vcard': {
      if (!payload.firstName.trim() && !payload.lastName.trim()) {
        return { ok: false, field: 'firstName', error: { key: 'validation.vcard.nameRequired' } };
      }
      if (!payload.phone.trim() && !payload.email.trim()) {
        return { ok: false, field: 'phone', error: { key: 'validation.vcard.contactRequired' } };
      }
      if (payload.email && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(payload.email)) {
        return { ok: false, field: 'email', error: { key: 'validation.vcard.invalidEmail' } };
      }
      return { ok: true };
    }
    case 'email': {
      if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(payload.to)) {
        return { ok: false, field: 'to', error: { key: 'validation.email.invalid' } };
      }
      return { ok: true };
    }
    case 'phone': {
      if (!/\d/.test(payload.number)) {
        return { ok: false, field: 'number', error: { key: 'validation.phone.invalid' } };
      }
      return { ok: true };
    }
    case 'sms': {
      if (!/\d/.test(payload.number)) {
        return { ok: false, field: 'number', error: { key: 'validation.sms.invalid' } };
      }
      return { ok: true };
    }
    case 'location': {
      if (payload.lat < -90 || payload.lat > 90) {
        return { ok: false, field: 'lat', error: { key: 'validation.location.latRange' } };
      }
      if (payload.lng < -180 || payload.lng > 180) {
        return { ok: false, field: 'lng', error: { key: 'validation.location.lngRange' } };
      }
      return { ok: true };
    }
  }
}
