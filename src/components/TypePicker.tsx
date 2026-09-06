import type { QRType } from '@/lib/generators/types';
import { getDictionary } from '@/i18n/utils';
import type { Locale } from '@/i18n/config';

// Unicode glyph icons for each QR type — universally readable, no asset weight.
const TYPE_ICONS: Record<QRType, string> = {
  url: '🔗',
  wifi: '📶',
  vcard: '👤',
  email: '✉️',
  phone: '📞',
  sms: '💬',
  location: '📍',
};

const TYPE_IDS: QRType[] = ['url', 'wifi', 'vcard', 'email', 'phone', 'sms', 'location'];

interface Props {
  active: QRType;
  onChange: (type: QRType) => void;
  locale: Locale;
}

const FORPanel = 'qr-form-panel';

export function TypePicker({ active, onChange, locale }: Props) {
  const dict = getDictionary(locale);
  const t = (k: string) => dict[k] ?? k;
  return (
    <div className="type-picker" role="tablist" aria-label={t('typePicker.ariaLabel')}>
      {TYPE_IDS.map((id) => (
        <button
          key={id}
          id={`qr-tab-${id}`}
          role="tab"
          aria-selected={active === id}
          aria-controls={FORPanel}
          tabIndex={active === id ? 0 : -1}
          className={active === id ? 'is-active' : ''}
          onClick={() => onChange(id)}
          type="button"
        >
          <span className="type-icon" aria-hidden="true">{TYPE_ICONS[id]}</span>
          <span className="type-label">{t(`typePicker.${id}`)}</span>
        </button>
      ))}
    </div>
  );
}