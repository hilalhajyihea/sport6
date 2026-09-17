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
        <span className="ad-cube-icon" aria-hidden="true">
          <svg viewBox="0 0 48 48" fill="none">
            <path d="M24 8v28" stroke="currentColor" strokeWidth="2" />
            <path d="M16 36h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <path d="M10 40h28" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
            <path d="M24 14 L12 22h24L24 14Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
            <circle cx="13.5" cy="26.5" r="4.5" stroke="currentColor" strokeWidth="1.8" />
            <circle cx="34.5" cy="26.5" r="4.5" stroke="currentColor" strokeWidth="1.8" />
          </svg>
        </span>
        <span className="ad-cube-copy">
          <span className="ad-cube-kicker">עורכי דין · טייבה</span>
          <strong>חאג' יחיא ושות'</strong>
          <span className="ad-cube-sub">ייצוג עד לתוצאה</span>
        </span>
        <span className="ad-cube-cta">לאתר</span>
      </a>
      <a
        className="ad-cube ad-cube-rakez"
        href="https://sefer-baklik.onrender.com/rakez"
        target="_blank"
        rel="noopener noreferrer"
      >
        <span className="ad-cube-mark">פרסומת</span>
        <span className="ad-cube-icon" aria-hidden="true">
          <svg viewBox="0 0 48 48" fill="none">
            <circle cx="16" cy="14" r="5" stroke="currentColor" strokeWidth="2" />
            <circle cx="16" cy="34" r="5" stroke="currentColor" strokeWidth="2" />
            <path d="M20 17.5 36 34M20 30.5 36 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </span>
        <span className="ad-cube-copy">
          <span className="ad-cube-kicker">ספר · קביעת תור</span>
          <strong>ראכז עיצוב שיער</strong>
          <span className="ad-cube-sub">תור אונליין</span>
        </span>
        <span className="ad-cube-cta">לתור</span>
      </a>
      <a
        className="ad-cube ad-cube-sami"
        href="https://sefer-baklik.onrender.com/samiraffat"
        target="_blank"
        rel="noopener noreferrer"
      >
        <span className="ad-cube-mark">פרסומת</span>
        <span className="ad-cube-icon" aria-hidden="true">
          <svg viewBox="0 0 48 48" fill="none">
            <path d="M14 8v32M14 8c10 6 10 26 0 32" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <path d="M14 16h16M14 24h18M14 32h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </span>
        <span className="ad-cube-copy">
          <span className="ad-cube-kicker">סלונים · קביעת תור</span>
          <strong>Salon Sami</strong>
          <span className="ad-cube-sub">תור אונליין</span>
        </span>
        <span className="ad-cube-cta">לתור</span>
      </a>
    </aside>
  );
}
