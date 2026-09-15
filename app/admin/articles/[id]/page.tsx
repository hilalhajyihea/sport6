import { notFound, redirect } from "next/navigation";
import ArticleForm from "@/components/ArticleForm";
import { requireUser } from "@/lib/actions-auth";
import { getArticle, listCategories } from "@/lib/articles";
import { isAdmin } from "@/lib/auth";

export const dynamic = "force-dynamic";

export default async function EditArticlePage({ params }: { params: Promise<{ id: string }> }) {
  const user = await requireUser();
  const { id } = await params;
  const article = await getArticle(Number(id));
  if (!article) notFound();
  const own = article.author_id === user.id;
  if (!isAdmin(user) && (!own || !user.canEdit)) redirect("/admin");
  const categories = await listCategories();
  return (
    <div className="panel">
      <h1>עריכת כתבה</h1>
      <ArticleForm categories={categories} article={article} isAdmin={isAdmin(user)} />
    </div>
  );
}
