import LoginForm from "@/components/LoginForm";
import { getSession } from "@/lib/auth";
import { countUsers } from "@/lib/users";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function LoginPage() {
  const session = await getSession();
  if (session) redirect("/admin");
  let needsSetup = false;
  try {
    needsSetup = (await countUsers()) === 0;
  } catch {
    needsSetup = true;
  }

  return (
    <main>
      <div className="panel">
        <h1>{needsSetup ? "הקמת מנהל ראשון" : "כניסה לניהול"}</h1>
        <p className="meta">ספורט 6</p>
        <LoginForm needsSetup={needsSetup} />
      </div>
    </main>
  );
}
