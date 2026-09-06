import { SHORTENER_BASE_URL } from './config';

export type ShortenResult =
  | { ok: true; id: string; shortUrl: string }
  | { ok: false; error: 'network' | 'timeout' | 'validation' | 'server'; message: string };

export interface ShortenOptions {
  timeoutMs?: number;
}

export async function shortenUrl(
  longUrl: string,
  options: ShortenOptions = {}
): Promise<ShortenResult> {
  const timeoutMs = options.timeoutMs ?? 5000;
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await fetch(`${SHORTENER_BASE_URL}/api/shorten`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ longUrl }),
      signal: controller.signal
    });
    clearTimeout(timer);
    if (res.status === 200) {
      const data = (await res.json()) as { id: string; shortUrl: string };
      return { ok: true, id: data.id, shortUrl: data.shortUrl };
    }
    let message = `HTTP ${res.status}`;
    try {
      const body = (await res.json()) as { message?: string };
      if (body?.message) message = body.message;
    } catch {
      // ignore parse errors
    }
    if (res.status >= 400 && res.status < 500) {
      return { ok: false, error: 'validation', message };
    }
    return { ok: false, error: 'server', message };
  } catch (e) {
    clearTimeout(timer);
    if (e instanceof DOMException && e.name === 'AbortError') {
      return { ok: false, error: 'timeout', message: 'Shortener took too long' };
    }
    return { ok: false, error: 'network', message: 'No connection to shortener' };
  }
}
