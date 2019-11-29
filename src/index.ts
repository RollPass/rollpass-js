import axios, { AxiosInstance, Method } from "axios";
import { parse } from "qs";

/**
 * WebController
 * 
 * For use with client-side applications that interact with RollPass.
 * 
 * Typical usage:
 * 
 * ```typescript
 * const webController = new WebController({
 *   clientToken: 'xxxx';
 *   projectId: 'xxxx';
 * });
 * ```
 *
 * @category Browser
 */
export class WebController {
  private readonly sessionKey = "__rollpass_session_id__";
  private readonly apiOptions: ApiOptions;
  private readonly storage: IStorage;
  private readonly clientOptions: ClientOptions;
  private readonly clientController: ClientController;

  constructor(
    clientOptions: ClientOptions,
    storage: IStorage = window.localStorage,
    apiOptions?: ApiOptions
  ) {
    this.storage = storage;
    this.clientOptions = clientOptions;
    this.apiOptions = { ...defaultApiOptions, ...apiOptions };
    this.clientController = new ClientController(this.clientOptions, this.apiOptions)
  }

  /**
   * Get the current authentication state. Use the authentication state to determine your next action
   * @param currentUrl - Optional URL or string in which to find a `code={challengeCode}` parameter
   */
  async getAuthenticationState(currentUrl: string = window.location.search): Promise<AuthenticationState> {

    // try to obtain a challenge code from url if present
    const code = parseCodeFromUrl(currentUrl);

    // try to get last session code from storage
    const storedSessionCode = this.getSessionCode();

    if (code) {
      // if code is in url means we are receiving a challenge redirect
      // try to verify the challenge for a session
      const { session } = await this.clientController.verifyChallenge(code);
      if (session) {
        this.storage.setItem(this.sessionKey, session.code);
        return AuthenticationState.AUTHENTICATED;
      } else {
        return AuthenticationState.UNAUTHENTICATED;
      }
    } else if (storedSessionCode) {
      const currentSession = await this.clientController.getSession(storedSessionCode);
      return currentSession.status === 'VALID'
        ? AuthenticationState.AUTHENTICATED
        : AuthenticationState.SESSION_EXPIRED;
    } else {
      return AuthenticationState.UNAUTHENTICATED;
    }
  }

  getSessionCode(): any {
    return coalesce(this.storage.getItem(this.sessionKey));
  }

  signOut(): void {
    this.storage.removeItem(this.sessionKey);
  }

  async sendChallenge(emailAddress: string): Promise<any> {
    return this.clientController.sendChallenge(emailAddress);
  }

  async getUser(): Promise<any> {
    const storedSessionCode = this.storage.getItem(this.sessionKey);
    if (storedSessionCode == null) {
      throw Error("No session found. See https://rollpass.io/docs/no-session-found for more information.");
    }
    return this.clientController.getUser(storedSessionCode);
  }
}

/**
 * @ignore
 */
class ApiController {
  protected readonly api: AxiosInstance;

  constructor(apiOptions?: ApiOptions) {
    this.api = getAxios({ ...defaultApiOptions, ...apiOptions });
  }

  async request<T>(method: Method, path: string,
    params: any,
    data: any = null,
    extractData: boolean = true): Promise<T> {
    return this.api.request({
      method,
      url: path,
      data,
      params
    }).then(res => extractData ? res.data : res);
  }
}

/**
 * @ignore
 */
export class AgentController extends ApiController {
  private readonly agentOptions: AgentOptions;

  constructor(agentOptions: AgentOptions, apiOptions?: ApiOptions) {
    super(apiOptions);
    this.agentOptions = agentOptions;
  }

  async getOrCreateAgentForSession(sessionCode: string): Promise<AgentSessionDto> {
    return this.request("POST", "/agent", { sessionCode });
  }

  async getAgentProjectsForSession(sessionCode: string): Promise<any> {
    return this.request("GET", "/agent/projects", { sessionCode });
  }

  async createAgentProjectForSession(sessionCode: string, createProjectDto: any): Promise<any> {
    return this.request("POST", "/agent/projects", { sessionCode }, createProjectDto)
  }
}

/**
 * ClientController
 * @category Isomorphic
 */
export class ClientController extends ApiController {
  private readonly clientOptions: ClientOptions;

  constructor(clientOptions: ClientOptions, apiOptions?: ApiOptions) {
    super(apiOptions);
    this.clientOptions = clientOptions;
  }

  async getSession(sessionCode: string): Promise<any> {
    return this.request("GET", "/session", {
      clientToken: this.clientOptions.clientToken,
      projectId: this.clientOptions.projectId,
      sessionCode
    });
  }

  async sendChallenge(emailAddress: string): Promise<any> {
    return this.request("POST", "/challenge/send", {
      clientToken: this.clientOptions.clientToken,
      projectId: this.clientOptions.projectId,
      emailAddress
    });
  }

  async verifyChallenge(challengeCode: string): Promise<any> {
    return this.request("GET", "/challenge/verify", {
      clientToken: this.clientOptions.clientToken,
      projectId: this.clientOptions.projectId,
      challengeCode
    });
  }

  async getUser(sessionCode: string): Promise<any> {
    return this.request("GET", "/user", {
      clientToken: this.clientOptions.clientToken,
      projectId: this.clientOptions.projectId,
      sessionCode
    });
  }

}

/**
 * @ignore
 */
function getAxios(apiOptions: ApiOptions): AxiosInstance {
  return axios.create({
    baseURL: apiOptions.baseURL,
    timeout: apiOptions.timeout,
    headers: { 'x-client': apiOptions.name }
  });
}

interface ApiOptions {
  baseURL: string;
  timeout: number;
  name: string;
}

interface IStorage {
  getItem(key: string): any;
  removeItem(key: string): void;
  setItem(key: string, value: any): void;
}

/**
 * @ignore
 */
const defaultApiOptions: ApiOptions = {
  baseURL: "https://api.rollpass.io",
  timeout: 5000,
  name: "rollpass-js"
};

interface ClientOptions {
  clientToken: string;
  projectId: string;
}

interface AgentOptions { }

enum AuthenticationState {
  UNAUTHENTICATED = "UNAUTHENTICATED",
  SESSION_EXPIRED = "SESSION_EXPIRED",
  AUTHENTICATED = "AUTHENTICATED"
}

/**
 * @ignore
 */
function coalesce(value: any) {
  if (!value || value == "undefined" || value == "null") {
    return null;
  } else {
    return value;
  }
}

interface AgentSessionDto {
  agent: any,
  status: 'CREATED' | 'EXISTING'
}

/**
 * @ignore
 */
function parseCodeFromUrl(currentUrl: string) {
  const { code } = parse(currentUrl, { ignoreQueryPrefix: true });
  return coalesce(code);
}

