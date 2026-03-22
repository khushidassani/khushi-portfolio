import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const { name, time } = await request.json();

    await resend.emails.send({
      from: "Portfolio Tracker <onboarding@resend.dev>",
      to: "khushidassani5@gmail.com",
      subject: `${name} just viewed your portfolio`,
      html: `
        <div style="font-family:Georgia,serif;max-width:480px;margin:0 auto;padding:32px;background:#F5F0E8;color:#2C2520;">
          <p style="font-size:11px;letter-spacing:0.3em;text-transform:uppercase;color:#7A8C6E;margin-bottom:24px;">Portfolio Tracker</p>
          <h2 style="font-size:28px;font-weight:300;margin-bottom:8px;">${name}</h2>
          <p style="font-size:14px;color:rgba(44,37,32,0.6);margin-bottom:24px;">opened your portfolio link</p>
          <p style="font-size:12px;color:rgba(44,37,32,0.4);border-top:1px solid rgba(44,37,32,0.1);padding-top:16px;">${new Date(time).toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long", year: "numeric" })} at ${new Date(time).toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" })}</p>
        </div>
      `,
    });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
