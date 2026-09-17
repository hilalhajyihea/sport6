import postgres from "postgres";

const globalForSql = globalThis as unknown as {
  sql?: ReturnType<typeof postgres>;
};

function createSql() {
  const url = process.env.DATABASE_URL;
  if (!url) {
    throw new Error("DATABASE_URL is missing");
  }
  const needsSsl = !url.includes("localhost") && !url.includes("127.0.0.1");
  return postgres(url, {
    ssl: needsSsl ? "require" : false,
    max: 1,
    idle_timeout: 20,
    connect_timeout: 15,
    prepare: false,
  });
}

export function getSql() {
  if (!globalForSql.sql) {
    globalForSql.sql = createSql();
  }
  return globalForSql.sql;
}

let schemaReady: Promise<void> | null = null;

export async function ensureSchema() {
  if (!schemaReady) {
    schemaReady = migrate().catch((error) => {
      schemaReady = null;
      throw error;
    });
  }
  await schemaReady;
}

async function migrate() {
  const sql = getSql();
  await sql`
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      username TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      display_name TEXT NOT NULL,
      photo_url TEXT,
      bio TEXT,
      role TEXT NOT NULL DEFAULT 'writer',
      can_add BOOLEAN NOT NULL DEFAULT true,
      can_edit BOOLEAN NOT NULL DEFAULT true,
      can_delete BOOLEAN NOT NULL DEFAULT true,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `;
  await sql`
    CREATE TABLE IF NOT EXISTS categories (
      id SERIAL PRIMARY KEY,
      slug TEXT UNIQUE NOT NULL,
      name TEXT NOT NULL,
      sort_order INT NOT NULL DEFAULT 0
    )
  `;
  await sql`
    CREATE TABLE IF NOT EXISTS articles (
      id SERIAL PRIMARY KEY,
      title TEXT NOT NULL,
      subtitle TEXT,
      body TEXT NOT NULL,
      category_id INT NOT NULL REFERENCES categories(id),
      author_id INT NOT NULL REFERENCES users(id),
      featured BOOLEAN NOT NULL DEFAULT false,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `;
  await sql`
    CREATE TABLE IF NOT EXISTS article_images (
      id SERIAL PRIMARY KEY,
      article_id INT NOT NULL REFERENCES articles(id) ON DELETE CASCADE,
      url TEXT NOT NULL,
      caption TEXT,
      sort_order INT NOT NULL DEFAULT 0,
      is_main BOOLEAN NOT NULL DEFAULT false
    )
  `;
  await sql`
    INSERT INTO categories (slug, name, sort_order)
    VALUES
      ('adults', 'כדורגל טייבה בוגרים', 1),
      ('youth', 'כדורגל טייבה ילדים ונוער', 2)
    ON CONFLICT (slug) DO NOTHING
  `;
  await sql`ALTER TABLE article_images ADD COLUMN IF NOT EXISTS focus_x DOUBLE PRECISION NOT NULL DEFAULT 50`;
  await sql`ALTER TABLE article_images ADD COLUMN IF NOT EXISTS focus_y DOUBLE PRECISION NOT NULL DEFAULT 0`;
  await sql`
    CREATE TABLE IF NOT EXISTS article_comments (
      id SERIAL PRIMARY KEY,
      article_id INT NOT NULL REFERENCES articles(id) ON DELETE CASCADE,
      author_name TEXT NOT NULL,
      body TEXT NOT NULL,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `;
  await sql`CREATE INDEX IF NOT EXISTS article_comments_article_idx ON article_comments (article_id, created_at)`;
}
