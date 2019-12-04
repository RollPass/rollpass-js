/**
 * Imports and setup of global RollPass object for Browser environments
 */
import {ClientOptions, User} from "../src/public/controllers/ClientController";
import {ErrorCode, ErrorMessage, WebException, WebController} from "../src/public/controllers/WebController";

/**
 * @ignore
 */
let webController: WebController;

/**
 * @ignore
 */
interface IRollPassBrowser {
    init(clientOptions: ClientOptions): void;

    getUser(): Promise<User>;

    sendAccessLink(emailAddress: string): void;

    getKeyValue(key: string): Promise<any>;

    setKeyValue(key: string, value: any): void;

    signOut(): void;
}

export { ClientOptions, User };

/**
 * @ignore
 */
function assertInitialized() {
    if (!webController) {
        throw new WebException(ErrorCode.UNINITIALIZED_CLIENT, ErrorMessage.UNINITIALIZED_CLIENT)
    }
}

/**
 * RollPass Browser library for use in frontend apps or static HTML.
 *
 * ### Quick Start
 *
 * #### Create free account
 * [Sign up](https://rollpass.io/sign-up/) for RollPass and create a free account.
 * Find your `clientToken` and `projectId` in [your dashboard](https://rollpass.io/dashboard).
 *
 * #### Add CDN Script
 * Include the RollPass Browser library in your HTML by placing a `<script>` tag inside the `<body>`.
 *
 * [[include:browser/install.md]]
 *
 * #### Configure RollPass
 * Create another `<script>` tag after this and configure the global RollPass object using your `clientToken` and `projectId`.
 *
 * [[include:browser/configure.md]]
 *
 * #### Authenticate a user
 *
 * Now user `RollPass.getUser()` to authenticate visitors to your page. `getUser` is an asynchronous function that returns a `Promise<User>` if the user is logged in. It throws an error if the session has expired or the user is not known.
 *
 * > **Note:** When an error is thrown you must ask the user to login. Obtain their email address and send them an access link using `RollPass.sendAccessLink(emailAddress)`.
 *
 * [[include:browser/authenticate.md]]
 */
export const RollPassBrowser: IRollPassBrowser = {
    /**
     * Initialize RollPass for your `clientToken` and `projectId`. You can find these in [your dashboard](https://rollpass.io/dashboard).
     *
     * > **Note:** Your project `redirectUrl` should be configured so that users will be redirected to your HTML page after clicking an access link.
     *
     * [[include:browser/configure.md]]
     */
    init(clientOptions: ClientOptions) {
        webController = new WebController(clientOptions)
    },
    /**
     * Authenticate a user. Expect method to throw exception when user is not logged in. Handle this exception by asking for the users email address
     * and sending them an access link via email using `RollPass.sendAccessLink(emailAddress)`.
     *
     * [[include:browser/authenticate.md]]
     */
    async getUser(): Promise<User> {
        assertInitialized();
        return webController.getUser()
    },
    async sendAccessLink(emailAddress: string): Promise<any> {
        assertInitialized();
        return webController.sendChallenge(emailAddress)
    },
    getKeyValue(key: string): Promise<any> {
        assertInitialized();
        return webController.getStoreValue(key);
    },
    setKeyValue(key: string, value: any) {
        assertInitialized();
        return webController.setStoreValue(key, value);
    },
    signOut(): void {
        assertInitialized()
        webController.signOut();
    }
};
/**
 * @ignore
 */
declare const RollPass: IRollPassBrowser;

/**
 * @ignore
 */
export default RollPassBrowser;

(window as any).RollPass = RollPassBrowser;
