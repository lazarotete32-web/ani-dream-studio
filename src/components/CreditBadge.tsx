import { Zap, Infinity as InfinityIcon } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { useCredits } from "@/hooks/useCredits";

export function CreditBadge() {
  const { credits, isPremium, loading } = useCredits();
  return (
    <Link
      to="/subscription"
      className="glass flex items-center gap-2 rounded-full px-3 py-1.5 transition hover:scale-105"
      title={isPremium ? "Pro: unlimited generations" : `${credits ?? 0} transformations remaining`}
    >
      <Zap className="h-4 w-4 text-neon-cyan" />
      {isPremium ? (
        <>
          <InfinityIcon className="h-4 w-4" />
          <span className="text-xs text-muted-foreground">Pro</span>
        </>
      ) : (
        <>
          <span className="text-sm font-semibold">{loading ? "…" : credits ?? 0}</span>
          <span className="text-xs text-muted-foreground">credits</span>
        </>
      )}
    </Link>
  );
}

export function CreditRow() {
  const { credits, isPremium, loading } = useCredits();
  return (
    <div className="glass flex items-center gap-3 rounded-2xl p-4">
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-cyber shadow-neon">
        <Zap className="h-5 w-5" />
      </div>
      <div className="flex-1">
        <p className="text-sm font-bold">
          {isPremium ? "Unlimited transformations" : loading ? "Loading…" : `${credits ?? 0} transformations left`}
        </p>
        <p className="text-[11px] text-muted-foreground">
          {isPremium ? "You're on AniGen Pro ✨" : "Each generation uses 1 credit"}
        </p>
      </div>
      {!isPremium && (
        <Link to="/subscription" className="rounded-full bg-gradient-cyber px-3 py-1.5 text-xs font-bold">
          Get more
        </Link>
      )}
    </div>
  );
}
