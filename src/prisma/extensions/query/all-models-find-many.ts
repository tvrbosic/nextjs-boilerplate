// APP
import { Prisma } from '@prisma/client';

export const useAllModelsFindUnique = Prisma.defineExtension({
  query: {
    $allModels: {
      async findMany({ model, operation, args, query }) {
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
