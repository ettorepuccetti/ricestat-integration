import { Form } from "~/components/Form";
import { type XmlRequestInput } from "~/dataModel/request";
import { API_URL } from "~/utils/constants";
import { mountWithContext } from "./_constants";

describe("Form", () => {
  it("send api request", () => {
    //given
    const onFormSumbit = cy.stub().as("onFormSumbit");
    mountWithContext(<Form onFormSumbit={onFormSumbit} />);
    cy.intercept("POST", API_URL, { statusCode: 200 }).as("apiRequest");

    //when
    cy.getByDataTest("hotel-id").type("ID123");
    cy.getByDataTest("hotel-password").type("passwd456");
    cy.getByDataTest("input-file").selectFile("unittest/fixtures/input.xml");
    cy.getByDataTest("submit-button").click();

    //then
    cy.get("@onFormSumbit").should("be.calledOnceWith", {
      hotelId: "ID123",
      hotelPassword: "passwd456",
      xmlFile: new File([], "input.xml"),
    } as XmlRequestInput);
  });
});
