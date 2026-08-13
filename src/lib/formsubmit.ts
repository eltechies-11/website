import { siteConfig, type InquiryType } from "@/content/site";

type SubmitInquiryInput = {
  type: InquiryType;
  name: string;
  email: string;
  message: string;
  company?: string;
  role?: string;
  resume?: File | null;
};

export type SubmitInquiryResult = {
  ok: boolean;
  activationRequired?: boolean;
  message: string;
};

function isActivationMessage(message: unknown) {
  if (typeof message !== "string") return false;
  const lower = message.toLowerCase();
  return lower.includes("activation") || lower.includes("activate form");
}

function isSuccessFlag(success: unknown) {
  return success === true || success === "true";
}

async function postToFormSubmit(toEmail: string, formData: FormData) {
  const response = await fetch(
    `https://formsubmit.co/ajax/${encodeURIComponent(toEmail)}`,
    {
      method: "POST",
      headers: { Accept: "application/json" },
      body: formData,
    },
  );

  const rawText = await response.text();
  let data: { success?: string | boolean; message?: string } | null = null;
  try {
    data = JSON.parse(rawText) as { success?: string | boolean; message?: string };
  } catch {
    data = null;
  }

  return {
    response,
    rawText,
    data,
    providerMessage: data?.message?.trim() || "",
    ok: response.ok && isSuccessFlag(data?.success),
  };
}

/**
 * Browser-side FormSubmit submit.
 * Vercel server IPs are often blocked by FormSubmit/Cloudflare, so the
 * form posts directly from the visitor's browser instead of /api/contact.
 *
 * Career applications use the already-activated sales@ FormSubmit endpoint
 * (with career@ on CC) because FormSubmit activates per recipient email, and
 * career@ still returns "needs Activation" on the live domain.
 */
export async function submitInquiry(
  input: SubmitInquiryInput,
): Promise<SubmitInquiryResult> {
  const label = input.type === "career" ? "Career" : "Sales";
  const subjectPrefix = input.type === "career" ? "[Career]" : "[Sales]";
  const notifyEmail =
    input.type === "career" ? siteConfig.emails.career : siteConfig.emails.sales;

  // Sales endpoint is activated on eltechies.com. Career uses it as transport
  // so applicants aren't blocked by a second FormSubmit activation.
  const formSubmitEmail = siteConfig.emails.sales;

  const subject =
    input.type === "career"
      ? `${subjectPrefix} Application from ${input.name} — ${siteConfig.name}`
      : `${subjectPrefix} Inquiry from ${input.name} — ${siteConfig.name}`;

  const formData = new FormData();
  formData.set("Inquiry_Type", label);
  formData.set("name", input.name);
  formData.set("email", input.email);
  formData.set("message", input.message);
  formData.set("_subject", subject);
  formData.set("_template", "table");
  formData.set("_replyto", input.email);
  formData.set("_captcha", "false");

  if (input.type === "sales") {
    formData.set("company", input.company?.trim() || "Not provided");
  } else {
    formData.set("role_interest", input.role?.trim() || "Not provided");
    formData.set("Notify_Team", siteConfig.emails.career);
    formData.set("_cc", siteConfig.emails.career);
    if (input.resume) {
      formData.set("attachment", input.resume, input.resume.name);
    }
  }

  const primary = await postToFormSubmit(formSubmitEmail, formData);

  if (isActivationMessage(primary.providerMessage) || isActivationMessage(primary.rawText)) {
    return {
      ok: false,
      activationRequired: true,
      message: `FormSubmit still needs a one-time Activate Form click for ${formSubmitEmail}. Check that inbox (and spam), activate, then try again. Or email ${notifyEmail} directly.`,
    };
  }

  if (!primary.ok) {
    return {
      ok: false,
      message:
        primary.providerMessage ||
        `Unable to send your message right now. Please email ${notifyEmail}.`,
    };
  }

  return {
    ok: true,
    message:
      input.type === "career"
        ? "Application sent successfully. We’ll review your resume and get back to you."
        : "Message sent successfully.",
  };
}
