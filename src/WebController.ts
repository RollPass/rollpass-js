import {ApiOptions} from "./ApiController";
import {ClientController, ClientOptions} from "./ClientController";
import {parse} from "qs";

export enum AuthenticationState {
  UNAUTHENTICATED = "UNAUTHENTICATED",
  SESSION_EXPIRED = "SESSION_EXPIRED",
  AUTHENTICATED = "AUTHENTICATED"
}

interface IStorage {
  getItem(key: string): any;
  removeItem(key: string): void;
  setItem(key: string, value: any): void;
}


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
  private readonly storage: IStorage;
  private readonly clientController: ClientController;

  constructor(
    clientOptions: ClientOptions,
    storage: IStorage = window.localStorage,
    apiOptions?: Partial<ApiOptions>
  ) {
    this.storage = storage;
    this.clientController = new ClientController(clientOptions, apiOptions)
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
function coalesce(value: any) {
  if (!value || value == "undefined" || value == "null") {
    return null;
  } else {
    return value;
  }
}

/**
 * @ignore
 */
function parseCodeFromUrl(currentUrl: string) {
  const {code} = parse(currentUrl, {ignoreQueryPrefix: true});
  return coalesce(code);
}
