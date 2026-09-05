import React, { useId } from 'react';
import type { QRPayload, QRType } from '@/lib/generators/types';
import { getDictionary } from '@/i18n/utils';
import type { Locale } from '@/i18n/config';

type FieldErrors = Partial<Record<string, string>>;

interface Props {
  type: QRType;
  payload: QRPayload;
  onChange: (payload: QRPayload) => void;
  errors: FieldErrors;
  locale: Locale;
}

export function InputForm({ type, payload, onChange, errors, locale }: Props) {
  const dict = getDictionary(locale);
  const t = (k: string) => dict[k] ?? k;
  return (
    <div className="input-form">
      {type === 'url' && <UrlFields payload={payload as Extract<QRPayload, { type: 'url' }>} onChange={onChange} errors={errors} t={t} />}
      {type === 'text' && <TextFields payload={payload as Extract<QRPayload, { type: 'text' }>} onChange={onChange} errors={errors} t={t} />}
      {type === 'wifi' && <WifiFields payload={payload as Extract<QRPayload, { type: 'wifi' }>} onChange={onChange} errors={errors} t={t} />}
      {type === 'vcard' && <VcardFields payload={payload as Extract<QRPayload, { type: 'vcard' }>} onChange={onChange} errors={errors} t={t} />}
      {type === 'email' && <EmailFields payload={payload as Extract<QRPayload, { type: 'email' }>} onChange={onChange} errors={errors} t={t} />}
      {type === 'phone' && <PhoneFields payload={payload as Extract<QRPayload, { type: 'phone' }>} onChange={onChange} errors={errors} t={t} />}
      {type === 'sms' && <SmsFields payload={payload as Extract<QRPayload, { type: 'sms' }>} onChange={onChange} errors={errors} t={t} />}
      {type === 'location' && <LocationFields payload={payload as Extract<QRPayload, { type: 'location' }>} onChange={onChange} errors={errors} t={t} />}
    </div>
  );
}

type T = (k: string) => string;

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  const id = useId();
  return (
    <div className="field">
      <label htmlFor={id}>{label}</label>
      {wrapWithId(children, id)}
      {error && <div className="error" role="alert" id={`${id}-error`}>{error}</div>}
    </div>
  );
}

function wrapWithId(node: React.ReactNode, id: string): React.ReactNode {
  if (!React.isValidElement(node)) return node;
  return React.cloneElement(node as React.ReactElement<{ id?: string }>, { id });
}

function UrlFields({ payload, onChange, errors, t }: { payload: Extract<QRPayload, { type: 'url' }>; onChange: (p: QRPayload) => void; errors: FieldErrors; t: T }) {
  return (
    <Field label={t('inputForm.url.label')} error={errors.url}>
      <input
        type="url"
        placeholder={t('inputForm.url.placeholder')}
        value={payload.url}
        onChange={(e) => onChange({ type: 'url', url: e.target.value })}
      />
    </Field>
  );
}

function TextFields({ payload, onChange, errors, t }: { payload: Extract<QRPayload, { type: 'text' }>; onChange: (p: QRPayload) => void; errors: FieldErrors; t: T }) {
  return (
    <Field label={t('inputForm.text.label')} error={errors.text}>
      <textarea
        rows={4}
        placeholder={t('inputForm.text.placeholder')}
        value={payload.text}
        onChange={(e) => onChange({ type: 'text', text: e.target.value })}
      />
    </Field>
  );
}

function WifiFields({ payload, onChange, errors, t }: { payload: Extract<QRPayload, { type: 'wifi' }>; onChange: (p: QRPayload) => void; errors: FieldErrors; t: T }) {
  return (
    <>
      <Field label={t('inputForm.wifi.ssid')} error={errors.ssid}>
        <input value={payload.ssid} onChange={(e) => onChange({ ...payload, ssid: e.target.value })} />
      </Field>
      <Field label={t('inputForm.wifi.password')} error={errors.password}>
        <input type="password" value={payload.password} onChange={(e) => onChange({ ...payload, password: e.target.value })} disabled={payload.security === 'nopass'} />
      </Field>
      <Field label={t('inputForm.wifi.security')}>
        <select value={payload.security} onChange={(e) => onChange({ ...payload, security: e.target.value as 'WPA' | 'WEP' | 'nopass' })}>
          <option value="WPA">{t('inputForm.wifi.security.wpa')}</option>
          <option value="WEP">{t('inputForm.wifi.security.wep')}</option>
          <option value="nopass">{t('inputForm.wifi.security.nopass')}</option>
        </select>
      </Field>
      <Field label="">
        <label>
          <input type="checkbox" checked={payload.hidden} onChange={(e) => onChange({ ...payload, hidden: e.target.checked })} />
          {' '}{t('inputForm.wifi.hidden')}
        </label>
      </Field>
    </>
  );
}

