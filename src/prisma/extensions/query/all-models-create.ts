// APP
import { Prisma } from '@prisma/client';
import { getSession } from '@/utility/session';

export const useAllModelsCreate = Prisma.defineExtension((prisma) =>
  prisma.$extends({
    query: {
      $allModels: {
        async create({ model, operation, args, query }) {
          if (model === 'AuditLog') {
            // Handle AuditLog table create without additional actions
            return query(args);
          }

          // Get authenticated user and assign to createdById
          const decodedToken = await getSession();
          args.data.createdById = decodedToken?.guid;

          // Create audit log entry
          const auditEntry = {
            targetTable: model,
            targetGuid: '',
            action: operation,
            actionById: decodedToken?.guid,
            payload: JSON.parse(JSON.stringify(args.data)),
          };

          // Execute transaction: original query + audit log create
          const result = await prisma.$transaction(async (tx) => {
            const createResult = await query(args);

            await prisma.auditLog.create({
              data: { ...auditEntry, targetGuid: createResult.guid },
            });

            return createResult;
          });

          // Return operation result
          return result;
        },
      },
    },
  })
);
