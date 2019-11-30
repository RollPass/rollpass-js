import {ApiController, ApiOptions} from "../protected/ApiController";

export interface ClientOptions {
  clientToken: string;
  projectId: string;
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
      clientToken: this.clientOptions.clientToken,
      projectId: this.clientOptions.projectId,
      sessionCode
    });
  }

  async sendChallenge(emailAddress: string): Promise<any> {
    return this.request("POST", "/challenge/send", {
      clientToken: this.clientOptions.clientToken,
      projectId: this.clientOptions.projectId,
      emailAddress
    });
  }

  async verifyChallenge(challengeCode: string): Promise<any> {
    return this.request("GET", "/challenge/verify", {
      clientToken: this.clientOptions.clientToken,
      projectId: this.clientOptions.projectId,
      challengeCode
    });
  }

  async getUser(sessionCode: string): Promise<any> {
    return this.request("GET", "/user", {
      clientToken: this.clientOptions.clientToken,
      projectId: this.clientOptions.projectId,
      sessionCode
    });
  }

}
