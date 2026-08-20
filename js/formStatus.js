/* ============================================================
   formStatus.js — #form-status messaging
   ============================================================
   Centralizes the copy and rendering for every outcome of a
   form submission, so the submit handler in main.js just calls
   status.showSuccess() etc. instead of building innerHTML
   strings inline.
   ============================================================ */

const COPY = {
  success:
    '<strong>¡Gracias por tu mensaje!</strong> Lo recibí correctamente y me pondré en contacto a la brevedad.',
  validationError: (detail) =>
    `<strong>Error de validación.</strong> ${detail} Revisá los campos e intentá nuevamente.`,
  genericError: (detail) =>
    `<strong>No se pudo enviar el mensaje.</strong> ${detail} Intentá nuevamente o escribime por email.`,
  networkError:
    '<strong>Sin conexión.</strong> Revisá tu internet e intentá nuevamente, o escribime por email.',
};

/** @param {HTMLElement} el - the #form-status element (role="alert") */
export function createFormStatus(el) {
  function render(className, html) {
    el.className = className;
    el.innerHTML = html;
    el.style.display = 'block';
    el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  return {
    hide() {
      el.style.display = 'none';
    },
    showSuccess() {
      render('status-success', COPY.success);
    },
    showValidationError(detail) {
      render('status-error', COPY.validationError(detail || 'Revisá los datos ingresados.'));
    },
    showGenericError(detail) {
      render('status-error', COPY.genericError(detail || 'Error desconocido.'));
    },
    showNetworkError() {
      render('status-error', COPY.networkError);
    },
  };
}
