/* ============================================================
   telegram-notify-worker.js — Cloudflare Worker
   ============================================================
   Purpose
   -------
   Receives a POST from the site's js/telegramNotify.js after a
   successful Formcarry submission, and relays a short message
   to Telegram using a bot token that never touches the browser.

   Why this exists (and isn't just code in main.js)
   --------------------------------------------------
   EcoRivera is a static site with no backend or build step —
   everything in index.html/js/*.js is public, readable via
   "view source" the moment it's deployed to GitHub Pages. A
   Telegram bot token is a credential: anyone who found it in
   main.js could send messages as your bot, spam your chat, or
   burn your rate limit. This Worker is the smallest possible
   backend whose only job is to keep that one secret off the
   client.

   Deploy (Cloudflare's free tier covers this easily — a
   handful of requests a month, no credit card required at
   this volume):
     1. dash.cloudflare.com → Workers & Pages → Create → paste
        this file as the Worker's code.
     2. Settings → Variables and Secrets → add as *encrypted*
        secrets (not plain variables):
          TELEGRAM_BOT_TOKEN   — from @BotFather
          TELEGRAM_CHAT_ID     — from
            https://api.telegram.org/bot<TOKEN>/getUpdates
            after you've sent the bot one message
     3. Settings → Variables and Secrets → add as a plain
        variable:
          ALLOWED_ORIGIN — e.g.
            https://juntoscolaborando-ukoquique.github.io
     4. Deploy. Copy the Worker's URL
        (https://<name>.<your-subdomain>.workers.dev) into
        index.html:
          <meta name="telegram-notify-endpoint" content="THAT_URL">

   Security notes
   --------------
   - CORS is locked to ALLOWED_ORIGIN, so no other site can call
     this Worker and spend your Telegram quota.
   - The accepted payload is deliberately narrow — two short
     strings — so this endpoint can never be used to send
     arbitrary Telegram messages through your bot.
   - If the Telegram API call fails, the Worker returns a
     non-2xx status; the site's telegramNotify.js already
     swallows that, by design (see that file's header comment).
   ============================================================ */

const MAX_FIELD_LENGTH = 200;

function corsHeaders(env) {
  return {
    'Access-Control-Allow-Origin': env.ALLOWED_ORIGIN,
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };
}

function truncate(value, fallback) {
  const str = typeof value === 'string' && value.trim() ? value.trim() : fallback;
  return str.slice(0, MAX_FIELD_LENGTH);
}

export default {
  async fetch(request, env) {
    const headers = corsHeaders(env);

    if (request.method === 'OPTIONS') {
      return new Response(null, { headers });
    }

    if (request.method !== 'POST') {
      return new Response('Method not allowed', { status: 405, headers });
    }

    let body;
    try {
      body = await request.json();
    } catch {
      return new Response('Invalid JSON', { status: 400, headers });
    }

    const nombre = truncate(body.nombre, '(sin nombre)');
    const contacto = truncate(body.contacto, '(sin contacto)');

    const text = `📩 Nuevo mensaje en EcoRivera\nDe: ${nombre}\nContacto: ${contacto}`;

    const telegramResponse = await fetch(
      `https://api.telegram.org/bot${env.TELEGRAM_BOT_TOKEN}/sendMessage`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chat_id: env.TELEGRAM_CHAT_ID, text }),
      }
    );

    if (!telegramResponse.ok) {
      return new Response('Failed to notify Telegram', { status: 502, headers });
    }

    return new Response('OK', { status: 200, headers });
  },
};
