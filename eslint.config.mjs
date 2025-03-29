import globals from 'globals';
import tseslint from 'typescript-eslint';
import stylistic from '@stylistic/eslint-plugin';

/** @type {import('eslint').Linter.Config[]} */
export default [
    { ignores: ['dist', 'node_modules', 'package.json'] },
    { files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'] },
    {
        languageOptions: {
            globals: {
                ...globals.node,
                /** add global variables here */
            },
        },
    },
    ...tseslint.configs.recommended,
    {
        /** add custom rules here */
        rules: {
            '@typescript-eslint/consistent-type-imports': ['error', {
                prefer: 'type-imports',
                fixStyle: 'separate-type-imports',
            }],
            '@typescript-eslint/no-unused-vars': [
                'warn',
                {
                    vars: 'all',
                    args: 'after-used',
                    varsIgnorePattern: '^_',
                    argsIgnorePattern: '^_',
                },
            ],
        },
    },
    // stylistic config
    stylistic.configs.recommended,
    {
        /** add custom stylistic rules here */
        rules: {
            '@stylistic/semi': ['error', 'always'],
            '@stylistic/indent': ['error', 4],
        },
    },
];
