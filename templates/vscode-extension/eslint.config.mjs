import pluginJs from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
// feature: use eslint stylistic as formatter
import stylistic from '@stylistic/eslint-plugin';

/**
 * 使用eslint v9 , 确保VSCode的eslint插件版本高于3.0.5
 * 此外，还需要在用户settings.json中设置👇
 * ! "eslint.useFlatConfig": true
 */
/** @type {import('eslint').Linter.Config[]} */
export default [
    { ignores: ['dist', 'node_modules', 'package.json'] },
    { files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'] },
    {
        languageOptions: {
            globals: {
                ...globals.browser,
                /** add global variables here */
            },
        },
    },
    pluginJs.configs.recommended,
    ...tseslint.configs.recommended,
    {
        /** add custom rules here */
        rules: {
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
