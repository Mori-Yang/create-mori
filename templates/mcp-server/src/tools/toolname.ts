import type { Tool } from '@modelcontextprotocol/sdk/types.js';
import type { EnvironmentVariables } from '../env.js';
import type { ToolHandler } from './index.js';

// Tool definitions
// TODO: Complete the tool's definition
const ToolName: Tool = {
    name: 'ToolName',
    description: 'tool description',
    inputSchema: {
        type: 'object',
        properties: {
            param1: {
                type: 'string',
                description: 'param1\'s description',
            },
        },
    },
};

// Tool handler
// TODO: Implement the tool's logic
const handleToolName: ToolHandler = async (_args: unknown, _envVars?: EnvironmentVariables) => {
    return {
        content: [{
            type: 'text',
            text: JSON.stringify({
                res1: 'on of the result',
                res2: _envVars?.ENV_VARIABLE_NAME,
            }),
        }],
        isError: false,
    };
};

export { ToolName, handleToolName };
