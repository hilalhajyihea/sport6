import { notFound } from "next/navigation";
import { ArticleGrid } from "@/components/ArticleCards";
import { OfflineNotice } from "@/components/OfflineNotice";
import { SiteFooter, SiteHeader } from "@/components/SiteChrome";
import { getCategoryBySlug, listArticlesByCategory } from "@/lib/articles";
import { isSiteActive } from "@/lib/settings";

export const dynamic = "force-dynamic";

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  if (!(await isSiteActive())) {
    return <OfflineNotice />;
  }
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);
  if (!category) notFound();
  const articles = await listArticlesByCategory(category.id, 24);

  return (
    <>
      <SiteHeader current={slug} />
      <main className="wrap">
        <section className="section" style={{ marginTop: 0 }}>
          <div className="section-title">
            <h2>{category.name}</h2>
          </div>
          <ArticleGrid articles={articles} />
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
