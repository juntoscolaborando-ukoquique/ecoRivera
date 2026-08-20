# TO_FIX.md — Mejoras Propuestas para el Nodo Agroecológico Minas de Corrales

Este documento recoge los problemas actuales y las mejoras recomendadas, ordenadas por prioridad.

---

## 🔴 Crítico (afecta funcionalidad esencial)

### 1. El formulario no envía datos reales
El botón "Enviar Mensaje" simula el envío con un mensaje de éxito falso, pero no transmite nada a ningún destino. Nadie recibirá los mensajes de las personas interesadas.

**Solución:** Integrar un servicio real de recepción de formularios. Las opciones más simples son:
- [Formspree](https://formspree.io/) — basta con cambiar el `action` del `<form>` a la URL que proveen.
- [EmailJS](https://www.emailjs.com/) — permite recibir los datos por email sin backend.

### 2. El archivo HTML se llama `ecoRivera.html` en lugar de `index.html`
El README menciona `index.html` como el archivo principal, pero el archivo real tiene otro nombre. Si se publica en GitHub Pages o Netlify sin renombrarlo, el sitio no cargará en la URL raíz.

**Solución:** Renombrar `ecoRivera.html` a `index.html`.

---

## 🟠 Importante (afecta usabilidad y alcance)

### 3. Sin información de contacto directo visible
El formulario es el único canal de contacto, pero no está operativo (ver punto 1). No hay número de WhatsApp, correo electrónico ni redes sociales visibles en ningún lugar de la página.

**Solución:** Agregar en el footer o en la sección del formulario al menos un número de WhatsApp o un email como contacto alternativo, para que la página sea útil incluso antes de integrar el formulario.

### 4. Sin navegación interna
La página tiene 5 secciones pero no tiene un menú de navegación. En pantallas pequeñas o con contenido más extenso, el usuario no puede saltar directamente a la sección que le interesa.

**Solución:** Agregar un `<nav>` sticky en el header con anclas a cada sección (`#presentacion`, `#contexto`, `#convocatoria`, etc.).

### 5. La convocatoria de noviembre quedará desactualizada
La sección 3 habla de "23 días continuos de licencia en noviembre" como si fuera próxima, pero con el tiempo será información obsoleta y puede confundir a los visitantes.

**Solución:** Agregar la fecha/año explícito (ej. "noviembre 2026") y, a futuro, reemplazar esa sección por la convocatoria vigente o convertirla en un historial de actividades.

### 6. No hay metadatos OG/SEO
No hay etiquetas `<meta>` de Open Graph ni descripción SEO. Al compartir el enlace en WhatsApp, Facebook o grupos de permacultura, no se generará ninguna vista previa con imagen ni descripción.

**Solución:** Agregar al `<head>`:
```html
<meta name="description" content="Nodo agroecológico en Minas de Corrales, Rivera. Soberanía alimentaria, voluntariados y red comunitaria en el norte de Uruguay.">
<meta property="og:title" content="Nodo Agroecológico Minas de Corrales">
<meta property="og:description" content="...">
<meta property="og:image" content="URL_de_una_imagen_representativa">
<meta property="og:url" content="URL_del_sitio">
```

---

## 🟡 Mejoras recomendadas (calidad y crecimiento)

### 7. Sin imágenes ni elementos visuales
La página es completamente textual. Para un proyecto que comunica tierra, naturaleza y comunidad, la ausencia de fotografías hace que el mensaje pierda fuerza y credibilidad.

**Solución:** Agregar al menos una foto del espacio, la huerta o la zona, en el header o como galería mínima. Puede alojarse en el repositorio mismo o en un servicio como Cloudinary.

### 8. Validación de formulario débil
El campo "Teléfono / WhatsApp o Email" acepta cualquier texto. Una persona puede escribir algo inválido y el formulario lo aceptaría igual.

**Solución:** Separar en dos campos (`<input type="tel">` e `<input type="email">`) o agregar validación con expresión regular para detectar al menos un formato válido.

### 9. Sin versión móvil optimizada
Hay un `<meta viewport>` básico, pero la tipografía del header (`2.2rem`) puede resultar grande en pantallas muy pequeñas y no hay ningún `@media query` definido en los estilos.

**Solución:** Agregar media queries para ajustar tamaños de fuente y padding en pantallas menores a 480px.

### 10. Todo el código está en un solo archivo
CSS, HTML y JavaScript están mezclados en `ecoRivera.html`. Esto complica el mantenimiento a medida que el proyecto crece.

**Solución (a futuro):** Separar en `style.css` y `main.js` como archivos externos. No es urgente para un MVP, pero conviene planificarlo antes de agregar más funcionalidades.

### 11. Sin enlace al repositorio o mecanismo de colaboración técnica
No hay forma de que un colaborador técnico encuentre el código fuente desde el sitio publicado.

**Solución:** Agregar un enlace discreto al repositorio de GitHub en el footer, útil si se busca colaboración en el desarrollo de la plataforma.

### 12. El campo "campo dinámico de saberes" no tiene `id` único asociado al `for` del label
El label del `field-saberes` apunta a `for="saberes"` pero el textarea dentro tiene `id="saberes"`. Es correcto, pero el contenedor `div#field-saberes` no tiene label propio accesible, lo que puede confundir a lectores de pantalla.

**Solución:** Asegurarse de que cada `dynamic-field` tenga su estructura de `form-group` con `label` correctamente asociado mediante `for`/`id`.

---

## 📋 Resumen de prioridades

| # | Problema | Prioridad |
|---|----------|-----------|
| 1 | Formulario no envía datos | 🔴 Crítico |
| 2 | Nombre incorrecto del archivo HTML | 🔴 Crítico |
| 3 | Sin contacto directo visible | 🟠 Importante |
| 4 | Sin navegación interna | 🟠 Importante |
| 5 | Convocatoria de noviembre se desactualizará | 🟠 Importante |
| 6 | Sin metadatos OG/SEO | 🟠 Importante |
| 7 | Sin imágenes | 🟡 Recomendado |
| 8 | Validación de formulario débil | 🟡 Recomendado |
| 9 | Sin media queries para móvil | 🟡 Recomendado |
| 10 | Todo el código en un archivo | 🟡 Recomendado |
| 11 | Sin enlace al repo desde el sitio | 🟡 Recomendado |
| 12 | Accesibilidad en campos dinámicos | 🟡 Recomendado |
