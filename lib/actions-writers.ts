"use server";

import bcrypt from "bcryptjs";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin } from "./actions-auth";
import { ensureSchema, getSql } from "./db";
import { getUserById } from "./users";

export async function saveWriter(formData: FormData) {
  await requireAdmin();
  const idValue = String(formData.get("id") ?? "");
  const id = idValue ? Number(idValue) : null;
  const displayName = String(formData.get("displayName") ?? "").trim();
  const username = String(formData.get("username") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  const bio = String(formData.get("bio") ?? "").trim();
  const photoUrl = String(formData.get("photoUrl") ?? "").trim();
  const role = String(formData.get("role") ?? "writer") === "admin" ? "admin" : "writer";
  const canAdd = String(formData.get("canAdd") ?? "") === "on";
  const canEdit = String(formData.get("canEdit") ?? "") === "on";
  const canDelete = String(formData.get("canDelete") ?? "") === "on";

  if (!displayName || !username) {
    return { error: "יש למלא שם ושם משתמש" };
  }

  await ensureSchema();
  const sql = getSql();

  if (id) {
    const existing = await getUserById(id);
    if (!existing) return { error: "הכתב לא נמצא" };
    if (password) {
      if (password.length < 6) return { error: "סיסמה חדשה חייבת לפחות 6 תווים" };
      const hash = await bcrypt.hash(password, 12);
      await sql`
        UPDATE users
        SET display_name = ${displayName},
            username = ${username},
            password_hash = ${hash},
            bio = ${bio || null},
            photo_url = ${photoUrl || null},
            role = ${role},
            can_add = ${canAdd},
            can_edit = ${canEdit},
            can_delete = ${canDelete}
        WHERE id = ${id}
      `;
    } else {
      await sql`
        UPDATE users
        SET display_name = ${displayName},
            username = ${username},
            bio = ${bio || null},
            photo_url = ${photoUrl || null},
            role = ${role},
            can_add = ${canAdd},
            can_edit = ${canEdit},
            can_delete = ${canDelete}
        WHERE id = ${id}
      `;
    }
    revalidatePath("/admin/writers");
    redirect("/admin/writers");
  }

  if (password.length < 6) {
    return { error: "יש לבחור סיסמה של לפחות 6 תווים" };
  }
  const hash = await bcrypt.hash(password, 12);
  try {
    await sql`
      INSERT INTO users (username, password_hash, display_name, photo_url, bio, role, can_add, can_edit, can_delete)
      VALUES (${username}, ${hash}, ${displayName}, ${photoUrl || null}, ${bio || null}, ${role}, ${canAdd}, ${canEdit}, ${canDelete})
    `;
  } catch {
    return { error: "שם המשתמש כבר קיים" };
  }
  revalidatePath("/admin/writers");
  redirect("/admin/writers");
}

export async function deleteWriter(formData: FormData): Promise<void> {
  const admin = await requireAdmin();
  const id = Number(formData.get("id"));
  if (id === admin.id) {
    return;
  }
  await ensureSchema();
  const sql = getSql();
  try {
    await sql`DELETE FROM users WHERE id = ${id}`;
  } catch {
    return;
  }
  revalidatePath("/admin/writers");
  redirect("/admin/writers");
}
