// APP
import { Prisma } from '@prisma/client';

export const useAllModelsFindUnique = Prisma.defineExtension({
  query: {
    $allModels: {
      async findUnique({ model, operation, args, query }) {
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
