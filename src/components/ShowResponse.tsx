import { type SendXmlResponse } from "./Container";

interface ShowResponseProps {
  responseInsert?: SendXmlResponse;
  responseUpdate?: SendXmlResponse;
}

export const ShowResponse = ({
  responseInsert,
  responseUpdate,
}: ShowResponseProps): JSX.Element => {
  return (
    <>
      <div className="grid grid-cols-2 gap-2">
        <div className="text-s text-gray-500">insert </div>
        <div data-test="response-text">
          {responseInsert?.responseTextStatus}
        </div>

        <div className="text-s text-gray-500">update </div>
        <div data-test="response-text">
          {responseUpdate?.responseTextStatus}
        </div>
      </div>
    </>
  );
};
