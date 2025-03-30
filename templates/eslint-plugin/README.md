# [name]

ESLint Plugin Template!

Created By Mori!

You can learn relevant knowledge from [here](https://github.com/Quramy/eslint-plugin-tutorial)

## Dev Steps

1. `npm run test`
2. Run `npm link <name of package.json file>` in another project
3. config `eslint.config.mjs`
4. implement rules in the `src/rules`

```js
// eslint.config.mjs
import mori from 'eslint-plugin-mori';

export default {
    mori.configs.recommended,
    // or 
    {
        plugins: {
            mori,
        },
        rules: {
            'mori/rule-a': 'error',
        },
    },
    // or
    // Note: The key for configuring the rule consists of <registered plugin name>/<rule name>
    // 注意：配置规则的键由<注册的插件名>/<规则名>
    {
        plugins: {
            'custom-name':mori,
        },
        rules: {
            'custom-name/rule-a': 'error',
        },
    },
}
```

[AST Explorer](https://astexplorer.net/)
