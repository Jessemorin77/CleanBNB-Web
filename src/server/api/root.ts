import { exampleRouter } from "~/server/api/routers/example";
import { createTRPCRouter } from "~/server/api/trpc";
import { propertyRouter } from "./routers/property";
import { listRouter } from "./routers/list";
import { bidRouter } from "./routers/bid";
import { chatRouter } from "./routers/chat";
import { userRouter } from "./routers/user";
import { messageRouter } from "./routers/message";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  example: exampleRouter,
  property: propertyRouter,
  list: listRouter,
  bid: bidRouter,
  chat: chatRouter,
  user: userRouter,
  message: messageRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
