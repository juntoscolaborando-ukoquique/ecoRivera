/* ============================================================
   Nodo Agroecológico Minas de Corrales — Lógica principal
   ============================================================ */

const FORMSPREE_ENDPOINT = 'https://formspree.io/f/XXXXXXXX'; // reemplazar con tu endpoint real

// ─── Campos dinámicos del formulario ────────────────────────

const perfilSelect  = document.getElementById('perfil');
const fieldVisita   = document.getElementById('field-visita');
const fieldLicencia = document.getElementById('field-licencia');
const fieldSaberes  = document.getElementById('field-saberes');

function hideAllDynamicFields() {
  [fieldVisita, fieldLicencia, fieldSaberes].forEach(function(el) {
    el.style.display = 'none';
    // deshabilitar campos dentro para que no queden en el submit
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

// Inicializar campos dinámicos deshabilitados
hideAllDynamicFields();

// ─── Envío del formulario via Formspree ──────────────────────

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

    if (response.ok) {
      formStatus.className = 'status-success';
      formStatus.innerHTML = '<strong>¡Gracias por tu mensaje!</strong> Lo recibí correctamente y me pondré en contacto a la brevedad.';
      form.reset();
      hideAllDynamicFields();
    } else {
      const json = await response.json();
      const errorMsg = (json.errors && json.errors.map(function(err) { return err.message; }).join(', ')) || 'Error desconocido.';
      formStatus.className = 'status-error';
      formStatus.innerHTML = '<strong>No se pudo enviar el mensaje.</strong> ' + errorMsg + ' Intentá nuevamente o escribime directamente por WhatsApp.';
    }
  } catch (err) {
    formStatus.className = 'status-error';
    formStatus.innerHTML = '<strong>Sin conexión.</strong> Revisá tu internet e intentá nuevamente, o contactame directamente por WhatsApp.';
  }

  formStatus.style.display = 'block';
  formStatus.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  submitBtn.disabled = false;
  submitBtn.textContent = 'Enviar Mensaje';
});
