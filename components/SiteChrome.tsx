import Link from "next/link";

export function SiteHeader({ current }: { current?: string }) {
  return (
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
  );
}

export function SiteFooter() {
  return (
    <footer className="site-footer">ספורט 6 — סיקור כדורגל מטייבה</footer>
  );
}
