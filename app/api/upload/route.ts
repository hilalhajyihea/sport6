import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { uploadToR2 } from "@/lib/r2";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const user = await getSession();
  if (!user) {
    return NextResponse.json({ error: "יש להתחבר" }, { status: 401 });
  }
  if (!user.canAdd && !user.canEdit && user.role !== "admin") {
    return NextResponse.json({ error: "אין הרשאה להעלות תמונות" }, { status: 403 });
  }

  const form = await request.formData();
  const file = form.get("file");
  if (!(file instanceof File) || file.size === 0) {
    return NextResponse.json({ error: "לא נבחר קובץ" }, { status: 400 });
  }

  try {
    const url = await uploadToR2(file);
    return NextResponse.json({ url });
  } catch (error) {
    const message = error instanceof Error ? error.message : "העלאת התמונה נכשלה";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
