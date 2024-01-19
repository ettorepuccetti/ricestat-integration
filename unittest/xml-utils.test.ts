import { readFileSync } from "fs";
import { describe, expect, it } from "vitest";
import {
  fillInPosSection,
  sendApiRequest,
  separateInsertUpdateXml,
} from "~/utils/xml-utils";
import { MOCKED_RESPONSE } from "./mocks/handlers";

describe("xml-utils", () => {
  const xmlInput = readFileSync("unittest/fixtures/input.xml", "utf-8").split(
    "\n",
  );

  it("separate input xml in Insert and Update section", () => {
    //given
    const expectedInsertXml = readFileSync(
      "unittest/fixtures/insert.xml",
      "utf-8",
    ).split("\n");
    const expectedUpdateXml = readFileSync(
      "unittest/fixtures/update.xml",
      "utf-8",
    ).split("\n");

    //when
    const [insertXml, updateXml] = separateInsertUpdateXml(xmlInput);

    //then
    expect(insertXml).toEqual(expectedInsertXml);
    expect(updateXml).toEqual(expectedUpdateXml);
  });

  it("fill in POS section the id of the hotel", () => {
    //when
    const result = fillInPosSection(xmlInput, "hotelId", "hotelPassword");

    //then
    expect(result[8]).toEqual(
      `<RequestorID Type = "10" ID="hotelId" MessagePassword="hotelPassword"/>`,
    );
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
