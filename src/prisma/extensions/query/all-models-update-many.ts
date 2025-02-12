// APP
import { Prisma } from '@prisma/client';
import { getSession } from '@/utility/session/session';

export const useAllModelsUpdateMany = Prisma.defineExtension({
  query: {
    $allModels: {
      async updateMany({ args, query }) {
        // ============================| BASE FIELD (UPDATED BY ID, UPDATED AT) |============================ //
        const decodedToken = await getSession();
        if (Array.isArray(args.data)) {
          args.data = args.data.map((item) => {
            // Skip setting updatedById and updatedAt due to fact that update method was called as result of softDelete method
            if (!item.isDeleted) {
              return {
                ...item,
                // Use manually provided user guid (case when seeding as superuser) or use authenticated user guid
                updatedAt: new Date(),
                updatedById: item.updatedById || decodedToken?.userGuid,
              };
            }
          });
        }

        // ============================| GLOBAL SOFT DELETE FILTER |============================ //
        args.where = {
          ...args.where,
          isDeleted: false,
        };

        return query(args);
      },
    },
  },
});
