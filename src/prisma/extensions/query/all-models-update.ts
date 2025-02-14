// APP
import { Prisma } from '@prisma/client';
import { getSession } from '@/utility/session/session';

export const useAllModelsUpdate = Prisma.defineExtension((prisma) =>
  prisma.$extends({
    query: {
      $allModels: {
        async update({ model, operation, args, query }) {
          if (model === 'AuditLog') {
            // Handle insert into AuditLog table without additional actions
            return query(args);
          }

          // Get authenticated user
          const decodedToken = await getSession();

          // Skip setting updatedById and updatedAt if update method was called as result of softDelete method (converted delete to update operation)
          if (!args.data.isDeleted) {
            args.data.updatedById = decodedToken?.userGuid;
            args.data.updatedAt = new Date();
          }

          // Global soft delete filter
          args.where = {
            ...args.where,
            isDeleted: false,
          };

          // Create audit log entry
          const auditEntry = {
            targetTable: model,
            targetGuid: '',
            action: operation,
            actionById: decodedToken!.userGuid,
            payload: JSON.parse(JSON.stringify(args.data)),
          };

          // Execute transaction: original query + audit log create
          const result = await prisma.$transaction(async (tx) => {
            const updateResult = await query(args);

            await prisma.auditLog.create({
              data: { ...auditEntry, targetGuid: updateResult.guid },
            });

            return updateResult;
          });

          // Return update operation result
          return result;
        },
      },
    },
  })
);
