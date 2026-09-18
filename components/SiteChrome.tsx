import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="header-inner">
        <Link href="/" className="brand">
          <strong>
            ספורט <span>6</span>
          </strong>
          <span>כדורגל מהמגרש</span>
        </Link>
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
      <img className="ad-banner-photo" src="/olpan-hero.png" alt="" />
      <span className="ad-banner-shade" aria-hidden="true" />
      <span className="ad-banner-mark">פרסומת</span>
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
      <span className="pitch-scene" aria-hidden="true">
        <span className="pitch-sky" />
        <span className="pitch-flood pitch-flood-a" />
        <span className="pitch-flood pitch-flood-b" />
        <svg className="pitch-field" viewBox="0 0 240 156">
          <defs>
            <pattern id="pitchStripes" width="16" height="156" patternUnits="userSpaceOnUse">
              <rect width="8" height="156" fill="#17833c" />
              <rect x="8" width="8" height="156" fill="#126e32" />
            </pattern>
            <linearGradient id="pitchEdge" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#0b4a22" />
              <stop offset="1" stopColor="#083818" />
            </linearGradient>
          </defs>
          <rect width="240" height="156" fill="url(#pitchEdge)" />
          <rect x="18" y="12" width="204" height="132" fill="url(#pitchStripes)" />
          <g fill="none" stroke="#f4fff4" strokeWidth="1.7">
            <rect x="18" y="12" width="204" height="132" />
            <path d="M120 12v132" />
            <circle cx="120" cy="78" r="20" />
            <rect x="18" y="36" width="36" height="84" />
            <rect x="186" y="36" width="36" height="84" />
            <rect x="18" y="54" width="14" height="48" />
            <rect x="208" y="54" width="14" height="48" />
            <path d="M18 16a8 8 0 0 1 8-8M222 16a8 8 0 0 0-8-8M18 140a8 8 0 0 0 8 8M222 140a8 8 0 0 1-8 8" />
            <path d="M54 54a24 24 0 0 0 0 48M186 102a24 24 0 0 0 0-48" />
            <rect x="10" y="66" width="8" height="24" />
            <rect x="222" y="66" width="8" height="24" />
          </g>
          <circle cx="120" cy="78" r="2.2" fill="#f4fff4" />
          <circle cx="46" cy="78" r="1.8" fill="#f4fff4" />
          <circle cx="194" cy="78" r="1.8" fill="#f4fff4" />
        </svg>
        <svg className="pitch-ball" viewBox="0 0 128 128">
          <defs>
            <radialGradient id="pitchBallLit" cx="34%" cy="28%" r="72%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="48%" stopColor="#f2f2f2" />
              <stop offset="100%" stopColor="#7d7d7d" />
            </radialGradient>
          </defs>
          <circle cx="64" cy="64" r="60" fill="url(#pitchBallLit)" />
          <path fill="#141414" d="M64 33.5 80.5 45.4 74.2 64.8 53.8 64.8 47.5 45.4Z" />
          <path fill="#141414" d="M97 39.2 111 55.4 101.2 71 88.6 79.4 80.5 45.4Z" />
          <path fill="#141414" d="M31 39.2 17 55.4 26.8 71 39.4 79.4 47.5 45.4Z" />
          <path fill="#141414" d="M46 97 64 112.5 82 97 73.5 81 54.5 81Z" />
          <path
            fill="none"
            stroke="#141414"
            strokeWidth="2.3"
            strokeLinejoin="round"
            d="M64 33.5 80.5 45.4 97 39.2M80.5 45.4 74.2 64.8 88.6 79.4M74.2 64.8 53.8 64.8 39.4 79.4M53.8 64.8 47.5 45.4 31 39.2M47.5 45.4 64 33.5 64 16"
          />
          <circle cx="64" cy="64" r="60" fill="none" stroke="#1b1b1b" strokeWidth="3.2" />
          <circle cx="48" cy="44" r="10" fill="#fff" opacity="0.22" />
        </svg>
        <span className="pitch-shade" />
      </span>
      <span className="ad-banner-mark">פרסומת</span>
      <span className="ad-banner-body">
        <span className="ad-banner-kicker">טייבה · עשב מלאכותי · תאורה לילית</span>
        <strong>מגרש אל-איתיחאד</strong>
        <span className="ad-banner-sub">הזמן מגרש עכשיו · משחק גם בלילה</span>
      </span>
      <span className="ad-banner-cta">להזמנה</span>
    </a>
  );
}

