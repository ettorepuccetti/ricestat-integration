import { z } from "zod";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

export const createTaskInput = z.object({
  name: z.string(),
});

export const taskRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.db.task.findMany();
  }),

  create: protectedProcedure
    .input(createTaskInput)
    .mutation(({ ctx, input }) => {
      return ctx.db.task.create({
        data: {
          name: input.name,
          createdById: ctx.session.user.id,
        },
      });
    }),
});
