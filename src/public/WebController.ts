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

export enum ErrorCode {
  /**
   * No session was found locally. This could mean that you haven't authenticated the user yet.
   * You should call `getAuthenticationState` once at application load to get a local session before calling session dependent methods.
   */
  NO_STORED_SESSION = "NO_STORED_SESSION"
}

/**
 * @ignore
 */
enum ErrorMessage {
  NO_STORED_SESSION = "No local session found. See https://rollpass.io/docs/enums/errorcode#NO_STORED_SESSION for more information."
}

interface IStorage {
  getItem(key: string): any;

  removeItem(key: string): void;

  setItem(key: string, value: any): void;
}

class WebControllerException extends Error {
  constructor(name: ErrorCode, message: string) {
    super();
    this.name = name;
    this.message = message;
  }
}

/**
 * For use with client-side applications that interact with RollPass.
 *
 *
 * ## Install
 *
 * To use RollPass create a new WebController instance in your application using the [clientToken](https://rollpass.io/dashboard) and [projectId](https://rollpass.io/dashboard) found in your [dashboard](https://rollpass.io/dashboard).
 *
 * ### For browser environments
 * You can include RollPass in HTML projects using the CDN script href.
 *
 * ```html
 * <script href="https://cdn.rollpass.io/rollpass-js/latest.min.js"></script>
 * ```
 *
 * Then in a script tag access the WebController like so:
 * ```html
 * <script type="javascript">
 * const webController = new RollPass.WebController({
 *   clientToken: 'xxxx';
 *   projectId: 'xxxx';
 * });
 * </script>
 * ```
 * ### Node environments
 *
 * `npm install --save rollpass-js`
 *
 *
 * ```typescript
 * import { WebController } from "rollpass-js";
 *
 * const webController = new WebController({
 *   clientToken: 'xxxx';
 *   projectId: 'xxxx';
 * });
 * ```
 * ## Authenticate users
 * The `WebController` makes it easy to authenticate users with one method: `getAuthenticationState()`. This method
 * checks to see if a user is either:
 * - anonymous
 * - arriving via an access link
 * - returning with a session that is valid or invalid
 *
 * Based on the returned state of `getAuthenticationState()` you should either:
 * - `if(state === 'AUTHENTICATED')` prompt the user to login by asking for their email address and sending them a challenge
 * - `else` called authenticated user methods such as `getUser()`
 *
 * ### Promises
 * ```typescript
 * webController.getAuthenticationState().then(state => {
 *  if (state === 'AUTHENTICATED') {
 *       // call user related methods such as `getUser()`
 *   else {
 *       // prompt user to enter an email address and then send them an access link
 *       // via
 *   }
 * })
 * ```
 *
 *
 * ### Async await
 * ```typescript
 * async created() {
 *   const state = await webController.getAuthenticationState()
 *   if (state === 'AUTHENTICATED') {
 *       // call user related methods such as `getUser()`
 *   else {
 *       // prompt user to enter an email address and then send a challenge
 *   }
 * }
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
   * the challenge is verified and a session is created in localStorage. Authentication state returned in this case is `AUTHENTICATED`. You can then use the `getUser()` and user datastore methods safely.
   *
   * If no code is present the method checks for a session in localStorage and tries to validate the session. If the session is still valid then `AUTHENTICATED` is returned. If not `NO_STORED_SESSION` is returned.
   *
   * If no code or session is found `UNAUTHENTICATED` is returned. In this case (or when `NO_STORED_SESSION`) you should prompt the user to enter their email address and use it to send a challenge with `sendChallenge(emailAddress)`.
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
      const {session} = await this.clientController.verifyChallenge(code);
      if (session) {
        this.storage.setItem(this.sessionKey, session.code);
        return AuthenticationState.AUTHENTICATED;
      } else {
        return AuthenticationState.UNAUTHENTICATED;
      }
    } else if (storedSessionCode) {
      return await this.getSessionState(storedSessionCode)
    } else {
      return AuthenticationState.UNAUTHENTICATED;
    }
  }

  getSessionCode(): any {
    return coalesce(this.storage.getItem(this.sessionKey));
  }

  private async getSessionState(sessionCode: string) {
    const currentSession = await this.clientController.getSession(sessionCode);
    return currentSession.status === 'VALID'
      ? AuthenticationState.AUTHENTICATED
      : AuthenticationState.SESSION_EXPIRED;
  }

  private getSessionCodeOrThrow(): any {
    const storedSessionCode = this.getSessionCode();
    if (storedSessionCode == null) {
      throw new WebControllerException(
        ErrorCode.NO_STORED_SESSION,
        ErrorMessage.NO_STORED_SESSION
      );
    }
    return storedSessionCode;
  }

  signOut(): void {
    const sessionCode = this.getSessionCode();
    if (sessionCode) {
      this.clientController.deleteSession(this.getSessionCode()).then(_ => {});
      this.storage.removeItem(this.sessionKey);
    }
  }

  async sendChallenge(emailAddress: string): Promise<any> {
    return this.clientController.sendChallenge(emailAddress);
  }

  /**
   * ```typescript
   * try {
   *   const user = await getUser()
   * } catch(e) {
   *   if (e.name === 'NO_STORED_SESSION') {
   *     // prompt user to log in
   *   } else {
   *     throw e;
   *   }
   * }
   *
   * ```
   */
  async getUser(): Promise<any> {
    const storedSessionCode = this.getSessionCodeOrThrow();
    return this.clientController.getUser(storedSessionCode);
  }

  async getStoreValue(): Promise<any> {
    const storedSessionCode = this.getSessionCodeOrThrow();
    return this.clientController.getUser(storedSessionCode);
  }

  async setStoreValue(): Promise<any> {
    const storedSessionCode = this.getSessionCodeOrThrow();
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
