import { ensureSchema, getSql } from "./db";

export type Category = {
  id: number;
  slug: string;
  name: string;
  sort_order: number;
};

export type ArticleImage = {
  id: number;
  article_id: number;
  url: string;
  caption: string | null;
  sort_order: number;
  is_main: boolean;
  focus_x: number;
  focus_y: number;
};

export type ArticleCard = {
  id: number;
  title: string;
  subtitle: string | null;
  body: string;
  category_id: number;
  author_id: number;
  featured: boolean;
  created_at: string;
  author_name: string;
  category_name: string;
  category_slug: string;
  main_image: string | null;
  main_focus_x: number | null;
  main_focus_y: number | null;
};

export type ArticleDetail = ArticleCard & {
  images: ArticleImage[];
};

export async function listCategories() {
  await ensureSchema();
  const sql = getSql();
  return sql<Category[]>`
    SELECT id, slug, name, sort_order
    FROM categories
    ORDER BY sort_order ASC, id ASC
  `;
}

export async function getCategoryBySlug(slug: string) {
  await ensureSchema();
  const sql = getSql();
  const rows = await sql<Category[]>`
    SELECT id, slug, name, sort_order
    FROM categories
    WHERE slug = ${slug}
    LIMIT 1
  `;
  return rows[0] ?? null;
}

export async function getFeaturedArticle() {
  await ensureSchema();
  const sql = getSql();
  const featured = await sql<ArticleCard[]>`
    SELECT
      a.id, a.title, a.subtitle, a.body, a.category_id, a.author_id, a.featured, a.created_at,
      u.display_name AS author_name,
      c.name AS category_name,
      c.slug AS category_slug,
      (
        SELECT url FROM article_images
        WHERE article_id = a.id
        ORDER BY is_main DESC, sort_order ASC, id ASC
        LIMIT 1
      ) AS main_image,
      (
        SELECT focus_x FROM article_images
        WHERE article_id = a.id
        ORDER BY is_main DESC, sort_order ASC, id ASC
        LIMIT 1
      ) AS main_focus_x,
      (
        SELECT focus_y FROM article_images
        WHERE article_id = a.id
        ORDER BY is_main DESC, sort_order ASC, id ASC
        LIMIT 1
      ) AS main_focus_y
    FROM articles a
    JOIN users u ON u.id = a.author_id
    JOIN categories c ON c.id = a.category_id
    WHERE a.featured = true
    ORDER BY a.created_at DESC
    LIMIT 1
  `;
  if (featured[0]) return featured[0];

  const latest = await sql<ArticleCard[]>`
    SELECT
      a.id, a.title, a.subtitle, a.body, a.category_id, a.author_id, a.featured, a.created_at,
      u.display_name AS author_name,
      c.name AS category_name,
      c.slug AS category_slug,
      (
        SELECT url FROM article_images
        WHERE article_id = a.id
        ORDER BY is_main DESC, sort_order ASC, id ASC
        LIMIT 1
      ) AS main_image,
      (
        SELECT focus_x FROM article_images
        WHERE article_id = a.id
        ORDER BY is_main DESC, sort_order ASC, id ASC
        LIMIT 1
      ) AS main_focus_x,
      (
        SELECT focus_y FROM article_images
        WHERE article_id = a.id
        ORDER BY is_main DESC, sort_order ASC, id ASC
        LIMIT 1
      ) AS main_focus_y
    FROM articles a
    JOIN users u ON u.id = a.author_id
    JOIN categories c ON c.id = a.category_id
    ORDER BY a.created_at DESC
    LIMIT 1
  `;
  return latest[0] ?? null;
}

export async function listArticlesByCategory(categoryId: number, limit = 4, excludeId?: number) {
  await ensureSchema();
  const sql = getSql();
  if (excludeId) {
    return sql<ArticleCard[]>`
      SELECT
        a.id, a.title, a.subtitle, a.body, a.category_id, a.author_id, a.featured, a.created_at,
        u.display_name AS author_name,
        c.name AS category_name,
        c.slug AS category_slug,
        (
          SELECT url FROM article_images
          WHERE article_id = a.id
          ORDER BY is_main DESC, sort_order ASC, id ASC
          LIMIT 1
        ) AS main_image,
        (
          SELECT focus_x FROM article_images
          WHERE article_id = a.id
          ORDER BY is_main DESC, sort_order ASC, id ASC
          LIMIT 1
        ) AS main_focus_x,
        (
          SELECT focus_y FROM article_images
          WHERE article_id = a.id
          ORDER BY is_main DESC, sort_order ASC, id ASC
          LIMIT 1
        ) AS main_focus_y
      FROM articles a
      JOIN users u ON u.id = a.author_id
      JOIN categories c ON c.id = a.category_id
      WHERE a.category_id = ${categoryId} AND a.id <> ${excludeId}
      ORDER BY a.created_at DESC
      LIMIT ${limit}
    `;
  }
  return sql<ArticleCard[]>`
    SELECT
      a.id, a.title, a.subtitle, a.body, a.category_id, a.author_id, a.featured, a.created_at,
      u.display_name AS author_name,
      c.name AS category_name,
      c.slug AS category_slug,
      (
        SELECT url FROM article_images
        WHERE article_id = a.id
        ORDER BY is_main DESC, sort_order ASC, id ASC
        LIMIT 1
      ) AS main_image,
      (
        SELECT focus_x FROM article_images
        WHERE article_id = a.id
        ORDER BY is_main DESC, sort_order ASC, id ASC
        LIMIT 1
      ) AS main_focus_x,
      (
        SELECT focus_y FROM article_images
        WHERE article_id = a.id
        ORDER BY is_main DESC, sort_order ASC, id ASC
        LIMIT 1
      ) AS main_focus_y
    FROM articles a
    JOIN users u ON u.id = a.author_id
    JOIN categories c ON c.id = a.category_id
    WHERE a.category_id = ${categoryId}
    ORDER BY a.created_at DESC
    LIMIT ${limit}
  `;
}