export function ClickBanner() {
  return (
    <a
      className="ad-banner ad-banner-click"
      href="https://websitebyclick.com/"
      target="_blank"
      rel="noopener noreferrer"
    >
      <span className="click-scene" aria-hidden="true">
        <span className="click-grid" />
        <svg className="click-windows" viewBox="0 0 260 170">
          <defs>
            <linearGradient id="clickGlass" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#1c2740" />
              <stop offset="1" stopColor="#0f172a" />
            </linearGradient>
          </defs>
          <g opacity="0.55">
            <rect x="18" y="18" width="148" height="96" rx="8" fill="#152033" stroke="#3b4d72" />
            <rect x="18" y="18" width="148" height="18" rx="8" fill="#24324c" />
            <circle cx="30" cy="27" r="3.2" fill="#f07171" />
            <circle cx="40" cy="27" r="3.2" fill="#f0c36a" />
            <circle cx="50" cy="27" r="3.2" fill="#6fd08a" />
          </g>
          <g>
            <rect x="52" y="42" width="168" height="110" rx="9" fill="url(#clickGlass)" stroke="#7aa2ff" strokeOpacity="0.45" />
            <rect x="52" y="42" width="168" height="20" rx="9" fill="#24385f" />
            <circle cx="66" cy="52" r="3.4" fill="#f07171" />
            <circle cx="77" cy="52" r="3.4" fill="#f0c36a" />
            <circle cx="88" cy="52" r="3.4" fill="#6fd08a" />
            <rect x="64" y="74" width="72" height="8" rx="2" fill="#dbe7ff" opacity="0.9" />
            <rect x="64" y="88" width="108" height="6" rx="2" fill="#8aa4d6" opacity="0.7" />
            <rect x="64" y="100" width="96" height="6" rx="2" fill="#8aa4d6" opacity="0.45" />
            <rect x="64" y="118" width="46" height="16" rx="4" fill="#f0c36a" />
            <rect x="148" y="76" width="54" height="54" rx="6" fill="#1b2b48" stroke="#7aa2ff" strokeOpacity="0.3" />
            <path d="M162 93h26M162 103h18M162 113h22" stroke="#8aa4d6" strokeWidth="3" strokeLinecap="round" />
          </g>
        </svg>
        <svg className="click-cursor" viewBox="0 0 72 72">
          <path
            d="M14 8 18 52 30 40 42 66 50 62 38 36 56 36Z"
            fill="#fff"
            stroke="#111"
            strokeWidth="3"
            strokeLinejoin="round"
          />
          <circle cx="54" cy="22" r="10" fill="none" stroke="#f0c36a" strokeWidth="3" opacity="0.9" />
          <circle cx="54" cy="22" r="16" fill="none" stroke="#f0c36a" strokeWidth="2" opacity="0.35" />
        </svg>
        <span className="click-shade" />
      </span>
      <span className="ad-banner-mark">פרסומת</span>
      <span className="ad-banner-body">
        <span className="ad-banner-kicker">אתר בקליק</span>
        <strong>רוצה אתר אינטרנט לעסק שלך?</strong>
        <span className="ad-banner-sub">דומיין ועיצוב כלולים · דברו איתנו בוואטסאפ</span>
      </span>
      <span className="ad-banner-cta">לחבילות</span>
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
