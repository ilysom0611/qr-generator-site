import type { QRPayload } from './generators/types';

export type ValidationResult =
  | { ok: true }
  | { ok: false; field: string; error: string };

export function validatePayload(payload: QRPayload): ValidationResult {
  switch (payload.type) {
    case 'url': {
      const url = payload.url.trim();
      if (!url) return { ok: false, field: 'url', error: 'URL is required' };
      if (/\s/.test(url)) return { ok: false, field: 'url', error: 'URL cannot contain spaces' };
      const withScheme = /^https?:\/\//i.test(url) ? url : `https://${url}`;
      try {
        new URL(withScheme);
        return { ok: true };
      } catch {
        return { ok: false, field: 'url', error: 'Invalid URL format' };
      }
    }
    case 'text':
      if (!payload.text.trim()) {
        return { ok: false, field: 'text', error: 'Text is required' };
      }
      return { ok: true };
    case 'wifi': {
      if (!payload.ssid.trim()) {
        return { ok: false, field: 'ssid', error: 'SSID is required' };
      }
      if (payload.security !== 'nopass') {
        if (!payload.password) {
          return { ok: false, field: 'password', error: 'Password is required for secured networks' };
        }
        if (/[\\;,":]/.test(payload.password)) {
          return { ok: false, field: 'password', error: 'Password contains illegal characters' };
        }
      }
      return { ok: true };
    }
    case 'vcard': {
      if (!payload.firstName.trim() && !payload.lastName.trim()) {
        return { ok: false, field: 'firstName', error: 'At least a first or last name is required' };
      }
      if (!payload.phone.trim() && !payload.email.trim()) {
        return { ok: false, field: 'phone', error: 'Provide at least a phone or email' };
      }
      if (payload.email && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(payload.email)) {
        return { ok: false, field: 'email', error: 'Invalid email format' };
      }
      return { ok: true };
    }
    case 'email': {
      if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(payload.to)) {
        return { ok: false, field: 'to', error: 'Invalid email address' };
      }
      return { ok: true };
    }
    case 'phone': {
      if (!/\d/.test(payload.number)) {
        return { ok: false, field: 'number', error: 'Phone number must contain digits' };
      }
      return { ok: true };
    }
    case 'sms': {
      if (!/\d/.test(payload.number)) {
        return { ok: false, field: 'number', error: 'Phone number must contain digits' };
      }
      return { ok: true };
    }
    case 'location': {
      if (payload.lat < -90 || payload.lat > 90) {
        return { ok: false, field: 'lat', error: 'Latitude must be between -90 and 90' };
      }
      if (payload.lng < -180 || payload.lng > 180) {
        return { ok: false, field: 'lng', error: 'Longitude must be between -180 and 180' };
      }
      return { ok: true };
    }
  }
}
