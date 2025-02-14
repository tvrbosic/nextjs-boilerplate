// APP
import { Prisma } from '@prisma/client';
import { getSession } from '@/utility/session/session';

export const useAllModelsCreateMany = Prisma.defineExtension((prisma) =>
  prisma.$extends({
    query: {
      $allModels: {
        async createMany({ model, operation, args, query }) {
          // Handle insert into table without additional actions
          if (model === 'AuditLog') {
            return query(args);
          }

          // Get authenticated user and assign to createdById
          const decodedToken = await getSession();

          // Ensure args.data is an array even if it's a single object
          const dataArray = Array.isArray(args.data) ? args.data : [args.data];

          // Add the createdById if not present
          const modifiedDataArray = dataArray.map((item) => ({
            ...item,
            createdById: item.createdById || decodedToken?.userGuid,
          }));

          // Execute transactions: split createMany into individual create operations + bulk audit log insert
          return prisma.$transaction(async (tx) => {
            const results = [];

            // Loop through each item in modifiedData and execute create individually
            for (const item of modifiedDataArray) {
              // Perform the create operation for each item

              /**
               * We ignore TS warning because:
               * We want to call create method for generic model (any model available in application).
               * Prisma generated model types are PascalCase while tx properties we want want to access are camelCase.
               * For example: model = 'User' but we want to call tx.user.create which causes TypeScript error.
               * Solution with my current understanindg of Prisma (possibly there are better ways).
               */
              const modelModifiedCase = model[0].toLowerCase() + model.slice(1);
              // @ts-expect-error
              const createResult = await tx[modelModifiedCase].create({
                data: item,
              });

              /**
               * IMPORTANT:
               * We are not creating audit logs manually here because calling create will trigger Prisma client extension for create which already does that.
               * Manually calling audit log insertions here would result in duplicate entries.
               */

              // Store the result of the create operation
              results.push(createResult);
            }

            return results; // Return the array of results
          });
        },
      },
    },
  })
);
