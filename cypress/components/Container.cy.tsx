import { useEffect } from "react";
import { Container, type SendXmlResponse } from "~/components/Container";
import { useSendXml } from "~/hooks/trpcHooks";
import { useMergedStoreContext } from "~/hooks/useStoreContext";
import { mountWithContext } from "./_constants";

describe("Container", () => {
  const ComponentWrapper = () => {
    // I cannot mock the trpc mutaion bc I don't know how to specify the returned value.
    // So I intercept the network request instead.
    const sendXml = useSendXml();
    const setSendXml = useMergedStoreContext((store) => store.setSendXml);

    useEffect(() => {
      setSendXml(sendXml);
    });

    return <Container />;
  };
  it("send api request", () => {
    cy.viewport(500, 720);

    //given
    mountWithContext(<ComponentWrapper />, null);

    cy.intercept("POST", "/api/trpc/sender.sendXml?*", [
      {
        result: {
          data: {
            json: [
              {
                responseBody: "body",
                responseStatus: 200,
                responseTextStatus: "OK",
              },
              {
                responseBody: "body",
                responseStatus: 200,
                responseTextStatus: "OK",
              },
            ] as SendXmlResponse[],
          },
        },
      },
    ]).as("sendXmlRequest");

    //when
    cy.getByDataTest("hotel-id").type("ID123");
    cy.getByDataTest("hotel-password").type("passwd456");
    cy.getByDataTest("input-file").selectFile("unittest/fixtures/input.xml", {
      force: true,
    });
    cy.getByDataTest("submit-button").click();

    //then
    cy.wait("@sendXmlRequest");

    cy.getByDataTest("response-text").eq(0).should("have.text", "OK");
    cy.getByDataTest("response-text").eq(1).should("have.text", "OK");
  });
});
