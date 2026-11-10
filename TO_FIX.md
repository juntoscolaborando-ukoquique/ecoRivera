# TO_FIX.md — Mejoras Pendientes

Todos los problemas críticos e importantes identificados en la versión inicial fueron resueltos en el commit del 20/08/2026. Ver [CHANGELOG.md](./CHANGELOG.md) para el detalle completo.

---

## Pendientes

### 1. Actualizar `og:url` cuando el sitio esté publicado
Una vez habilitado GitHub Pages, actualizar en el `<head>` de `index.html`:
- `og:url` → `https://juntoscolaborando-ukoquique.github.io/ecoRivera/`

### 2. Reemplazar la imagen de fondo cuando haya una propia
La imagen actual es Valle del Lunarejo (Wikimedia Commons, CC BY-SA). Cuando se consiga una foto propia del espacio en Corrales, subirla a `images/` y actualizar la referencia en `style.css` (`.header-bg`).

### 3. Mantener la sección "Eco Chacra" actualizada
Cuando la propuesta de chacra avance, actualizar el texto de esa sección con novedades concretas.

### 4. Renombrar nomenclatura heredada de "Licencia de Noviembre" (opcional)
El valor `licencia` del select `perfil`, el id `field-licencia` y el campo `propuesta-licencia` corresponden hoy a Eco Chacra. Renombrarlos exige tocar `index.html`, `js/dynamicFields.js` y `js/main.js`, y cambia el nombre del campo que llega en Formcarry y Telegram.

### 5. Mencionar la chacra en título y descripción para redes (opcional)
`<title>`, `og:description` y `twitter:description` no mencionan la propuesta de Eco Chacra.
