/* ============================================================
   telegramNotify.js — Push notification on new message
   ============================================================
   This deliberately does NOT call Telegram's Bot API directly.
   A bot token is a secret; this file ships to every visitor's
   browser and is readable via "view source" on GitHub Pages,
   so a secret placed here is a public secret. Instead, this
   posts a small, non-sensitive payload to a serverless proxy
   (see /worker/telegram-notify-worker.js) that holds the real
   token server-side.

   If telegramNotifyEndpoint isn't configured, this is a no-op —
   Telegram notifications are an enhancement layered on top of
   the Formcarry submission, never a dependency of it. A failure
   here must never affect the visitor-facing success message.
   ============================================================ */

/**
 * @param {string} endpoint - the proxy's URL, or '' to disable
 * @param {{nombre: string, contacto: string}} payload
 */
export async function notifyTelegram(endpoint, payload) {
  if (!endpoint) return;

  try {
    await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
  } catch (err) {
    // Swallowed on purpose: the Formcarry submission already
    // succeeded by the time this runs. A missed push notification
    // is not something the visitor should ever see an error for.
  }
}
