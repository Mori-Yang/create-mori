import type { CallToolResult } from '@modelcontextprotocol/sdk/types.js';
// TODO import your tool and handler
import { ToolName, handleToolName } from './toolname.js';

import type { EnvironmentVariables } from '../env.js';

// TODO: Define the type of the tool handler's args
export type ToolHandler<A> = (args: A, envVars?: EnvironmentVariables) => Promise<CallToolResult>;
interface ToolHandlerMap {
    [key: string]: ToolHandler<unknown>
}

export const TOOLS = [
    ToolName,
];

export const TOOL_HANDLERS: ToolHandlerMap = {
    [ToolName.name]: handleToolName,
};
