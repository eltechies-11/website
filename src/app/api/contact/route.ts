import { Resend } from "resend";
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

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

async function sendWithResend(options: {
  toEmail: string;
  subject: string;
  name: string;
  email: string;
  message: string;
  company?: string;
  role?: string;
  resume: File | null;
}) {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  if (!apiKey) {
    return {
      ok: false as const,
      error:
        "Career email is not configured yet (missing RESEND_API_KEY). Please email career@eltechies.com directly for now.",
    };
  }

  const from =
    process.env.RESEND_FROM_EMAIL?.trim() ||
    `${siteConfig.name} Careers <onboarding@resend.dev>`;

  const rows = [
    ["Inquiry type", "Career"],
    ["Name", options.name],
    ["Email", options.email],
    ["Role", options.role || "Not provided"],
    ["Message", options.message],
  ];

  const html = `
    <div style="font-family: ui-sans-serif, system-ui, sans-serif; line-height: 1.5;">
      <h2 style="margin: 0 0 12px;">New career application</h2>
      <table style="border-collapse: collapse; width: 100%; max-width: 640px;">
        ${rows
          .map(
            ([label, value]) => `
          <tr>
            <td style="padding: 8px 10px; border: 1px solid #e5e7eb; font-weight: 600; width: 140px; vertical-align: top;">${escapeHtml(label)}</td>
            <td style="padding: 8px 10px; border: 1px solid #e5e7eb; white-space: pre-wrap;">${escapeHtml(value)}</td>
          </tr>`,
          )
          .join("")}
      </table>
    </div>
  `;

  const attachments =
    options.resume && options.resume.size > 0
      ? [
          {
            filename: options.resume.name || "resume.pdf",
            content: Buffer.from(await options.resume.arrayBuffer()),
          },
        ]
      : undefined;

  const resend = new Resend(apiKey);
  const result = await resend.emails.send({
    from,
    to: [options.toEmail],
    replyTo: options.email,
    subject: options.subject,
    html,
    attachments,
  });

  if (result.error) {
    return {
      ok: false as const,
      error: result.error.message || "Unable to send career application email.",
    };
  }

  return { ok: true as const };
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
  const subject =
    type === "career"
      ? `${config.subjectPrefix} Application from ${name} — ${siteConfig.name}`
      : `${config.subjectPrefix} Inquiry from ${name} — ${siteConfig.name}`;

  // Careers use Resend (FormSubmit activation emails often never arrive for career@).
  if (type === "career") {
    try {
      const result = await sendWithResend({
        toEmail,
        subject,
        name,
        email,
        message,
        role,
        resume,
      });

      if (!result.ok) {
        return NextResponse.json({ ok: false, error: result.error }, { status: 502 });
      }

      return NextResponse.json({
        ok: true,
        message: "Application sent successfully. We’ll review your resume and get back to you.",
      });
    } catch {
      return NextResponse.json(
        {
          ok: false,
          error: `Unable to send your application right now. Please email ${toEmail}.`,
        },
        { status: 502 },
      );
    }
  }

  // Sales stays on browser FormSubmit; this API path is a fallback only.
  return NextResponse.json(
    {
      ok: false,
      error: `Please submit sales inquiries from the website form. Or email ${toEmail}.`,
    },
    { status: 400 },
  );
}
