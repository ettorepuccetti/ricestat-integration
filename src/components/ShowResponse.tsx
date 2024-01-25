import { useShowResponse } from "~/hooks/useShowResponse";

interface ShowResponseProps {
  responseInsert?: Promise<Response>;
  responseUpdate?: Promise<Response>;
}

export const ShowResponse = ({
  responseInsert,
  responseUpdate,
}: ShowResponseProps): JSX.Element => {
  const responseTextInsert = useShowResponse(responseInsert);
  const responseTextUpdate = useShowResponse(responseUpdate);

  return (
    <>
      <div className="grid grid-cols-2 gap-2">
        <div className="text-s text-gray-500">insert </div>
        <div data-test="response-text">{responseTextInsert}</div>

        <div className="text-s text-gray-500">update </div>
        <div data-test="response-text">{responseTextUpdate}</div>
      </div>
    </>
  );
};
3;
