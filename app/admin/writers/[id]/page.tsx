import { notFound } from "next/navigation";
import WriterForm from "@/components/WriterForm";
import { requireAdmin } from "@/lib/actions-auth";
import { getUserById } from "@/lib/users";

export const dynamic = "force-dynamic";

export default async function EditWriterPage({ params }: { params: Promise<{ id: string }> }) {
  await requireAdmin();
  const { id } = await params;
  const writer = await getUserById(Number(id));
  if (!writer) notFound();
  return (
    <div className="panel">
      <h1>עריכת כתב</h1>
      <WriterForm writer={writer} />
    </div>
  );
}
