import type { QRPayload, QRType } from '@/lib/generators/types';

type FieldErrors = Partial<Record<string, string>>;

interface Props {
  type: QRType;
  payload: QRPayload;
  onChange: (payload: QRPayload) => void;
  errors: FieldErrors;
}

export function InputForm({ type, payload, onChange, errors }: Props) {
  return (
    <div className="input-form">
      {type === 'url' && <UrlFields payload={payload as Extract<QRPayload, { type: 'url' }>} onChange={onChange} errors={errors} />}
      {type === 'text' && <TextFields payload={payload as Extract<QRPayload, { type: 'text' }>} onChange={onChange} errors={errors} />}
      {type === 'wifi' && <WifiFields payload={payload as Extract<QRPayload, { type: 'wifi' }>} onChange={onChange} errors={errors} />}
      {type === 'vcard' && <VcardFields payload={payload as Extract<QRPayload, { type: 'vcard' }>} onChange={onChange} errors={errors} />}
      {type === 'email' && <EmailFields payload={payload as Extract<QRPayload, { type: 'email' }>} onChange={onChange} errors={errors} />}
      {type === 'phone' && <PhoneFields payload={payload as Extract<QRPayload, { type: 'phone' }>} onChange={onChange} errors={errors} />}
      {type === 'sms' && <SmsFields payload={payload as Extract<QRPayload, { type: 'sms' }>} onChange={onChange} errors={errors} />}
      {type === 'location' && <LocationFields payload={payload as Extract<QRPayload, { type: 'location' }>} onChange={onChange} errors={errors} />}
    </div>
  );
}

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <div className="field">
      <label>{label}</label>
      {children}
      {error && <div className="error" role="alert">{error}</div>}
    </div>
  );
}

function UrlFields({ payload, onChange, errors }: { payload: Extract<QRPayload, { type: 'url' }>; onChange: (p: QRPayload) => void; errors: FieldErrors }) {
  return (
    <Field label="URL" error={errors.url}>
      <input
        type="url"
        placeholder="https://example.com"
        value={payload.url}
        onChange={(e) => onChange({ type: 'url', url: e.target.value })}
      />
    </Field>
  );
}

function TextFields({ payload, onChange, errors }: { payload: Extract<QRPayload, { type: 'text' }>; onChange: (p: QRPayload) => void; errors: FieldErrors }) {
  return (
    <Field label="Text" error={errors.text}>
      <textarea
        rows={4}
        placeholder="Any text"
        value={payload.text}
        onChange={(e) => onChange({ type: 'text', text: e.target.value })}
      />
    </Field>
  );
}

function WifiFields({ payload, onChange, errors }: { payload: Extract<QRPayload, { type: 'wifi' }>; onChange: (p: QRPayload) => void; errors: FieldErrors }) {
  return (
    <>
      <Field label="SSID (network name)" error={errors.ssid}>
        <input value={payload.ssid} onChange={(e) => onChange({ ...payload, ssid: e.target.value })} />
      </Field>
      <Field label="Password" error={errors.password}>
        <input type="password" value={payload.password} onChange={(e) => onChange({ ...payload, password: e.target.value })} disabled={payload.security === 'nopass'} />
      </Field>
      <Field label="Security">
        <select value={payload.security} onChange={(e) => onChange({ ...payload, security: e.target.value as 'WPA' | 'WEP' | 'nopass' })}>
          <option value="WPA">WPA/WPA2</option>
          <option value="WEP">WEP</option>
          <option value="nopass">No password</option>
        </select>
      </Field>
      <Field label="">
        <label>
          <input type="checkbox" checked={payload.hidden} onChange={(e) => onChange({ ...payload, hidden: e.target.checked })} />
          {' '}Hidden network
        </label>
      </Field>
    </>
  );
}

function VcardFields({ payload, onChange, errors }: { payload: Extract<QRPayload, { type: 'vcard' }>; onChange: (p: QRPayload) => void; errors: FieldErrors }) {
  return (
    <>
      <Field label="First name" error={errors.firstName}>
        <input value={payload.firstName} onChange={(e) => onChange({ ...payload, firstName: e.target.value })} />
      </Field>
      <Field label="Last name">
        <input value={payload.lastName} onChange={(e) => onChange({ ...payload, lastName: e.target.value })} />
      </Field>
      <Field label="Phone" error={errors.phone}>
        <input value={payload.phone} onChange={(e) => onChange({ ...payload, phone: e.target.value })} placeholder="+1234567890" />
      </Field>
      <Field label="Email" error={errors.email}>
        <input type="email" value={payload.email} onChange={(e) => onChange({ ...payload, email: e.target.value })} />
      </Field>
      <Field label="Organization">
        <input value={payload.org ?? ''} onChange={(e) => onChange({ ...payload, org: e.target.value })} />
      </Field>
      <Field label="Website">
        <input type="url" value={payload.url ?? ''} onChange={(e) => onChange({ ...payload, url: e.target.value })} placeholder="https://" />
      </Field>
    </>
  );
}

function EmailFields({ payload, onChange, errors }: { payload: Extract<QRPayload, { type: 'email' }>; onChange: (p: QRPayload) => void; errors: FieldErrors }) {
  return (
    <>
      <Field label="To" error={errors.to}>
        <input type="email" value={payload.to} onChange={(e) => onChange({ ...payload, to: e.target.value })} placeholder="recipient@example.com" />
      </Field>
      <Field label="Subject">
        <input value={payload.subject ?? ''} onChange={(e) => onChange({ ...payload, subject: e.target.value })} />
      </Field>
      <Field label="Body">
        <textarea rows={3} value={payload.body ?? ''} onChange={(e) => onChange({ ...payload, body: e.target.value })} />
      </Field>
    </>
  );
}

function PhoneFields({ payload, onChange, errors }: { payload: Extract<QRPayload, { type: 'phone' }>; onChange: (p: QRPayload) => void; errors: FieldErrors }) {
  return (
    <Field label="Phone number" error={errors.number}>
      <input value={payload.number} onChange={(e) => onChange({ type: 'phone', number: e.target.value })} placeholder="+1234567890" />
    </Field>
  );
}

function SmsFields({ payload, onChange, errors }: { payload: Extract<QRPayload, { type: 'sms' }>; onChange: (p: QRPayload) => void; errors: FieldErrors }) {
  return (
    <>
      <Field label="Phone number" error={errors.number}>
        <input value={payload.number} onChange={(e) => onChange({ ...payload, number: e.target.value })} placeholder="+1234567890" />
      </Field>
      <Field label="Message">
        <textarea rows={3} value={payload.body} onChange={(e) => onChange({ ...payload, body: e.target.value })} />
      </Field>
    </>
  );
}

function LocationFields({ payload, onChange, errors }: { payload: Extract<QRPayload, { type: 'location' }>; onChange: (p: QRPayload) => void; errors: FieldErrors }) {
  return (
    <>
      <Field label="Latitude" error={errors.lat}>
        <input type="number" step="any" value={payload.lat} onChange={(e) => onChange({ ...payload, lat: parseFloat(e.target.value) || 0 })} />
      </Field>
      <Field label="Longitude" error={errors.lng}>
        <input type="number" step="any" value={payload.lng} onChange={(e) => onChange({ ...payload, lng: parseFloat(e.target.value) || 0 })} />
      </Field>
      <Field label="Label (optional)">
        <input value={payload.label ?? ''} onChange={(e) => onChange({ ...payload, label: e.target.value })} />
      </Field>
    </>
  );
}
