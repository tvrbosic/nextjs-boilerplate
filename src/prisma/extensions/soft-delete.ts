// LIBRARY
import { Prisma } from '@prisma/client';

// APP
import { getSession } from '@/utility/session/session';

// TYPES
import { BatchPayload } from '@/prisma/types';

export const useSoftDelete = Prisma.defineExtension({
  model: {
    $allModels: {
      // ============================| DELETE |============================ //
      async softDelete<M>(
        this: M,
        args: Prisma.Args<M, 'delete'>['where']
      ): Promise<M> {
        // Get the current model at runtime
        const context = Prisma.getExtensionContext(this);
        const decodedToken = await getSession();

        const result = await (context as any).update({
          where: { guid: args.guid },
          data: {
            isDeleted: true,
            deletedAt: new Date(),
            deletedById: decodedToken?.userGuid,
          },
        });

        return result;
      },

      // ============================| DELETE MANY |============================ //
      async softDeleteMany<M, A>(
        this: M,
        where: Prisma.Args<M, 'deleteMany'>['where']
      ): Promise<BatchPayload> {
        const context = Prisma.getExtensionContext(this);
        const decodedToken = await getSession();

        return (context as any).updateMany({
          where,
          data: {
            deletedAt: new Date(),
            deletedBy: decodedToken?.userGuid,
          },
        });
      },
    },
  },
});
