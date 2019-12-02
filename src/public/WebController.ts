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
  UNINITIALIZED_CLIENT = "UNINITIALIZED_CLIENT",
  /**
   * No session was found locally. This could mean that you haven't authenticated the user yet.
   * You should call `getAuthenticationState` once at application load to get a local session before calling session dependent methods.
   */
  NO_STORED_SESSION = "NO_STORED_SESSION"
}

/**
 * @ignore
 */
export enum ErrorMessage {
  UNINITIALIZED_CLIENT = "RollPass was not initialized. See https://rollpass.io/docs/js/enums/errorcode#UNINITIALIZED_CLIENT for more information.",
  NO_STORED_SESSION = "No local session found. See https://rollpass.io/docs/js/enums/errorcode#NO_STORED_SESSION for more information."
}

interface IStorage {
  getItem(key: string): any;

  removeItem(key: string): void;

  setItem(key: string, value: any): void;
}

export class WebException extends Error {
  constructor(name: ErrorCode, message: string) {
    super();
    this.name = name;
    this.message = message;
  }
}

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

  async getStoreValue(key: string): Promise<any> {
    return this.clientController.getKeyValue(key);
  }

  async setStoreValue(key: string, value: string): Promise<any> {
    return this.clientController.putKeyValue(key, value);
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
      throw new WebException(
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
