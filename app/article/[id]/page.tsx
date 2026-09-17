import { notFound } from "next/navigation";
import { SiteFooter, SiteHeader } from "@/components/SiteChrome";
import { getArticle } from "@/lib/articles";
import { bodyToHtml, formatDate } from "@/lib/format";

export const dynamic = "force-dynamic";

export default async function ArticlePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const article = await getArticle(Number(id));
  if (!article) notFound();

  return (
    <>
      <SiteHeader current={article.category_slug} />
      <main className="wrap">
        <article className="article">
          <div className="kicker">{article.category_name}</div>
          <h1>{article.title}</h1>
          {article.subtitle ? <p className="subtitle">{article.subtitle}</p> : null}
          <p className="meta">
            {article.author_name} · {formatDate(article.created_at)}
          </p>
          {article.images.length ? (
            <div className="photo-stack">
              {article.images.map((image) => (
                <figure key={image.id}>
                  <img src={image.url} alt={image.caption || article.title} />
                  {image.caption ? <figcaption className="caption">{image.caption}</figcaption> : null}
                </figure>
              ))}
            </div>
          ) : null}
          <div className="article-body" dangerouslySetInnerHTML={{ __html: bodyToHtml(article.body) }} />
        </article>
      </main>
      <SiteFooter />
    </>
  );
}
