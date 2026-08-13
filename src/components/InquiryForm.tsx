"use client";

import { FormEvent, useId, useRef, useState } from "react";
import { CheckCircle2, FileUp, Send, X } from "lucide-react";
import { siteConfig, type InquiryType } from "@/content/site";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { RESUME_ACCEPT, formatBytes, validateResumeFile } from "@/lib/resume";

type FormState = {
  name: string;
  email: string;
  company: string;
  role: string;
  message: string;
};

type FormErrors = Partial<Record<keyof FormState | "resume", string>>;

function validate(values: FormState, type: InquiryType, resume: File | null): FormErrors {
  const errors: FormErrors = {};

  if (!values.name.trim()) {
    errors.name = "Please enter your name.";
  }

  if (!values.email.trim()) {
    errors.email = "Please enter your email.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
    errors.email = "Please enter a valid email address.";
  }

  if (!values.message.trim()) {
    errors.message = "Please share a short message.";
  } else if (values.message.trim().length < 10) {
    errors.message = "Message should be at least 10 characters.";
  }

  if (type === "career") {
    if (!values.role.trim()) {
      errors.role = "Please select a role.";
    }
    const resumeError = validateResumeFile(resume);
    if (resumeError) errors.resume = resumeError;
  }

  return errors;
}

type InquiryFormProps = {
  type: InquiryType;
  messagePlaceholder: string;
  submitLabel: string;
  fallbackEmail: string;
  idPrefix: string;
  /** Pre-select a careers role option value */
  defaultRole?: string;
  className?: string;
};

