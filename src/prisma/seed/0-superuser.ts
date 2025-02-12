// LIBRARY
import { PrismaClient } from '@prisma/client';

// TYPES
import { User } from '@prisma/client';

async function seedSuperUser(prisma: PrismaClient): Promise<User> {
  const superUserEmail = 'superuser@email.com';

  // Check if the superuser already exists
  const existingUser = await prisma.user.findUnique({
    where: { email: superUserEmail },
  });

  if (!existingUser) {
    const superUser = await prisma.user.create({
      data: {
        email: superUserEmail,
        password: 'SUPERUSER',
        firstName: 'SUPERUSER',
        lastName: 'SUPERUSER',
        role: 'ADMIN',
      },
    });

    console.log('Superuser created:', superUser);
    return superUser as User;
  } else {
    console.log('Superuser already exists:', existingUser);
    return existingUser;
  }
}

export default seedSuperUser;
