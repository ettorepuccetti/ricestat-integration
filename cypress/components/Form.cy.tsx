import { Form } from "~/components/Form";
import { API_URL } from "~/utils/constants";
import { mountWithContext } from "./_constants";

describe("Form", () => {
  it("send api request", () => {
    mountWithContext(<Form />, null);
    cy.getByDataTest("hotel-id").type("ID123");
    cy.getByDataTest("hotel-password").type("passwd456");
    cy.getByDataTest("input-file").selectFile("unittest/fixtures/input.xml");

    cy.intercept("POST", API_URL, { statusCode: 200 }).as("apiRequest");

    cy.getByDataTest("submit-button").click();
  });
});
