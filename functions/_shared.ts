export interface D1PreparedStatement {
  bind(...values: unknown[]): D1PreparedStatement;
  run(): Promise<unknown>;
  all<T = unknown>(): Promise<{ results: T[]; success: boolean }>;
}

export interface D1Database {
  prepare(query: string): D1PreparedStatement;
}

export interface SubmissionRow {
  id: number;
  name: string;
  email: string;
  phone: string;
  services: string;
  budget: string;
  message: string | null;
  call_me: number;
  created_at: string;
}

const CSV_COLUMNS: (keyof SubmissionRow)[] = [
  'id',
  'name',
  'email',
  'phone',
  'services',
  'budget',
  'message',
  'call_me',
  'created_at',
];

function escapeCsv(value: unknown): string {
  const s = String(value ?? '');
  return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
}

export function toCsv(rows: SubmissionRow[]): string {
  const lines = [CSV_COLUMNS.join(',')];
  for (const row of rows) {
    lines.push(CSV_COLUMNS.map((col) => escapeCsv(row[col])).join(','));
  }
  return lines.join('\n');
}

export function escapeHtml(value: string): string {
  return value.replace(/[&<>]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' })[c] ?? c);
}
