# TO_FIX.md — Mejoras Pendientes

Todos los problemas críticos e importantes identificados en la versión inicial fueron resueltos en el commit del 20/08/2026. Ver [CHANGELOG.md](./CHANGELOG.md) para el detalle completo.

---

## Pendientes

### 1. Conectar endpoint real de Formspree
El formulario ya usa `fetch` hacia Formspree, pero el endpoint en `main.js` (línea 6) todavía tiene el valor de ejemplo `XXXXXXXX`. Hasta que se reemplace, los mensajes no llegan.

**Acción:** Crear cuenta en [formspree.io](https://formspree.io), generar un formulario y pegar el endpoint real en `main.js`:
```js
const FORMSPREE_ENDPOINT = 'https://formspree.io/f/TU_ID_REAL';
```

### 2. Agregar perfil de Instagram real
El link de Instagram en el footer apunta al placeholder `https://instagram.com/tu-perfil`.

**Acción:** Reemplazar con la URL real del perfil, o eliminar el enlace si no hay perfil activo.

### 3. Actualizar `SITE_URL` y `OG_IMAGE_URL` cuando el sitio esté publicado
Una vez habilitado GitHub Pages, actualizar en el `<head>` de `index.html`:
- `og:url` → `https://juntoscolaborando-ukoquique.github.io/ecoRivera/`
- `og:image` → puede mantenerse la foto de Wikimedia o reemplazarse con una imagen propia

### 4. Reemplazar la imagen de fondo cuando haya una propia
La imagen actual es Valle del Lunarejo (Wikimedia Commons, CC BY-SA). Cuando se consiga una foto propia del espacio en Corrales, subirla al repo y actualizar la referencia en `style.css`.

### 5. Mantener la sección de convocatoria actualizada
La sección 3 de `index.html` describe la licencia de noviembre de 2026. Cuando esa fecha pase, actualizar con la próxima convocatoria o convertirla en un historial de actividades.
