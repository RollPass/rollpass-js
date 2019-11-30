import {
  WebController,
  ClientController,
} from "../src";

test('exports all public controllers', () => {
  expect(WebController).not.toBeFalsy();
  expect(ClientController).not.toBeFalsy();
});
