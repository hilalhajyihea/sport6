"use client";

import { useState } from "react";
import { login, setupAdmin } from "@/lib/actions-auth";

export default function LoginForm({ needsSetup }: { needsSetup: boolean }) {
  const [error, setError] = useState("");

  async function onSubmit(formData: FormData) {
    setError("");
    const result = needsSetup ? await setupAdmin(formData) : await login(formData);
    if (result?.error) setError(result.error);
  }

  return (
    <form className="form-grid" action={onSubmit}>
      {needsSetup ? (
        <label>
          שם מלא
          <input name="displayName" required />
        </label>
      ) : null}
      <label>
        שם משתמש
        <input name="username" required autoComplete="username" />
      </label>
      <label>
        סיסמה
        <input name="password" type="password" required autoComplete={needsSetup ? "new-password" : "current-password"} />
      </label>
      {error ? <p className="error">{error}</p> : null}
      <button type="submit">{needsSetup ? "יצירת מנהל וכניסה" : "כניסה"}</button>
    </form>
  );
}
