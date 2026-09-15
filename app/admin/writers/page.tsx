import Link from "next/link";
import { deleteWriter } from "@/lib/actions-writers";
import { requireAdmin } from "@/lib/actions-auth";
import { listWriters } from "@/lib/users";

export const dynamic = "force-dynamic";

export default async function WritersPage() {
  await requireAdmin();
  const writers = await listWriters();
  return (
    <div className="panel">
      <div className="admin-top">
        <h1>כתבים</h1>
        <Link className="btn" href="/admin/writers/new">
          כתב חדש
        </Link>
      </div>
      {writers.map((writer) => (
        <div className="list-row" key={writer.id}>
          <div>
            <strong>{writer.display_name}</strong>
            <p className="meta">
              {writer.username} · {writer.role === "admin" ? "מנהל" : "כתב"} ·
              {writer.can_add ? " הוספה" : ""}
              {writer.can_edit ? " עריכה" : ""}
              {writer.can_delete ? " מחיקה" : ""}
            </p>
          </div>
          <Link className="btn secondary" href={`/admin/writers/${writer.id}`}>
            עריכה
          </Link>
          <form action={deleteWriter}>
            <input type="hidden" name="id" value={writer.id} />
            <button className="danger" type="submit">
              מחיקה
            </button>
          </form>
        </div>
      ))}
    </div>
  );
}
