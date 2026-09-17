import { notFound } from "next/navigation";
import { SiteFooter, SiteHeader } from "@/components/SiteChrome";
import { getArticle } from "@/lib/articles";
import { bodyToHtml, focusStyle, formatDate } from "@/lib/format";

export const dynamic = "force-dynamic";

export default async function ArticlePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const article = await getArticle(Number(id));
  if (!article) notFound();
  const gallery = article.images.filter((image) => !image.is_main);
  const main = article.images.find((image) => image.is_main) ?? article.images[0];

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
          {main ? (
            <>
              <img
                className="article-hero"
                src={main.url}
                alt={main.caption || article.title}
                style={focusStyle(main.focus_x, main.focus_y)}
              />
              {main.caption ? <p className="caption">{main.caption}</p> : null}
            </>
          ) : null}
          <div className="article-body" dangerouslySetInnerHTML={{ __html: bodyToHtml(article.body) }} />
          {gallery.length ? (
            <div className="gallery">
              {gallery.map((image) => (
                <figure key={image.id}>
                  <img src={image.url} alt={image.caption || ""} style={focusStyle(image.focus_x, image.focus_y)} />
                  {image.caption ? <figcaption className="caption">{image.caption}</figcaption> : null}
                </figure>
              ))}
            </div>
          ) : null}
        </article>
      </main>
      <SiteFooter />
    </>
  );
}
