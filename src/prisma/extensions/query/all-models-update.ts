// APP
import { Prisma } from '@prisma/client';
import { getSession } from '@/utility/session/session';

export const useAllModelsUpdate = Prisma.defineExtension({
  query: {
    $allModels: {
      async update({ model, operation, args, query }) {
        const decodedToken = await getSession();
        // Skip setting updatedById and updatedAt due to fact that update method was called as result of softDelete method
        if (!args.data.isDeleted) {
          // Use manually provided user guid (case when seeding as superuser) or use authenticated user guid
          args.data.updatedById =
            args.data.updatedById || decodedToken?.userGuid;
          args.data.updatedAt = new Date();
        }

        // Global soft delete filter
        args.where = {
          ...args.where,
          isDeleted: false,
        };

        return query(args);
      },
    },
  },
});
