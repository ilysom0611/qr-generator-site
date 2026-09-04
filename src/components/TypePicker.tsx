import type { QRType } from '@/lib/generators/types';

const TYPES: Array<{ id: QRType; label: string }> = [
  { id: 'url', label: 'URL' },
  { id: 'text', label: 'Text' },
  { id: 'wifi', label: 'WiFi' },
  { id: 'vcard', label: 'vCard' },
  { id: 'email', label: 'Email' },
  { id: 'phone', label: 'Phone' },
  { id: 'sms', label: 'SMS' },
  { id: 'location', label: 'Location' }
];

interface Props {
  active: QRType;
  onChange: (type: QRType) => void;
}

export function TypePicker({ active, onChange }: Props) {
  return (
    <div className="type-picker" role="tablist" aria-label="QR code type">
      {TYPES.map((t) => (
        <button
          key={t.id}
          role="tab"
          aria-selected={active === t.id}
          className={active === t.id ? 'is-active' : ''}
          onClick={() => onChange(t.id)}
          type="button"
        >
          {t.label}
        </button>
      ))}
    </div>
  );
}