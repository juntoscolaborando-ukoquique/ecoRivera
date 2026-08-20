/* ============================================================
   main.js — Composition root
   ============================================================
   Nodo Agroecológico Minas de Corrales

   This file only wires things together: look up the DOM
   elements the page actually has, hand them to the modules
   that know what to do with them, and connect the submit event
   to the form-submission flow. Business logic (dynamic fields,
   Formcarry's response shape, status message copy, the Telegram
   proxy call) lives in its own module — see js/*.js.
   ============================================================ */

import { config } from './config.js';
import { createDynamicFieldsController } from './dynamicFields.js';
import { createFormStatus } from './formStatus.js';
import { submitToFormcarry } from './formcarryApi.js';
import { notifyTelegram } from './telegramNotify.js';

// ─── Campos dinámicos del formulario ────────────────────────

const dynamicFields = createDynamicFieldsController({
  perfilSelect: document.getElementById('perfil'),
  fields: {
    'field-visita': document.getElementById('field-visita'),
    'field-licencia': document.getElementById('field-licencia'),
    'field-saberes': document.getElementById('field-saberes'),
  },
});

// ─── Envío del formulario ────────────────────────────────────

const form = document.getElementById('contact-form');
const status = createFormStatus(document.getElementById('form-status'));
const submitBtn = form.querySelector('button[type="submit"]');

form.addEventListener('submit', async (event) => {
  event.preventDefault();

  submitBtn.disabled = true;
  submitBtn.textContent = 'Enviando…';
  status.hide();

  const formData = new FormData(form);

  try {
    const result = await submitToFormcarry(config.formEndpoint, formData);

    switch (result.outcome) {
      case 'success':
        status.showSuccess();
        form.reset();
        dynamicFields.hideAll();

        // Fire-and-forget: never blocks or affects the success message above.
        notifyTelegram(config.telegramNotifyEndpoint, {
          nombre: formData.get('nombre') || '(sin nombre)',
          contacto: formData.get('whatsapp') || formData.get('email') || '(sin contacto)',
        });
        break;

      case 'validationError':
        status.showValidationError(result.detail);
        break;

      default:
        status.showGenericError(result.detail);
    }
  } catch (err) {
    // Only a genuine network failure reaches here — submitToFormcarry
    // handles every application-level (Formcarry-reported) error itself.
    status.showNetworkError();
  }

  submitBtn.disabled = false;
  submitBtn.textContent = 'Enviar Mensaje';
});
