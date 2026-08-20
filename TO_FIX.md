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

### 2. Activar CallMeBot para notificaciones WhatsApp
El código de `main.js` ya envía una notificación a WhatsApp cuando alguien completa el formulario, pero necesita una API key de CallMeBot (gratuito).

**Acción (una sola vez desde tu WhatsApp):**
1. Agregá el número **+34 644 59 77 23** a tus contactos.
2. Enviá el mensaje exacto: `I allow callmebot to send me messages`
3. Recibirás tu API key por WhatsApp.
4. Reemplazá `XXXXXXXX` en `main.js` (`CALLMEBOT_API_KEY`) con esa key y hacé push.

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
