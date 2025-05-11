import type { Prompt } from '@modelcontextprotocol/sdk/types.js';

// TODO: Implement the Prompt structure
export const PROMPT_DECLARATION: Prompt = {
    name: 'promptname',
    description: 'description',
    arguments: [
        {
            name: 'argumentname',
            description: 'description',
            required: true,
        },
    ],
};

// TODO: Implement the prompt
export function getPrompts() {
    return 'Your Prompts';
}
