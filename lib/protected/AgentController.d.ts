import { ApiController, ApiOptions } from "./ApiController";
/**
 * @ignore
 */
interface AgentOptions {
}
/**
 * @ignore
 */
interface AgentSessionDto {
    agent: any;
    status: 'CREATED' | 'EXISTING';
}
/**
 * @ignore
 *
 * For advanced applications interacting with RollPass dashboard
 */
export declare class AgentController extends ApiController {
    private readonly agentOptions;
    constructor(agentOptions: AgentOptions, apiOptions?: Partial<ApiOptions>);
    getOrCreateAgentForSession(sessionCode: string): Promise<AgentSessionDto>;
    getAgentProjectsForSession(sessionCode: string): Promise<any>;
    createAgentProjectForSession(sessionCode: string, createProjectDto: any): Promise<any>;
}
export {};
