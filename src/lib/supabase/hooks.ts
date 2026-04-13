import { useState } from "react";
import { createClient } from "./client";

export function useSupabase() {
  const [supabase] = useState(() => createClient());
  return supabase;
}
