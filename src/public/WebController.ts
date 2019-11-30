import {ApiOptions} from "../protected/ApiController";
import {ClientController, ClientOptions} from "./ClientController";
import {parse} from "qs";

/**
 * @category State
 */
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
   * Get the current authentication state. Use the authentication state to determine your next action.
   *
   * Method first checks the current url for the presence of a challenge code. If that is found
   * the challenge is verified and a session is created in localStorage. Authentication state returned in this case is `AUTHENTICATED`.
   *
   * If no code is present the method checks for a session in localStorage and tries to validate the session. If the session is still valid then `AUTHENTICATED` is returned. If not `SESSION_EXPIRED` is returned.
   *
   * If no code or session is found `UNAUTHENTICATED` is returned. In this case you should prompt the user to enter their email address and use it to send a challenge with `sendChallenge(emailAddress).
   *
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
