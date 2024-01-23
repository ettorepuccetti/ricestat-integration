import { useState } from "react";
import { type XmlRequestInput } from "~/dataModel/request";
import { readAndSendXml } from "~/utils/xml-utils";
import { Form } from "./Form";
import { ShowResponse } from "./ShowResponse";

export const Container = (): JSX.Element => {
  const [insertResponse, setInsertResponse] = useState<Promise<Response>>();
  const [updateResponse, setUpdateResponse] = useState<Promise<Response>>();

  async function handleFormSubmit(request: XmlRequestInput) {
    const response: Promise<[Response, Response]> = readAndSendXml({
      id: request.hotelId,
      password: request.hotelPassword,
      xmlFile: request.xmlFile,
    });
    setInsertResponse(response.then((r) => r[0]));
    setUpdateResponse(response.then((r) => r[1]));
  }

  return (
    <div className="flex flex-col gap-2">
      <Form onFormSumbit={handleFormSubmit} />
      <div className="flex flex-1 flex-col items-center gap-2">
        <div className="text-xl text-gray-600">Server response</div>
        <ShowResponse
          responseInsert={insertResponse}
          responseUpdate={updateResponse}
        />
      </div>
    </div>
  );
};
