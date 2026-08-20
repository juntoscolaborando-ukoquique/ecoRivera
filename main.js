/* ============================================================
   Nodo Agroecológico Minas de Corrales — Lógica principal
   ============================================================ */

const FORMSPREE_ENDPOINT = 'https://formspree.io/f/XXXXXXXX'; // reemplazar con tu endpoint real

// CallMeBot: envía notificación a WhatsApp cuando llega un mensaje.
// Pasos de activación (una sola vez):
//   1. Agregá el contacto +34 644 59 77 23 en tu WhatsApp.
//   2. Enviá el mensaje: "I allow callmebot to send me messages"
//   3. Recibirás tu API key por WhatsApp.
//   4. Reemplazá CALLMEBOT_API_KEY abajo con esa key.
// Más info: https://www.callmebot.com/blog/free-api-whatsapp-messages/
const CALLMEBOT_PHONE   = '59891633183';       // tu número sin + ni espacios
const CALLMEBOT_API_KEY = 'XXXXXXXX';          // reemplazar con tu API key

async function notifyWhatsApp(nombre, contacto) {
  if (CALLMEBOT_API_KEY === 'XXXXXXXX') return; // no configurado aún
  try {
    const text = encodeURIComponent(
      '📩 Nuevo mensaje en EcoRivera\n' +
      'De: ' + nombre + '\n' +
      'Contacto: ' + contacto
    );
    await fetch(
      'https://api.callmebot.com/whatsapp.php' +
      '?phone=' + CALLMEBOT_PHONE +
      '&text=' + text +
      '&apikey=' + CALLMEBOT_API_KEY,
      { mode: 'no-cors' }
    );
  } catch (_) {
    // falla silenciosa — la notificación es un extra, no bloquea el flujo
  }
}

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

      // Notificar por WhatsApp (no bloquea ni depende del éxito)
      const nombre   = data.get('nombre')   || '(sin nombre)';
      const contacto = data.get('whatsapp') || data.get('email') || '(sin contacto)';
      notifyWhatsApp(nombre, contacto);

    } else {
      const json = await response.json();
      const errorMsg = (json.errors && json.errors.map(function(err) { return err.message; }).join(', ')) || 'Error desconocido.';
      formStatus.className = 'status-error';
      formStatus.innerHTML = '<strong>No se pudo enviar el mensaje.</strong> ' + errorMsg + ' Intentá nuevamente o escribime por email.';
    }
  } catch (err) {
    formStatus.className = 'status-error';
    formStatus.innerHTML = '<strong>Sin conexión.</strong> Revisá tu internet e intentá nuevamente, o escribime por email.';
  }

  formStatus.style.display = 'block';
  formStatus.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  submitBtn.disabled = false;
  submitBtn.textContent = 'Enviar Mensaje';
});
