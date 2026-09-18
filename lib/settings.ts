import { ensureSchema, getSql } from "./db";

export async function isSiteActive() {
  await ensureSchema();
  const sql = getSql();
  const rows = await sql<{ site_active: boolean }[]>`
    SELECT site_active FROM site_settings WHERE id = 1 LIMIT 1
  `;
  return rows[0]?.site_active !== false;
}
