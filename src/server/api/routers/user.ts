import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { z } from "zod";

export const userRouter = createTRPCRouter({
  all: protectedProcedure.query(async ({ ctx }) => {
    const userId = ctx.session.user.id;
    const chats = await ctx.prisma.chat.findMany({
      where: {
        participants: {
          some: {
            userId,
          },
        },
      },
    });
    // Return the user's chats
    return chats;
  }),

  userData: protectedProcedure.input(z.string()).query(async ({ ctx, input }) => {
    const user = await ctx.prisma.user.findUnique({
      where: {
        id: input,
      },
    });
    // Return the user data
    return user;
  }),
});
