import { Prisma } from '@prisma/client';

export const useAuditLog = Prisma.defineExtension({
  query: {
    $allModels: {
      $allOperations({ model, operation, args, query }) {
        // TODO
        return query(args);
      },
    },
  },
});
