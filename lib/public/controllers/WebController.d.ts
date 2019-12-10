import { ApiOptions } from "../../protected/ApiController";
import { ClientOptions } from "./ClientController";
export declare enum AuthenticationState {
    UNAUTHENTICATED = "UNAUTHENTICATED",
    SESSION_EXPIRED = "SESSION_EXPIRED",
    AUTHENTICATED = "AUTHENTICATED"
}
export declare enum ErrorCode {
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
export declare enum ErrorMessage {
    UNINITIALIZED_CLIENT = "RollPass was not initialized. See https://rollpass.io/docs/js/enums/errorcode#UNINITIALIZED_CLIENT for more information.",
    NO_STORED_SESSION = "No local session found. See https://rollpass.io/docs/js/enums/errorcode#NO_STORED_SESSION for more information."
}
interface IStorage {
    getItem(key: string): any;
    removeItem(key: string): void;
    setItem(key: string, value: any): void;
}
export declare class WebException extends Error {
    constructor(name: ErrorCode, message: string);
}
/**
 * @category Browser
 */
export declare class WebController {
    private readonly sessionKey;
    private readonly storage;
    private readonly clientController;
    constructor(clientOptions: ClientOptions, storage?: IStorage, apiOptions?: Partial<ApiOptions>);
    getUser(): Promise<any>;
    sendChallenge(emailAddress: string): Promise<any>;
    getStoreValue(key: string): Promise<any>;
    setStoreValue(key: string, value: string): Promise<any>;
    signOut(): void;
    private getAuthenticationState;
    getSessionCode(): any;
    private getSessionState;
    private getSessionCodeOrThrow;
}
export {};
