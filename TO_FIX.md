# TO_FIX.md — Mejoras Pendientes

Todos los problemas críticos e importantes identificados en la versión inicial fueron resueltos en el commit del 20/08/2026. Ver [CHANGELOG.md](./CHANGELOG.md) para el detalle completo.

---

## Pendientes

### 1. Conectar endpoint real de Formspree
El formulario ya usa `fetch` hacia Formspree, pero el endpoint en `main.js` todavía tiene el valor de ejemplo `XXXXXXXX`. Hasta que se reemplace, los mensajes no llegan.

**Acción:** Crear cuenta en [formspree.io](https://formspree.io), generar un formulario y pegar el endpoint real en `main.js`:
```js
const FORMSPREE_ENDPOINT = 'https://formspree.io/f/TU_ID_REAL';
```

### 2. Configurar notificación por Telegram cuando llega un mensaje
CallMeBot ya no funciona sin WhatsApp Business. La alternativa es un bot de Telegram, gratuito y sin requisitos especiales.

**Pasos (cuando estés listo):**

1. Abrí Telegram y buscá `@BotFather`.
2. Enviá `/newbot`, seguí las instrucciones y guardá el **token** que te da (formato `123456789:AAF...`).
3. Abrí una conversación con tu bot y enviá cualquier mensaje.
4. Visitá `https://api.telegram.org/bot<TU_TOKEN>/getUpdates` en el navegador y anotá tu **chat_id** (número en el campo `"id"`).
5. En `main.js`, reemplazá la función `notifyWhatsApp` por esta:
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
6. En el bloque de envío exitoso del formulario, cambiá `notifyWhatsApp(...)` por `notifyTelegram(...)`.
7. Hacé push.

### 3. Agregar perfil de Instagram real
El link de Instagram en el footer apunta al placeholder `https://instagram.com/tu-perfil`.

**Acción:** Reemplazar con la URL real del perfil, o eliminar el enlace si no hay perfil activo.

### 4. Actualizar `og:url` cuando el sitio esté publicado
Una vez habilitado GitHub Pages, actualizar en el `<head>` de `index.html`:
- `og:url` → `https://juntoscolaborando-ukoquique.github.io/ecoRivera/`

### 5. Reemplazar la imagen de fondo cuando haya una propia
La imagen actual es Valle del Lunarejo (Wikimedia Commons, CC BY-SA). Cuando se consiga una foto propia del espacio en Corrales, subirla al repo y actualizar la referencia en `style.css`.

### 6. Mantener la sección "Nueva Ecoaldea" actualizada
Cuando el proyecto de ecoaldea avance, actualizar el texto de esa sección con novedades concretas.
