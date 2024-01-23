import { useEffect, useState } from "react";

export function useShowResponse(response?: Promise<Response>) {
  const [responseText, setResponseText] = useState<string>("Not send");

  useEffect(() => {
    if (!response) return;
    setResponseText("Loading...");
    response
      .then((r) => setResponseText(r.statusText))
      .catch((e) => console.log(e));
  }, [response]);

  return responseText;
}
