import type { QRStyle } from '@/lib/generators/types';

interface Props {
  style: QRStyle;
  onChange: (style: QRStyle) => void;
}

export function CustomizationPanel({ style, onChange }: Props) {
  return (
    <div className="customization-panel">
      <h3>Customize</h3>
      <div className="row">
        <label htmlFor="fg-color">Foreground</label>
        <input
          id="fg-color"
          type="color"
          value={style.fgColor}
          onChange={(e) => onChange({ ...style, fgColor: e.target.value })}
        />
      </div>
      <div className="row">
        <label htmlFor="bg-color">Background</label>
        <input
          id="bg-color"
          type="color"
          value={style.bgColor}
          onChange={(e) => onChange({ ...style, bgColor: e.target.value })}
        />
      </div>
      <div className="row">
        <label htmlFor="ec-level">Error correction</label>
        <select
          id="ec-level"
          value={style.errorCorrection}
          onChange={(e) => onChange({ ...style, errorCorrection: e.target.value as QRStyle['errorCorrection'] })}
        >
          <option value="L">L — Low (7%)</option>
          <option value="M">M — Medium (15%)</option>
          <option value="Q">Q — Quartile (25%)</option>
          <option value="H">H — High (30%)</option>
        </select>
      </div>
      <div className="row">
        <label htmlFor="margin">Margin (modules)</label>
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
        <label htmlFor="logo-upload">Logo</label>
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
                errorCorrection: 'H', // force H when logo present
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
            <label htmlFor="logo-size">Logo size (%)</label>
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
          <div style={{ fontSize: '0.75rem', color: '#666', marginTop: '0.5rem' }}>
            ⚠ Logo added — error correction auto-set to H for scannability.
          </div>
        </>
      )}
    </div>
  );
}