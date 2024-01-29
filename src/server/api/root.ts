import { createTRPCRouter } from "~/server/api/trpc";
import { senderRouter } from "./routers/sender";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  sender: senderRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
