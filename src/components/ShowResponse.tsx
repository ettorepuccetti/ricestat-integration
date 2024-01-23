import { useShowResponse } from "~/hooks/useSendRequest";

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
        <div>insert: </div>
        <div data-test="response-text">{responseTextInsert}</div>
        <div>update: </div>
        <div data-test="response-text">{responseTextUpdate}</div>
      </div>
    </>
  );
};
3;
