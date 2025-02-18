// APP
import { Prisma } from '@prisma/client';

export const useAllModelsFindMany = Prisma.defineExtension({
  query: {
    $allModels: {
      async findMany({ model, operation, args, query }) {
        // Global soft delete filter (ignore deleted entries)
        args.where = {
          ...args.where,
          isDeleted: false,
        };

        return query(args);
      },
    },
  },
});
