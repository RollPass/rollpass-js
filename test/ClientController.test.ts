import mockAxios from 'jest-mock-axios';
import {ClientController} from "../src";

const clientOptions = {
  clientToken: 'testClientToken',
  projectId: 'testProjectId'
};
const instance = new ClientController(clientOptions);
const data = "testResponse";

test('can create instance', () => {
  expect(instance).not.toBeFalsy();
});

test('can get session', async () => {
  const sessionCode = "testSessionCode";
  const promise = instance.getSession(sessionCode);
  mockAxios.mockResponse({data});
  const result = await promise;
  expect(result).toBe(data);
  expect(mockAxios.request).toHaveBeenLastCalledWith({
    method: "GET",
    data: null,
    url: "/session",
    params: {
      ...clientOptions,
      sessionCode
    }
  })
});

test('can send challenge', async () => {
  const emailAddress = "testEmailAddress";
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

test('can verify challenge', async () => {
  const challengeCode = "testChallengeCode";
  const promise = instance.verifyChallenge(challengeCode);
  mockAxios.mockResponse({data});
  const result = await promise;
  expect(result).toBe(data);
  expect(mockAxios.request).toHaveBeenLastCalledWith({
    method: "GET",
    data: null,
    url: "/challenge/verify",
    params: {
      ...clientOptions,
      challengeCode
    }
  });
});

test('can get user', async () => {
  const sessionCode = "testSessionCode";
  const promise = instance.getUser(sessionCode);
  mockAxios.mockResponse({data});
  const result = await promise;
  expect(result).toBe(data);
  expect(mockAxios.request).toHaveBeenLastCalledWith({
    method: "GET",
    data: null,
    url: "/user",
    params: {
      ...clientOptions,
      sessionCode
    }
  });
});
