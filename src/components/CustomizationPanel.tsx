import type { QRStyle } from '@/lib/generators/types';
import { getDictionary } from '@/i18n/utils';
import type { Locale } from '@/i18n/config';

interface Props {
  style: QRStyle;
  onChange: (style: QRStyle) => void;
  locale: Locale;
}

export function CustomizationPanel({ style, onChange, locale }: Props) {
  const dict = getDictionary(locale);
  const t = (k: string) => dict[k] ?? k;
  return (
    <div className="customization-panel">
      <h3>{t('customization.title')}</h3>
      <div className="row">
        <label htmlFor="fg-color">{t('customization.fg')}</label>
        <input
          id="fg-color"
          type="color"
          value={style.fgColor}
          onChange={(e) => onChange({ ...style, fgColor: e.target.value })}
        />
      </div>
      <div className="row">
        <label htmlFor="bg-color">{t('customization.bg')}</label>
        <input
          id="bg-color"
          type="color"
          value={style.bgColor}
          onChange={(e) => onChange({ ...style, bgColor: e.target.value })}
        />
      </div>
      <div className="row">
        <label htmlFor="ec-level">{t('customization.ec')}</label>
        <select
          id="ec-level"
          value={style.errorCorrection}
          onChange={(e) => onChange({ ...style, errorCorrection: e.target.value as QRStyle['errorCorrection'] })}
        >
          <option value="L">{t('customization.ec.L')}</option>
          <option value="M">{t('customization.ec.M')}</option>
          <option value="Q">{t('customization.ec.Q')}</option>
          <option value="H">{t('customization.ec.H')}</option>
        </select>
      </div>
      <div className="row">
        <label htmlFor="margin">{t('customization.margin')}</label>
        <input
          id="margin"
          type="number"
          min={0}
          max={10}
          value={style.margin}
          onChange={(e) => onChange({ ...style, margin: parseInt(e.target.value) || 0 })}
        />
      </div>
      <div className="row">
        <label htmlFor="logo-upload">{t('customization.logo')}</label>
        <input
          id="logo-upload"
          type="file"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (!file) {
              onChange({ ...style, logo: undefined });
              return;
            }
            const reader = new FileReader();
            reader.onload = () => {
              onChange({
                ...style,
                errorCorrection: 'H',
                logo: {
                  dataUrl: reader.result as string,
                  sizePercent: 20
                }
              });
            };
            reader.readAsDataURL(file);
          }}
        />
      </div>
      {style.logo && (
        <>
          <div className="row">
            <label htmlFor="logo-size">{t('customization.logoSize')}</label>
            <input
              id="logo-size"
              type="number"
              min={10}
              max={30}
              value={style.logo.sizePercent}
              onChange={(e) =>
                onChange({
                  ...style,
                  logo: { ...style.logo!, sizePercent: parseInt(e.target.value) || 20 }
                })
              }
            />
          </div>
          <div className="logo-warning">
            {t('customization.logoWarning')}
          </div>
        </>
      )}
    </div>
  );
}
