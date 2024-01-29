import { z } from "zod";
import { sendApiRequest } from "~/utils/xml-utils";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const SendXmlInput = z.object({
  insertXmlFileBody: z.array(z.string()),
  updateXmlFileBody: z.array(z.string()),
});

export const SendXmlOutput = z.array(
  z.object({
    responseBody: z.string(),
    responseStatus: z.number(),
    responseTextStatus: z.string(),
  }),
);

export const senderRouter = createTRPCRouter({
  sendXml: publicProcedure
    .input(SendXmlInput)
    .output(SendXmlOutput)
    .mutation(async ({ ctx: _ctx, input }) => {
      const insertResponse = await sendApiRequest(input.insertXmlFileBody);
      const updateResponse = await sendApiRequest(input.updateXmlFileBody);

      return [
        {
          responseBody: await insertResponse.text(),
          responseStatus: insertResponse.status,
          responseTextStatus: insertResponse.statusText,
        },
        {
          responseBody: await updateResponse.text(),
          responseStatus: updateResponse.status,
          responseTextStatus: updateResponse.statusText,
        },
      ];
    }),
});
