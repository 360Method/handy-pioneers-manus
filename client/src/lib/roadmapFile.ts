/**
 * In-memory handoff for the inspection-report File between the landing page
 * dropzone (/roadmap-generator) and the details form (/roadmap/details).
 *
 * File objects can't ride in sessionStorage; SPA navigation keeps this module
 * alive, so a plain variable is enough. On a hard refresh the file is simply
 * gone and the details page asks for it again.
 */
let pendingReport: File | null = null;

export function setPendingReport(file: File) {
  pendingReport = file;
}

/** Returns the handed-off file (once) and clears the slot. */
export function takePendingReport(): File | null {
  const f = pendingReport;
  pendingReport = null;
  return f;
}
