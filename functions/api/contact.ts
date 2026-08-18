import type { D1Database } from '../_shared';
import { escapeHtml } from '../_shared';

interface Env {
  dipti_contact_db: D1Database;
  TELEGRAM_BOT_TOKEN?: string;
  TELEGRAM_CHAT_ID?: string;
}

interface ContactPayload {
  name: string;
  email: string;
  phone: string;
  services: string[];
  budget: string;
  message: string;
  callMe: boolean;
}

type PagesFunction<E> = (context: { request: Request; env: E }) => Promise<Response> | Response;

function json(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), { status, headers: { 'Content-Type': 'application/json' } });
}

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  let payload: Partial<ContactPayload>;
  try {
    payload = await request.json();
  } catch {
    return json({ error: 'Invalid JSON' }, 400);
  }

  const { name, email = '', phone = '', services = [], budget = '', message = '', callMe = false } = payload;
  if (!name || (callMe ? !phone : !email)) {
    return json({ error: 'Missing required fields' }, 400);
  }

  try {
    await env.dipti_contact_db.prepare(
      'INSERT INTO submissions (name, email, phone, services, budget, message, call_me) VALUES (?, ?, ?, ?, ?, ?, ?)'
    )
      .bind(name, email, phone, services.join(', '), budget, message, callMe ? 1 : 0)
      .run();
  } catch (err) {
    console.error('D1 insert failed', err);
    return json({ error: 'Could not save submission' }, 500);
  }

  if (env.TELEGRAM_BOT_TOKEN && env.TELEGRAM_CHAT_ID) {
    const text = [
      '<b>New project inquiry</b>',
      `Name: ${escapeHtml(name)}`,
      `Email: ${escapeHtml(email)}`,
      `Phone: ${escapeHtml(phone)}`,
      `Services: ${escapeHtml(services.join(', '))}`,
      `Budget: ${escapeHtml(budget)}`,
      `Call me: ${callMe ? 'Yes' : 'No'}`,
      message ? `\n${escapeHtml(message)}` : '',
    ].join('\n');

    const chatIds = env.TELEGRAM_CHAT_ID.split(',').map((id) => id.trim()).filter(Boolean);

    await Promise.all(
      chatIds.map(async (chatId) => {
        try {
          const res = await fetch(`https://api.telegram.org/bot${env.TELEGRAM_BOT_TOKEN}/sendMessage`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ chat_id: chatId, text, parse_mode: 'HTML' }),
          });
          if (!res.ok) {
            console.error('Telegram notify failed', chatId, res.status, await res.text());
          }
        } catch (err) {
          console.error('Telegram notify failed', chatId, err);
        }
      })
    );
  }

  return json({ ok: true });
};
