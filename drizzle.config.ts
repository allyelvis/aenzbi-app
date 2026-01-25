import type { Config } from "drizzle-kit";

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL must be set");
}

export default {
  out: "./migrations",
  schema: "./shared/schema.ts",
  driver: "pg",
  dbCredentials: {
    connectionString: process.env.DATABASE_URL,
  },
} satisfies Config;
