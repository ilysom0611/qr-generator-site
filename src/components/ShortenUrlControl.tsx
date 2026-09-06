export type ShortenState =
  | { longUrl: string; shortUrl?: undefined; status: 'idle' }
  | { longUrl: string; shortUrl: string; status: 'shortened' }
  | { longUrl: string; status: 'shortening' }
  | { longUrl: string; status: 'error'; error: string };

interface Props {
  value: ShortenState;
  onShortenRequest: () => void;
  onCopy: () => void;
  disabled?: boolean;
}

export function ShortenUrlControl({ value, onShortenRequest, onCopy, disabled }: Props) {
  return (
    <div className="shorten-control">
      <button
        type="button"
        onClick={onShortenRequest}
        disabled={disabled || value.status === 'shortening' || !value.longUrl}
      >
        {value.status === 'shortening' ? 'Shortening...' : 'Shorten URL'}
      </button>

      {value.status === 'shortened' && (
        <div className="shorten-result">
          <label>Short URL</label>
          <div className="shorten-result-row">
            <input type="text" readOnly value={value.shortUrl} />
            <button type="button" onClick={onCopy}>
              Copy
            </button>
            <a href={value.shortUrl} target="_blank" rel="noopener noreferrer">
              Open
            </a>
          </div>
        </div>
      )}

      {value.status === 'error' && (
        <div role="alert" className="shorten-error">
          {value.error}
        </div>
      )}

      <p className="shorten-disclaimer">
        Clicking Shorten sends the URL to our shortener service. We store the mapping to honor the
        short link.
      </p>
    </div>
  );
}
