import fsExtra from "fs-extra/esm";
import fs from "node:fs";
import path from "node:path";
import { BuildTool, Framework, Router, Store } from "./constant.js";
import { TemplateConfig } from "./index.js";

export const createTemplate = (
    config: TemplateConfig,
    root: string,
    templatePath: string
) => {
    // 获取templates目录下的所有模板文件夹
    const templates = fs.readdirSync(templatePath);
    const projectName = config.projectName;
    delete config.projectName;

    const templateName = genTemplateName(config);
    const templateDir = path.resolve(templatePath, templateName);

    // 再次校验所要复制模板是否存在
    const finalTemplate = templates.find((t) => {
        return t === templateName;
    });

    if (!finalTemplate) {
        return {
            success: false,
            message: `⚠️  Error: Mori has not yet provided the template ${templateName}, or encountered an unexpected error. We hope to receive your feedback.\n 🔖 New Issue: https://github.com/Mori-Young/create-mori/issues/new?template=Blank+issue`,
        };
    }

    // 遍历templatePath下的所有文件,如果文件名包含lock、node_modules、dist则跳过，否则copy
    fs.readdirSync(templateDir).forEach((file) => {
        fsExtra.copySync(
            path.resolve(templateDir, file),
            path.resolve(root, file),
            {
                filter: () => !shouldSkip(file, templatePath),
            }
        );
    });
    // rewrite package.json
    const packageJson = fsExtra.readJsonSync(
        path.resolve(root, "package.json")
    );
    packageJson.name = projectName;
    console.log(packageJson.name);
    fsExtra.writeJsonSync(path.resolve(root, "package.json"), packageJson, {
        spaces: 4,
    });
    return { success: true };
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
            case "router":
                templateName += `-${Router.Text[config[k]!]
                    .split(" ")
                    .join("_")}`;
                break;
        }
    });
    templateName = templateName.slice(1);
    return templateName.toLowerCase();
}

function shouldSkip(src: string, templatePath: string) {
    src = src.replace(templatePath, "");
    if (
        src.includes("lock") ||
        src.includes("node_modules") ||
        src.includes("dist")
    ) {
        return true;
    }

    return false;
}
