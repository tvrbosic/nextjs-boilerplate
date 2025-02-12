// LIBRARY
import { PrismaClient } from '@prisma/client';

// CUSTOM EXTENSIONS
import { useAllModelsCreate } from '@/prisma/extensions/query/all-models-create';
import { useAllModelsCreateMany } from '@/prisma/extensions/query/all-models-create-many';
import { useAllModelsUpdate } from '@/prisma/extensions/query/all-models-update';
import { useAllModelsUpdateMany } from '@/prisma/extensions/query/all-models-update-many';
import { useSoftDelete } from '@/prisma/extensions/model/all-models-soft-delete';

// EXTENDED CLIENT
function getExtendedClient() {
  return new PrismaClient({
    log: ['query', 'info', 'warn', 'error'], // OPTIONAL: Enable Prisma logging
  })
    .$extends(useAllModelsCreate)
    .$extends(useAllModelsCreateMany)
    .$extends(useAllModelsUpdate)
    .$extends(useAllModelsUpdateMany)
    .$extends(useSoftDelete);
}

/**
 * Create a globally accessible object where the PrismaClient instance will be stored.
 *
 * - This is necessary because, in a development environment with Hot Module Replacement (HMR),
 *   modules are reloaded frequently, which could cause multiple instances of PrismaClient
 *   to be created if we don't store and reuse an existing instance.
 */
const globalForPrisma = global as unknown as {
  prisma: ReturnType<typeof getExtendedClient>;
};

/**
 * Create a singleton Prisma client instance.
 *
 * - If `globalForPrisma.prisma` already exists (i.e., Prisma has already been initialized),
 *   reuse that instance instead of creating a new one.
 * - Otherwise, create a new PrismaClient instance.
 */
export const prisma = globalForPrisma.prisma || getExtendedClient();
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
