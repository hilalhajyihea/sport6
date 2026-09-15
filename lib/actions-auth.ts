"use server";

import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";
import { clearSession, createSession, getSession, isAdmin } from "./auth";
import { ensureSchema, getSql } from "./db";
import { countUsers, getUserByUsername } from "./users";

export async function setupAdmin(formData: FormData) {
  const existing = await countUsers();
  if (existing > 0) {
    return { error: "כבר יש מנהל במערכת" };
  }
  const displayName = String(formData.get("displayName") ?? "").trim();
  const username = String(formData.get("username") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  if (!displayName || !username || password.length < 6) {
    return { error: "יש למלא שם, שם משתמש וסיסמה של לפחות 6 תווים" };
  }
  await ensureSchema();
  const sql = getSql();
  const hash = await bcrypt.hash(password, 12);
  const rows = await sql<{ id: number }[]>`
    INSERT INTO users (username, password_hash, display_name, role, can_add, can_edit, can_delete)
    VALUES (${username}, ${hash}, ${displayName}, 'admin', true, true, true)
    RETURNING id
  `;
  await createSession({
    id: rows[0].id,
    username,
    displayName,
    role: "admin",
    canAdd: true,
    canEdit: true,
    canDelete: true,
  });
  redirect("/admin");
}

export async function login(formData: FormData) {
  const username = String(formData.get("username") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  const user = await getUserByUsername(username);
  if (!user) {
    return { error: "שם משתמש או סיסמה שגויים" };
  }
  const ok = await bcrypt.compare(password, user.password_hash);
  if (!ok) {
    return { error: "שם משתמש או סיסמה שגויים" };
  }
  await createSession({
    id: user.id,
    username: user.username,
    displayName: user.display_name,
    role: user.role,
    canAdd: user.can_add,
    canEdit: user.can_edit,
    canDelete: user.can_delete,
  });
  redirect("/admin");
}

export async function logout() {
  await clearSession();
  redirect("/admin/login");
}

export async function requireUser() {
  const user = await getSession();
  if (!user) redirect("/admin/login");
  return user;
}

export async function requireAdmin() {
  const user = await requireUser();
  if (!isAdmin(user)) redirect("/admin");
  return user;
}