export async function getArticle(id: number) {
  await ensureSchema();
  const sql = getSql();
  const rows = await sql<ArticleCard[]>`
    SELECT
      a.id, a.title, a.subtitle, a.body, a.category_id, a.author_id, a.featured, a.created_at,
      u.display_name AS author_name,
      c.name AS category_name,
      c.slug AS category_slug,
      (
        SELECT url FROM article_images
        WHERE article_id = a.id
        ORDER BY is_main DESC, sort_order ASC, id ASC
        LIMIT 1
      ) AS main_image,
      (
        SELECT focus_x FROM article_images
        WHERE article_id = a.id
        ORDER BY is_main DESC, sort_order ASC, id ASC
        LIMIT 1
      ) AS main_focus_x,
      (
        SELECT focus_y FROM article_images
        WHERE article_id = a.id
        ORDER BY is_main DESC, sort_order ASC, id ASC
        LIMIT 1
      ) AS main_focus_y
    FROM articles a
    JOIN users u ON u.id = a.author_id
    JOIN categories c ON c.id = a.category_id
    WHERE a.id = ${id}
    LIMIT 1
  `;
  const article = rows[0];
  if (!article) return null;
  const images = await sql<ArticleImage[]>`
    SELECT id, article_id, url, caption, sort_order, is_main, focus_x, focus_y
    FROM article_images
    WHERE article_id = ${id}
    ORDER BY is_main DESC, sort_order ASC, id ASC
  `;
  return { ...article, images } satisfies ArticleDetail;
}

export async function listArticlesForAdmin(authorId?: number) {
  await ensureSchema();
  const sql = getSql();
  if (authorId) {
    return sql<ArticleCard[]>`
      SELECT
        a.id, a.title, a.subtitle, a.body, a.category_id, a.author_id, a.featured, a.created_at,
        u.display_name AS author_name,
        c.name AS category_name,
        c.slug AS category_slug,
        (
          SELECT url FROM article_images
          WHERE article_id = a.id
          ORDER BY is_main DESC, sort_order ASC, id ASC
          LIMIT 1
        ) AS main_image,
        (
          SELECT focus_x FROM article_images
          WHERE article_id = a.id
          ORDER BY is_main DESC, sort_order ASC, id ASC
          LIMIT 1
        ) AS main_focus_x,
        (
          SELECT focus_y FROM article_images
          WHERE article_id = a.id
          ORDER BY is_main DESC, sort_order ASC, id ASC
          LIMIT 1
        ) AS main_focus_y
      FROM articles a
      JOIN users u ON u.id = a.author_id
      JOIN categories c ON c.id = a.category_id
      WHERE a.author_id = ${authorId}
      ORDER BY a.created_at DESC
    `;
  }
  return sql<ArticleCard[]>`
    SELECT
      a.id, a.title, a.subtitle, a.body, a.category_id, a.author_id, a.featured, a.created_at,
      u.display_name AS author_name,
      c.name AS category_name,
      c.slug AS category_slug,
      (
        SELECT url FROM article_images
        WHERE article_id = a.id
        ORDER BY is_main DESC, sort_order ASC, id ASC
        LIMIT 1
      ) AS main_image,
      (
        SELECT focus_x FROM article_images
        WHERE article_id = a.id
        ORDER BY is_main DESC, sort_order ASC, id ASC
        LIMIT 1
      ) AS main_focus_x,
      (
        SELECT focus_y FROM article_images
        WHERE article_id = a.id
        ORDER BY is_main DESC, sort_order ASC, id ASC
        LIMIT 1
      ) AS main_focus_y
    FROM articles a
    JOIN users u ON u.id = a.author_id
    JOIN categories c ON c.id = a.category_id
    ORDER BY a.created_at DESC
  `;
}
