import fsExtra from "fs-extra/esm";
import fs from "node:fs";
import path from "node:path";
import { BuildTool, Framework, Store } from "./constant.js";
import { TemplateConfig } from "./index.js";

export const createTemplate = (
    config: TemplateConfig,
    root: string,
    templatePath: string
) => {
    // 获取templates目录下的所有一级子目录
    const templates = fs.readdirSync(templatePath);

    delete config.projectName;

    const templateName = genTemplateName(config);
    const templateDir = path.resolve(templatePath, templateName);

    // 再次校验所要复制模板是否存在
    const finalTemplate = templates.find((t) => {
        return t === templateName;
    });

    if (!finalTemplate) {
        return false;
    }

    // 遍历templatePath下的所有文件,如果文件名包含lock、node_modules、dist则跳过，否则copy
    fs.readdirSync(templateDir).forEach((file) => {
        fsExtra.copySync(
            path.resolve(templateDir, file),
            path.resolve(root, file),
            {
                filter: () => !shouldSkip(file),
            }
        );
    });

    return true;
};

function genTemplateName(config: Omit<TemplateConfig, "projectName">) {
    let templateName = "";

    Object.keys(config).forEach((k) => {
        switch (k) {
            case "buildTool":
                templateName += `-${BuildTool.Text[config[k]]}`;
                break;
            case "framework":
                templateName += `-${Framework.Text[config[k]]}`;
                break;
            case "store":
                templateName += `-${Store.Text[config[k]!]}`;
                break;
        }
    });
    templateName = templateName.slice(1);
    return templateName.toLowerCase();
}

function shouldSkip(src: string) {
    if (
        src.includes("lock") ||
        src.includes("node_modules") ||
        src.includes("dist")
    ) {
        return true;
    }
    return false;
}
