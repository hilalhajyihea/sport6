"use client";

import { useState } from "react";
import type { Writer } from "@/lib/users";
import { saveWriter } from "@/lib/actions-writers";

export default function WriterForm({ writer }: { writer?: Writer }) {
  const [error, setError] = useState("");
  const [photoUrl, setPhotoUrl] = useState(writer?.photo_url ?? "");
  const [busy, setBusy] = useState(false);

  async function uploadPhoto(files: FileList | null) {
    const file = files?.[0];
    if (!file) return;
    setBusy(true);
    setError("");
    try {
      const data = new FormData();
      data.append("file", file);
      const res = await fetch("/api/upload", { method: "POST", body: data });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "העלאה נכשלה");
      setPhotoUrl(json.url);
    } catch (err) {
      setError(err instanceof Error ? err.message : "העלאה נכשלה");
    } finally {
      setBusy(false);
    }
  }

  async function onSubmit(formData: FormData) {
    setError("");
    formData.set("photoUrl", photoUrl);
    const result = await saveWriter(formData);
    if (result?.error) setError(result.error);
  }

  return (
    <form className="form-grid" action={onSubmit}>
      {writer ? <input type="hidden" name="id" value={writer.id} /> : null}
      <label>
        שם לתצוגה
        <input name="displayName" required defaultValue={writer?.display_name} />
      </label>
      <label>
        שם משתמש
        <input name="username" required defaultValue={writer?.username} />
      </label>
      <label>
        סיסמה {writer ? "(השאירו ריק כדי לא לשנות)" : ""}
        <input name="password" type="password" required={!writer} />
      </label>
      <label>
        תפקיד
        <select name="role" defaultValue={writer?.role ?? "writer"}>
          <option value="writer">כתב</option>
          <option value="admin">מנהל</option>
        </select>
      </label>
      <div className="checks">
        <label>
          <input type="checkbox" name="canAdd" defaultChecked={writer?.can_add ?? true} />
          הוספת כתבה
        </label>
        <label>
          <input type="checkbox" name="canEdit" defaultChecked={writer?.can_edit ?? true} />
          עריכת כתבות שלו
        </label>
        <label>
          <input type="checkbox" name="canDelete" defaultChecked={writer?.can_delete ?? true} />
          מחיקת כתבות שלו
        </label>
      </div>
      <label>
        כמה מילים על הכתב
        <textarea name="bio" defaultValue={writer?.bio ?? ""} />
      </label>
      <div>
        <strong>תמונה</strong>
        <input type="file" accept="image/*" disabled={busy} onChange={(e) => uploadPhoto(e.target.files)} />
        {photoUrl ? <img src={photoUrl} alt="" style={{ width: 120, height: 120, objectFit: "cover", marginTop: 8 }} /> : null}
      </div>
      {error ? <p className="error">{error}</p> : null}
      <button type="submit" disabled={busy}>
        שמירת כתב
      </button>
    </form>
  );
}
