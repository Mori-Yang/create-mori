import fs from 'node:fs';
import path from 'node:path';
import rules from './rules';
import { fileURLToPath } from 'node:url';
import { ESLint, Linter } from 'eslint';

const dirname = fileURLToPath(import.meta.url);
const pkg = JSON.parse(
    fs.readFileSync(path.resolve(dirname, '..', '..', 'package.json'), 'utf-8'),
);

const plugin: ESLint.Plugin = {
    meta: {
        name: pkg.name,
        version: pkg.version,
    },
    configs: {},
    rules: rules,
};

Object.assign(plugin.configs as Record<string, Linter.LegacyConfig | Linter.Config | Linter.Config[]>, {
    recommended: {
        plugins: {
            mori: plugin,
        },
        rules: {
            'mori/rule-a': 'warn',
        },
    },
});

export default plugin;
