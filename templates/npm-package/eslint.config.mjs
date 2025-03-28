import tsEslint from 'typescript-eslint';
import stylistic from '@stylistic/eslint-plugin';
export default [
  ...tsEslint.configs.recommended,
  {
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
  stylistic.configs.recommended,
  {
    rules: {
      '@stylistic/semi': ['error', 'always'],
      '@stylistic/indent': ['error', 2],
    },
  },
];
