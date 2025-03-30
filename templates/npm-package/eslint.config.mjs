import tsEslint from 'typescript-eslint';
import stylistic from '@stylistic/eslint-plugin';
export default [
    ...tsEslint.configs.recommended,
    {
        rules: {
            // 'no-useless-concat': ['error'], // without autofix, trying to implement in eslint-plugin-unicorn or implement a plugin to enhence it
            'prefer-template': ['warn'],
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
    stylistic.configs.recommended,
    {
        rules: {
            '@stylistic/semi': ['error', 'always'],
            '@stylistic/indent': ['error', 4],
        },
    },
];
