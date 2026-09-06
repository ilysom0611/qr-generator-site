import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { shortenUrl } from '@/lib/shorten-client';
import { SHORTENER_BASE_URL } from '@/lib/config';

describe('shortenUrl', () => {
  const originalFetch = globalThis.fetch;

  beforeEach(() => {
    globalThis.fetch = vi.fn();
  });

  afterEach(() => {
    globalThis.fetch = originalFetch;
  });

  it('returns id and shortUrl on success', async () => {
    (globalThis.fetch as unknown as ReturnType<typeof vi.fn>).mockResolvedValueOnce(
      new Response(JSON.stringify({ id: 'abc123', shortUrl: 'https://s.x/abc123' }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      })
    );
    const r = await shortenUrl('https://example.com');
    expect(r.ok).toBe(true);
    if (r.ok) {
      expect(r.id).toBe('abc123');
      expect(r.shortUrl).toBe('https://s.x/abc123');
    }
  });

  it('POSTs to SHORTENER_BASE_URL/api/shorten with JSON body', async () => {
    (globalThis.fetch as unknown as ReturnType<typeof vi.fn>).mockResolvedValueOnce(
      new Response('{}', { status: 200 })
    );
    await shortenUrl('https://example.com');
    const calls = (globalThis.fetch as unknown as ReturnType<typeof vi.fn>).mock.calls;
    const url = calls[0][0] as string;
    const init = calls[0][1] as RequestInit & { headers: Record<string, string>; body: string };
    expect(url).toBe(`${SHORTENER_BASE_URL}/api/shorten`);
    expect(init.method).toBe('POST');
    expect(init.headers['Content-Type']).toBe('application/json');
    expect(JSON.parse(init.body as string)).toEqual({ longUrl: 'https://example.com' });
  });

  it('maps 400 to validation error', async () => {
    (globalThis.fetch as unknown as ReturnType<typeof vi.fn>).mockResolvedValueOnce(
      new Response(JSON.stringify({ message: 'Invalid URL' }), { status: 400 })
    );
    const r = await shortenUrl('not-a-url');
    expect(r.ok).toBe(false);
    if (!r.ok) expect(r.error).toBe('validation');
  });

  it('maps 500 to server error', async () => {
    (globalThis.fetch as unknown as ReturnType<typeof vi.fn>).mockResolvedValueOnce(
      new Response('Internal', { status: 500 })
    );
    const r = await shortenUrl('https://example.com');
    expect(r.ok).toBe(false);
    if (!r.ok) expect(r.error).toBe('server');
  });

  it('maps network throw to network error', async () => {
    (globalThis.fetch as unknown as ReturnType<typeof vi.fn>).mockRejectedValueOnce(
      new TypeError('Failed to fetch')
    );
    const r = await shortenUrl('https://example.com');
    expect(r.ok).toBe(false);
    if (!r.ok) expect(r.error).toBe('network');
  });

  it('maps timeout to timeout error', async () => {
    (globalThis.fetch as unknown as ReturnType<typeof vi.fn>).mockImplementationOnce(
      (_url: unknown, init: { signal?: AbortSignal }) =>
        new Promise((_, reject) => {
          (init as { signal: AbortSignal }).signal?.addEventListener('abort', () =>
            reject(new DOMException('AbortError', 'AbortError'))
          );
        })
    );
    const r = await shortenUrl('https://example.com', { timeoutMs: 10 });
    expect(r.ok).toBe(false);
    if (!r.ok) expect(r.error).toBe('timeout');
  });
});
