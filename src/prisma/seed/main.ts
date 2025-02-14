// LIBRARY
import { PrismaClient } from '@prisma/client';

// APP
import seedSuperUser from '@/prisma/seed/0-superuser';
import seedUsers from '@/prisma/seed/1-users';

/**
 * NOTE:
 * For seed we use non-extended prisma client directly from library because extended client uses
 * userGuid for session which is not available in seed scenario (triggered from command line and
 * not through HTTP request).
 */
const prisma = new PrismaClient();

async function main() {
  const start = new Date();
  console.log('Database seed started...');

  const superUser = await seedSuperUser(prisma);
  await seedUsers(prisma, superUser);

  const end = new Date();
  console.log(
    `Database seed completed in ${end.getTime() - start.getTime()}ms`
  );
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
