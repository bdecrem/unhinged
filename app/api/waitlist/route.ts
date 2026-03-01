import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { email } = await req.json();

  if (!email || !email.includes("@")) {
    return NextResponse.json({ error: "invalid email" }, { status: 400 });
  }

  // TODO: connect to an email service (Resend, Mailchimp, etc.)
  console.log("waitlist signup:", email);

  return NextResponse.json({ ok: true });
}
