export function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

export function bodyToHtml(body: string) {
  return escapeHtml(body)
    .split(/\n{2,}/)
    .map((paragraph) => `<p>${paragraph.replaceAll("\n", "<br/>")}</p>`)
    .join("");
}

export function formatDate(value: string | Date) {
  return new Date(value).toLocaleDateString("he-IL", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function formatDateTime(value: string | Date) {
  return new Date(value).toLocaleString("he-IL", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function excerpt(text: string, length = 180) {
  const clean = text.replace(/\s+/g, " ").trim();
  if (clean.length <= length) return clean;
  return `${clean.slice(0, length).trim()}…`;
}

export function focusStyle(x?: number | null, y?: number | null) {
  return { objectPosition: `${Number.isFinite(Number(x)) ? Number(x) : 50}% ${Number.isFinite(Number(y)) ? Number(y) : 0}%` };
}
