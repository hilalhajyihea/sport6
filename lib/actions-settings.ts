"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "./actions-auth";
import { ensureSchema, getSql } from "./db";

export async function setSiteActive(formData: FormData) {
  await requireAdmin();
  const active = String(formData.get("active") ?? "") === "true";
  await ensureSchema();
  const sql = getSql();
  await sql`
    INSERT INTO site_settings (id, site_active)
    VALUES (1, ${active})
    ON CONFLICT (id) DO UPDATE SET site_active = ${active}
  `;
  revalidatePath("/", "layout");
  revalidatePath("/admin");
}
