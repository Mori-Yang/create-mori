import type { CallToolResult } from '@modelcontextprotocol/sdk/types.js';
import { ToolName, handleToolName } from './toolname.js';

import type { EnvironmentVariables } from '../env.js';

// TODO: Define the type of the tool handler's args
export type ToolHandler = (args: unknown, envVars?: EnvironmentVariables) => Promise<CallToolResult>;
interface ToolHandlerMap {
    [key: string]: ToolHandler
}

export const TOOLS = [
    ToolName,
];

export const TOOL_HANDLERS: ToolHandlerMap = {
    [ToolName.name]: handleToolName,
};
