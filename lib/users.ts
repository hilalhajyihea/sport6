import { ensureSchema, getSql } from "./db";

export type Writer = {
  id: number;
  username: string;
  display_name: string;
  photo_url: string | null;
  bio: string | null;
  role: "admin" | "writer";
  can_add: boolean;
  can_edit: boolean;
  can_delete: boolean;
  created_at: string;
};

export async function countUsers() {
  await ensureSchema();
  const sql = getSql();
  const rows = await sql<{ count: string }[]>`SELECT COUNT(*)::text AS count FROM users`;
  return Number(rows[0]?.count ?? 0);
}

export async function getUserByUsername(username: string) {
  await ensureSchema();
  const sql = getSql();
  const rows = await sql<(Writer & { password_hash: string })[]>`
    SELECT id, username, password_hash, display_name, photo_url, bio, role, can_add, can_edit, can_delete, created_at
    FROM users
    WHERE username = ${username}
    LIMIT 1
  `;
  return rows[0] ?? null;
}

export async function getUserById(id: number) {
  await ensureSchema();
  const sql = getSql();
  const rows = await sql<Writer[]>`
    SELECT id, username, display_name, photo_url, bio, role, can_add, can_edit, can_delete, created_at
    FROM users
    WHERE id = ${id}
    LIMIT 1
  `;
  return rows[0] ?? null;
}

export async function listWriters() {
  await ensureSchema();
  const sql = getSql();
  return sql<Writer[]>`
    SELECT id, username, display_name, photo_url, bio, role, can_add, can_edit, can_delete, created_at
    FROM users
    ORDER BY role DESC, display_name ASC
  `;
}
