import { ShowResponse } from "~/components/ShowResponse";
import { mountWithContext } from "./_constants";

describe("ShowResponse", () => {
  it("show statuses", () => {
    //given
    mountWithContext(
      <ShowResponse
        responseInsert={
          new Promise((resolve, _rej) => {
            resolve({ statusText: "OK" } as Response);
          })
        }
        responseUpdate={Promise.resolve({ statusText: "OK" } as Response)}
      />,
      null,
    );
    //when
    //then
    cy.getByDataTest("response-text").should("have.length", 2);
    cy.getByDataTest("response-text").eq(0).should("have.text", "OK");
    cy.getByDataTest("response-text").eq(1).should("have.text", "OK");
  });
});
