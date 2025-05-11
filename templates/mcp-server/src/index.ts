#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { CallToolRequestSchema, GetPromptRequestSchema, ListPromptsRequestSchema, ListToolsRequestSchema } from '@modelcontextprotocol/sdk/types.js';

import { TOOLS, TOOL_HANDLERS } from './tools/index.js';
import { getEnvironmentVariables } from './env.js';
import { PROMPTS_MAP, PROMPTS_DECLARATION } from './prompts/index.js';

const dirname = fileURLToPath(import.meta.url);
const pkg: {
    name: string
    version: string
} = JSON.parse(
    fs.readFileSync(path.resolve(dirname, '..', '..', 'package.json'), 'utf-8'),
);

// Init environment variables
const ENV_VARIABLES = getEnvironmentVariables();

// Create server instance
const server = new Server({
    name: pkg.name,
    version: pkg.version,
}, {
    // TODO: When initializing, inform the client of the functionality provided
    capabilities: {
        resources: {},
        tools: {},
        prompts: {},
    },
});

// Set up request handlers -- list tools request
server.setRequestHandler(ListToolsRequestSchema, async () => ({
    tools: TOOLS,
}));

// Set up available prompts -- list prompts request
server.setRequestHandler(ListPromptsRequestSchema, async () => ({
    prompts: PROMPTS_DECLARATION,
}));

// Set up request handlers -- call tools request
server.setRequestHandler(CallToolRequestSchema, async (request) => {
    try {
        const { arguments: args, name } = request.params;
        for (const [tool, handler] of Object.entries(TOOL_HANDLERS)) {
            if (tool === name) {
                return await handler(args, ENV_VARIABLES);
            }
        }

        return {
            content: [{
                type: 'text',
                text: `Unknown tool: ${request.params.name}`,
            }],
            isError: true,
        };
    }
    catch (error) {
        return {
            content: [{
                type: 'text',
                text: `Error: ${error instanceof Error ? error.message : String(error)}`,
            }],
            isError: true,
        };
    }
});

// Set up request handlers -- get prompt request
server.setRequestHandler(GetPromptRequestSchema, async (request) => {
    const [prompt, getter] = PROMPTS_MAP[request.params.name];
    if (!prompt) {
        throw new Error(`Unknown prompt: ${request.params.name}`);
    }

    return {
        role: 'xx',
        content: {
            type: 'text',
            text: getter(),
        },
    };
});

// Run the mcp server
async function runServer() {
    const transport = new StdioServerTransport();
    await server.connect(transport);
    console.error('MCP Server running on stdio');
}

runServer().catch((error) => {
    console.error('Fatal error running server:', error);
    process.exit(1);
});
