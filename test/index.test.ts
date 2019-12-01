import {
  WebController,
  ClientController,
} from "../src/node";

test('exports all public controllers', () => {
  expect(WebController).not.toBeFalsy();
  expect(ClientController).not.toBeFalsy();
});