export function InquiryForm({
  type,
  messagePlaceholder,
  submitLabel,
  fallbackEmail,
  idPrefix,
  defaultRole = "",
  className,
}: InquiryFormProps) {
  const resumeInputId = useId();
  const resumeInputRef = useRef<HTMLInputElement>(null);
  const [values, setValues] = useState<FormState>({
    name: "",
    email: "",
    company: "",
    role: type === "career" ? defaultRole : "",
    message: "",
  });
  const [resume, setResume] = useState<File | null>(null);
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [statusMessage, setStatusMessage] = useState("");

  const onChange = (field: keyof FormState, value: string) => {
    setValues((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const onResumeChange = (file: File | null) => {
    setResume(file);
    const resumeError = file ? validateResumeFile(file) : null;
    setErrors((prev) => ({
      ...prev,
      resume: resumeError || undefined,
    }));
  };

  const clearResume = () => {
    setResume(null);
    if (resumeInputRef.current) resumeInputRef.current.value = "";
    setErrors((prev) => ({ ...prev, resume: undefined }));
  };

  const resetForm = () => {
    setValues({
      name: "",
      email: "",
      company: "",
      role: type === "career" ? defaultRole : "",
      message: "",
    });
    clearResume();
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors = validate(values, type, resume);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    setStatus("submitting");
    setStatusMessage("");

    try {
      let response: Response;

      if (type === "career") {
        const formData = new FormData();
        formData.set("type", type);
        formData.set("name", values.name.trim());
        formData.set("email", values.email.trim());
        formData.set("role", values.role.trim());
        formData.set("message", values.message.trim());
        if (resume) formData.set("resume", resume, resume.name);

        response = await fetch("/api/contact", {
          method: "POST",
          headers: { Accept: "application/json" },
          body: formData,
        });
      } else {
        response = await fetch("/api/contact", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            type,
            name: values.name.trim(),
            email: values.email.trim(),
            company: values.company.trim() || undefined,
            message: values.message.trim(),
          }),
        });
      }

      const data = (await response.json().catch(() => null)) as
        | { ok?: boolean; error?: string; message?: string; activationRequired?: boolean }
        | null;

      if (!response.ok || !data?.ok) {
        throw new Error(data?.error || "Request failed");
      }

      setStatus("success");
      setStatusMessage(
        data.activationRequired
          ? data.message ||
              `Check ${fallbackEmail} for FormSubmit’s activation email, then click Activate Form.`
          : data.message || "Thanks — your message was sent. We’ll get back to you soon.",
      );
      resetForm();
    } catch (error) {
      setStatus("error");
      setStatusMessage(
        error instanceof Error && error.message
          ? error.message
          : `Something went wrong while sending. Please email ${fallbackEmail} instead.`,
      );
    }
  };

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      encType={type === "career" ? "multipart/form-data" : undefined}
      className={cn(
        "rounded-2xl border border-fg/10 bg-navy/70 p-5 backdrop-blur-sm sm:p-6",
        className,
      )}
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          id={`${idPrefix}-name`}
          label="Name"
          value={values.name}
          error={errors.name}
          autoComplete="name"
          onChange={(value) => onChange("name", value)}
        />
        <Field
          id={`${idPrefix}-email`}
          label="Email"
          type="email"
          value={values.email}
          error={errors.email}
          autoComplete="email"
          onChange={(value) => onChange("email", value)}
        />
      </div>

      <div className="mt-5">
        {type === "sales" ? (
          <Field
            id={`${idPrefix}-company`}
            label="Company"
            optional
            value={values.company}
            autoComplete="organization"
            onChange={(value) => onChange("company", value)}
          />
        ) : (
          <div>
            <label
              htmlFor={`${idPrefix}-role`}
              className="mb-2 block text-sm font-medium text-fg/80"
            >
              Role
            </label>
            <select
              id={`${idPrefix}-role`}
              name="role"
              value={values.role}
              onChange={(event) => onChange("role", event.target.value)}
              aria-invalid={Boolean(errors.role)}
              aria-describedby={errors.role ? `${idPrefix}-role-error` : undefined}
              className={cn(
                "h-11 w-full appearance-none rounded-xl border bg-navy-elevated bg-[length:1rem] bg-[right_0.85rem_center] bg-no-repeat px-4 pr-10 text-sm text-fg outline-none transition focus:border-cyan/50 focus:ring-2 focus:ring-cyan/30",
                errors.role ? "border-red-400/60" : "border-fg/10",
                !values.role && "text-fg/40",
              )}
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%2394a3b8'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'/%3E%3C/svg%3E")`,
              }}
            >
              <option value="" disabled>
                Select a role
              </option>
              {siteConfig.careers.roleOptions.map((option) => (
                <option key={option.value} value={option.value} className="bg-navy text-fg">
                  {option.label}
                </option>
              ))}
            </select>
            {errors.role ? (
              <p id={`${idPrefix}-role-error`} className="mt-2 text-sm text-red-300">
                {errors.role}
              </p>
            ) : (
              <p className="mt-2 text-xs text-fg/40">
                Choose the opening you’re applying for.
              </p>
            )}
          </div>
        )}
      </div>

      <div className="mt-5">
        <label
          htmlFor={`${idPrefix}-message`}
          className="mb-2 block text-sm font-medium text-fg/80"
        >
          Message
        </label>
        <textarea
          id={`${idPrefix}-message`}
          name="message"
          rows={5}
          value={values.message}
          onChange={(event) => onChange("message", event.target.value)}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? `${idPrefix}-message-error` : undefined}
          className={cn(
            "w-full resize-y rounded-xl border bg-navy-elevated px-4 py-3 text-sm text-fg outline-none transition placeholder:text-fg/30 focus:border-cyan/50 focus:ring-2 focus:ring-cyan/30",
            errors.message ? "border-red-400/60" : "border-fg/10",
          )}
          placeholder={messagePlaceholder}
        />
        {errors.message ? (
          <p id={`${idPrefix}-message-error`} className="mt-2 text-sm text-red-300">
            {errors.message}
          </p>
        ) : null}
      </div>

      {type === "career" ? (
        <div className="mt-5">
          <label htmlFor={resumeInputId} className="mb-2 block text-sm font-medium text-fg/80">
            Resume
          </label>
          <input
            ref={resumeInputRef}
            id={resumeInputId}
            name="resume"
            type="file"
            accept={RESUME_ACCEPT}
            className="sr-only"
            onChange={(event) => {
              const file = event.target.files?.[0] ?? null;
              onResumeChange(file);
            }}
          />
          <div
            className={cn(
              "rounded-xl border border-dashed bg-navy-elevated/80 px-4 py-4 transition",
              errors.resume ? "border-red-400/60" : "border-fg/15 hover:border-cyan/35",
            )}
          >
            {resume ? (
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-fg">{resume.name}</p>
                  <p className="mt-1 text-xs text-fg/45">{formatBytes(resume.size)}</p>
                </div>
                <button
                  type="button"
                  onClick={clearResume}
                  className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-fg/10 text-fg/70 transition hover:border-red-300/40 hover:text-red-200"
                  aria-label="Remove resume"
                >
                  <X className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => resumeInputRef.current?.click()}
                className="flex w-full flex-col items-center gap-2 py-1 text-center"
              >
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-cyan/25 bg-cyan/10 text-cyan">
                  <FileUp className="h-5 w-5" aria-hidden="true" />
                </span>
                <span className="text-sm font-medium text-fg">Attach resume</span>
                <span className="text-xs text-fg/45">PDF, DOC, or DOCX · max 2 MB</span>
              </button>
            )}
          </div>
          {errors.resume ? (
            <p className="mt-2 text-sm text-red-300">{errors.resume}</p>
          ) : (
            <p className="mt-2 text-xs text-fg/40">
              Required for applications. Only PDF / DOC / DOCX up to 2 MB.
            </p>
          )}
        </div>
      ) : null}

      {statusMessage ? (
        <div
          role="status"
          className={cn(
            "mt-5 flex gap-3 rounded-xl border px-4 py-3 text-sm leading-relaxed",
            status === "success" && "border-cyan/30 bg-cyan/10 text-cyan-soft",
            status === "error" && "border-red-400/30 bg-red-400/10 text-red-200",
          )}
        >
          {status === "success" ? (
            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
          ) : null}
          <p>{statusMessage}</p>
        </div>
      ) : null}

      <div className="mt-6">
        <Button
          type="submit"
          size="lg"
          className="w-full sm:w-auto"
          disabled={status === "submitting"}
        >
          {status === "submitting" ? "Sending..." : submitLabel}
          <Send className="h-4 w-4" aria-hidden="true" />
        </Button>
      </div>
    </form>
  );
}

type FieldProps = {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  type?: string;
  optional?: boolean;
  autoComplete?: string;
};

function Field({
  id,
  label,
  value,
  onChange,
  error,
  type = "text",
  optional,
  autoComplete,
}: FieldProps) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-sm font-medium text-fg/80">
        {label}
        {optional ? <span className="ml-1 font-normal text-fg/40">(optional)</span> : null}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        value={value}
        autoComplete={autoComplete}
        onChange={(event) => onChange(event.target.value)}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        className={cn(
          "h-11 w-full rounded-xl border bg-navy-elevated px-4 text-sm text-fg outline-none transition placeholder:text-fg/30 focus:border-cyan/50 focus:ring-2 focus:ring-cyan/30",
          error ? "border-red-400/60" : "border-fg/10",
        )}
      />
      {error ? (
        <p id={`${id}-error`} className="mt-2 text-sm text-red-300">
          {error}
        </p>
      ) : null}
    </div>
  );
}
