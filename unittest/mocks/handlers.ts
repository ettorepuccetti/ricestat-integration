import { HttpResponse, http } from "msw";
import { API_URL } from "~/utils/constants";

export const MOCKED_RESPONSE = `<MockedResponse>Mocked response</MockedResponse>`;

export const handlers = [
  http.post(API_URL, () => {
    return HttpResponse.xml(MOCKED_RESPONSE);
  }),
];
