import { Prisma } from '@prisma/client';

export const usePopulateBaseFields = Prisma.defineExtension({
  query: {
    $allModels: {
      $allOperations({ model, operation, args, query }) {
        const hardcodedUserId = 'some-user-id'; // Replace with dynamic value later

        if (typeof args !== 'object' || args === null) {
          return query(args); // Ensure args is valid before proceeding
        }

        // CREATE OPERATIONS
        if (operation === 'create' || operation === 'createMany') {
          if ('data' in args) {
            if (Array.isArray(args.data)) {
              args.data = args.data.map((entry) => ({
                ...entry,
                createdById: entry.createdById ?? hardcodedUserId,
              }));
            } else if (typeof args.data === 'object' && args.data !== null) {
              args.data = {
                ...args.data,
                createdById: args.data.createdById ?? hardcodedUserId,
              };
            }
          }
        }

        // UPDATE OPERATIONS
        else if (operation === 'update' || operation === 'updateMany') {
          if (
            'data' in args &&
            typeof args.data === 'object' &&
            args.data !== null
          ) {
            args.data = {
              ...args.data,
              updatedAt: new Date(), // Automatically update 'updatedAt' timestamp
            };
          }
        }

        // DELETE OPERATIONS
        else if (operation === 'delete' || operation === 'deleteMany') {
          if ('where' in args) {
            console.log(`Deleting record in model ${model}:`, args.where);
          }
        }

        return query(args);
      },
    },
  },
});
