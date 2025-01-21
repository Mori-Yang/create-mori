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

    const projectName = config.projectName;
    delete config.projectName;

    const templateName = genTemplateName(config);
    const templateDir = path.resolve(templatePath, templateName);

    fsExtra.copySync(templateDir, root);
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
