import ArticleForm from "@/components/ArticleForm";
import { requireUser } from "@/lib/actions-auth";
import { listCategories } from "@/lib/articles";
import { isAdmin } from "@/lib/auth";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function NewArticlePage() {
  const user = await requireUser();
  if (!isAdmin(user) && !user.canAdd) redirect("/admin");
  const categories = await listCategories();
  return (
    <div className="panel">
      <h1>כתבה חדשה</h1>
      <ArticleForm categories={categories} isAdmin={isAdmin(user)} />
    </div>
  );
}
