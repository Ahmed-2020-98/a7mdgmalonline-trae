import { redirect } from "next/navigation";
import { isAuthenticated } from "../../lib/auth";

export default async function DashboardSitePage() {
  const authed = await isAuthenticated();
  if (!authed) {
    redirect("/dashboard/login?next=/dashboard/site");
  }
  redirect("/dashboard/site");
}
