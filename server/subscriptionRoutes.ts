import type { Express } from "express";
import { isAuthenticated } from "./replit_integrations/auth";
import { db } from "./db";
import { authUsers } from "@shared/models/auth";
import { eq } from "drizzle-orm";

const SUBSCRIPTION_TIERS = {
  free: {
    name: "Free",
    price: 0,
    features: ["5 customers", "10 products", "Basic dashboard", "Email support"],
  },
  starter: {
    name: "Starter",
    price: 29,
    features: ["50 customers", "100 products", "Full dashboard", "Priority support", "Reports"],
  },
  professional: {
    name: "Professional", 
    price: 79,
    features: ["Unlimited customers", "Unlimited products", "Advanced analytics", "API access", "Custom integrations"],
  },
  enterprise: {
    name: "Enterprise",
    price: 199,
    features: ["Everything in Professional", "Dedicated support", "Custom development", "SLA guarantee"],
  },
};

export function registerSubscriptionRoutes(app: Express): void {
  app.get("/api/subscription/tiers", (_req, res) => {
    res.json(SUBSCRIPTION_TIERS);
  });

  app.get("/api/subscription/current", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const [user] = await db.select().from(authUsers).where(eq(authUsers.id, userId));
      
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      const tier = user.subscriptionTier || "free";
      const tierInfo = SUBSCRIPTION_TIERS[tier as keyof typeof SUBSCRIPTION_TIERS] || SUBSCRIPTION_TIERS.free;

      res.json({
        tier,
        status: user.subscriptionStatus || "active",
        expiresAt: user.subscriptionExpiresAt,
        ...tierInfo,
      });
    } catch (error) {
      console.error("Error fetching subscription:", error);
      res.status(500).json({ message: "Failed to fetch subscription" });
    }
  });

  app.post("/api/subscription/upgrade", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const { tier } = req.body;

      if (!SUBSCRIPTION_TIERS[tier as keyof typeof SUBSCRIPTION_TIERS]) {
        return res.status(400).json({ message: "Invalid subscription tier" });
      }

      const expiresAt = new Date();
      expiresAt.setMonth(expiresAt.getMonth() + 1);

      const [updated] = await db
        .update(authUsers)
        .set({
          subscriptionTier: tier,
          subscriptionStatus: "active",
          subscriptionExpiresAt: expiresAt,
          updatedAt: new Date(),
        })
        .where(eq(authUsers.id, userId))
        .returning();

      res.json({
        message: "Subscription updated successfully",
        subscription: {
          tier: updated.subscriptionTier,
          status: updated.subscriptionStatus,
          expiresAt: updated.subscriptionExpiresAt,
        },
      });
    } catch (error) {
      console.error("Error upgrading subscription:", error);
      res.status(500).json({ message: "Failed to upgrade subscription" });
    }
  });
}
