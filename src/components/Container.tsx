import { Progress } from "@/components/ui/progress";
import { useState } from "react";
import { type z } from "zod";
import { type XmlRequestInput } from "~/dataModel/request";
import { useMergedStoreContext } from "~/hooks/useStoreContext";
import type { SendXmlOutput } from "~/server/api/routers/sender";
import { splitAndFillXml } from "~/utils/xml-utils";
import { Form } from "./Form";
import { ShowResponse } from "./ShowResponse";

export type SendXmlResponse = z.infer<typeof SendXmlOutput>[0];

export const Container = (): JSX.Element => {
  const [insertResponse, setInsertResponse] = useState<SendXmlResponse>();
  const [updateResponse, setUpdateResponse] = useState<SendXmlResponse>();
  const [loadingValue, setLoadingValue] = useState<number>(0);

  const sender = useMergedStoreContext((store) => store.sendXml);

  async function handleFormSubmit(request: XmlRequestInput) {
    setLoadingValue(25);
    const [insertXmlBody, updateXmlBody]: [string[], string[]] =
      await splitAndFillXml({
        id: request.hotelId,
        password: request.hotelPassword,
        xmlFile: request.xmlFile,
      });

    if (!sender) return;

    sender
      .mutateAsync({
        insertXmlFileBody: insertXmlBody,
        updateXmlFileBody: updateXmlBody,
      })
      .then(([insertXmlResponse, updateXmlResponse]) => {
        setInsertResponse(insertXmlResponse);
        setUpdateResponse(updateXmlResponse);
        setLoadingValue(100);
        console.log("insert response", insertXmlResponse);
        console.log("update response", updateXmlResponse);
      })
      .catch((e) => {
        const errorResponse: SendXmlResponse = {
          responseStatus: -1,
          responseTextStatus: "Error",
          responseBody: "No text to show",
        };
        setInsertResponse(errorResponse);
        setUpdateResponse(errorResponse);
        console.log("error response", e);
      });
  }

  return (
    <div className="container flex max-w-[500px] flex-col gap-8">
      <Form onFormSumbit={handleFormSubmit} />

      <div className="flex justify-center">
        <Progress
          value={loadingValue}
          className={
            "mx-1 max-w-sm " + (loadingValue === 0 ? "invisible" : "visible")
          }
        />
      </div>
      <div className="flex flex-1 flex-col items-center gap-2">
        <div className="text-xl font-bold text-gray-500">Server response</div>
        <ShowResponse
          responseInsert={insertResponse}
          responseUpdate={updateResponse}
        />
      </div>
    </div>
  );
};
