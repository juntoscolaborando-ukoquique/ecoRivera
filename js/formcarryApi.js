/* ============================================================
   formcarryApi.js — Formcarry submission
   ============================================================
   Formcarry always answers with HTTP 200; the real outcome
   lives in the JSON body:
     success:          { code: 200, status: "success" }
     validation error: { code: 422, status: "error",
                          errors: { fieldName: { message } } }
   This module is the only place that needs to know that shape.
   If the form backend is ever swapped out, this is the only
   file that changes.
   ============================================================ */

/**
 * @param {string} endpoint
 * @param {FormData} formData
 * @returns {Promise<{outcome: 'success'} |
 *                    {outcome: 'validationError', detail: string} |
 *                    {outcome: 'genericError', detail: string}>}
 * @throws on genuine network failure — the caller distinguishes that
 *   from an application-level error by wrapping the call in try/catch.
 */
export async function submitToFormcarry(endpoint, formData) {
  const response = await fetch(endpoint, {
    method: 'POST',
    body: formData,
    headers: { Accept: 'application/json' },
  });

  const json = await response.json();

  if (json.code === 200 || json.status === 'success') {
    return { outcome: 'success' };
  }

  if (json.code === 422 && json.errors) {
    const detail = Object.values(json.errors)
      .map((fieldError) => fieldError.message)
      .join(' ');
    return { outcome: 'validationError', detail: detail || json.message };
  }

  return { outcome: 'genericError', detail: json.message };
}
