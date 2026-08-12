import { NextResponse } from "next/server";
import { siteConfig, type InquiryType } from "@/content/site";

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

export async function POST(request: Request) {
  let body: ContactPayload;

  try {
    body = (await request.json()) as ContactPayload;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON body." }, { status: 400 });
  }

  const type = resolveType(body.type);
  const config = inquiryConfig[type];
  const name = body.name?.trim() ?? "";
  const email = body.email?.trim() ?? "";
  const company = body.company?.trim() ?? "";
  const role = body.role?.trim() ?? "";
  const message = body.message?.trim() ?? "";

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

  const toEmail = process.env[config.envKey]?.trim() || config.email;
  const origin =
    request.headers.get("origin") ||
    process.env.NEXT_PUBLIC_SITE_URL?.trim() ||
    siteConfig.url;
  const referer = request.headers.get("referer") || `${origin}/`;

  const subject =
    type === "career"
      ? `${config.subjectPrefix} Application from ${name} — ${siteConfig.name}`
      : `${config.subjectPrefix} Inquiry from ${name} — ${siteConfig.name}`;

  try {
    const response = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(toEmail)}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Origin: origin,
        Referer: referer,
      },
      body: JSON.stringify({
        Inquiry_Type: config.label,
        name,
        email,
        ...(type === "sales"
          ? { company: company || "Not provided" }
          : { role_interest: role || "Not provided" }),
        message,
        _subject: subject,
        _template: "table",
        _replyto: email,
        _captcha: "false",
      }),
    });

    const data = (await response.json().catch(() => null)) as
      | { success?: string | boolean; message?: string }
      | null;

    const successFlag = data?.success;
    const isSuccess =
      response.ok && (successFlag === true || successFlag === "true");

    const needsActivation =
      typeof data?.message === "string" &&
      data.message.toLowerCase().includes("activation");

    if (needsActivation) {
      return NextResponse.json({
        ok: true,
        activationRequired: true,
        message: `Almost there — check ${toEmail} for FormSubmit’s activation email and click Activate Form. After that, ${config.label.toLowerCase()} messages will arrive normally.`,
      });
    }

    if (!isSuccess) {
      return NextResponse.json(
        {
          ok: false,
          error:
            data?.message ||
            `Unable to send your message right now. Please email ${toEmail}.`,
        },
        { status: 502 },
      );
    }

    return NextResponse.json({
      ok: true,
      message: "Message sent successfully.",
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
