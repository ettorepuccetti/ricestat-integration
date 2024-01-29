import { readFileSync } from "fs";
import { describe, expect, it } from "vitest";
import {
  fillInPosSection,
  sendApiRequest,
  separateInsertUpdateXml,
} from "~/utils/xml-utils";
import { MOCKED_RESPONSE } from "./mocks/handlers";

const HOTEL_ID = "052032ALB0113";
const PWD = "Prova15636";

describe("xml-utils", () => {
  const xmlInput = readFileSync("unittest/fixtures/input.xml", "utf-8").split(
    "\n",
  );

  it("separate input xml in Insert and Update section (unfilled)", () => {
    //given
    const expectedInsertXml = readFileSync(
      "unittest/fixtures/insert-unfilled.xml",
      "utf-8",
    ).split("\n");
    const expectedUpdateXml = readFileSync(
      "unittest/fixtures/update-unfilled.xml",
      "utf-8",
    ).split("\n");

    //when
    const [insertXml, updateXml] = separateInsertUpdateXml(xmlInput);

    //then
    expect(insertXml).toEqual(expectedInsertXml);
    expect(updateXml).toEqual(expectedUpdateXml);
  });

  it("fill in POS section the id of the hotel - insert", () => {
    //when
    const xmlInsertUnfilled: string[] = readFileSync(
      "unittest/fixtures/insert-unfilled.xml",
      "utf-8",
    ).split("\n");

    const result: string[] = fillInPosSection(xmlInsertUnfilled, HOTEL_ID, PWD);

    //then
    const expected: string[] = readFileSync(
      "unittest/fixtures/insert-filled.xml",
      "utf-8",
    ).split("\n");
    expect(result).toEqual(expected);
  });

  it("make rest api request with xml as body", async () => {
    //when
    const result = await sendApiRequest([
      "<FakeRequest> request </FakeRequest>",
    ]);

    //then
    expect(result.status).toBe(200);
    expect(result.statusText).toBe("OK");
    expect(await result.text()).toBe(MOCKED_RESPONSE);
  });
});
