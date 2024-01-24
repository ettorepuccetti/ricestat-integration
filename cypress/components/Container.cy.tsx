import { Container } from "~/components/Container";
import { API_URL } from "~/utils/constants";
import { mountWithContext } from "./_constants";

describe("Container", () => {
  it("send api request", () => {
    //given
    mountWithContext(<Container />, null);
    cy.intercept("POST", API_URL, { statusCode: 200 }).as("apiRequest");

    //when
    cy.getByDataTest("hotel-id").type("ID123");
    cy.getByDataTest("hotel-password").type("passwd456");
    cy.getByDataTest("input-file").selectFile("unittest/fixtures/input.xml", {
      force: true,
    });
    cy.getByDataTest("submit-button").click();

    //then
    cy.wait("@apiRequest");
    cy.wait("@apiRequest");
    cy.getByDataTest("response-text").eq(0).should("have.text", "OK");
    cy.getByDataTest("response-text").eq(1).should("have.text", "OK");
  });
});
