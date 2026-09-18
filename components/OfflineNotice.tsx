import { SiteFooter, SiteHeader } from "@/components/SiteChrome";

export function OfflineNotice() {
  return (
    <>
      <SiteHeader current="home" />
      <main className="wrap">
        <div className="offline-box">
          <h1>האתר כרגע אינו פעיל</h1>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
