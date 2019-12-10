import { ApiController, ApiOptions } from "../../protected/ApiController";
export interface ClientOptions {
    clientToken: string;
    projectId: string;
}
export interface User {
    id: string;
    userHash: string;
    emailAddress: string;
    createdAt: Date;
    updatedAt: Date;
}
/**
 * ClientController
 * @category Common
 */
export declare class ClientController extends ApiController {
    private readonly clientOptions;
    constructor(clientOptions: ClientOptions, apiOptions?: Partial<ApiOptions>);
    getSession(sessionCode: string): Promise<any>;
    deleteSession(sessionCode: string): Promise<any>;
    sendChallenge(emailAddress: string): Promise<any>;
    verifyChallenge(challengeCode: string): Promise<any>;
    getUser(sessionCode: string): Promise<User>;
    getKeyValue(key: string): Promise<any>;
    putKeyValue(key: string, value: any): Promise<any>;
    deleteKeyValue(key: string, value: any): Promise<any>;
}
