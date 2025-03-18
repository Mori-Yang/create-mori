import fs from 'fs';
import fsExtra from 'fs-extra/esm';
import { resolve } from 'path';
import {
    ArrayLiteralExpression,
    CallExpression,
    Expression,
    Node,
    Project,
    SourceFile,
    SyntaxKind,
} from 'ts-morph';

/**
 * 解析规则：
    inject.json中：
    1. 值为数组，表示直接向路径插入代码
    2. 值为对象 & json 文件，向其中插入对应的字段
    3. 值为对象 & js 文件，解析js并插入代码
 */
export function resolveInject(injectJsonPath: string) {
    if (!injectJsonPath) return;

    const config = fsExtra.readJsonSync(injectJsonPath);

    const injectJson = config.json;
    const write = config.write;
    const injectJs = config.js;

    return { injectJson, write, injectJs };
}

type InjectJSON = Array<{
    path: string
    inject: Array<Record<string, Array<string>>>
}>;
export function processJson(injectJson: InjectJSON, root: string) {
    for (const key in injectJson) {
        if (Object.prototype.hasOwnProperty.call(injectJson, key)) {
            const { path, inject } = injectJson[key];
            const targetPath = resolve(root, path);

            const originalJson = fsExtra.readJSONSync(targetPath);
            for (const jsonKey in inject) {
                if (Object.prototype.hasOwnProperty.call(inject, jsonKey)) {
                    originalJson[jsonKey] = {
                        ...originalJson[jsonKey],
                        ...inject[jsonKey],
                    };
                }
            }

            fsExtra.writeJSONSync(targetPath, originalJson, {
                spaces: 4,
            });
        }
    }
}

type InjectWrite = Array<{
    path: string
    inject: string | Array<string>
    pos: number
}>;
export function processWrite(injectWrite: InjectWrite, root: string) {
    for (const key in injectWrite) {
        if (Object.prototype.hasOwnProperty.call(injectWrite, key)) {
            const targetPath = resolve(root, injectWrite[key].path);
            fsExtra.ensureFileSync(targetPath);

            const { inject, pos } = injectWrite[key];
            if (Array.isArray(inject)) {
                let injectCode = '';
                inject.forEach((code) => {
                    injectCode += code + '\n';
                });
                writeContentAfterLine(targetPath, pos, injectCode);
            }
            else {
                writeContentAfterLine(targetPath, pos, inject);
            }
        }
    }
}

function writeContentAfterLine(
    filePath: string,
    lineNumber: number,
    content: string,
) {
    const data = fs.readFileSync(filePath, 'utf8').split(/\r\n|\n|\r/gm);
    data.splice(lineNumber, 0, content);
    fs.writeFileSync(filePath, data.join('\n'));
}

type InjectJsOption = {
    plugins: Array<string> | string
};
type InjectJs = Array<{
    path: string
    inject: InjectJsOption
}>;
export function processJs(injectJs: InjectJs, root: string) {
    for (const key in injectJs) {
        if (Object.prototype.hasOwnProperty.call(injectJs, key)) {
            const { path, inject } = injectJs[key];
            const targetPath = resolve(root, path);

            const project = new Project();
            const sourceFile = project.addSourceFileAtPath(targetPath);
            // process vite.config.ts
            if (path.includes('vite.config')) {
                processViteConfig(sourceFile, inject);
            }

            // save
            sourceFile.saveSync();
        }
    }
}

function processViteConfig(sourceFile: SourceFile, inject: InjectJsOption) {
    const defaultExport = sourceFile.getDefaultExportSymbol()!;
    const exportedExpr = (
        defaultExport.getDeclarations()[0] as CallExpression
    ).getExpression();

    if (!Node.isCallExpression(exportedExpr)) {
        throw new Error('export not a CallExpression');
    }

    const arrowFunc = exportedExpr.getArguments()[0];
    if (!Node.isArrowFunction(arrowFunc)) {
        throw new Error('defineConfig\'s first arg is not a arrow function');
    }

    const returnBlock = arrowFunc.getBody();
    if (!Node.isBlock(returnBlock)) {
        throw new Error('arrow function body is not a block');
    }

    const bodyStatements = returnBlock.getStatements();
    bodyStatements.forEach((statement) => {
        if (Node.isReturnStatement(statement)) {
            const returnStatement = statement;
            const defineConfigReturnValue = returnStatement.getExpression();
            if (!defineConfigReturnValue) {
                throw new Error('return statement has no expression');
            }

            processConfigReturnObject(defineConfigReturnValue, inject);
        }
    });
}

function processConfigReturnObject(
    defineConfigReturnValue: Expression,
    inject: InjectJsOption,
) {
    if (!Node.isObjectLiteralExpression(defineConfigReturnValue)) {
        throw new Error('vite config is not a Object');
    }

    for (const key in inject) {
        if (Object.prototype.hasOwnProperty.call(inject, key)) {
            switch (key) {
                case 'plugins':
                    let pluginsArrayExpr = defineConfigReturnValue
                        .getProperty('plugins')
                        ?.getFirstChildByKind(
                            SyntaxKind.ArrayLiteralExpression,
                        );
                    if (!pluginsArrayExpr) {
                        const newPluginsArray = defineConfigReturnValue
                            .addPropertyAssignment({
                                name: 'plugins',
                                initializer: '[]',
                            })
                            .getFirstChildByKind(
                                SyntaxKind.ArrayLiteralExpression,
                            );

                        pluginsArrayExpr = newPluginsArray!;
                    }
                    injectPlugins(inject.plugins, pluginsArrayExpr);
                    break;
                default:
                    break;
            }
        }
    }
}

function injectPlugins(
    plugins: InjectJsOption['plugins'],
    pluginsArrayExpr: ArrayLiteralExpression,
) {
    if (Array.isArray(plugins)) {
        plugins.forEach((plugin) => {
            pluginsArrayExpr.addElement(plugin);
        });
    }
    else {
        pluginsArrayExpr.addElement(plugins);
    }
}
