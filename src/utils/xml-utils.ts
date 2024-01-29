import { API_URL } from "./constants";

const XML_FIRST_LINE = `<?xml version="1.0" encoding="UTF-8"?>`;
const XML_HOTEL_AUTH_LINE = `<RequestorID Type = "10"`;
const XML_INSERT_HOTEL_CODE_LINE = `<InserimentoAlloggiati CodiceEsercizio=""`;
const XML_UPDATE_HOTEL_CODE_LINE = `<Aggiornamento CodiceEsercizio=""`;

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

function replaceLineInXml(
  toReplace: string,
  replacement: string,
  xml: string[],
) {
  const lineIndex = xml.findIndex((line) =>
    line.trim().replaceAll(" ", "").startsWith(toReplace.replaceAll(" ", "")),
  );
  if (lineIndex !== -1) {
    xml[lineIndex] = replacement;
  }
}

export function fillInPosSection(
  xmlInput: string[],
  hotelId: string,
  hotelPassword: string,
): string[] {
  replaceLineInXml(
    XML_HOTEL_AUTH_LINE,
    `      <RequestorID Type="10" ID="${hotelId}" MessagePassword="${hotelPassword}" />`,
    xmlInput,
  );

  replaceLineInXml(
    XML_INSERT_HOTEL_CODE_LINE,
    `  <InserimentoAlloggiati CodiceEsercizio="${hotelId}">`,
    xmlInput,
  );

  replaceLineInXml(
    XML_UPDATE_HOTEL_CODE_LINE,
    `  <Aggiornamento CodiceEsercizio="${hotelId}">`,
    xmlInput,
  );

  return xmlInput;
}

export function sendApiRequest(xmlBody: string[]): Promise<Response> {
  const requestOptions: RequestInit = {
    method: "POST",
    headers: {
      contentType: "application/xml",
    },
    body: xmlBody.join("\n"),
    redirect: "follow",
  };

  return fetch(API_URL, requestOptions);
}

export async function splitAndFillXml({
  id,
  password,
  xmlFile,
}: {
  id: string;
  password: string;
  xmlFile: File;
}): Promise<[string[], string[]]> {
  // read xml file
  const text = await xmlFile.text();
  const inputLines = text.split("\n");

  // separate the two xml and fill in the id and pwd info
  const [insertXml, updateXml] = separateInsertUpdateXml(inputLines);
  const insertXmlWithPos = fillInPosSection(insertXml, id, password);
  const updateXmlWithPos = fillInPosSection(updateXml, id, password);

  return [insertXmlWithPos, updateXmlWithPos];
}
