#!/usr/bin/env node
import chalk from "chalk";
import figlet from "figlet";
import fs from "fs-extra";
import path from "node:path";
import { fileURLToPath } from "node:url";
import ora from "ora";
import prompts from "prompts";
import {
    createTemplate,
    getSupportedBuildTools,
    getSupportedFrameworks,
    getSupportedRouters,
    getSupportedStores,
    TemplateConfig,
} from "./common/index.js";

const spinner = ora({
    color: "green",
    spinner: "dots",
});
console.info(chalk.green(figlet.textSync("M o r i", { width: 100 })));

// 项目名
const { projectName } = await prompts({
    type: "text",
    name: "projectName",
    message: `Project name : `,
    initial: "mori-project",
});
if (!projectName) {
    cancel();
}

// 选择构建工具
const { buildTool } = await prompts({
    type: "select",
    name: "buildTool",
    message: `Build Tool : }`,
    choices: getSupportedBuildTools(),
});

// 选择框架
const { framework } = await prompts({
    type: "select",
    name: "framework",
    message: `Framework : `,
    choices: getSupportedFrameworks(),
});

// 选择状态管理库
const supportedStores = getSupportedStores(framework);
let store = null;
if (supportedStores.length) {
    // 是否需要Store
    const { needStore } = await prompts({
        type: "confirm",
        name: "needStore",
        message: `Need a store ? `,
    });

    if (needStore) {
        const storeRes = await prompts({
            type: "select",
            name: "store",
            message: `Store : `,
            choices: supportedStores,
        });
        store = storeRes.store;
    }
}

// 选择路由库
const supportedRouters = getSupportedRouters(framework);
let router = null;
if (supportedRouters.length) {
    const { needRouter } = await prompts({
        type: "confirm",
        name: "needRouter",
        message: `Need a router ?`,
    });

    if (needRouter) {
        const routerRes = await prompts({
            type: "select",
            name: "router",
            message: `Router: `,
            choices: supportedRouters,
        });
        router = routerRes.router;
    }
}

const cwd = process.cwd();
const root = path.resolve(cwd, projectName);

const templatesPath = path.resolve(
    fileURLToPath(import.meta.url),
    "..",
    "..",
    "templates"
);

try {
    spinner.start();

    fs.removeSync(root);
    fs.ensureDirSync(root);
    const config = {
        projectName,
        buildTool,
        framework,
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
            chalk.blue("execute: \n") +
                chalk.green(
                    ` 🌲 cd ${projectName} \n 🌲 npm install \n 🌲 npm run dev`
                )
        );
    } else {
        spinner.fail(chalk.red(message));
    }
} catch (err) {
    spinner.fail(
        chalk.red("🚫 " + (err instanceof Error ? err.message : String(err)))
    );
}

function cancel() {
    console.info(chalk.blueBright("🛑Cancelled!"));
    process.exit(0);
}
