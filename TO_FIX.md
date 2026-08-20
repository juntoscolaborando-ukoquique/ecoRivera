# TO_FIX.md — Mejoras Pendientes

Todos los problemas críticos e importantes identificados en la versión inicial fueron resueltos en el commit del 20/08/2026. Ver [CHANGELOG.md](./CHANGELOG.md) para el detalle completo.

---

## Pendientes

### 1. Configurar notificación por Telegram cuando llega un mensaje
El código del lado del sitio ya está listo (`js/telegramNotify.js`, llamado desde `js/main.js` tras un envío exitoso). Falta el único paso que requiere una cuenta tuya: desplegar el proxy que guarda el token de forma segura.

**Por qué un proxy y no el token directo en el JS:** este es un sitio estático — todo en `index.html`/`js/*.js` es público, visible con "ver código fuente" en cuanto se publica. Un token de bot de Telegram es un secreto; puesto en el JS quedaría expuesto a cualquiera. El proxy (`worker/telegram-notify-worker.js`, un Cloudflare Worker) es el backend mínimo que mantiene ese secreto fuera del navegador.

**Pasos (cuando estés listo):**

1. Abrí Telegram, buscá `@BotFather`, enviá `/newbot` y guardá el **token** que te da.
2. Abrí una conversación con tu bot y enviale cualquier mensaje.
3. Visitá `https://api.telegram.org/bot<TU_TOKEN>/getUpdates` y anotá tu **chat_id**.
4. Desplegá `worker/telegram-notify-worker.js` en Cloudflare Workers (gratis en este volumen de uso) — instrucciones completas en el encabezado de ese archivo. Ahí configurás `TELEGRAM_BOT_TOKEN` y `TELEGRAM_CHAT_ID` como *secrets* del Worker, nunca en este repo.
5. Copiá la URL pública que te da el Worker en el meta tag de `index.html`:
   ```html
   <meta name="telegram-notify-endpoint" content="https://tu-worker.tu-subdominio.workers.dev">
   ```
6. Hacé push. Mientras ese meta tag esté vacío, la notificación simplemente no se envía — el formulario funciona igual sin ella.

### 2. Actualizar `og:url` cuando el sitio esté publicado
Una vez habilitado GitHub Pages, actualizar en el `<head>` de `index.html`:
- `og:url` → `https://juntoscolaborando-ukoquique.github.io/ecoRivera/`

### 3. Reemplazar la imagen de fondo cuando haya una propia
La imagen actual es Valle del Lunarejo (Wikimedia Commons, CC BY-SA). Cuando se consiga una foto propia del espacio en Corrales, subirla a `images/` y actualizar la referencia en `style.css` (`.header-bg`).

### 4. Mantener la sección "Nueva Ecoaldea" actualizada
Cuando el proyecto de ecoaldea avance, actualizar el texto de esa sección con novedades concretas.
