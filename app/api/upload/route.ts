import { put } from "@vercel/blob";
import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const user = await getSession();
  if (!user) {
    return NextResponse.json({ error: "יש להתחבר" }, { status: 401 });
  }
  if (!user.canAdd && !user.canEdit && user.role !== "admin") {
    return NextResponse.json({ error: "אין הרשאה להעלות תמונות" }, { status: 403 });
  }
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return NextResponse.json(
      { error: "חסר אחסון תמונות בורסל. יש ליצור Blob בפרויקט." },
      { status: 500 }
    );
  }

  const form = await request.formData();
  const file = form.get("file");
  if (!(file instanceof File) || file.size === 0) {
    return NextResponse.json({ error: "לא נבחר קובץ" }, { status: 400 });
  }

  const safeName = file.name.replace(/[^\w.\-א-ת]+/g, "-");
  const blob = await put(`sport6/${Date.now()}-${safeName}`, file, {
    access: "public",
    token: process.env.BLOB_READ_WRITE_TOKEN,
  });
  return NextResponse.json({ url: blob.url });
}
