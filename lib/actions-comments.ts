"use server";

import { revalidatePath } from "next/cache";
import { getSession, isAdmin } from "./auth";
import { getArticle } from "./articles";
import { ensureSchema, getSql } from "./db";

function articlePath(articleId: number) {
  return `/article/${articleId}`;
}

export async function addComment(formData: FormData) {
  const honeypot = String(formData.get("company") ?? "").trim();
  if (honeypot) return;

  const articleId = Number(formData.get("articleId"));
  const authorName = String(formData.get("authorName") ?? "").trim();
  const body = String(formData.get("body") ?? "").trim();

  if (!Number.isInteger(articleId) || articleId < 1) {
    return { error: "הכתבה לא נמצאה" };
  }
  if (authorName.length < 2 || authorName.length > 40) {
    return { error: "יש לכתוב שם בין 2 ל-40 תווים" };
  }
  if (body.length < 2 || body.length > 1000) {
    return { error: "יש לכתוב תגובה בין 2 ל-1000 תווים" };
  }

  const article = await getArticle(articleId);
  if (!article) return { error: "הכתבה לא נמצאה" };

  await ensureSchema();
  const sql = getSql();
  await sql`
    INSERT INTO article_comments (article_id, author_name, body)
    VALUES (${articleId}, ${authorName}, ${body})
  `;
  revalidatePath(articlePath(articleId));
}

export async function deleteComment(formData: FormData) {
  const user = await getSession();
  if (!isAdmin(user)) return;

  const id = Number(formData.get("id"));
  const articleId = Number(formData.get("articleId"));
  if (!Number.isInteger(id) || id < 1 || !Number.isInteger(articleId) || articleId < 1) {
    return;
  }

  await ensureSchema();
  const sql = getSql();
  await sql`
    DELETE FROM article_comments
    WHERE id = ${id} AND article_id = ${articleId}
  `;
  revalidatePath(articlePath(articleId));
}
