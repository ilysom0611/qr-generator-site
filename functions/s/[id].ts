/**
 * GET /s/:id  -> 302 redirect to longUrl + increment click counter
 */
export interface Env {
  SHORT_LINKS: KVNamespace;
}

type LinkRecord = {
  longUrl: string;
  createdAt: number;
  clicks: number;
};

export const onRequestGet: PagesFunction<Env> = async (context) => {
  const { env, params, request } = context;
  const idRaw = params.id;
  const id = Array.isArray(idRaw) ? idRaw[0] : (idRaw as string | undefined);

  if (!id || !/^[A-Za-z0-9]{4,12}$/.test(id)) {
    return new Response('Not found', { status: 404, headers: { 'Cache-Control': 'no-store' } });
  }

  if (!env.SHORT_LINKS) {
    return new Response('Server misconfigured', {
      status: 500,
      headers: { 'Cache-Control': 'no-store' },
    });
  }

  const raw = await env.SHORT_LINKS.get(`link:${id}`);
  if (!raw) {
    return new Response('Not found', {
      status: 404,
      headers: { 'Cache-Control': 'no-store' },
    });
  }

  let rec: LinkRecord;
  try {
    rec = JSON.parse(raw) as LinkRecord;
  } catch {
    return new Response('Not found', { status: 404, headers: { 'Cache-Control': 'no-store' } });
  }

  if (!rec.longUrl || !/^https?:\/\//i.test(rec.longUrl)) {
    return new Response('Not found', { status: 404, headers: { 'Cache-Control': 'no-store' } });
  }

  // Best-effort click counter (fire and forget; don't block redirect on KV errors)
  context.waitUntil(
    (async () => {
      try {
        rec.clicks = (rec.clicks || 0) + 1;
        await env.SHORT_LINKS.put(`link:${id}`, JSON.stringify(rec));
      } catch {
        // ignore
      }
    })()
  );

  // Prevent indexing of short links; allow analytics to count hits via normal flow
  return new Response(null, {
    status: 302,
    headers: {
      Location: rec.longUrl,
      'Cache-Control': 'no-store',
      'X-Robots-Tag': 'noindex',
    },
  });
};

// Handle /s/:id for any method — only GET should redirect
export const onRequest: PagesFunction<Env> = async (context) => {
  if (context.request.method === 'GET' || context.request.method === 'HEAD') {
    return onRequestGet(context as never);
  }
  return new Response('Method Not Allowed', {
    status: 405,
    headers: { Allow: 'GET, HEAD', 'Cache-Control': 'no-store' },
  });
};
