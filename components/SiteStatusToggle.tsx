import { setSiteActive } from "@/lib/actions-settings";

export function SiteStatusToggle({ active }: { active: boolean }) {
  return (
    <div className="site-status">
      <div>
        <strong>מצב האתר</strong>
        <p className="meta">{active ? "האתר פעיל ומוצג לכולם" : "האתר כבוי. בדף הראשי מופיע שהוא אינו פעיל"}</p>
      </div>
      <div className="site-status-actions">
        <form action={setSiteActive}>
          <input type="hidden" name="active" value="true" />
          <button type="submit" className={active ? "" : "secondary"}>
            האתר פעיל
          </button>
        </form>
        <form action={setSiteActive}>
          <input type="hidden" name="active" value="false" />
          <button type="submit" className={active ? "secondary" : "danger"}>
            האתר לא פעיל
          </button>
        </form>
      </div>
    </div>
  );
}
