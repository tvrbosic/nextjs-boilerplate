// SOURCE: https://www.prisma.io/docs/orm/more/help-and-troubleshooting/nextjs-help#best-practices-for-using-prisma-client-in-development
import { PrismaClient } from '@prisma/client';

/**
 * Create a globally accessible object where the PrismaClient instance will be stored.
 *
 * - This is necessary because, in a development environment with Hot Module Replacement (HMR),
 *   modules are reloaded frequently, which could cause multiple instances of PrismaClient
 *   to be created if we don't store and reuse an existing instance.
 */
const globalForPrisma = global as unknown as { prisma: PrismaClient };

/**
 * Create a singleton Prisma client instance.
 *
 * - If `globalForPrisma.prisma` already exists (i.e., Prisma has already been initialized),
 *   reuse that instance instead of creating a new one.
 * - Otherwise, create a new PrismaClient instance.
 */
export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: ['query', 'info', 'warn', 'error'], // OPTIONAL: Enable Prisma logging
  });

/**
 * Persist the Prisma instance in `globalForPrisma` in development mode.
 *
 * This ensures that PrismaClient is stored globally and survives module reloads, preventing
 * multiple connections to the database during development.
 *
 * Why is this necessary?
 * - Without this line, `globalForPrisma.prisma` would always be `undefined` on module reloads.
 * - As a result, `new PrismaClient()` would be executed again, creating a new instance every time.
 * - This can lead to "Too many connections" errors and unnecessary database load.
 * - In production, this is **not** needed because modules do not hot-reload.
 */
if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}
