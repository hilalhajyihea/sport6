import Link from "next/link";
import { ArticleGrid, FeaturedStory } from "@/components/ArticleCards";
import { CubeAds, OlpanBanner, PitchBanner, SiteFooter, SiteHeader } from "@/components/SiteChrome";
import { getFeaturedArticle, listArticlesByCategory, listCategories } from "@/lib/articles";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  try {
    const [featured, categories] = await Promise.all([getFeaturedArticle(), listCategories()]);
    const sections = await Promise.all(
      categories.map(async (category) => ({
        category,
        articles: await listArticlesByCategory(category.id, 3, featured?.id),
      }))
    );

    return (
      <>
        <SiteHeader current="home" />
        <main className="wrap">
          <OlpanBanner />
          {featured ? (
            <FeaturedStory article={featured} />
          ) : (
            <div className="empty">עדיין אין כתבות. היכנסו לניהול כדי לפרסם את הכתבה הראשונה.</div>
          )}
          <CubeAds />
          {sections.map(({ category, articles }) => (
            <section className="section" key={category.id}>
              <div className="section-title">
                <h2>
                  <Link href={`/category/${category.slug}`}>{category.name}</Link>
                </h2>
                <Link href={`/category/${category.slug}`}>לכל הכתבות</Link>
              </div>
              <ArticleGrid articles={articles} />
              {category.slug === "adults" ? <PitchBanner /> : null}
            </section>
          ))}
        </main>
        <SiteFooter />
      </>
    );
  } catch {
    return (
      <>
        <SiteHeader current="home" />
        <main className="wrap">
          <div className="empty">לא הצלחנו להתחבר למסד כרגע. בדקו את החיבור ברנדר ואת המשתנה בורסל.</div>
        </main>
        <SiteFooter />
      </>
    );
  }
}
