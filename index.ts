#!/usr/bin/env node
import fs from "fs-extra";
import path from "node:path";
import { fileURLToPath } from "node:url";
import prompts from "prompts";
import { isChina } from "./common/constant.js";
import {
    createTemplate,
    getSupportedBuildTools,
    getSupportedFrameworks,
    getSupportedStores,
    TemplateConfig,
} from "./common/index.js";

// 项目名
const { projectName } = await prompts({
    type: "text",
    name: "projectName",
    message: `Project name ${+isChina ? "(项目名)" : ""}:`,
    initial: "mori-project",
});

// 选择构建工具
const { buildTool } = await prompts({
    type: "select",
    name: "buildTool",
    message: `Build Tool ${isChina ? "(构建工具)" : ""}`,
    choices: getSupportedBuildTools(),
});

// 选择框架
const { framework } = await prompts({
    type: "select",
    name: "framework",
    message: `Framework ${isChina ? "(框架)" : ""}`,
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
        message: `Need a store ? ${isChina ? "(是否需要状态管理库？)" : ""}`,
    });

    if (needStore) {
        const storeRes = await prompts({
            type: "select",
            name: "store",
            message: `Store ${isChina ? "(状态管理库)" : ""}`,
            choices: supportedStores,
        });
        store = storeRes.store;
    }
}

const cwd = process.cwd();
const root =
    cwd +
    (cwd.lastIndexOf("\\") === cwd.length ? projectName : `\\${projectName}`);

const templatesPath = path.resolve(
    fileURLToPath(import.meta.url),
    "..",
    "..",
    "templates"
);

try {
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

    createTemplate(config, root, templatesPath);
    console.info(
        `\n\n execute: \n\n cd ${projectName} \n npm install \n npm run dev`
    );
} catch (err) {
    console.error(err);
} finally {
    console.info(`Done!`);
}
