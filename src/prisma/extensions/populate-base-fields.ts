// APP
import { Prisma } from '@prisma/client';
import { IUserJwtClaims } from '@/utility/jwt/types';

export const usePopulateBaseFields = Prisma.defineExtension({
  model: {
    $allModels: {
      async create<T, A>(
        this: T,
        args: Prisma.Args<T, 'create'>,
        reqCtx: { user: IUserJwtClaims } // Custom parameter (request context)
      ): Promise<Prisma.Result<T, A, 'create'>> {
        // Retrieve the current model at runtime
        const context = Prisma.getExtensionContext(this);

        // Prisma Client query that retrieves data based
        const result = await (context as any).create({
          ...args,
          createdById: reqCtx.user.userGuid,
        });

        return result;
      },
    },
  },
});
