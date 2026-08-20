/* ============================================================
   dynamicFields.js — Perfil-dependent form fields
   ============================================================
   Shows/hides the extra question that depends on how the
   visitor says they want to get involved ("perfil"), and
   disables inputs while hidden so they're never submitted
   as empty values.
   ============================================================ */

// Maps a <select id="perfil"> value to the id of the field group
// that should be shown for it.
const PROFILE_TO_FIELD_ID = {
  visita: 'field-visita',
  licencia: 'field-licencia',
  intercambio: 'field-saberes',
  integrante: 'field-saberes',
};

/**
 * @param {HTMLSelectElement} perfilSelect
 * @param {Record<string, HTMLElement>} fields - keyed by element id,
 *   e.g. { 'field-visita': <div>, 'field-licencia': <div>, ... }
 */
export function createDynamicFieldsController({ perfilSelect, fields }) {
  function setFieldEnabled(el, enabled) {
    el.style.display = enabled ? 'block' : 'none';
    el.querySelectorAll('input, textarea, select').forEach((input) => {
      input.disabled = !enabled;
    });
  }

  function hideAll() {
    Object.values(fields).forEach((el) => setFieldEnabled(el, false));
  }

  function applySelection(value) {
    hideAll();
    const targetId = PROFILE_TO_FIELD_ID[value];
    if (targetId && fields[targetId]) {
      setFieldEnabled(fields[targetId], true);
    }
  }

  perfilSelect.addEventListener('change', (event) => {
    applySelection(event.target.value);
  });

  hideAll();

  return { hideAll };
}
