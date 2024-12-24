"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";

export async function logout() {
  const supabase = createClient();
  await supabase.auth.signOut();

  // Redirect to login page after sign out
  redirect("/login");
}
