export const RESUME_MAX_BYTES = 2 * 1024 * 1024; // 2 MB
export const RESUME_ACCEPT =
  ".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document";

const ALLOWED_EXTENSIONS = new Set(["pdf", "doc", "docx"]);
const ALLOWED_MIME_TYPES = new Set([
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
]);

export function resumeExtension(filename: string) {
  const parts = filename.toLowerCase().split(".");
  return parts.length > 1 ? (parts.at(-1) ?? "") : "";
}

export function formatBytes(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function validateResumeFile(file: File | null | undefined): string | null {
  if (!file) {
    return "Please attach your resume.";
  }

  if (file.size <= 0) {
    return "Resume file is empty. Please choose another file.";
  }

  if (file.size > RESUME_MAX_BYTES) {
    return `Resume must be 2 MB or smaller (yours is ${formatBytes(file.size)}).`;
  }

  const ext = resumeExtension(file.name);
  const extOk = ALLOWED_EXTENSIONS.has(ext);
  const mimeOk = !file.type || ALLOWED_MIME_TYPES.has(file.type) || file.type === "application/octet-stream";

  if (!extOk || !mimeOk) {
    return "Resume must be a PDF, DOC, or DOCX file.";
  }

  return null;
}
