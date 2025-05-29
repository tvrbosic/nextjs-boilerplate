// LIBRARY
import { PrismaClient } from '@prisma/client';

// APP
import seedSuperUser from '@/prisma/seed/0-superuser';
import seedUsers from '@/prisma/seed/1-users';

/**
 * NOTE:
 * For seed we use non-extended prisma client directly from library because extended client uses
 * guid for session which is not available in seed scenario (triggered from command line and
 * not through HTTP request).
 */
const prisma = new PrismaClient();

async function main() {
  const start = new Date();
  console.log('🌱 DATABASE SEED STARTED 🌱');

  const superUser = await seedSuperUser(prisma);
  await seedUsers(prisma, superUser);

  const end = new Date();
  console.log(`✅ DATABASE SEED COMPLETED IN ${end.getTime() - start.getTime()}ms ✅`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
