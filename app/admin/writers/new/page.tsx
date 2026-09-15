import WriterForm from "@/components/WriterForm";
import { requireAdmin } from "@/lib/actions-auth";

export const dynamic = "force-dynamic";

export default async function NewWriterPage() {
  await requireAdmin();
  return (
    <div className="panel">
      <h1>כתב חדש</h1>
      <WriterForm />
    </div>
  );
}
