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
 * ## How it works
 * The WebController is very simple. You don't need to know whether a user is logged in or not you simply assume a user if present and try to access them using `getUser()`. This method will throw when an authenticated session can not be found or a session has expired. This normal and handle the exception is part of the auth flow.
 *
 * ![Flow diagram](../assets/uml/webcontroller.puml.png)
 *
 * If `getUser()` succeeds you will be returned a user object and a session will be stored locally. If `getUser()` throws it is likely because a session has naturally expired or the current user is anonymous or visiting your page for the first time. In these cases simply prompt the user to enter their email address and then send them an access link using `webController.sendChallenge(emailAddress)`.
 *
 * Once an unathenticated or new user receives an email access link via `sendChallenge` they will click on it and load the `redirectUrl` you specified for this project. The same `getUser()` call will now succeed by extracting a challenge verification code from the redirect url. A session will be stored locally and is usually valid for 1 hour. You should still handle all `getUser` exceptions with a `try/catch` or `Promise.catch` as the session will eventually expire and you will need to send another challenge email. If a 1 hour session time is not long enough you can increase it in your [project settings dashboard](https://rollpass.io/dashboard).
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
   * try {
   *   const user = await webController.getUser()
   * } catch (e) {
   *   // prompt user to enter email address for access code
   *   // then user `webController.sendChallenge(emailAddress)` to
   *   // send them a link
   * }
   */
  async getUser(): Promise<any> {
    const authenticationState = await this.getAuthenticationState();
    if (authenticationState === AuthenticationState.AUTHENTICATED) {
      return this.clientController.getUser(this.getSessionCodeOrThrow());
    } else {
      throw authenticationState
    }
  }

  async sendChallenge(emailAddress: string): Promise<any> {
    return this.clientController.sendChallenge(emailAddress);
  }

  async getStoreValue(): Promise<any> {
  }

  async setStoreValue(): Promise<any> {
  }

  signOut(): void {
    const sessionCode = this.getSessionCode();
    if (sessionCode) {
      this.clientController.deleteSession(this.getSessionCode()).then(_ => {
      });
      this.storage.removeItem(this.sessionKey);
    }
  }


  private async getAuthenticationState(currentUrl: string = window.location.search): Promise<AuthenticationState> {

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
