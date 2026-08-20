/* ============================================================
   Nodo Agroecológico Minas de Corrales — Lógica principal
   ============================================================ */

// Read the form endpoint from a meta tag injected into the page (set from .env at build/dev time)
const FORMSPREE_ENDPOINT = (function() {
  try {
    const meta = document.querySelector('meta[name="form-endpoint"]');
    if (meta && meta.content) return meta.content;
  } catch (e) {}
  return 'https://formspree.io/f/XXXXXXXX'; // fallback placeholder
})();

// TODO: notificación por Telegram pendiente de configurar — ver TO_FIX.md #2

// ─── Campos dinámicos del formulario ────────────────────────

const perfilSelect  = document.getElementById('perfil');
const fieldVisita   = document.getElementById('field-visita');
const fieldLicencia = document.getElementById('field-licencia');
const fieldSaberes  = document.getElementById('field-saberes');

function hideAllDynamicFields() {
  [fieldVisita, fieldLicencia, fieldSaberes].forEach(function(el) {
    el.style.display = 'none';
    el.querySelectorAll('input, textarea, select').forEach(function(input) {
      input.disabled = true;
    });
  });
}

function showField(el) {
  el.style.display = 'block';
  el.querySelectorAll('input, textarea, select').forEach(function(input) {
    input.disabled = false;
  });
}

perfilSelect.addEventListener('change', function() {
  hideAllDynamicFields();
  if (this.value === 'visita') {
    showField(fieldVisita);
  } else if (this.value === 'licencia') {
    showField(fieldLicencia);
  } else if (this.value === 'intercambio' || this.value === 'integrante') {
    showField(fieldSaberes);
  }
});

hideAllDynamicFields();

// ─── Envío del formulario via Formcarry ─────────────────────

const form       = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');
const submitBtn  = form.querySelector('button[type="submit"]');

form.addEventListener('submit', async function(e) {
  e.preventDefault();

  submitBtn.disabled = true;
  submitBtn.textContent = 'Enviando…';
  formStatus.style.display = 'none';

  const data = new FormData(form);

  try {
    const response = await fetch(FORMSPREE_ENDPOINT, {
      method: 'POST',
      body: data,
      headers: { 'Accept': 'application/json' }
    });

    // Formcarry always returns HTTP 200, with the real outcome in the JSON body.
    // Success: { code: 200, status: "success" }
    // Validation error: { code: 422, status: "error", message: "...", errors: { fieldName: { message: "..." } } }
    const json = await response.json();

    if (json.code === 200 || json.status === 'success') {
      formStatus.className = 'status-success';
      formStatus.innerHTML = '<strong>¡Gracias por tu mensaje!</strong> Lo recibí correctamente y me pondré en contacto a la brevedad.';
      form.reset();
      hideAllDynamicFields();

    } else if (json.code === 422 && json.errors) {
      // errors is an object keyed by field name: { email: { message: "..." }, ... }
      const msgs = Object.values(json.errors)
        .map(function(e) { return e.message; })
        .join(' ');
      formStatus.className = 'status-error';
      formStatus.innerHTML = '<strong>Error de validación.</strong> ' + (msgs || json.message) + ' Revisá los campos e intentá nuevamente.';

    } else {
      formStatus.className = 'status-error';
      formStatus.innerHTML = '<strong>No se pudo enviar el mensaje.</strong> ' + (json.message || 'Error desconocido.') + ' Intentá nuevamente o escribime por email.';
    }

  } catch (err) {
    // Only reaches here on a genuine network failure
    formStatus.className = 'status-error';
    formStatus.innerHTML = '<strong>Sin conexión.</strong> Revisá tu internet e intentá nuevamente, o escribime por email.';
  }

  formStatus.style.display = 'block';
  formStatus.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  submitBtn.disabled = false;
  submitBtn.textContent = 'Enviar Mensaje';
});
