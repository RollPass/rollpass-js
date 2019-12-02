import {ClientOptions, User} from "./src/public/ClientController";
import {ErrorCode, ErrorMessage, WebException, WebController} from "./src/public/WebController";

interface IRollPassBrowser {
    init(clientOptions: ClientOptions): void;

    getUser(): Promise<User>;

    sendAccessLink(emailAddress: string): void;

    getKeyValue(key: string): Promise<any>;

    setKeyValue(key: string, value: any): void;

    signOut(): void;
}

function assertInitialized() {
    if (!webController) {
        throw new WebException(ErrorCode.UNINITIALIZED_CLIENT, ErrorMessage.UNINITIALIZED_CLIENT)
    }
}

let webController: WebController;
export const RollPassBrowser: IRollPassBrowser = {
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
