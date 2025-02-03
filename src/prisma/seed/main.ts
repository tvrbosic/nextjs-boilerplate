import { PrismaClient } from '@prisma/client';
import seedSuperUser from '@/prisma/seed/0_superuser';
import seedUsers from '@/prisma/seed/01_users';

const prisma = new PrismaClient();

async function main() {
  const start = new Date();
  console.log('Database seed started...');

  const superUser = await seedSuperUser();
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
