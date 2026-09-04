import { describe, it, expect } from 'vitest';
import { validatePayload } from '@/lib/validation';

describe('validatePayload', () => {
  it('accepts valid URL', () => {
    expect(validatePayload({ type: 'url', url: 'https://example.com' })).toEqual({ ok: true });
  });

  it('rejects empty URL', () => {
    const r = validatePayload({ type: 'url', url: '' });
    expect(r.ok).toBe(false);
    if (!r.ok) expect(r.field).toBe('url');
  });

  it('rejects URL with spaces', () => {
    const r = validatePayload({ type: 'url', url: 'has spaces.com' });
    expect(r.ok).toBe(false);
  });

  it('accepts non-empty text', () => {
    expect(validatePayload({ type: 'text', text: 'anything' })).toEqual({ ok: true });
  });

  it('rejects empty text', () => {
    expect(validatePayload({ type: 'text', text: '' }).ok).toBe(false);
  });

  it('accepts valid WiFi', () => {
    expect(validatePayload({
      type: 'wifi', ssid: 'MyNet', password: 'secret', security: 'WPA', hidden: false
    })).toEqual({ ok: true });
  });

  it('rejects empty WiFi SSID', () => {
    expect(validatePayload({
      type: 'wifi', ssid: '', password: 'x', security: 'WPA', hidden: false
    }).ok).toBe(false);
  });

  it('rejects WiFi password with illegal chars', () => {
    const r = validatePayload({
      type: 'wifi', ssid: 'Net', password: 'has;semicolon', security: 'WPA', hidden: false
    });
    expect(r.ok).toBe(false);
  });

  it('accepts vCard with required fields', () => {
    expect(validatePayload({
      type: 'vcard', firstName: 'Jane', lastName: 'Doe',
      phone: '+1234567890', email: 'jane@example.com'
    })).toEqual({ ok: true });
  });

  it('rejects vCard with no phone and no email', () => {
    const r = validatePayload({
      type: 'vcard', firstName: 'Jane', lastName: 'Doe',
      phone: '', email: ''
    });
    expect(r.ok).toBe(false);
  });

  it('rejects email without @', () => {
    expect(validatePayload({ type: 'email', to: 'not-an-email' }).ok).toBe(false);
  });

  it('rejects phone without digits', () => {
    expect(validatePayload({ type: 'phone', number: 'no-digits' }).ok).toBe(false);
  });

  it('accepts location with valid lat/lng', () => {
    expect(validatePayload({ type: 'location', lat: 37.7749, lng: -122.4194 })).toEqual({ ok: true });
  });

  it('rejects location with out-of-range lat', () => {
    expect(validatePayload({ type: 'location', lat: 100, lng: 0 }).ok).toBe(false);
  });
});
