import { Prisma } from '@prisma/client';

export const useAuditLog = Prisma.defineExtension({
  query: {
    $allModels: {
      $allOperations({ model, operation, args, query }) {
        console.log('Model', model);
        console.log('Operation', operation);
        console.log('Args', args);
        console.log('Query', query);
        return query(args);
      },
    },
  },
});
