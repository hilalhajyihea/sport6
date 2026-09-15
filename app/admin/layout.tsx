import Link from "next/link";
import { logout } from "@/lib/actions-auth";
import { getSession } from "@/lib/auth";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const user = await getSession();
  return (
    <div className="admin-shell">
      {user ? (
        <div className="admin-top">
          <nav className="admin-nav">
            <Link href="/admin">כתבות</Link>
            {user.canAdd || user.role === "admin" ? <Link href="/admin/articles/new">כתבה חדשה</Link> : null}
            {user.role === "admin" ? <Link href="/admin/writers">כתבים</Link> : null}
            <Link href="/">לאתר</Link>
          </nav>
          <div>
            <span className="meta">{user.displayName}</span>{" "}
            <form action={logout} style={{ display: "inline" }}>
              <button className="secondary" type="submit">
                יציאה
              </button>
            </form>
          </div>
        </div>
      ) : null}
      {children}
    </div>
  );
}
