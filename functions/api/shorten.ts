/**
 * POST /api/shorten  { longUrl: string } -> { id, shortUrl }
 * Pure free: Cloudflare Pages Functions + KV (binding: SHORT_LINKS)
 * Short id: 4-5 chars base57 (A-Z a-z 2-9 without 0/O/1/l/I) for memorability + shortness.
 */
export interface Env {
  SHORT_LINKS: KVNamespace;
}

// 57 chars: A-Z minus O,I + a-z minus l + 2-9  (max readability)
const ALPHABET = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789';
const ALPHABET_LEN = ALPHABET.length;

function randomId(len: number): string {
  const buf = new Uint8Array(len);
  crypto.getRandomValues(buf);
  let out = '';
  for (let i = 0; i < len; i++) out += ALPHABET[buf[i] % ALPHABET_LEN];
  return out;
}

function json(data: unknown, status = 200, extraHeaders: Record<string, string> = {}) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'no-store',
      ...extraHeaders,
    },
  });
}

function isAllowedUrl(raw: string): { ok: true; url: URL } | { ok: false; message: string } {
  const s = raw.trim();
  if (!s) return { ok: false, message: 'URL is required' };
  if (s.length > 2048) return { ok: false, message: 'URL is too long (max 2048)' };
  if (/\s/.test(s)) return { ok: false, message: 'URL cannot contain spaces' };
  // Require explicit http/https — prevents javascript:, data:, etc.
  if (!/^https?:\/\//i.test(s)) return { ok: false, message: 'Only http and https are allowed' };
  try {
    const u = new URL(s);
    if (u.protocol !== 'http:' && u.protocol !== 'https:') {
      return { ok: false, message: 'Only http and https are allowed' };
    }
    return { ok: true, url: u };
  } catch {
    return { ok: false, message: 'Invalid URL format' };
  }
}

async function checkRateLimit(env: Env, ip: string): Promise<boolean> {
  // Free-tier simple fixed-window limiter via KV (no Durable Objects).
  // 20 req / 60s per IP. KV is eventually consistent but good enough as a best-effort gate.
  try {
    const key = `rl:${ip}`;
    const raw = await env.SHORT_LINKS.get(key);
    if (!raw) {
      await env.SHORT_LINKS.put(key, '1', { expirationTtl: 60 });
      return true;
    }
    const n = parseInt(raw, 10) || 0;
    if (n >= 20) return false;
    await env.SHORT_LINKS.put(key, String(n + 1), { expirationTtl: 60 });
    return true;
  } catch {
    // Fail open if KV hiccups — don't block users on limiter errors
    return true;
  }
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
  const { request, env } = context;

  if (!env.SHORT_LINKS) {
    return json({ message: 'Server misconfigured: KV binding SHORT_LINKS not found.' }, 500);
  }

  // Basic CORS for same-origin + potential previews
  const origin = request.headers.get('Origin') || '';
  const corsHeaders: Record<string, string> = {};
  // Echo origin if it's the same site or a pages.dev preview — otherwise omit CORS header
  if (origin) {
    try {
      const o = new URL(origin);
      if (o.hostname.endsWith('pages.dev') || o.hostname === new URL(request.url).hostname) {
        corsHeaders['Access-Control-Allow-Origin'] = origin;
        corsHeaders['Vary'] = 'Origin';
      }
    } catch {
      // ignore
    }
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return json({ message: 'Invalid JSON body' }, 400, corsHeaders);
  }

  const longUrl = (body as { longUrl?: unknown })?.longUrl;
  if (typeof longUrl !== 'string') {
    return json({ message: 'Missing field: longUrl' }, 400, corsHeaders);
  }

  const validated = isAllowedUrl(longUrl);
  if (!validated.ok) return json({ message: validated.message }, 400, corsHeaders);

  const normalizedUrl = validated.url.href; // normalized (adds trailing slash where needed etc.)

  // Rate limit by IP (best effort)
  const ip = request.headers.get('CF-Connecting-IP') || request.headers.get('X-Forwarded-For') || 'unknown';
  const allowed = await checkRateLimit(env, ip);
  if (!allowed) return json({ message: 'Too many requests. Try again in a minute.' }, 429, corsHeaders);

  // Generate short id: start 4 chars (~10M combos with 57 alphabet), bump to 5/6 on collision.
  // Keeps URLs short while keeping collision rate negligible.
  let id = '';
  let attempts = 0;
  const maxAttempts = 12;
  let tryLen = 4;
  while (attempts < maxAttempts) {
    if (attempts === 4) tryLen = 5;
    if (attempts === 9) tryLen = 6;
    const candidate = randomId(tryLen);
    const exists = await env.SHORT_LINKS.get(`link:${candidate}`);
    if (!exists) {
      id = candidate;
      break;
    }
    attempts++;
  }
  if (!id) return json({ message: 'Shortener is busy. Try again.' }, 503, corsHeaders);

  const record = {
    longUrl: normalizedUrl,
    createdAt: Date.now(),
    clicks: 0,
  };

  await env.SHORT_LINKS.put(`link:${id}`, JSON.stringify(record));

  const url = new URL(request.url);
  const shortUrl = `${url.protocol}//${url.host}/s/${id}`;

  return json({ id, shortUrl }, 200, corsHeaders);
};

export const onRequestOptions: PagesFunction = async () => {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Max-Age': '86400',
    },
  });
};

// Fallback for other methods
export const onRequest: PagesFunction<Env> = async (context) => {
  if (context.request.method === 'POST') return onRequestPost(context as never);
  if (context.request.method === 'OPTIONS') return onRequestOptions(context as never);
  return json({ message: 'Method Not Allowed' }, 405, { Allow: 'POST, OPTIONS' });
};
