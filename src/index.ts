import axios, {AxiosInstance} from "axios";
import {stringify, parse} from "qs";

export function getAxios(apiOptions: ApiOptions): AxiosInstance {
    return axios.create({
        baseURL: apiOptions.baseURL,
        timeout: apiOptions.timeout,
        headers: {'x-client': apiOptions.name}
    })
}

export interface ApiOptions {
    baseURL: string;
    timeout: number;
    name: string;
}

export interface IStorage {
    getItem(key: string): any;
    setItem(key: string, value: any): void;
}

const defaultApiOptions: ApiOptions = {
    baseURL: "https://api.rollpass.io",
    timeout: 5000,
    name: "rollpass-js"
}

export interface ClientOptions {
    clientToken: string;
    projectId: string;
}

export interface AgentOptions {

}

export enum AuthenticationState {
    UNAUTHENTICATED = "UNAUTHENTICATED",
    SESSION_EXPIRED = "SESSION_EXPIRED",
    AUTHENTICATED = "AUTHENTICATED"
}

export class WebController {
    private readonly sessionKey = "__rollpass_session_id__";
    private readonly apiOptions: ApiOptions;
    private readonly storage: IStorage;
    private readonly clientOptions: ClientOptions;
    private readonly clientController: ClientController;

    constructor(
        clientOptions: ClientOptions,
        storage: IStorage = localStorage,
        apiOptions?: ApiOptions
    ) {
        this.storage = storage;
        this.clientOptions = clientOptions;
        this.apiOptions = {...defaultApiOptions, ...apiOptions}
        this.clientController = new ClientController(this.clientOptions, this.apiOptions)
    }

    async getAuthenticationState(currentUrl: string = window.location.search): Promise<AuthenticationState> {
        const { code } = parse(currentUrl, { ignoreQueryPrefix: true })
        const storedSessionCode = this.storage.getItem(this.sessionKey)
        if (code) {
            const session = await this.clientController.verifyChallenge(code)
            this.storage.setItem(this.sessionKey, session.code)
            return AuthenticationState.AUTHENTICATED
        } else if (storedSessionCode) {
            const currentSession = await this.clientController.getSession(storedSessionCode)
            return currentSession.status === 'VALID'
                ? AuthenticationState.AUTHENTICATED
                : AuthenticationState.SESSION_EXPIRED
        } else {
            return AuthenticationState.UNAUTHENTICATED
        }
    }

    async sendChallenge(emailAddress: string) {
        return this.clientController.sendChallenge(emailAddress)
    }

    async getUser() {
        const storedSessionCode = this.storage.getItem(this.sessionKey)
        if (storedSessionCode == null) {
            throw Error("No session found. See https://rollpass.io/docs/no-session-found for more information.");
        }
        return this.clientController.getUser(storedSessionCode)
    }
}

export class AgentController {
    private readonly apiOptions: ApiOptions;
    private readonly api: AxiosInstance;
    private readonly agentOptions: AgentOptions;

    constructor(agentOptions: AgentOptions, apiOptions?: ApiOptions) {
        this.agentOptions = agentOptions;
        this.apiOptions = {...defaultApiOptions, ...apiOptions}
        this.api = getAxios(this.apiOptions)
    }

    async getAgentForSession(sessionCode: string) {
        const { data } = await this.api.get("/agent?" + stringify({
            sessionCode
        }));
        return data
    }

    async getAgentProjectsForSession(sessionCode: string) {
        const { data } = await this.api.get("/agent/projects?" + stringify({
            sessionCode
        }));
        return data
    }

    async createAgentProjectForSession(sessionCode: string, createProjectDto: any) {
        const { data } = await this.api.post("/agent/projects?" + stringify({
            sessionCode
        }, createProjectDto));
        return data
    }
}


export class ClientController {
    private readonly apiOptions: ApiOptions;
    private readonly api: AxiosInstance;
    private readonly clientOptions: ClientOptions;

    constructor(clientOptions: ClientOptions, apiOptions?: ApiOptions) {
        this.clientOptions = clientOptions;
        this.apiOptions = {...defaultApiOptions, ...apiOptions}
        this.api = getAxios(this.apiOptions)
    }

    async getSession(sessionCode: string) {
        const { data } = await this.api.get("/session?" + stringify({
            clientToken: this.clientOptions.clientToken,
            projectId: this.clientOptions.projectId,
            sessionCode
        }));
        return data;
    }

    async sendChallenge(emailAddress: string) {
        await this.api.post("/challenge/verify?" + stringify({
            clientToken: this.clientOptions.clientToken,
            projectId: this.clientOptions.projectId,
            emailAddress
        }));
    }

    async verifyChallenge(challengeCode: string) {
        const {data} = await this.api.get("/challenge/verify?" + stringify({
            clientToken: this.clientOptions.clientToken,
            projectId: this.clientOptions.projectId,
            challengeCode
        }));
        return data;
    }

    async getUser(sessionCode: string) {
        const { data } = await this.api.get("/user?" + stringify({
            clientToken: this.clientOptions.clientToken,
            projectId: this.clientOptions.projectId,
            sessionCode
        }));
        return data;
    }

}