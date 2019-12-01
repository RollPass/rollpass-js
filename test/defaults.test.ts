import {
  defaultApiOptions
} from "../src/config";

test('has valid defaults', () => {
  expect(defaultApiOptions.baseURL).toBe("https://api.rollpass.io");
  expect(defaultApiOptions.timeout).toBe(5000);
  expect(defaultApiOptions.name).toBe("rollpass-js");
});
