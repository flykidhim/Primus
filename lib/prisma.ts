import "server-only";
import { PrismaClient } from "@prisma/client";

const g = globalThis as unknown as { _prisma?: PrismaClient };

// No $connect() here!
export const prisma =
  g._prisma ??
  new PrismaClient({
    // log: ['query'],
  });

if (process.env.NODE_ENV !== "production") {
  g._prisma = prisma;
}
