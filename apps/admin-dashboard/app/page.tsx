import { redirect } from "next/navigation";

// Root page redirects to the login screen.
export default function RootPage() {
  redirect("/login");
}
