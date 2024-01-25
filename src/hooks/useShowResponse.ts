import { useEffect, useState } from "react";

export function useShowResponse(response?: Promise<Response>) {
  const [responseText, setResponseText] = useState<string>("Not send");

  useEffect(() => {
    if (!response) return;
    setResponseText("Loading...");
    response
      .then((r) => {
        setResponseText(r.statusText);
        return r.text();
      })
      .then((text) => {
        console.log("response text:", text);
      })
      .catch((e) => {
        console.log(e);
        setResponseText("Error");
      });
  }, [response]);

  return responseText;
}
