import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Check, Crown, Zap } from "lucide-react";

interface SubscriptionTier {
  name: string;
  price: number;
  features: string[];
}

interface CurrentSubscription {
  tier: string;
  status: string;
  expiresAt: string | null;
  name: string;
  price: number;
  features: string[];
}

export default function Subscription() {
  const queryClient = useQueryClient();

  const { data: tiers } = useQuery<Record<string, SubscriptionTier>>({
    queryKey: ["/api/subscription/tiers"],
    queryFn: async () => {
      const res = await fetch("/api/subscription/tiers");
      return res.json();
    },
  });

  const { data: current, isLoading } = useQuery<CurrentSubscription>({
    queryKey: ["/api/subscription/current"],
    queryFn: async () => {
      const res = await fetch("/api/subscription/current", { credentials: "include" });
      return res.json();
    },
  });

  const upgradeMutation = useMutation({
    mutationFn: async (tier: string) => {
      const res = await fetch("/api/subscription/upgrade", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ tier }),
      });
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/subscription/current"] });
    },
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin w-8 h-8 border-4 border-emerald-500 border-t-transparent rounded-full" />
      </div>
    );
  }

  const tierOrder = ["free", "starter", "professional", "enterprise"];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">Subscription</h1>
        <p className="text-muted-foreground mt-1">Manage your subscription plan</p>
      </div>

      {current && (
        <div className="bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 border border-emerald-500/20 rounded-2xl p-6 mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Crown className="w-8 h-8 text-emerald-500" />
            <div>
              <h2 className="text-xl font-semibold text-foreground">Current Plan: {current.name}</h2>
              <p className="text-muted-foreground">
                Status: <span className="text-emerald-500 font-medium capitalize">{current.status}</span>
                {current.expiresAt && ` - Expires: ${new Date(current.expiresAt).toLocaleDateString()}`}
              </p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {current.features.map((feature, i) => (
              <span key={i} className="bg-emerald-500/10 text-emerald-600 px-3 py-1 rounded-full text-sm">
                {feature}
              </span>
            ))}
          </div>
        </div>
      )}

      <h3 className="text-lg font-semibold text-foreground mb-4">Available Plans</h3>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {tiers && tierOrder.map((tierKey) => {
          const tier = tiers[tierKey];
          if (!tier) return null;
          const isCurrent = current?.tier === tierKey;
          const isUpgrade = tierOrder.indexOf(tierKey) > tierOrder.indexOf(current?.tier || "free");

          return (
            <div
              key={tierKey}
              className={`bg-card border rounded-xl p-6 ${
                isCurrent ? "border-emerald-500 ring-2 ring-emerald-500/20" : "border-border"
              }`}
            >
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-lg font-semibold text-foreground">{tier.name}</h4>
                {isCurrent && (
                  <span className="bg-emerald-500 text-white text-xs px-2 py-1 rounded-full">Current</span>
                )}
              </div>
              <div className="mb-4">
                <span className="text-3xl font-bold text-foreground">${tier.price}</span>
                <span className="text-muted-foreground">/month</span>
              </div>
              <ul className="space-y-2 mb-6">
                {tier.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Check className="w-4 h-4 text-emerald-500" />
                    {feature}
                  </li>
                ))}
              </ul>
              <button
                onClick={() => upgradeMutation.mutate(tierKey)}
                disabled={isCurrent || upgradeMutation.isPending}
                className={`w-full py-2 rounded-lg font-medium transition flex items-center justify-center gap-2 ${
                  isCurrent
                    ? "bg-muted text-muted-foreground cursor-not-allowed"
                    : isUpgrade
                    ? "bg-emerald-500 hover:bg-emerald-600 text-white"
                    : "bg-muted hover:bg-muted/80 text-foreground"
                }`}
              >
                {isCurrent ? (
                  "Current Plan"
                ) : isUpgrade ? (
                  <>
                    <Zap className="w-4 h-4" />
                    Upgrade
                  </>
                ) : (
                  "Switch Plan"
                )}
              </button>
            </div>
          );
        })}
      </div>

      <div className="mt-8 p-4 bg-muted/50 rounded-lg">
        <p className="text-sm text-muted-foreground text-center">
          Need a custom plan? Contact us for enterprise solutions and volume discounts.
        </p>
      </div>
    </div>
  );
}
