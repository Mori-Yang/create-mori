#!/usr/bin/env node
import chalk from 'chalk';
import { Command } from 'commander';
import figlet from 'figlet';
import fs from 'fs-extra';
import fsExtra from 'fs-extra/esm';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import ora from 'ora';
import prompts from 'prompts';
import { BuildTool } from './common/constant.js';
import {
    createTemplate,
    getSupportedBuildTools,
    getSupportedFrameworks,
    getSupportedRouters,
    getSupportedStores,
    TemplateConfig,
} from './common/index.js';
import { convertAliasToTemplateName, hasSpecificTemplate } from './common/utils.js';

const CLIDesc = `
CLI for creating a new project
you can use -t <type> to create a specific template,availabel type is:
vscode-estension ---- VSCode Extension
eslint-plugin ---- ESlint Plugin
pkg ---- NPM Package
`;

const dirname = path.resolve(fileURLToPath(import.meta.url), '..', '..');
const packageJson = fsExtra.readJsonSync(path.resolve(dirname, 'package.json'));

const program = new Command();
program
    .name('create-mori')
    .description(CLIDesc)
    .version(packageJson.version);

// cli options
program.option('-t, --template <type>', 'Create a specific template');
program.parse(process.argv);
const options = program.opts();

const isSpecifiedTemplate
    = options.template && hasSpecificTemplate(options.template);

const spinner = ora({
    color: 'green',
    spinner: 'dots',
});
console.info(chalk.green(figlet.textSync('M o r i', { width: 100 })));

// Project name
const { projectName } = await prompts({
    type: 'text',
    name: 'projectName',
    message: `Project name : `,
    initial: 'mori-project',
});
if (!projectName) {
    cancel();
}

// Select build tool
let buildTool;
if (!isSpecifiedTemplate) {
    const response = await prompts({
        type: 'select',
        name: 'buildTool',
        message: `Build Tool : }`,
        choices: getSupportedBuildTools(),
    });
    buildTool = response.buildTool;
}

// Select framework
let framework;
if (!isSpecifiedTemplate) {
    const response = await prompts({
        type: 'select',
        name: 'framework',
        message: `Framework : `,
        choices: getSupportedFrameworks(),
    });
    framework = response.framework;
}

// Select state management library
let store = null;
const supportedStores = getSupportedStores(framework);
if (supportedStores.length && !isSpecifiedTemplate) {
    // Need a store?
    const { needStore } = await prompts({
        type: 'confirm',
        name: 'needStore',
        message: `Need a store ? `,
    });

    if (needStore) {
        const storeRes = await prompts({
            type: 'select',
            name: 'store',
            message: `Store : `,
            choices: supportedStores,
        });
        store = storeRes.store;
    }
}

// Select router library
const supportedRouters = getSupportedRouters(framework);
let router = null;
if (supportedRouters.length && !isSpecifiedTemplate) {
    const { needRouter } = await prompts({
        type: 'confirm',
        name: 'needRouter',
        message: `Need a router ?`,
    });

    if (needRouter) {
        const routerRes = await prompts({
            type: 'select',
            name: 'router',
            message: `Router: `,
            choices: supportedRouters,
        });
        router = routerRes.router;
    }
}

const cwd = process.cwd();
const root = path.resolve(cwd, projectName);

const templatesPath = path.resolve(dirname, 'templates');

let useTailwindcss = false;
// Tailwindcss
if (buildTool !== BuildTool.Value.Webpack && !isSpecifiedTemplate) {
    const res = await prompts({
        type: 'confirm',
        name: 'useTailwindcss',
        message: `Do you need tailwindcss ?`,
    });
    useTailwindcss = res.useTailwindcss;
}

try {
    spinner.start();

    fs.removeSync(root);
    fs.ensureDirSync(root);
    const config = {
        specifiedTemplate: convertAliasToTemplateName(options.template),
        projectName,
        buildTool,
        framework,
        useTailwindcss,
    } as TemplateConfig;

    if (store) {
        config.store = store;
    }

    if (router) {
        config.router = router;
    }

    const { success, message } = createTemplate(config, root, templatesPath);
    if (success) {
        spinner.succeed(
            chalk.blue('execute: \n')
            + chalk.green(
                ` 🌲 cd ${projectName} \n 🌲 npm install \n 🌲 npm run dev`,
            ),
        );
    }
    else {
        spinner.fail(chalk.red(message));
    }
}
catch (err) {
    spinner.fail(
        chalk.red('🚫 ' + (err instanceof Error ? err.message : String(err))),
    );
}

function cancel() {
    console.info(chalk.blueBright('🛑 Cancelled!'));
    process.exit(0);
}
