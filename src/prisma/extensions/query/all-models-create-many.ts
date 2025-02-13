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
          const modifiedData = dataArray.map((item) => ({
            ...item,
            createdById: item.createdById || decodedToken?.userGuid,
          }));

          // Execute transaction: split createMany into individual create operations + bulk audit log insert
          return prisma.$transaction(async (tx) => {
            const results = [];

            // Loop through each item in modifiedData and execute create individually
            for (const item of modifiedData) {
              // Perform the create operation for each item
              const createResult = await tx[model].create({
                data: item,
              });

              // Generate an audit log entry for each created record
              const auditLog = {
                targetTable: model,
                targetGuid: createResult.guid, // Assuming `guid` is available
                action: operation,
                actionById: decodedToken?.userGuid,
                payload: JSON.parse(JSON.stringify(item)), // Ensure JSON-safe format
              };

              // Create audit log for the current record
              await tx.auditLog.create({
                data: auditLog,
              });

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
