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

// Tabpanel ID is shared across all tabs because only one form is rendered.
// Each tab button announces which form section it controls via aria-controls.
const FORPanel = 'qr-form-panel';

export function TypePicker({ active, onChange }: Props) {
  return (
    <div className="type-picker" role="tablist" aria-label="QR code type">
      {TYPES.map((t) => (
        <button
          key={t.id}
          id={`qr-tab-${t.id}`}
          role="tab"
          aria-selected={active === t.id}
          aria-controls={FORPanel}
          tabIndex={active === t.id ? 0 : -1}
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