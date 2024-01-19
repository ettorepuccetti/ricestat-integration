import { random } from "cypress/types/lodash";
import {
  fillInPosSection,
  sendApiRequest,
  separateInsertUpdateXml,
} from "~/utils/xml-utils";

export async function useSendXml({
  id,
  password,
  xmlFile,
}: {
  id: string;
  password: string;
  xmlFile: File;
}) {
  const text = await xmlFile.text();

  const inputLines = text.split("\n");
  const [insertXml, updateXml] = separateInsertUpdateXml(inputLines);
  const insertXmlWithPos = fillInPosSection(insertXml, id, password);
  const updateXmlWithPos = fillInPosSection(updateXml, id, password);
  const responseInsert = await sendApiRequest(insertXmlWithPos);
  const responseUpdate = await sendApiRequest(updateXmlWithPos);
}
