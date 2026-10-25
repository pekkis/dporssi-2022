import { NextResponse } from "next/server";

// Verifies a reCAPTCHA token with Google; returns Google's answer (with the score).
export async function POST(request: Request) {
  const body = await request.json().catch(() => undefined);
  if (!body) {
    return NextResponse.json({ errore: "fatale" }, { status: 500 });
  }

  const res = await fetch("https://www.google.com/recaptcha/api/siteverify", {
    method: "POST",
    body: new URLSearchParams({
      secret: process.env.CAPTCHA_ADMIN_SECRET ?? "",
      response: body.token ?? ""
    })
  });

  return NextResponse.json(await res.json());
}
