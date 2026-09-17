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
  return <footer className="site-footer">ספורט 6 — סיקור כדורגל מטייבה</footer>;
}

export function OlpanBanner() {
  return (
    <a
      className="ad-banner ad-banner-light"
      href="https://olpan-hteora.co.il/"
      target="_blank"
      rel="noopener noreferrer"
    >
      <span className="ad-banner-mark">פרסומת</span>
      <span className="ad-banner-glow" aria-hidden="true" />
      <span className="ad-banner-body">
        <span className="ad-banner-kicker">טייבה · כביש 444</span>
        <strong>אולפן התאורה</strong>
        <span className="ad-banner-sub">חנות תאורה אחת · גופים לפנים ולחוץ · ייעוץ במקום</span>
      </span>
      <span className="ad-banner-cta">לקטלוג</span>
    </a>
  );
}

export function PitchBanner() {
  return (
    <a
      className="ad-banner ad-banner-pitch"
      href="https://mgrash-baklik.onrender.com/aletihad"
      target="_blank"
      rel="noopener noreferrer"
    >
      <span className="ad-banner-mark">פרסומת</span>
      <span className="ad-banner-lines" aria-hidden="true" />
      <span className="ad-banner-body">
        <span className="ad-banner-kicker">עשב מלאכותי · תאורה לילית</span>
        <strong>מגרש אל-איתיחאד</strong>
        <span className="ad-banner-sub">הזמן מגרש עכשיו בטייבה</span>
      </span>
      <span className="ad-banner-cta">להזמנה</span>
    </a>
  );
}

export function CubeAds() {
  return (
    <aside className="ad-cubes" aria-label="פרסומות">
      <a className="ad-cube ad-cube-law" href="https://hajyahya-law.com/" target="_blank" rel="noopener noreferrer">
        <span className="ad-cube-mark">פרסומת</span>
        <span className="ad-cube-kicker">משרד עורכי דין · טייבה</span>
        <strong>חאג' יחיא ושות'</strong>
        <span className="ad-cube-sub">לא מוותרים. משיגים תוצאות.</span>
        <span className="ad-cube-cta">לאתר המשרד</span>
      </a>
      <a
        className="ad-cube ad-cube-rakez"
        href="https://sefer-baklik.onrender.com/rakez"
        target="_blank"
        rel="noopener noreferrer"
      >
        <span className="ad-cube-mark">פרסומת</span>
        <span className="ad-cube-kicker">עיצוב שיער · טייבה</span>
        <strong>ראכז עיצוב שיער</strong>
        <span className="ad-cube-sub">קביעת תור אונליין</span>
        <span className="ad-cube-cta">לקביעת תור</span>
      </a>
      <a
        className="ad-cube ad-cube-sami"
        href="https://sefer-baklik.onrender.com/samiraffat"
        target="_blank"
        rel="noopener noreferrer"
      >
        <span className="ad-cube-mark">פרסומת</span>
        <span className="ad-cube-kicker">עיצוב שיער · טייבה</span>
        <strong>Salon Sami</strong>
        <span className="ad-cube-sub">קביעת תור אונליין</span>
        <span className="ad-cube-cta">לקביעת תור</span>
      </a>
    </aside>
  );
}
