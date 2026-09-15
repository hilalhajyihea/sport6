import Link from "next/link";
import type { ArticleCard } from "@/lib/articles";
import { excerpt, formatDate } from "@/lib/format";

export function FeaturedStory({ article }: { article: ArticleCard }) {
  return (
    <Link href={`/article/${article.id}`} className="featured">
      {article.main_image ? (
        <img src={article.main_image} alt={article.title} />
      ) : (
        <div className="ph" style={{ height: 360 }} />
      )}
      <div>
        <div className="kicker">{article.category_name}</div>
        <h1>{article.title}</h1>
        {article.subtitle ? <p className="subtitle">{article.subtitle}</p> : null}
        <p className="meta">
          {article.author_name} · {formatDate(article.created_at)}
        </p>
        <p className="lede">{excerpt(article.body, 220)}</p>
      </div>
    </Link>
  );
}

export function ArticleGrid({ articles }: { articles: ArticleCard[] }) {
  if (!articles.length) {
    return <div className="empty">עדיין אין כתבות במדור הזה.</div>;
  }
  return (
    <div className="grid">
      {articles.map((article) => (
        <Link href={`/article/${article.id}`} className="card" key={article.id}>
          {article.main_image ? <img src={article.main_image} alt="" /> : <div className="ph" />}
          <div className="card-body">
            <h3>{article.title}</h3>
            <p className="meta">
              {article.author_name} · {formatDate(article.created_at)}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
}
