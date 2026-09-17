import Link from "next/link";

export function TopAds() {
  return (
    <aside className="ad-rail" aria-label="פרסומות">
      <a
        className="ad ad-light"
        href="https://olpan-hteora.co.il/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <span className="ad-mark">פרסומת</span>
        <span className="ad-icon" aria-hidden="true">
          <svg viewBox="0 0 48 48" fill="none">
            <path d="M24 6c-6.6 0-12 5.2-12 11.6 0 4.6 2.6 8.6 6.4 10.5V32h11.2v-3.9c3.8-1.9 6.4-5.9 6.4-10.5C36 11.2 30.6 6 24 6Z" fill="currentColor" />
            <path d="M20 34h8v2.2a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2V34Z" fill="currentColor" opacity=".85" />
            <path d="M21 39h6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
            <path d="M22.5 42h3" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
          </svg>
        </span>
        <span className="ad-copy">
          <strong>אולפן התאורה</strong>
          <em>חנות תאורה בטייבה · כביש 444</em>
        </span>
        <span className="ad-cta">לקטלוג</span>
      </a>

      <a
        className="ad ad-pitch"
        href="https://mgrash-baklik.onrender.com/aletihad"
        target="_blank"
        rel="noopener noreferrer"
      >
        <span className="ad-mark">פרסומת</span>
        <span className="ad-icon" aria-hidden="true">
          <svg viewBox="0 0 48 48" fill="none">
            <rect x="4" y="10" width="40" height="28" rx="3" stroke="currentColor" strokeWidth="2" />
            <path d="M24 10v28M4 24h40" stroke="currentColor" strokeWidth="1.6" />
            <circle cx="24" cy="24" r="6" stroke="currentColor" strokeWidth="1.6" />
          </svg>
        </span>
        <span className="ad-copy">
          <strong>מגרש אל-איתיחאד</strong>
          <em>הזמן מגרש עכשיו · טייבה</em>
        </span>
        <span className="ad-cta">להזמנה</span>
      </a>
    </aside>
  );
}

export function SiteHeader({ current }: { current?: string }) {
  return (
    <>
      <TopAds />
      <header className="site-header">
        <div className="header-inner">
          <Link href="/" className="brand">
            <strong>
              ספורט <span>6</span>
            </strong>
            <span>כדורגל מהמגרש</span>
          </Link>
          <nav className="nav">
            <Link href="/" aria-current={current === "home" ? "page" : undefined}>
              ראשי
            </Link>
            <Link href="/category/adults" aria-current={current === "adults" ? "page" : undefined}>
              טייבה בוגרים
            </Link>
            <Link href="/category/youth" aria-current={current === "youth" ? "page" : undefined}>
              ילדים ונוער
            </Link>
          </nav>
        </div>
      </header>
    </>
  );
}

export function SiteFooter() {
  return <footer className="site-footer">ספורט 6 — סיקור כדורגל מטייבה</footer>;
}
