import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const { name, email, subject, message } = await request.json();

    await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: "khushidassani5@gmail.com",
      reply_to: email,
      subject: subject ? `${subject} — from ${name}` : `New message from ${name}`,
      html: `
        <div style="font-family:Georgia,serif;max-width:520px;margin:0 auto;padding:32px;background:#F5F0E8;color:#2C2520;">
          <p style="font-size:11px;letter-spacing:0.3em;text-transform:uppercase;color:#7A8C6E;margin-bottom:24px;">Portfolio Contact</p>
          <h2 style="font-size:28px;font-weight:300;margin-bottom:4px;">${name}</h2>
          <p style="font-size:14px;color:rgba(44,37,32,0.5);margin-bottom:24px;">${email}</p>
          ${subject ? `<p style="font-size:13px;letter-spacing:0.1em;text-transform:uppercase;color:#6B1F2A;margin-bottom:16px;">${subject}</p>` : ""}
          <p style="font-size:16px;line-height:1.7;white-space:pre-wrap;border-top:1px solid rgba(44,37,32,0.1);padding-top:20px;">${message}</p>
        </div>
      `,
    });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
