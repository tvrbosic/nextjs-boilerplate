// APP
import { Prisma } from '@prisma/client';
import { getSession } from '@/utility/session/session';

export const usePopulateBaseFields = Prisma.defineExtension({
  query: {
    $allModels: {
      // ============================| CREATE |============================ //
      async create({ model, operation, args, query }) {
        const decodedToken = await getSession();

        // Use manually provided user guid (case whne seeding as superuser) or authenticated user guid
        args.data.createdById = args.data.createdById || decodedToken?.userGuid;

        return query(args);
      },

      async createMany({ args, query }) {
        const decodedToken = await getSession();

        if (Array.isArray(args.data)) {
          args.data = args.data.map((item) => ({
            ...item,
            // Use manually provided user guid (case whne seeding as superuser) or authenticated user guid
            createdById: item.createdById || decodedToken?.userGuid,
          }));
        }

        return query(args);
      },

      // ============================| UPDATE |============================ //
      async update({ model, operation, args, query }) {
        const decodedToken = await getSession();

        args.data.updatedById = args.data.updatedById || decodedToken?.userGuid;

        return query(args);
      },

      async updateMany({ args, query }) {
        const decodedToken = await getSession();

        if (Array.isArray(args.data)) {
          args.data = args.data.map((item) => ({
            ...item,
            // Use manually provided user guid (case whne seeding as superuser) or authenticated user guid
            updatedById: item.updatedById || decodedToken?.userGuid,
          }));
        }

        return query(args);
      },

      // ============================| DELETE |============================ //
      async delete({ model, operation, args, query }) {
        // const decodedToken = await getSession();

        // TODO: Execute update operation, set isDeleted as true and set deletedById

        return query(args);
      },
    },
  },
});
