import { useEffect, useState, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";

export function useCredits() {
  const [credits, setCredits] = useState<number | null>(null);
  const [isPremium, setIsPremium] = useState(false);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    const { data: session } = await supabase.auth.getSession();
    const uid = session.session?.user.id;
    if (!uid) { setCredits(null); setLoading(false); return; }
    const { data } = await supabase
      .from("profiles")
      .select("credits, is_premium")
      .eq("id", uid)
      .maybeSingle();
    setCredits(data?.credits ?? 0);
    setIsPremium(!!data?.is_premium);
    setLoading(false);
  }, []);

  useEffect(() => {
    refresh();
    const { data: sub } = supabase.auth.onAuthStateChange(() => refresh());
    return () => sub.subscription.unsubscribe();
  }, [refresh]);

  const consumeOne = useCallback(async () => {
    const { data: session } = await supabase.auth.getSession();
    const uid = session.session?.user.id;
    if (!uid) return;
    const { data } = await supabase
      .from("profiles")
      .select("credits, is_premium")
      .eq("id", uid)
      .maybeSingle();
    if (!data || data.is_premium) return;
    const next = Math.max(0, (data.credits ?? 0) - 1);
    await supabase.from("profiles").update({ credits: next }).eq("id", uid);
    setCredits(next);
  }, []);

  return { credits, isPremium, loading, refresh, consumeOne };
}
