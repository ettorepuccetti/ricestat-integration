import { ShowResponse } from "~/components/ShowResponse";
import { mountWithContext } from "./_constants";

describe("ShowResponse", () => {
  it("show statuses", () => {
    //given
    mountWithContext(
      <ShowResponse
        responseInsert={{
          responseBody: "OK",
          responseStatus: 200,
          responseTextStatus: "OK",
        }}
        responseUpdate={{
          responseBody: "OK",
          responseStatus: 200,
          responseTextStatus: "OK",
        }}
      />,
    );
    //when
    //then
    cy.getByDataTest("response-text").should("have.length", 2);
    cy.getByDataTest("response-text").eq(0).should("have.text", "OK");
    cy.getByDataTest("response-text").eq(1).should("have.text", "OK");
  });
});
