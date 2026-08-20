# CHANGELOG

Todas las versiones notables de este proyecto se documentan aquí.
El formato sigue [Keep a Changelog](https://keepachangelog.com/es/1.1.0/).

---

## [1.0.0] — 2026-08-20

Primera versión publicada. Refactorización completa del MVP original (`ecoRivera.html`).

### Añadido
- `index.html` — reemplaza `ecoRivera.html` con nombre correcto para hosting estático
- `style.css` — estilos extraídos a archivo externo
- `main.js` — lógica JavaScript extraída a archivo externo
- `.gitignore` — protege `.env` y archivos de sistema
- `.env.example` — plantilla documentada de variables de entorno
- `CHANGELOG.md` — este archivo
- Navegación sticky con anclas a las 5 secciones (`#presentacion`, `#contexto`, `#convocatoria`, `#participacion`, `#contacto`)
- Imagen de fondo en el header: Valle del Lunarejo, Rivera (Wikimedia Commons, CC BY-SA 3.0, Miriam Edith Leal)
- Crédito fotográfico visible sobre la imagen
- Meta tags SEO: `<meta name="description">` y `<link rel="canonical">`
- Meta tags Open Graph completos (título, descripción, imagen, URL, locale)
- Meta tags Twitter Card (`summary_large_image`)
- Footer con contacto directo: WhatsApp (+598 91 633 183) y email (ukoquique@gmail.com)
- Footer con enlace a Facebook (`permaecovida`) y al repositorio en GitHub
- Formulario conectado a Formspree via `fetch` (async/await) con manejo real de éxito y error
- Campos de contacto separados: `<input type="tel">` para WhatsApp y `<input type="email">` para email
- Validación de formato en campo teléfono (`pattern`)
- Campos dinámicos del formulario ahora se deshabilitan cuando están ocultos (no se envían datos vacíos)
- Cada campo dinámico envuelto en `.form-group` con `<label for>` correctamente asociado (accesibilidad)
- `role="alert"` en `#form-status` para lectores de pantalla
- `scroll-behavior: smooth` y `scroll-padding-top` para navegación con anclas compensando el nav sticky
- Media queries responsive para pantallas ≤ 600px y ≤ 360px (tipografía, padding, grid de formulario)
- Año explícito en la sección de convocatoria: "noviembre de 2026"

### Cambiado
- Arquitectura: de un único archivo HTML monolítico a tres archivos separados (HTML / CSS / JS)
- Botón de envío ahora muestra estado "Enviando…" y se deshabilita durante la petición
- Sección de convocatoria actualizada con año explícito para evitar ambigüedad temporal

### Eliminado
- `ecoRivera.html` — reemplazado por `index.html`
- Simulación falsa de envío de formulario (mensaje de éxito sin transmisión real)
- CSS y JS inline del archivo HTML original

---

## [0.1.0] — 2026-08-19 (MVP inicial — no publicado)

Versión original de trabajo: `ecoRivera.html` con HTML, CSS y JS en un único archivo.
Formulario con envío simulado. Sin imagen, sin navegación, sin metadatos SEO.
