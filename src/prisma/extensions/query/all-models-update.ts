// APP
import { Prisma } from '@prisma/client';
import { getSession } from '@/utility/session/session';

export const useAllModelsUpdate = Prisma.defineExtension((prisma) =>
  prisma.$extends({
    query: {
      $allModels: {
        async update({ model, operation, args, query }) {
          if (model === 'AuditLog') {
            // Handle AuditLog table update without additional actions
            return query(args);
          }

          // Get authenticated user
          const decodedToken = await getSession();

          // Determine if update operation was called as result of softDelete (converted delete to update operation)
          const isSoftDeleteOperation = args.data.isDeleted;

          // Set updatedById and updatedAt but not in case isSoftDeleteOperation
          if (!isSoftDeleteOperation) {
            args.data.updatedById = decodedToken?.guid;
            args.data.updatedAt = new Date();

            // Global soft delete filter (do not update already deleted entries)
            args.where = {
              ...args.where,
              isDeleted: false,
            };
          }

          // Create audit log entry
          const auditEntry = {
            targetTable: model,
            targetGuid: '',
            action: operation as string,
            actionById: decodedToken?.guid,
            payload: JSON.parse(JSON.stringify(args.data)),
          };

          // Execute transaction: original query + audit log create
          const result = await prisma.$transaction(async (tx) => {
            const updateResult = await query(args);

            await prisma.auditLog.create({
              data: {
                ...auditEntry,
                targetGuid: updateResult.guid,
                action: isSoftDeleteOperation ? 'delete' : 'update',
              },
            });

            return updateResult;
          });

          // Return operation result
          return result;
        },
      },
    },
  })
);
