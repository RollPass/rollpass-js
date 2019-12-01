import mockAxios from 'jest-mock-axios';
import {WebController} from "../../src/node";

const clientOptions = {
  clientToken: 'testClientToken',
  projectId: 'testProjectId'
};
const instance = new WebController(clientOptions);
const emailAddress = "testEmailAddress";
const data = "testResponse";
const sessionKey = "__rollpass_session_id__";

test('can create instance', () => {
  expect(instance).not.toBeFalsy();
});

test('can send challenge', async () => {
  const promise = instance.sendChallenge(emailAddress);
  mockAxios.mockResponse({data});
  const result = await promise;
  expect(result).toBe(data);
  expect(mockAxios.request).toHaveBeenLastCalledWith({
    method: "POST",
    data: null,
    url: "/challenge/send",
    params: {
      ...clientOptions,
      emailAddress
    }
  })
});

test('can get session code', async () => {
  localStorage.setItem(sessionKey, "testValue");
  const sessionCode = instance.getSessionCode();
  expect(sessionCode).toBe("testValue");
  expect(localStorage.getItem).toHaveBeenCalledWith(sessionKey)
});

test('can coalesce session code', async () => {
  localStorage.setItem(sessionKey, "null");
  const sessionCode = instance.getSessionCode();
  expect(sessionCode).toBe(null);
  expect(localStorage.getItem).toHaveBeenCalledWith(sessionKey)
});
