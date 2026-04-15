"use client";

import { useState, useEffect, useCallback } from "react";
import { useSupabase } from "./hooks";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ContentData = Record<string, any>;

export function usePageContent(pageSlug: string, defaults: ContentData = {}) {
  const supabase = useSupabase();
  const [content, setContent] = useState<ContentData>(defaults);
  const [loading, setLoading] = useState(true);

  const fetchContent = useCallback(async () => {
    const { data, error } = await supabase
      .from("page_content")
      .select("content")
      .eq("page_slug", pageSlug)
      .single();

    if (!error && data?.content) {
      setContent({ ...defaults, ...(data.content as ContentData) });
    }
    setLoading(false);
  }, [supabase, pageSlug]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    fetchContent();
  }, [fetchContent]);

  function get<T = string>(key: string, fallback?: T): T {
    return (content[key] as T) ?? (defaults[key] as T) ?? (fallback as T);
  }

  return { content, get, loading };
}
