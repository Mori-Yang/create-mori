import type { CallToolResult } from '@modelcontextprotocol/sdk/types.js';
import { ToolName, handleToolName } from './toolname.js';
import type { EnvironmentVariables } from '../env.js';

interface ToolHandler {
    [key: string]: (args: Record<string, unknown> | undefined, envVars?: EnvironmentVariables) => Promise<CallToolResult>
}

export const TOOLS = [
    ToolName,
];

export const TOOL_HANDLERS: ToolHandler = {
    [ToolName.name]: handleToolName,
};
