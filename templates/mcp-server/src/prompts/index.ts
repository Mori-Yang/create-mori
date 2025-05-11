import type { Prompt } from '@modelcontextprotocol/sdk/types.js';

// TODO: import your prompt and declaration
import { getPrompts, PROMPT_DECLARATION } from './promptName.js';

interface PromptsMap {
    [key: string]: [Prompt, () => string]
}

export const PROMPTS_MAP: PromptsMap = {
    [PROMPT_DECLARATION.name]: [PROMPT_DECLARATION, getPrompts],
};

export const PROMPTS_DECLARATION = Object.values(PROMPTS_MAP).map(([promptDeclaration, _]) => promptDeclaration);
