import { CallToolResult, Tool } from "@modelcontextprotocol/sdk/types.js"
import { EnvironmentVariables } from "../env.js"

// Tool definitions
// TODO: Complete the tool's definition
const ToolName: Tool = {
    name: 'ToolName',
    description: 'tool description',
    inputSchema: {
        type: "object",
        properties: {
            param1: {
                type: "string",
                description: "param1's description"
            }
        }
    }
}

// Tool handler
// TODO: Implement the tool's logic
async function handleToolName(_args: Record<string, unknown> | undefined, _envVars?: EnvironmentVariables): Promise<CallToolResult> {

    return {
        content: [{
            type: "text",
            text: JSON.stringify({
                res1: 'on of the result',
            })
        }],
        isError: false,
    }
}

export { ToolName, handleToolName } 