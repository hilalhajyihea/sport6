import { ensureSchema, getSql } from "./db";

export type ArticleComment = {
  id: number;
  article_id: number;
  author_name: string;
  body: string;
  created_at: string;
};

export async function listComments(articleId: number) {
  await ensureSchema();
  const sql = getSql();
  return sql<ArticleComment[]>`
    SELECT id, article_id, author_name, body, created_at
    FROM article_comments
    WHERE article_id = ${articleId}
    ORDER BY created_at ASC, id ASC
  `;
}
