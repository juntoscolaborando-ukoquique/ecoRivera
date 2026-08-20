/* ============================================================
   config.js — Runtime configuration
   ============================================================
   Single place that reads deployment-specific values (form
   endpoint, notification endpoint) from <meta> tags in
   index.html. Nothing else in the codebase should touch
   document.querySelector('meta...') directly — if a new
   config value is ever needed, add it here.
   ============================================================ */

function readMeta(name) {
  const meta = document.querySelector(`meta[name="${name}"]`);
  return meta && meta.content ? meta.content.trim() : '';
}

export const config = {
  // Required — the contact form has nothing to submit to without this.
  formEndpoint: readMeta('form-endpoint'),

  // Optional — Telegram push notifications. Empty string means the
  // feature is simply off; see telegramNotify.js.
  telegramNotifyEndpoint: readMeta('telegram-notify-endpoint'),
};
