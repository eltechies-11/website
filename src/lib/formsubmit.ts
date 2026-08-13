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
  return lower.includes("needs activation") || lower.includes("activate form");
}

function isSuccessFlag(success: unknown) {
  return success === true || success === "true";
}

function formSubmitEndpoint(type: InquiryType) {
  // Optional stable FormSubmit hash from an activation email (avoids flaky
  // re-activation loops). Example: NEXT_PUBLIC_CAREER_FORMSUBMIT_ID=c277d8d5...
  if (type === "career") {
    const hash = process.env.NEXT_PUBLIC_CAREER_FORMSUBMIT_ID?.trim();
    if (hash) return hash;
  }
  if (type === "sales") {
    const hash = process.env.NEXT_PUBLIC_SALES_FORMSUBMIT_ID?.trim();
    if (hash) return hash;
  }
  return type === "career" ? siteConfig.emails.career : siteConfig.emails.sales;
}

function buildSubject(type: InquiryType, name: string) {
  // Keep ASCII hyphen — FormSubmit has ignored React-controlled _subject before
  // and fell back to the domain’s first subject ([Sales]).
  const prefix = type === "career" ? "[Career]" : "[Sales]";
  return `${prefix} Inquiry from ${name} - ${siteConfig.name}`;
}

/**
 * Browser-side FormSubmit (same provider as the initial commit).
 * Posts from the visitor browser because Vercel server IPs are often blocked
 * by FormSubmit/Cloudflare.
 */
export async function submitInquiry(
  input: SubmitInquiryInput,
): Promise<SubmitInquiryResult> {
  const toEmail =
    input.type === "career" ? siteConfig.emails.career : siteConfig.emails.sales;
  const endpoint = formSubmitEndpoint(input.type);
  const label = input.type === "career" ? "Career" : "Sales";
  const subject = buildSubject(input.type, input.name);

  let response: Response;

  // Careers always use multipart so resume + _subject travel in the body
  // (FormSubmit often ignores HTML hidden _subject from React forms).
  if (input.type === "career") {
    const formData = new FormData();
    formData.set("_subject", subject);
    formData.set("_template", "table");
    formData.set("_captcha", "false");
    formData.set("_replyto", input.email);
    formData.set("_url", siteConfig.url);
    formData.set("Inquiry_Type", label);
    formData.set("name", input.name);
    formData.set("email", input.email);
    formData.set("message", input.message);
    formData.set("role_interest", input.role?.trim() || "Not provided");
    if (input.resume) {
      formData.set("attachment", input.resume, input.resume.name);
    }

    response = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(endpoint)}`, {
      method: "POST",
      headers: { Accept: "application/json" },
      body: formData,
    });
  } else {
    response = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(endpoint)}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        _subject: subject,
        _template: "table",
        _replyto: input.email,
        _captcha: "false",
        _url: siteConfig.url,
        Inquiry_Type: label,
        name: input.name,
        email: input.email,
        message: input.message,
        company: input.company?.trim() || "Not provided",
      }),
    });
  }

  const rawText = await response.text();
  let data: { success?: string | boolean; message?: string } | null = null;
  try {
    data = JSON.parse(rawText) as { success?: string | boolean; message?: string };
  } catch {
    data = null;
  }

  const providerMessage = data?.message?.trim() || "";
  const ok = response.ok && isSuccessFlag(data?.success);

  if (!ok && isActivationMessage(providerMessage)) {
    return {
      ok: false,
      activationRequired: true,
      message: `FormSubmit says ${toEmail} still needs activation for this live site. Search that inbox + spam for “FormSubmit” / “Activate Form”. If no email arrives, open the newest FormSubmit activation mail you ever got for this address and use the random form ID as NEXT_PUBLIC_CAREER_FORMSUBMIT_ID in Vercel (FormSubmit’s recommended fix), then redeploy.`,
    };
  }

  if (!ok) {
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
