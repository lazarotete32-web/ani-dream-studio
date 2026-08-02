import { useCallback, useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "./useAuth";

export type CreditState = {
  credits: number;
  isPro: boolean;
  lastReset: string | null;
};

export const DAILY_FREE_CREDITS = 5;

/** Claims (and daily-resets) the 5 free credits for the signed-in account. */
export async function claimDailyCredits(): Promise<CreditState | null> {
  const { data, error } = await supabase.rpc("claim_daily_credits");
  if (error || !data) return null;
  const row = Array.isArray(data) ? data[0] : data;
  if (!row) return null;
  return { credits: row.credits, isPro: row.is_pro, lastReset: row.last_reset };
}

/** Spends 1 credit. Throws when the free daily allowance is exhausted. */
export async function spendCredit(): Promise<CreditState> {
  const { data, error } = await supabase.rpc("spend_credit");
  if (error) throw new Error(error.message);
  const row = Array.isArray(data) ? data[0] : data;
  return { credits: row.credits, isPro: row.is_pro, lastReset: row.last_reset };
}

export function useCredits() {
  const { user, loading: authLoading } = useAuth();
  const [state, setState] = useState<CreditState | null>(null);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    if (!user) {
      setState(null);
      setLoading(false);
      return;
    }
    setLoading(true);
    setState(await claimDailyCredits());
    setLoading(false);
  }, [user]);

  useEffect(() => {
    if (!authLoading) void refresh();
  }, [authLoading, refresh]);

  return { ...(state ?? { credits: 0, isPro: false, lastReset: null }), state, loading: loading || authLoading, refresh, signedIn: !!user };
}

/** Hours left until the next daily reset (UTC midnight). */
export function hoursUntilReset(): number {
  const now = new Date();
  const next = new Date(now);
  next.setUTCHours(24, 0, 0, 0);
  return Math.max(1, Math.round((next.getTime() - now.getTime()) / 3_600_000));
}
