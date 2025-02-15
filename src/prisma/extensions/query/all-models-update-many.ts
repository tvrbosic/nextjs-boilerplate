// APP
import { Prisma } from '@prisma/client';
import { getSession } from '@/utility/session/session';

export const useAllModelsUpdateMany = Prisma.defineExtension((prisma) =>
  prisma.$extends({
    query: {
      $allModels: {
        async updateMany({ model, operation, args, query }) {
          if (model === 'AuditLog') {
            // Handle AuditLog table update without additional actions
            return query(args);
          }
          // Get authenticated user and assign to updatedById
          const decodedToken = await getSession();

          // Set updatedById and updatedAt but not in case when updateMany was called as result of softDeleteMany (converted delete to update operation)
          if (!args.data.isDeleted) {
            args.data.updatedById = decodedToken?.userGuid;
            args.data.updatedAt = new Date();
          }

          // Global soft delete filter (do not update already deleted entries)
          args.where = {
            ...args.where,
            isDeleted: false,
          };

          // Execute transactions: split createMany into individual create operations
          return prisma.$transaction(async (tx) => {
            const results = [];
            const modelModifiedCase = model[0].toLowerCase() + model.slice(1);

            /**
             * We ignore TS warning because:
             * We want to call create method for generic model (any model available in application).
             * Prisma generated model types are PascalCase while tx properties we want want to access are camelCase.
             * For example: model = 'User' but we want to call tx.user.create which causes TypeScript error.
             * (Possibly there are better ways to do this).
             */
            // @ts-expect-error
            const entriesToUpdate = await tx[modelModifiedCase].findMany({
              where: args.where,
            });

            // Loop through each item in modifiedData and execute create individually
            for (const entry of entriesToUpdate) {
              /**
               * We ignore TS warning because:
               * We want to call create method for generic model (any model available in application).
               * Prisma generated model types are PascalCase while tx properties we want want to access are camelCase.
               * For example: model = 'User' but we want to call tx.user.create which causes TypeScript error.
               * (Possibly there are better ways to do this).
               */
              // @ts-expect-error
              const updateResult = await tx[modelModifiedCase].update({
                where: {
                  guid: entry.guid,
                },
                data: args.data,
              });

              /**
               * IMPORTANT:
               * We are not creating audit logs manually here because calling update operation will trigger Prisma client extension
               * for update which already does that. Manually calling audit log insertions here would result in duplicate entries.
               */

              // Store the result of the operation
              results.push(updateResult);
            }

            return results; // Return the array of results
          });
        },
      },
    },
  })
);