function VcardFields({ payload, onChange, errors, t }: { payload: Extract<QRPayload, { type: 'vcard' }>; onChange: (p: QRPayload) => void; errors: FieldErrors; t: T }) {
  return (
    <>
      <Field label={t('inputForm.vcard.firstName')} error={errors.firstName}>
        <input value={payload.firstName} onChange={(e) => onChange({ ...payload, firstName: e.target.value })} />
      </Field>
      <Field label={t('inputForm.vcard.lastName')}>
        <input value={payload.lastName} onChange={(e) => onChange({ ...payload, lastName: e.target.value })} />
      </Field>
      <Field label={t('inputForm.vcard.phone')} error={errors.phone}>
        <input value={payload.phone} onChange={(e) => onChange({ ...payload, phone: e.target.value })} placeholder={t('inputForm.phone.placeholder')} />
      </Field>
      <Field label={t('inputForm.vcard.email')} error={errors.email}>
        <input type="email" value={payload.email} onChange={(e) => onChange({ ...payload, email: e.target.value })} />
      </Field>
      <Field label={t('inputForm.vcard.org')}>
        <input value={payload.org ?? ''} onChange={(e) => onChange({ ...payload, org: e.target.value })} />
      </Field>
      <Field label={t('inputForm.vcard.website')}>
        <input type="url" value={payload.url ?? ''} onChange={(e) => onChange({ ...payload, url: e.target.value })} placeholder={t('inputForm.vcard.websitePlaceholder')} />
      </Field>
    </>
  );
}

function EmailFields({ payload, onChange, errors, t }: { payload: Extract<QRPayload, { type: 'email' }>; onChange: (p: QRPayload) => void; errors: FieldErrors; t: T }) {
  return (
    <>
      <Field label={t('inputForm.email.to')} error={errors.to}>
        <input type="email" value={payload.to} onChange={(e) => onChange({ ...payload, to: e.target.value })} placeholder={t('inputForm.email.placeholder')} />
      </Field>
      <Field label={t('inputForm.email.subject')}>
        <input value={payload.subject ?? ''} onChange={(e) => onChange({ ...payload, subject: e.target.value })} />
      </Field>
      <Field label={t('inputForm.email.body')}>
        <textarea rows={3} value={payload.body ?? ''} onChange={(e) => onChange({ ...payload, body: e.target.value })} />
      </Field>
    </>
  );
}

function PhoneFields({ payload, onChange, errors, t }: { payload: Extract<QRPayload, { type: 'phone' }>; onChange: (p: QRPayload) => void; errors: FieldErrors; t: T }) {
  return (
    <Field label={t('inputForm.phone.label')} error={errors.number}>
      <input value={payload.number} onChange={(e) => onChange({ type: 'phone', number: e.target.value })} placeholder={t('inputForm.phone.placeholder')} />
    </Field>
  );
}

function SmsFields({ payload, onChange, errors, t }: { payload: Extract<QRPayload, { type: 'sms' }>; onChange: (p: QRPayload) => void; errors: FieldErrors; t: T }) {
  return (
    <>
      <Field label={t('inputForm.sms.phone')} error={errors.number}>
        <input value={payload.number} onChange={(e) => onChange({ ...payload, number: e.target.value })} placeholder={t('inputForm.sms.placeholder')} />
      </Field>
      <Field label={t('inputForm.sms.message')}>
        <textarea rows={3} value={payload.body} onChange={(e) => onChange({ ...payload, body: e.target.value })} />
      </Field>
    </>
  );
}

function LocationFields({ payload, onChange, errors, t }: { payload: Extract<QRPayload, { type: 'location' }>; onChange: (p: QRPayload) => void; errors: FieldErrors; t: T }) {
  return (
    <>
      <Field label={t('inputForm.location.lat')} error={errors.lat}>
        <input type="number" step="any" value={payload.lat} onChange={(e) => onChange({ ...payload, lat: parseFloat(e.target.value) || 0 })} />
      </Field>
      <Field label={t('inputForm.location.lng')} error={errors.lng}>
        <input type="number" step="any" value={payload.lng} onChange={(e) => onChange({ ...payload, lng: parseFloat(e.target.value) || 0 })} />
      </Field>
      <Field label={t('inputForm.location.label')}>
        <input value={payload.label ?? ''} onChange={(e) => onChange({ ...payload, label: e.target.value })} />
      </Field>
    </>
  );
}
