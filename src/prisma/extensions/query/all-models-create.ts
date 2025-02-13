// APP
import { Prisma } from '@prisma/client';
import { getSession } from '@/utility/session/session';

export const useAllModelsCreate = Prisma.defineExtension((prisma) =>
  prisma.$extends({
    query: {
      $allModels: {
        // ============================| BASE FIELD (CREATED BY ID) |============================ //
        async create({ model, operation, args, query }) {
          // Handle create on AuditLog table without additional actions
          if (model === 'AuditLog') {
            return query(args);
          }

          // Get authenticated user
          const decodedToken = await getSession();

          // Use manually provided user guid (case when seeding as superuser) or use authenticated user guid
          args.data.createdById =
            args.data.createdById || decodedToken!.userGuid;

          // Create audit log entry
          const auditEntry = {
            targetTable: model,
            targetGuid: '',
            action: operation,
            actionById: decodedToken!.userGuid,
            payload: JSON.parse(JSON.stringify(args.data)),
          };

          // Execute both the original query and audit log insert. Use guid of created entry in audit log entry
          const result = await prisma.$transaction(async (tx) => {
            const createResult = await query(args);

            await prisma.auditLog.create({
              data: { ...auditEntry, targetGuid: createResult.guid },
            });

            return createResult;
          });

          // Return create operation result
          return result;
        },
      },
    },
  })
);
