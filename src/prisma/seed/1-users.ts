// LIBRARY
import bcrypt from 'bcryptjs';

// TYPES
import type { PrismaClient, User } from '@prisma/client';

const seedUsers = async (prisma: PrismaClient, superUser: User) => {
  const start = Date.now();
  console.log('User seed started...');

  const hashedMockPassword = await bcrypt.hash('Password1234', 10);

  const createManyUsers = await prisma.user.createMany({
    data: [
      {
        email: 'john.smith@email.com',
        firstName: 'John',
        lastName: 'Smith',
        role: 'USER',
        createdById: superUser.guid,
        password: hashedMockPassword,
      },
      {
        email: 'mary.jones@email.com',
        firstName: 'Mary',
        lastName: 'Jones',
        role: 'USER',
        createdById: superUser.guid,
        password: hashedMockPassword,
      },
      {
        email: 'david.wilson@email.com',
        firstName: 'David',
        lastName: 'Wilson',
        role: 'USER',
        createdById: superUser.guid,
        password: hashedMockPassword,
      },
      {
        email: 'laura.davis@email.com',
        firstName: 'Laura',
        lastName: 'Davis',
        role: 'USER',
        createdById: superUser.guid,
        password: hashedMockPassword,
      },
      {
        email: 'mark.thompson@email.com',
        firstName: 'Mark',
        lastName: 'Thompson',
        role: 'USER',
        createdById: superUser.guid,
        password: hashedMockPassword,
      },
      {
        email: 'susan.miller@email.com',
        firstName: 'Susan',
        lastName: 'Miller',
        role: 'USER',
        createdById: superUser.guid,
        password: hashedMockPassword,
      },
      {
        email: 'chris.roberts@email.com',
        firstName: 'Chris',
        lastName: 'Roberts',
        role: 'USER',
        createdById: superUser.guid,
        password: hashedMockPassword,
      },
      {
        email: 'emily.walker@email.com',
        firstName: 'Emily',
        lastName: 'Walker',
        role: 'USER',
        createdById: superUser.guid,
        password: hashedMockPassword,
      },
      {
        email: 'james.anderson@email.com',
        firstName: 'James',
        lastName: 'Anderson',
        role: 'USER',
        createdById: superUser.guid,
        password: hashedMockPassword,
      },
      {
        email: 'sarah.harris@email.com',
        firstName: 'Sarah',
        lastName: 'Harris',
        role: 'USER',
        createdById: superUser.guid,
        password: hashedMockPassword,
      },
    ],
    skipDuplicates: true,
  });

  const end = Date.now();
  console.log(
    `User seed completed: seeded ${createManyUsers.count} users in ${end - start} ms`
  );
  console.log(
    '-------------------------------------------------------------------------------'
  );
};

export default seedUsers;
