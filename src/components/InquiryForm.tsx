"use client";

import { FormEvent, useState } from "react";
import { CheckCircle2, Send } from "lucide-react";
import type { InquiryType } from "@/content/site";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

type FormState = {
  name: string;
  email: string;
  company: string;
  role: string;
  message: string;
};

type FormErrors = Partial<Record<keyof FormState, string>>;

const initialState: FormState = {
  name: "",
  email: "",
  company: "",
  role: "",
  message: "",
};

function validate(values: FormState): FormErrors {
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

  return errors;
}

type InquiryFormProps = {
  type: InquiryType;
  messagePlaceholder: string;
  submitLabel: string;
  fallbackEmail: string;
  idPrefix: string;
};

export function InquiryForm({
  type,
  messagePlaceholder,
  submitLabel,
  fallbackEmail,
  idPrefix,
}: InquiryFormProps) {
  const [values, setValues] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [statusMessage, setStatusMessage] = useState("");

  const onChange = (field: keyof FormState, value: string) => {
    setValues((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors = validate(values);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    setStatus("submitting");
    setStatusMessage("");

    try {
      const response = await fetch("/api/contact", {
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
          role: values.role.trim() || undefined,
          message: values.message.trim(),
        }),
      });

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
      setValues(initialState);
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
      className="rounded-2xl border border-white/10 bg-navy p-5 sm:p-7"
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
          <Field
            id={`${idPrefix}-role`}
            label="Role interest"
            optional
            value={values.role}
            onChange={(value) => onChange("role", value)}
          />
        )}
      </div>

      <div className="mt-5">
        <label
          htmlFor={`${idPrefix}-message`}
          className="mb-2 block text-sm font-medium text-white/80"
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
            "w-full resize-y rounded-xl border bg-navy-elevated px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/30 focus:border-cyan/50 focus:ring-2 focus:ring-cyan/30",
            errors.message ? "border-red-400/60" : "border-white/10",
          )}
          placeholder={messagePlaceholder}
        />
        {errors.message ? (
          <p id={`${idPrefix}-message-error`} className="mt-2 text-sm text-red-300">
            {errors.message}
          </p>
        ) : null}
      </div>

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
      <label htmlFor={id} className="mb-2 block text-sm font-medium text-white/80">
        {label}
        {optional ? <span className="ml-1 font-normal text-white/40">(optional)</span> : null}
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
          "h-11 w-full rounded-xl border bg-navy-elevated px-4 text-sm text-white outline-none transition placeholder:text-white/30 focus:border-cyan/50 focus:ring-2 focus:ring-cyan/30",
          error ? "border-red-400/60" : "border-white/10",
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
