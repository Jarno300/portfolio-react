/// <reference path="../../src/types/cloudflare.d.ts" />
import { EmailMessage } from "cloudflare:email";

interface ContactPayload {
  name: string;
  email: string;
  subject?: string;
  message: string;
}

interface Env {
  CONTACT_EMAIL: {
    send: (message: EmailMessage) => Promise<void>;
  };
  CONTACT_FROM: string;
  CONTACT_TO: string;
}

const jsonResponse = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  let payload: ContactPayload;

  try {
    payload = await request.json();
  } catch {
    return jsonResponse({ error: "Invalid JSON payload." }, 400);
  }

  const name = payload.name?.trim();
  const email = payload.email?.trim();
  const subject = payload.subject?.trim() || "Portfolio contact";
  const message = payload.message?.trim();

  if (!name || !email || !message) {
    return jsonResponse(
      { error: "Name, email, and message are required." },
      400,
    );
  }

  if (!env.CONTACT_FROM || !env.CONTACT_TO) {
    return jsonResponse(
      { error: "Email configuration is missing." },
      500,
    );
  }

  const body = [`Name: ${name}`, `Email: ${email}`, "", message].join("\n");
  const raw = [
    `From: Portfolio Contact <${env.CONTACT_FROM}>`,
    `To: ${env.CONTACT_TO}`,
    `Subject: ${subject}`,
    "MIME-Version: 1.0",
    "Content-Type: text/plain; charset=UTF-8",
    "",
    body,
  ].join("\r\n");

  const emailMessage = new EmailMessage(
    env.CONTACT_FROM,
    env.CONTACT_TO,
    raw,
  );

  try {
    await env.CONTACT_EMAIL.send(emailMessage);
  } catch (error) {
    return jsonResponse(
      { error: error instanceof Error ? error.message : "Send failed." },
      500,
    );
  }

  return jsonResponse({ ok: true });
};
