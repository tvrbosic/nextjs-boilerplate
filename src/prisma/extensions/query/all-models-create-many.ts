// APP
import { Prisma } from '@prisma/client';
import { getSession } from '@/utility/session/session';

export const useAllModelsCreateMany = Prisma.defineExtension((prisma) =>
  prisma.$extends({
    query: {
      $allModels: {
        async createMany({ model, operation, args, query }) {
          if (model === 'AuditLog') {
            // Handle AuditLog table create without additional actions
            return query(args);
          }

          // Get authenticated user
          const decodedToken = await getSession();

          // Ensure args.data is an array even if it's a single object
          const dataArray = Array.isArray(args.data) ? args.data : [args.data];

          // Add the createdById if not present
          const modifiedDataArray = dataArray.map((item) => ({
            ...item,
            createdById: item.createdById || decodedToken?.userGuid,
          }));

          // Execute transactions: split createMany into individual create operations
          return prisma.$transaction(async (tx) => {
            const results = [];
            const modelModifiedCase = model[0].toLowerCase() + model.slice(1);

            // Loop through each item in modifiedData and execute create individually
            for (const entry of modifiedDataArray) {
              /**
               * We ignore TS warning because:
               * We want to call create method for generic model (any model available in application).
               * Prisma generated model types are PascalCase while tx properties we want want to access are camelCase.
               * For example: model = 'User' but we want to call tx.user.create which causes TypeScript error.
               * (Possibly there are better ways to do this).
               */
              // @ts-expect-error
              const createResult = await tx[modelModifiedCase].create({
                data: entry,
              });

              /**
               * IMPORTANT:
               * We are not creating audit logs manually here because calling create operation will trigger Prisma client extension
               * for create which already does that. Manually calling audit log insertions here would result in duplicate entries.
               */

              // Store the result of the operation
              results.push(createResult);
            }

            return results; // Return the array of results
          });
        },
      },
    },
  })
);
