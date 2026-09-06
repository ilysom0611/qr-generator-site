import { describe, it, expect } from 'vitest';
import { payloadToString } from '@/lib/generators/payload';

describe('payloadToString', () => {
  it('returns URL as-is when scheme present', () => {
    expect(payloadToString({ type: 'url', url: 'https://example.com' }))
      .toBe('https://example.com');
  });

  it('prepends https:// when URL has no scheme', () => {
    expect(payloadToString({ type: 'url', url: 'example.com' }))
      .toBe('https://example.com');
  });

  it('formats WiFi string per spec', () => {
    expect(payloadToString({
      type: 'wifi', ssid: 'MyNet', password: 'secret', security: 'WPA', hidden: false
    })).toBe('WIFI:T:WPA;S:MyNet;P:secret;H:false;;');
  });

  it('formats WiFi with no password (nopass)', () => {
    expect(payloadToString({
      type: 'wifi', ssid: 'OpenWiFi', password: '', security: 'nopass', hidden: false
    })).toBe('WIFI:T:nopass;S:OpenWiFi;P:;H:false;;');
  });

  it('formats vCard 3.0', () => {
    const result = payloadToString({
      type: 'vcard', firstName: 'Jane', lastName: 'Doe',
      phone: '+1234567890', email: 'jane@example.com', org: 'Acme'
    });
    expect(result).toContain('BEGIN:VCARD');
    expect(result).toContain('FN:Jane Doe');
    expect(result).toContain('TEL:+1234567890');
    expect(result).toContain('EMAIL:jane@example.com');
    expect(result).toContain('ORG:Acme');
    expect(result).toContain('END:VCARD');
  });

  it('formats mailto URL', () => {
    expect(payloadToString({
      type: 'email', to: 'foo@bar.com', subject: 'Hi', body: 'Hello'
    })).toBe('mailto:foo@bar.com?subject=Hi&body=Hello');
  });

  it('formats tel URL', () => {
    expect(payloadToString({ type: 'phone', number: '+1234567890' }))
      .toBe('tel:+1234567890');
  });

  it('formats SMSTO URL', () => {
    expect(payloadToString({ type: 'sms', number: '+1234567890', body: 'hi there' }))
      .toBe('SMSTO:+1234567890:hi there');
  });

  it('formats geo URL', () => {
    expect(payloadToString({ type: 'location', lat: 37.7749, lng: -122.4194, label: 'SF' }))
      .toBe('geo:37.7749,-122.4194?q=37.7749,-122.4194(SF)');
  });

  it('omits label in geo URL when not provided', () => {
    expect(payloadToString({ type: 'location', lat: 0, lng: 0 }))
      .toBe('geo:0,0?q=0,0');
  });
});
