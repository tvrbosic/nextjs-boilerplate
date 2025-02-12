// APP
import { Prisma } from '@prisma/client';
import { getSession } from '@/utility/session/session';

export const useAllModelsCreateMany = Prisma.defineExtension({
  query: {
    $allModels: {
      async createMany({ args, query }) {
        // ============================| BASE FIELD (CREATED BY ID) |============================ //
        const decodedToken = await getSession();
        if (Array.isArray(args.data)) {
          args.data = args.data.map((item) => ({
            ...item,
            // Use manually provided user guid (case when seeding as superuser) or use authenticated user guid
            createdById: item.createdById || decodedToken?.userGuid,
          }));
        }

        return query(args);
      },
    },
  },
});
