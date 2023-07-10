import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";
import { z } from "zod";

export const propertyRouter = createTRPCRouter({
  all: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.property.findMany();
  }),
  byId: publicProcedure.input(z.string()).query(({ ctx, input }) => {
    return ctx.prisma.property.findFirst({ where: { id: input } });
  }),
  create: publicProcedure
    .input(
      z.object({
        Address: z.string(),
        City: z.string(),
        State: z.string(),
        Zip: z.number(),
        Beds: z.number(),
        Baths: z.number(),
        Sqft: z.number(),
        Type: z.string(),
        Status: z.string(),
        Image: z.string(),
        Desc: z.string(),
      })
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.property.create({ data: input });
    }),
});
