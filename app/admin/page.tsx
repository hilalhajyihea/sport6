import Link from "next/link";
import { deleteArticle } from "@/lib/actions-articles";
import { requireUser } from "@/lib/actions-auth";
import { listArticlesForAdmin } from "@/lib/articles";
import { formatDate } from "@/lib/format";
import { isAdmin } from "@/lib/auth";
import { isSiteActive } from "@/lib/settings";
import { SiteStatusToggle } from "@/components/SiteStatusToggle";

export const dynamic = "force-dynamic";

export default async function AdminHome() {
  const user = await requireUser();
  const articles = await listArticlesForAdmin(isAdmin(user) ? undefined : user.id);
  const siteActive = isAdmin(user) ? await isSiteActive() : true;

  return (
    <>
      {isAdmin(user) ? <SiteStatusToggle active={siteActive} /> : null}
      <div className="panel">
        <h1>ניהול כתבות</h1>
      {articles.length === 0 ? <p className="empty">עדיין אין כתבות.</p> : null}
      {articles.map((article) => (
        <div className="list-row" key={article.id}>
          <div>
            <strong>{article.title}</strong>
            <p className="meta">
              {article.category_name} · {article.author_name} · {formatDate(article.created_at)}
              {article.featured ? " · ראשית" : ""}
            </p>
          </div>
          {(isAdmin(user) || (article.author_id === user.id && user.canEdit)) ? (
            <Link className="btn secondary" href={`/admin/articles/${article.id}`}>
              עריכה
            </Link>
          ) : (
            <span />
          )}
          {(isAdmin(user) || (article.author_id === user.id && user.canDelete)) ? (
            <form action={deleteArticle}>
              <input type="hidden" name="id" value={article.id} />
              <button className="danger" type="submit">
                מחיקה
              </button>
            </form>
          ) : (
            <span />
          )}
        </div>
      ))}
      </div>
    </>
  );
}
