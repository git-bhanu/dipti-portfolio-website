import type { D1Database, SubmissionRow } from '../_shared';
import { toCsv, escapeHtml } from '../_shared';

interface Env {
  dipti_contact_db: D1Database;
  TELEGRAM_BOT_TOKEN: string;
  TELEGRAM_CHAT_ID: string;
  TELEGRAM_WEBHOOK_SECRET?: string;
}

interface TelegramUpdate {
  message?: {
    chat?: { id?: number | string };
    text?: string;
  };
}

type PagesFunction<E> = (context: { request: Request; env: E }) => Promise<Response> | Response;

const ok = () => new Response('ok');

async function logIfFailed(label: string, res: Response) {
  if (!res.ok) console.error(label, res.status, await res.text());
}

async function sendText(token: string, chatId: string | number, text: string) {
  const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chat_id: chatId, text, parse_mode: 'HTML' }),
  });
  await logIfFailed('sendMessage failed', res);
}

async function sendCsv(token: string, chatId: string | number, filename: string, csv: string) {
  const form = new FormData();
  form.append('chat_id', String(chatId));
  form.append('document', new Blob([csv], { type: 'text/csv' }), filename);
  const res = await fetch(`https://api.telegram.org/bot${token}/sendDocument`, { method: 'POST', body: form });
  await logIfFailed('sendDocument failed', res);
}

function formatInquiry(row: SubmissionRow, index: number): string {
  const lines = [
    `${index + 1}. <b>${escapeHtml(row.name)}</b> — ${escapeHtml(row.phone)}`,
    `   ${escapeHtml(row.email)}`,
    `   ${escapeHtml(row.services)} · ${escapeHtml(row.budget)}`,
  ];
  if (row.message) lines.push(`   "${escapeHtml(row.message)}"`);
  return lines.join('\n');
}

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  if (env.TELEGRAM_WEBHOOK_SECRET) {
    const header = request.headers.get('X-Telegram-Bot-Api-Secret-Token');
    if (header !== env.TELEGRAM_WEBHOOK_SECRET) {
      return new Response('Unauthorized', { status: 401 });
    }
  }

  let update: TelegramUpdate;
  try {
    update = await request.json();
  } catch {
    return ok();
  }

  const chatId = update.message?.chat?.id;
  const text = (update.message?.text ?? '').trim();
  if (!chatId || !text) return ok();

  const allowlist = (env.TELEGRAM_CHAT_ID ?? '')
    .split(',')
    .map((id) => id.trim())
    .filter(Boolean);
  if (!allowlist.includes(String(chatId))) return ok();

  const command = text.split(/\s+/)[0].toLowerCase();

  try {
    if (command === '/csv' || command === '/export') {
      const { results } = await env.dipti_contact_db
        .prepare('SELECT * FROM submissions ORDER BY id DESC')
        .all<SubmissionRow>();

      if (results.length === 0) {
        await sendText(env.TELEGRAM_BOT_TOKEN, chatId, 'No inquiries yet.');
      } else {
        const filename = `submissions-${new Date().toISOString().slice(0, 10)}.csv`;
        await sendCsv(env.TELEGRAM_BOT_TOKEN, chatId, filename, toCsv(results));
      }
    } else if (command === '/today') {
      const { results } = await env.dipti_contact_db
        .prepare("SELECT * FROM submissions WHERE date(created_at) = date('now') ORDER BY id DESC")
        .all<SubmissionRow>();

      if (results.length === 0) {
        await sendText(env.TELEGRAM_BOT_TOKEN, chatId, 'No inquiries today.');
      } else {
        const body = results.map((row, i) => formatInquiry(row, i)).join('\n\n');
        await sendText(env.TELEGRAM_BOT_TOKEN, chatId, `<b>Today's inquiries (${results.length})</b>\n\n${body}`);
      }
    } else if (command === '/start' || command === '/help') {
      await sendText(
        env.TELEGRAM_BOT_TOKEN,
        chatId,
        ['<b>Commands</b>', '/today — inquiries received today', '/csv — export all inquiries as a CSV file'].join('\n')
      );
    }
  } catch (err) {
    console.error('Command handling failed', command, err);
    await sendText(env.TELEGRAM_BOT_TOKEN, chatId, 'Something went wrong handling that command.').catch(() => {});
  }

  return ok();
};
