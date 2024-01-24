// vitest.setup.js
import { beforeAll, afterEach, afterAll } from "vitest";
import { server } from "unittest/mocks/node";

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());