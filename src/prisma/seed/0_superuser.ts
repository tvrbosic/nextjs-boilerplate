import { prisma } from '@/prisma/prisma';

const seedSuperUser = async () => {
  const superUserEmail = 'superuser@email.com';

  // Check if the superuser already exists
  const existingUser = await prisma.user.findUnique({
    where: { email: superUserEmail },
  });

  if (!existingUser) {
    const superUser = await prisma.user.create({
      data: {
        email: superUserEmail,
        firstName: 'SUPERUSER',
        lastName: 'SUPERUSER',
        role: 'ADMIN',
      },
    });

    console.log('Superuser created:', superUser);
    return superUser;
  } else {
    console.log('Superuser already exists:', existingUser);
    return existingUser;
  }
};

export default seedSuperUser;
