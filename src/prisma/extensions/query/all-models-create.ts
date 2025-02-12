// APP
import { Prisma } from '@prisma/client';
import { getSession } from '@/utility/session/session';

export const useAllModelsCreate = Prisma.defineExtension({
  query: {
    $allModels: {
      // ============================| BASE FIELD (CREATED BY ID) |============================ //
      async create({ model, operation, args, query }) {
        const decodedToken = await getSession();

        // Use manually provided user guid (case when seeding as superuser) or use authenticated user guid
        args.data.createdById = args.data.createdById || decodedToken?.userGuid;

        return query(args);
      },
    },
  },
});
