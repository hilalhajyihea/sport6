"use client";

import { useRef, useState } from "react";
import { addComment } from "@/lib/actions-comments";

export function CommentForm({ articleId }: { articleId: number }) {
  const formRef = useRef<HTMLFormElement>(null);
  const [error, setError] = useState("");

  async function onSubmit(formData: FormData) {
    setError("");
    const result = await addComment(formData);
    if (result?.error) {
      setError(result.error);
      return;
    }
    formRef.current?.reset();
  }

  return (
    <form ref={formRef} className="comment-form" action={onSubmit}>
      <input type="hidden" name="articleId" value={articleId} />
      <label className="hp" aria-hidden="true">
        חברה
        <input name="company" tabIndex={-1} autoComplete="off" />
      </label>
      <label>
        השם שלך
        <input name="authorName" required maxLength={40} />
      </label>
      <label>
        התגובה
        <textarea name="body" required maxLength={1000} rows={4} />
      </label>
      {error ? <p className="error">{error}</p> : null}
      <button type="submit">פרסום תגובה</button>
    </form>
  );
}
