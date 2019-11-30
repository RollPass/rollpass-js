import mockAxios from 'jest-mock-axios';
import {ApiController, ApiOptions} from "../src/ApiController";
import {defaultApiOptions} from "../src/defaults"
import {Method} from "axios";

// a dummy api controller facade for inspecting during tests
class TestApiController extends ApiController {

  constructor(apiOptions?: Partial<ApiOptions>) {
    super(apiOptions);
  }
  async makeRequest(
    method: Method,
    path: string,
    params: any = {},
    data: any = null,
    extractData: boolean = true
  ) {
    return this.request(
      method,
      path,
      params,
      data,
      extractData
    )
  }

}

afterEach(() => {
  mockAxios.reset();
});

test('uses default options', () => {
  new TestApiController();
  expect(mockAxios.create).toHaveBeenLastCalledWith({
    baseURL: defaultApiOptions.baseURL,
    timeout: defaultApiOptions.timeout,
    headers: {'x-client': defaultApiOptions.name}
  })
});

test('can override default options', () => {
  const overrides: Partial<ApiOptions> = {
    baseURL: 'overrideBaseUrl',
    timeout: 123,
  };
  new TestApiController(overrides);
  expect(mockAxios.create).toHaveBeenLastCalledWith({
    baseURL: overrides.baseURL,
    timeout: overrides.timeout,
    headers: {'x-client': defaultApiOptions.name}
  })
});

const method = "POST";
const url = "/test";
const data = {a: '1'};
const params = {clientToken: 'testClientToken'};

test('can extract data', async () => {
  const instance = new TestApiController();
  const promise = instance.makeRequest(method, url, params, data, true);
  mockAxios.mockResponse({data: {name: 'test'}, status: 200});
  const result = await promise;
  expect(result).toEqual({name: 'test'});
  expect(mockAxios.request).toHaveBeenLastCalledWith({method, params, url, data})
});

test('can skip data extract', async () => {
  const instance = new TestApiController();
  const promise = instance.makeRequest(method, url, params, data, false);
  mockAxios.mockResponse({data: {name: 'test'}, status: 200});
  const result: any = await promise;
  expect(result.data).toEqual({name: 'test'});
  expect(result.status).toEqual(200);
  expect(mockAxios.request).toHaveBeenLastCalledWith({method, params, url, data})
});
