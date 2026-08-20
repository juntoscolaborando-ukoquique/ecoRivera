# CHANGELOG

Todas las versiones notables de este proyecto se documentan aquí.
El formato sigue [Keep a Changelog](https://keepachangelog.com/es/1.1.0/).

---

## [1.3.0] — 2026-08-20

### Corregido
- Manejador de envío del formulario reescrito para coincidir con la forma real de respuesta de Formcarry:
  - El éxito se detecta por `json.code === 200` (no por `response.ok`, que siempre es true en Formcarry)
  - Los errores de validación usan `Object.values(json.errors).map(e => e.message)` — el campo `errors` es un objeto por campo, no un array como en Formspree
  - Los errores de red reales quedan aislados en el `catch`

### Cambiado
- Variable `FORMSPREE_ENDPOINT` renombrada a `FORMCARRY_ENDPOINT`; eliminado el fallback a formspree.io
- GitHub Pages cambiado para servir desde rama `main` (antes servía desde `gh-pages`, causando que el sitio mostrara versiones antiguas)

### Eliminado (código muerto / activos huérfanos)
- Reglas CSS `.photo-credit` — nunca usadas en el HTML
- Reglas CSS `.about-me` y `.profile-photo` — reemplazadas por `.section-thumb`
- Bloque `.card { position: relative }` duplicado — consolidado en la regla principal de `.card`
- Variables CSS `--bg-color` y `--bg-olive` — declaradas pero nunca referenciadas
- Stack de `background-image` en `body` (gradientes, SVG texture, blend-mode) — nunca visible por ser tapado por una capa opaca; reemplazado por el color plano `--bg-wash` que siempre fue lo que se mostraba
- `images/valle_alt.webp` (155 KB) — archivo huérfano no referenciado en ningún lado
- Referencias a Formspree en `.env.example` — el proyecto usa Formcarry

### Documentación
- `TO_FIX.md` corregido: eliminados dos ítems falsos (endpoint Formspree ya activo, link Instagram inexistente)
- `CHANGELOG.md` corregido: eliminadas tres afirmaciones falsas (crédito foto en header, WhatsApp en footer, Formspree)

---

## [1.2.0] — 2026-08-20

### Añadido
- Sección "Sobre mí" con foto de perfil circular (`images/yo.png`) clickeable que abre el perfil de Facebook
- Mención a habilidades de programación disponibles para ecocomunidades
- Sección "Sumate" con niveles de participación general (visitante, colaborador, futuro integrante) antes del formulario
- Miniaturas fotográficas en el extremo superior derecho de cada sección (CC BY / CC BY-SA):
  - Quiénes somos: Mid-City Community Garden (Bart Everson, CC BY 2.0)
  - Qué hacemos: Huerta orgánica Villa Dolores Uruguay (CC BY-SA 4.0)
  - La red: Feria de Intercambio de Semillas (GCBA, CC BY 2.5 ar)
  - Para visitar: Valle del Lunarejo (M.E. Leal, CC BY-SA 3.0)
  - Sobre mí: `images/yo.png` (foto personal, circular)
  - Nueva Ecoaldea: imagen de CASA Latina / GEN Sudamérica
  - Sumate: Huerta orgánica educativa (Juancruztagliafico, CC BY-SA 4.0)

### Cambiado
- Sección "Convocatoria: Licencia de Noviembre 2026" reemplazada por "Ensayo 'Una Nueva Ecoaldea'": propuesta de co-diseño de una nueva ecoaldea desde Corrales
- Número de WhatsApp eliminado del footer (solo email, Facebook y GitHub)
- Foto de perfil en "Sobre mí" ahora enlaza al perfil de Facebook al hacer clic; eliminada la línea de texto "Mi sitio personal"
- Voz del texto equilibrada: secciones colectivas en "nosotros", sección personal claramente delimitada

### Eliminado
- CallMeBot (requería WhatsApp Business); reemplazado por pendiente de Telegram en TO_FIX.md

---

## [1.1.0] — 2026-08-20

### Añadido
- Estructura de 6 secciones sin superposición de contenido: Quiénes somos, Qué hacemos, La red, Para visitar, Sobre mí, Nueva Ecoaldea, Sumate
- Sección "Qué se puede hacer aquí": huerta, medicina natural, bioconstrucción, semillas criollas, mingas — con enlace al Manual de Huertas Agroecológicas de la Intendencia de Rivera
- Sección "La red y sus aliados": Red de Agroecología UY, Red de Semillas Nativas, ecoaldeas UY, feiras RS, centros permacultura RS, semillas campesinas RS
- Sección "Para visitar cerca": Valle del Lunarejo, Cuchilla de Haedo, Termas Arapey, Tacuarembó, Sant'Ana do Livramento

### Cambiado
- Texto de presentación reescrito para separar voz colectiva (la red) de voz personal (el autor)
- Descripción del trabajo personal corregida a "empresa local"
- Modalidades de alojamiento explicitadas: hasta 2 personas en casa, grupos mayores coordinando con agroecólogos de la zona

---

## [1.0.0] — 2026-08-20

Primera versión publicada. Refactorización completa del MVP original (`ecoRivera.html`).

### Añadido
- `index.html` — reemplaza `ecoRivera.html` con nombre correcto para hosting estático
- `style.css` — estilos extraídos a archivo externo
- `main.js` — lógica JavaScript extraída a archivo externo
- `.gitignore` — protege `.env` y archivos de sistema
- `.env.example` — plantilla documentada de variables de entorno
- Navegación sticky con anclas a las secciones
- Imagen de fondo en el header: Valle del Lunarejo, Rivera (Wikimedia Commons, CC BY-SA 3.0, Miriam Edith Leal)
- Meta tags SEO: `<meta name="description">` y `<link rel="canonical">`
- Meta tags Open Graph completos (título, descripción, imagen, URL, locale)
- Meta tags Twitter Card (`summary_large_image`)
- Footer con contacto directo: email (ukoquique@gmail.com), Facebook y enlace al repositorio en GitHub
- Formulario conectado a Formcarry via `fetch` con manejo correcto de respuesta (`json.code`, `json.errors` como objeto por campo)
- Campos de contacto separados: `<input type="tel">` para WhatsApp y `<input type="email">` para email
- Validación de formato en campo teléfono (`pattern`)
- Campos dinámicos del formulario deshabilitados cuando están ocultos
- Accesibilidad: `<label for>` correctamente asociado, `role="alert"` en `#form-status`
- `scroll-behavior: smooth` y `scroll-padding-top` compensando nav sticky
- Media queries responsive para pantallas ≤ 600px y ≤ 360px

### Eliminado
- `ecoRivera.html` — reemplazado por `index.html`
- Simulación falsa de envío de formulario
- CSS y JS inline del archivo HTML original

---

## [0.1.0] — 2026-08-19 (MVP inicial — no publicado)

Versión original de trabajo: `ecoRivera.html` con HTML, CSS y JS en un único archivo.
Formulario con envío simulado. Sin imagen, sin navegación, sin metadatos SEO.
