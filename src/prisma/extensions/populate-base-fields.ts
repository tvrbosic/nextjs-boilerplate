import { Prisma } from '@prisma/client';

export const usePopulateBaseFields = Prisma.defineExtension({
  query: {
    $allModels: {
      $allOperations({ model, operation, args, query }) {
        // CREATE OPERATIONS
        if (
          operation === 'create' ||
          operation === 'createMany' ||
          operation === 'createManyAndReturn'
        ) {
          if ('data' in args) {
            if (Array.isArray(args.data)) {
              args.data = args.data.map((entry) => ({
                ...entry,
                createdById: entry.createdById,
              }));
            } else if (typeof args.data === 'object' && args.data !== null) {
              args.data = {
                ...args.data,
                createdById: args.data.createdById,
              };
            }
          }
        }

        // UPDATE OPERATIONS
        else if (
          operation === 'update' ||
          operation === 'updateMany' ||
          operation === 'updateManyAndReturn'
        ) {
          if (Array.isArray(args.data)) {
            args.data = args.data.map((entry) => ({
              ...entry,
              updatedAt: new Date(),
              updatedById: entry.updatedById,
            }));
          } else if (typeof args.data === 'object' && args.data !== null) {
            args.data = {
              ...args.data,
              updatedAt: new Date(),
              updatedById: args.data.updatedById,
            };
          }
        }

        // DELETE OPERATIONS
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
