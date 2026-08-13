import { NextResponse } from "next/server";
import { siteConfig, type InquiryType } from "@/content/site";
import { validateResumeFile } from "@/lib/resume";

type ContactPayload = {
  name?: string;
  email?: string;
  company?: string;
  role?: string;
  message?: string;
  type?: InquiryType;
};

const inquiryConfig: Record<
  InquiryType,
  { email: string; envKey: string; label: string; subjectPrefix: string }
> = {
  sales: {
    email: siteConfig.emails.sales,
    envKey: "SALES_EMAIL",
    label: "Sales",
    subjectPrefix: "[Sales]",
  },
  career: {
    email: siteConfig.emails.career,
    envKey: "CAREER_EMAIL",
    label: "Career",
    subjectPrefix: "[Career]",
  },
};

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function resolveType(value: unknown): InquiryType {
  return value === "career" ? "career" : "sales";
}

function canonicalOrigin(request: Request) {
  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL?.trim().replace(/\/$/, "");
  if (fromEnv) return fromEnv;

  const requestOrigin = request.headers.get("origin")?.replace(/\/$/, "");
  if (requestOrigin?.includes("localhost") || requestOrigin?.includes("127.0.0.1")) {
    return requestOrigin;
  }

  return siteConfig.url.replace(/\/$/, "");
}

function isActivationMessage(message: unknown) {
  if (typeof message !== "string") return false;
  const lower = message.toLowerCase();
  return lower.includes("activation") || lower.includes("activate form");
}

async function parseRequest(request: Request): Promise<{
  type: InquiryType;
  name: string;
  email: string;
  company: string;
  role: string;
  message: string;
  resume: File | null;
}> {
  const contentType = request.headers.get("content-type") || "";

  if (contentType.includes("multipart/form-data")) {
    const form = await request.formData();
    const resumeValue = form.get("resume");
    return {
      type: resolveType(form.get("type")),
      name: String(form.get("name") ?? "").trim(),
      email: String(form.get("email") ?? "").trim(),
      company: String(form.get("company") ?? "").trim(),
      role: String(form.get("role") ?? "").trim(),
      message: String(form.get("message") ?? "").trim(),
      resume: resumeValue instanceof File ? resumeValue : null,
    };
  }

  const body = (await request.json()) as ContactPayload;
  return {
    type: resolveType(body.type),
    name: body.name?.trim() ?? "",
    email: body.email?.trim() ?? "",
    company: body.company?.trim() ?? "",
    role: body.role?.trim() ?? "",
    message: body.message?.trim() ?? "",
    resume: null,
  };
}

export async function POST(request: Request) {
  let parsed: Awaited<ReturnType<typeof parseRequest>>;

  try {
    parsed = await parseRequest(request);
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request body." }, { status: 400 });
  }

  const { type, name, email, company, role, message, resume } = parsed;
  const config = inquiryConfig[type];

  if (!name || !email || !message) {
    return NextResponse.json(
      { ok: false, error: "Name, email, and message are required." },
      { status: 400 },
    );
  }

  if (!isValidEmail(email)) {
    return NextResponse.json({ ok: false, error: "Invalid email address." }, { status: 400 });
  }

  if (message.length < 10) {
    return NextResponse.json(
      { ok: false, error: "Message must be at least 10 characters." },
      { status: 400 },
    );
  }

  if (type === "career") {
    const resumeError = validateResumeFile(resume);
    if (resumeError) {
      return NextResponse.json({ ok: false, error: resumeError }, { status: 400 });
    }
  }

  const toEmail = process.env[config.envKey]?.trim() || config.email;
  const origin = canonicalOrigin(request);
  const referer = `${origin}/`;

  const subject =
    type === "career"
      ? `${config.subjectPrefix} Application from ${name} — ${siteConfig.name}`
      : `${config.subjectPrefix} Inquiry from ${name} — ${siteConfig.name}`;

  try {
    const outbound = new FormData();
    outbound.set("Inquiry_Type", config.label);
    outbound.set("name", name);
    outbound.set("email", email);
    outbound.set("message", message);
    outbound.set("_subject", subject);
    outbound.set("_template", "table");
    outbound.set("_replyto", email);
    outbound.set("_captcha", "false");

    if (type === "sales") {
      outbound.set("company", company || "Not provided");
    } else {
      outbound.set("role_interest", role || "Not provided");
      if (resume) {
        outbound.set("attachment", resume, resume.name);
      }
    }

    const response = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(toEmail)}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        Origin: origin,
        Referer: referer,
      },
      body: outbound,
      signal: AbortSignal.timeout(20000),
    });

    const rawText = await response.text();
    let data: { success?: string | boolean; message?: string } | null = null;
    try {
      data = JSON.parse(rawText) as { success?: string | boolean; message?: string };
    } catch {
      data = null;
    }

    const successFlag = data?.success;
    const isSuccess = successFlag === true || successFlag === "true";
    const providerMessage = data?.message?.trim() || "";

    if (isActivationMessage(providerMessage) || isActivationMessage(rawText)) {
      return NextResponse.json({
        ok: true,
        activationRequired: true,
        message: `Almost there — check ${toEmail} for FormSubmit’s activation email and click Activate Form (needed once for ${origin}). After that, ${config.label.toLowerCase()} messages will arrive normally.`,
      });
    }

    if (!response.ok || !isSuccess) {
      return NextResponse.json(
        {
          ok: false,
          error:
            providerMessage ||
            `Unable to send your message right now. Please email ${toEmail}.`,
        },
        { status: 502 },
      );
    }

    return NextResponse.json({
      ok: true,
      message:
        type === "career"
          ? "Application sent successfully. We’ll review your resume and get back to you."
          : "Message sent successfully.",
    });
  } catch {
    return NextResponse.json(
      {
        ok: false,
        error: `Unable to send your message right now. Please email ${toEmail}.`,
      },
      { status: 502 },
    );
  }
}
