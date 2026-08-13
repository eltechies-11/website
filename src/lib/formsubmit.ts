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

/**
 * Browser-side FormSubmit submit.
 * Vercel server IPs are often blocked by FormSubmit/Cloudflare, so the
 * form posts directly from the visitor's browser instead of /api/contact.
 */
export async function submitInquiry(
  input: SubmitInquiryInput,
): Promise<SubmitInquiryResult> {
  const toEmail =
    input.type === "career" ? siteConfig.emails.career : siteConfig.emails.sales;
  const label = input.type === "career" ? "Career" : "Sales";
  const subjectPrefix = input.type === "career" ? "[Career]" : "[Sales]";

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
    if (input.resume) {
      formData.set("attachment", input.resume, input.resume.name);
    }
  }

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

  const providerMessage = data?.message?.trim() || "";
  const successFlag = data?.success;
  const isSuccess = successFlag === true || successFlag === "true";

  if (isActivationMessage(providerMessage) || isActivationMessage(rawText)) {
    return {
      ok: true,
      activationRequired: true,
      message: `Almost there — check ${toEmail} for FormSubmit’s activation email and click Activate Form (needed once for this website). After that, ${label.toLowerCase()} messages will arrive normally.`,
    };
  }

  if (!response.ok || !isSuccess) {
    return {
      ok: false,
      message:
        providerMessage ||
        `Unable to send your message right now. Please email ${toEmail}.`,
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
