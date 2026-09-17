import { deleteComment } from "@/lib/actions-comments";
import type { ArticleComment } from "@/lib/comments";
import { formatDateTime } from "@/lib/format";
import { CommentForm } from "./CommentForm";

export function Comments({
  articleId,
  comments,
  canModerate,
}: {
  articleId: number;
  comments: ArticleComment[];
  canModerate: boolean;
}) {
  return (
    <section className="comments">
      <h2>תגובות {comments.length ? `(${comments.length})` : ""}</h2>
      {comments.length ? (
        <ol className="comment-list">
          {comments.map((comment) => (
            <li key={comment.id} className="comment">
              <div className="comment-head">
                <strong>{comment.author_name}</strong>
                <time dateTime={new Date(comment.created_at).toISOString()}>{formatDateTime(comment.created_at)}</time>
                {canModerate ? (
                  <form action={deleteComment}>
                    <input type="hidden" name="id" value={comment.id} />
                    <input type="hidden" name="articleId" value={articleId} />
                    <button className="danger comment-delete" type="submit">
                      מחיקה
                    </button>
                  </form>
                ) : null}
              </div>
              <p className="comment-body">{comment.body}</p>
            </li>
          ))}
        </ol>
      ) : (
        <p className="comments-empty">עדיין אין תגובות. היו הראשונים להגיב.</p>
      )}
      <CommentForm articleId={articleId} />
    </section>
  );
}
