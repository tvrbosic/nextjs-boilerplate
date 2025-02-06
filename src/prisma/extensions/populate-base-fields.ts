// APP
import { Prisma } from '@prisma/client';
import { authenticatedRequestALS } from '@/utility/async-local-storage/async-local-storage';

export const usePopulateBaseFields = Prisma.defineExtension({
  query: {
    $allModels: {
      $allOperations({ model, operation, args, query }) {
        // Get user that triggered operation and use for createdById, updatedById and deletedById
        const store = authenticatedRequestALS.getStore();
        console.log('aaaaaaaaaaaaaaaaaaaaaaaa: ');
        console.log(store);

        // CREATE OPERATIONS (https://www.prisma.io/docs/orm/prisma-client/queries/crud#create)
        if (
          operation === 'create' ||
          operation === 'createMany' ||
          operation === 'createManyAndReturn'
        ) {
          if ('data' in args) {
            if (Array.isArray(args.data)) {
              args.data = args.data.map((entry) => ({
                ...entry,
                createdById: store?.userGuid,
              }));
            } else if (typeof args.data === 'object' && args.data !== null) {
              args.data = {
                ...args.data,
                createdById: store?.userGuid,
              };
            }
          }
        }

        // UPDATE OPERATIONS (https://www.prisma.io/docs/orm/prisma-client/queries/crud#update)
        else if (
          operation === 'update' ||
          operation === 'updateMany' ||
          operation === 'updateManyAndReturn'
        ) {
          if (typeof args.data === 'object' && args.data !== null) {
            args.data = {
              ...args.data,
              updatedAt: new Date(),
              updatedById: store?.userGuid,
            };
          }
        }

        // DELETE OPERATIONS (https://www.prisma.io/docs/orm/prisma-client/queries/crud#delete)
        else if (operation === 'delete' || operation === 'deleteMany') {
          if ('where' in args) {
            console.log(`Deleting record in model ${model}:`, args.where);
            // TODO: Implement soft delete and (isDeleted, deletedBy, deletedAt)
          }
        }

        return query(args);
      },
    },
  },
});
