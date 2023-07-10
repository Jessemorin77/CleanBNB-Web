import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { z } from "zod";

export const messageRouter = createTRPCRouter({
  getByChatId: publicProcedure.input(z.string()).query(({ ctx, input }) => {
    return ctx.prisma.message.findMany({ where: { chatId: input } });
  }),
  create: publicProcedure
    .input(
      z.object({
        chatId: z.string(),
        content: z.string(),
      })
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.message.create({ data: input });
    }),
});
