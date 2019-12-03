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
 * ### Browser installation
 * Include the RollPass Browser library in your HTML using a script tag.
 *
 * [[include:browser/install.md]]
 *
 * ### Configure RollPass
 * Next configure the global RollPass object using your clientToken and projectId.
 *
 * [[include:browser/configure.md]]
 *
 * ### Now authenticate a user or ask them to login
 * [[include:browser/authenticate.md]]
 */
export const RollPassBrowser: IRollPassBrowser = {
    /**
     *
     * @param clientOptions
     */
    init(clientOptions: ClientOptions) {
        webController = new WebController(clientOptions)
    },
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

declare const RollPass: IRollPassBrowser;
export default RollPassBrowser;
(window as any).RollPass = RollPassBrowser;
