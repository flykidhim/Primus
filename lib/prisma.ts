// lib/prisma.ts
import "server-only";
import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

// NEVER call $connect() here.
// Just instantiate and cache for dev HMR.
export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    // log: ['query'], // optional when debugging
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
