"use client";

import { useState } from "react";
import type { ArticleDetail } from "@/lib/articles";
import type { Category } from "@/lib/articles";
import { saveArticle } from "@/lib/actions-articles";

type ImageItem = { url: string; caption: string; isMain: boolean };

export default function ArticleForm({
  categories,
  article,
  isAdmin,
}: {
  categories: Category[];
  article?: ArticleDetail;
  isAdmin: boolean;
}) {
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [images, setImages] = useState<ImageItem[]>(
    article?.images.map((image) => ({
      url: image.url,
      caption: image.caption ?? "",
      isMain: image.is_main,
    })) ?? []
  );

  async function uploadFiles(files: FileList | null) {
    if (!files?.length) return;
    setBusy(true);
    setError("");
    try {
      const uploaded: ImageItem[] = [];
      for (const file of Array.from(files)) {
        const data = new FormData();
        data.append("file", file);
        const res = await fetch("/api/upload", { method: "POST", body: data });
        const json = await res.json();
        if (!res.ok) throw new Error(json.error || "העלאה נכשלה");
        uploaded.push({ url: json.url, caption: "", isMain: false });
      }
      setImages((current) => {
        const next = [...current, ...uploaded];
        if (!next.some((item) => item.isMain) && next[0]) next[0].isMain = true;
        return next;
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "העלאה נכשלה");
    } finally {
      setBusy(false);
    }
  }

  async function onSubmit(formData: FormData) {
    setError("");
    formData.set("images", JSON.stringify(images));
    const result = await saveArticle(formData);
    if (result?.error) setError(result.error);
  }

  return (
    <form className="form-grid" action={onSubmit}>
      {article ? <input type="hidden" name="id" value={article.id} /> : null}
      <label>
        כותרת
        <input name="title" required defaultValue={article?.title} />
      </label>
      <label>
        כותרת משנה
        <input name="subtitle" defaultValue={article?.subtitle ?? ""} />
      </label>
      <label>
        מדור
        <select name="categoryId" defaultValue={article?.category_id ?? categories[0]?.id}>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </label>
      <label>
        תוכן הכתבה
        <textarea name="body" required defaultValue={article?.body} />
      </label>
      {isAdmin ? (
        <label className="checks">
          <input type="checkbox" name="featured" defaultChecked={article?.featured} />
          כתבה ראשית בדף הבית
        </label>
      ) : null}

      <div>
        <strong>תמונות</strong>
        <p className="meta">אפשר להעלות כמה שרוצים. סמנו תמונה ראשית, וכתבו כיתוב מתחת לכל אחת.</p>
        <input type="file" accept="image/*" multiple disabled={busy} onChange={(e) => uploadFiles(e.target.files)} />
        {busy ? <p>מעלה תמונות…</p> : null}
        <div className="thumbs">
          {images.map((image, index) => (
            <div className="thumb" key={`${image.url}-${index}`}>
              <img src={image.url} alt="" />
              <div className="form-grid">
                <input
                  value={image.caption}
                  placeholder="כיתוב לתמונה"
                  onChange={(e) =>
                    setImages((current) =>
                      current.map((item, i) => (i === index ? { ...item, caption: e.target.value } : item))
                    )
                  }
                />
                <label className="checks">
                  <input
                    type="radio"
                    name="mainImage"
                    checked={image.isMain}
                    onChange={() =>
                      setImages((current) => current.map((item, i) => ({ ...item, isMain: i === index })))
                    }
                  />
                  תמונה ראשית
                </label>
              </div>
              <button
                type="button"
                className="danger"
                onClick={() => setImages((current) => current.filter((_, i) => i !== index))}
              >
                מחק
              </button>
            </div>
          ))}
        </div>
      </div>
      {error ? <p className="error">{error}</p> : null}
      <button type="submit" disabled={busy}>
        שמירה ופרסום
      </button>
    </form>
  );
}
