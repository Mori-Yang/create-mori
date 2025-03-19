import fs from 'node:fs';
import path from 'node:path';
import rules from './rules';

const pkg = JSON.parse(
    fs.readFileSync(path.resolve(__dirname, '..', 'package.json'), 'utf-8'),
);

const plugin = {
    meta: {
        name: pkg.name,
        version: pkg.version,
    },
    configs: {},
    rules: rules,
};

Object.assign(plugin.configs, {
    recommended: {
        plugins: {
            mori: plugin,
        },
        rules: {
            'mori/rule-name': 'warn',
        },
    },
});

module.exports = plugin;
