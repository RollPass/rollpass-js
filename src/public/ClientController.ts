import {ApiController, ApiOptions} from "../protected/ApiController";

export interface ClientOptions {
    clientToken: string;
    projectId: string;
}

export interface User {
    id: string,
    userHash: string,
    emailAddress: string,
    createdAt: Date,
    updatedAt: Date
}


/**
 * ClientController
 * @category Isomorphic
 */
export class ClientController extends ApiController {
    private readonly clientOptions: ClientOptions;

    constructor(clientOptions: ClientOptions, apiOptions?: Partial<ApiOptions>) {
        super(apiOptions);
        this.clientOptions = clientOptions;
    }

    async getSession(sessionCode: string): Promise<any> {
        return this.request("GET", "/session", {
            ...this.clientOptions,
            sessionCode
        });
    }

    async deleteSession(sessionCode: string): Promise<any> {
        return this.request("DELETE", "/session", {
            ...this.clientOptions,
            sessionCode
        });
    }

    async sendChallenge(emailAddress: string): Promise<any> {
        return this.request("POST", "/challenge/send", {
            ...this.clientOptions,
            emailAddress
        });
    }

    async verifyChallenge(challengeCode: string): Promise<any> {
        return this.request("GET", "/challenge/verify", {
            ...this.clientOptions,
            challengeCode
        });
    }

    async getUser(sessionCode: string): Promise<User> {
        return this.request("GET", "/user", {
            ...this.clientOptions,
            sessionCode
        });
    }

    async getKeyValue(key: string): Promise<any> {
        return this.request("GET", "/key-value", {
            ...this.clientOptions,
            key
        });
    }

    async putKeyValue(key: string, value: any): Promise<any> {
        return this.request("PUT", "/key-value", {
            ...this.clientOptions,
            key
        }, value);
    }

    async deleteKeyValue(key: string, value: any): Promise<any> {
        return this.request("DELETE", "/key-value", {
            ...this.clientOptions,
            key
        });
    }

}
