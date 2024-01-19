import { API_URL } from "./constants";

const XML_FIRST_LINE = `<?xml version="1.0" encoding="UTF-8"?>`;
const XML_HOTEL_AUTH_LINE = `<RequestorID Type = "10"`;

export function separateInsertUpdateXml(
  xmlInput: string[],
): [string[], string[]] {
  const secondXmlStart =
    xmlInput
      .slice(1)
      .findIndex((line) => line.trim().startsWith(XML_FIRST_LINE)) + 1;
  const insertXml = xmlInput.slice(0, secondXmlStart);
  const updateXml = xmlInput.slice(secondXmlStart);
  return [insertXml, updateXml];
}

export function fillInPosSection(
  xmlInput: string[],
  hotelId: string,
  hotelPassword: string,
): string[] {
  const posLine = xmlInput.findIndex((line) =>
    line
      .trim()
      .replaceAll(" ", "")
      .startsWith(XML_HOTEL_AUTH_LINE.replaceAll(" ", "")),
  );
  xmlInput[posLine] =
    `<RequestorID Type = "10" ID="${hotelId}" MessagePassword="${hotelPassword}"/>`;
  return xmlInput;
}

export function sendApiRequest(xmlBody: string[]) {
  return fetch(API_URL, {
    method: "POST",
    body: xmlBody.join("\n"),
  });
}
