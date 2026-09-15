"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getSession, isAdmin } from "./auth";
import { ensureSchema, getSql } from "./db";
import { getArticle } from "./articles";

export type ImageInput = {
  url: string;
  caption: string;
  isMain: boolean;
};

function parseImages(raw: string): ImageInput[] {
  try {
    const parsed = JSON.parse(raw) as ImageInput[];
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((item) => item.url);
  } catch {
    return [];
  }
}

export async function saveArticle(formData: FormData) {
  const user = await getSession();
  if (!user) redirect("/admin/login");

  const idValue = String(formData.get("id") ?? "");
  const id = idValue ? Number(idValue) : null;
  const title = String(formData.get("title") ?? "").trim();
  const subtitle = String(formData.get("subtitle") ?? "").trim();
  const body = String(formData.get("body") ?? "").trim();
  const categoryId = Number(formData.get("categoryId"));
  const featuredRequested = String(formData.get("featured") ?? "") === "on";
  const images = parseImages(String(formData.get("images") ?? "[]"));

  if (!title || !body || !categoryId) {
    return { error: "יש למלא כותרת, תוכן ומדור" };
  }

  await ensureSchema();
  const sql = getSql();

  if (id) {
    const existing = await getArticle(id);
    if (!existing) return { error: "הכתבה לא נמצאה" };
    const own = existing.author_id === user.id;
    if (!isAdmin(user) && (!own || !user.canEdit)) {
      return { error: "אין הרשאה לערוך את הכתבה" };
    }
    const featured = isAdmin(user) ? featuredRequested : existing.featured;
    if (featured) {
      await sql`UPDATE articles SET featured = false WHERE featured = true AND id <> ${id}`;
    }
    await sql`
      UPDATE articles
      SET title = ${title},
          subtitle = ${subtitle || null},
          body = ${body},
          category_id = ${categoryId},
          featured = ${featured},
          updated_at = NOW()
      WHERE id = ${id}
    `;
    await sql`DELETE FROM article_images WHERE article_id = ${id}`;
    await insertImages(id, images);
    revalidatePath("/");
    revalidatePath(`/article/${id}`);
    redirect(`/article/${id}`);
  }

  if (!isAdmin(user) && !user.canAdd) {
    return { error: "אין הרשאה להוסיף כתבה" };
  }

  const featured = isAdmin(user) ? featuredRequested : false;
  const rows = await sql<{ id: number }[]>`
    INSERT INTO articles (title, subtitle, body, category_id, author_id, featured)
    VALUES (${title}, ${subtitle || null}, ${body}, ${categoryId}, ${user.id}, ${featured})
    RETURNING id
  `;
  const newId = rows[0].id;
  if (featured) {
    await sql`UPDATE articles SET featured = false WHERE featured = true AND id <> ${newId}`;
    await sql`UPDATE articles SET featured = true WHERE id = ${newId}`;
  }
  await insertImages(newId, images);
  revalidatePath("/");
  revalidatePath(`/article/${newId}`);
  redirect(`/article/${newId}`);
}

async function insertImages(articleId: number, images: ImageInput[]) {
  if (!images.length) return;
  const sql = getSql();
  let mainSet = false;
  for (const [index, image] of images.entries()) {
    const isMain = !mainSet && (image.isMain || index === 0);
    if (isMain) mainSet = true;
    await sql`
      INSERT INTO article_images (article_id, url, caption, sort_order, is_main)
      VALUES (${articleId}, ${image.url}, ${image.caption || null}, ${index}, ${isMain})
    `;
  }
}

export async function deleteArticle(formData: FormData): Promise<void> {
  const user = await getSession();
  if (!user) redirect("/admin/login");
  const id = Number(formData.get("id"));
  const existing = await getArticle(id);
  if (!existing) return;
  const own = existing.author_id === user.id;
  if (!isAdmin(user) && (!own || !user.canDelete)) {
    return;
  }
  await ensureSchema();
  const sql = getSql();
  await sql`DELETE FROM articles WHERE id = ${id}`;
  revalidatePath("/");
  redirect("/admin");
}
