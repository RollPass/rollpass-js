import {ApiController, ApiOptions} from "./ApiController";
/**
 * @ignore
 */
interface AgentOptions {}
/**
 * @ignore
 */
interface AgentSessionDto {
  agent: any,
  status: 'CREATED' | 'EXISTING'
}
/**
 * @ignore
 *
 * For advanced applications interacting with RollPass dashboard
 */
export class AgentController extends ApiController {
  private readonly agentOptions: AgentOptions;

  constructor(agentOptions: AgentOptions, apiOptions?: Partial<ApiOptions>) {
    super(apiOptions);
    this.agentOptions = agentOptions;
  }

  async getOrCreateAgentForSession(sessionCode: string): Promise<AgentSessionDto> {
    return this.request("POST", "/agent", {sessionCode});
  }

  async getAgentProjectsForSession(sessionCode: string): Promise<any> {
    return this.request("GET", "/agent/projects", {sessionCode});
  }

  async createAgentProjectForSession(sessionCode: string, createProjectDto: any): Promise<any> {
    return this.request("POST", "/agent/projects", {sessionCode}, createProjectDto)
  }
}
