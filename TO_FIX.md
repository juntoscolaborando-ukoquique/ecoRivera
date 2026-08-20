# TO_FIX.md — Mejoras Pendientes

Todos los problemas críticos e importantes identificados en la versión inicial fueron resueltos en el commit del 20/08/2026. Ver [CHANGELOG.md](./CHANGELOG.md) para el detalle completo.

---

## Pendientes

### 1. Configurar notificación por Telegram cuando llega un mensaje
El formulario ya envía datos a Formcarry, pero no hay notificación push todavía.

**Pasos (cuando estés listo):**

1. Abrí Telegram y buscá `@BotFather`.
2. Enviá `/newbot`, seguí las instrucciones y guardá el **token** que te da (formato `123456789:AAF...`).
3. Abrí una conversación con tu bot y enviá cualquier mensaje.
4. Visitá `https://api.telegram.org/bot<TU_TOKEN>/getUpdates` en el navegador y anotá tu **chat_id** (número en el campo `"id"`).
5. En `main.js`, agregá antes del bloque del formulario:
```js
const TELEGRAM_TOKEN   = 'TU_TOKEN_AQUI';
const TELEGRAM_CHAT_ID = 'TU_CHAT_ID_AQUI';

async function notifyTelegram(nombre, contacto) {
  if (TELEGRAM_TOKEN === 'TU_TOKEN_AQUI') return;
  const text = encodeURIComponent(
    '📩 Nuevo mensaje en EcoRivera\nDe: ' + nombre + '\nContacto: ' + contacto
  );
  await fetch(
    'https://api.telegram.org/bot' + TELEGRAM_TOKEN +
    '/sendMessage?chat_id=' + TELEGRAM_CHAT_ID + '&text=' + text,
    { mode: 'no-cors' }
  ).catch(() => {});
}
```
6. En el bloque `if (json.code === 200 ...)` del submit handler, agregá:
```js
const nombre   = data.get('nombre')   || '(sin nombre)';
const contacto = data.get('whatsapp') || data.get('email') || '(sin contacto)';
notifyTelegram(nombre, contacto);
```
7. Hacé push.

### 2. Actualizar `og:url` cuando el sitio esté publicado
Una vez habilitado GitHub Pages, actualizar en el `<head>` de `index.html`:
- `og:url` → `https://juntoscolaborando-ukoquique.github.io/ecoRivera/`

### 3. Reemplazar la imagen de fondo cuando haya una propia
La imagen actual es Valle del Lunarejo (Wikimedia Commons, CC BY-SA). Cuando se consiga una foto propia del espacio en Corrales, subirla a `images/` y actualizar la referencia en `style.css` (`.header-bg`).

### 4. Mantener la sección "Nueva Ecoaldea" actualizada
Cuando el proyecto de ecoaldea avance, actualizar el texto de esa sección con novedades concretas.
