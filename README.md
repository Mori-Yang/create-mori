# create-mori

<img src="./assets/logo1.5.png" />
Quickly create project templates to support the required repositories as much as possible

# usage

```bash
npx create-mori
# or
npm install create-mori -g
create-mori
```

You can do a global replace by searching for [name] and [repo]


# supported templates

## Application

| build tool | framework |    store    |     router      |             template              |
| :--------: | :-------: | :---------: | :-------------: | :-------------------------------: |
|    Vite    |   React   |    /        |        /        |                ✅                 |
|    Vite    |   React   | React Query |        /        |                ✅                 |
|    Vite    |   React   |   Zustand   |        /        |                ✅                 |
|    Vite    |   React   |    Jotai    |        /        |                ✅                 |
|    Vite    |   React   |      /      |  React Router   |                ✅                 |
|    Vite    |   React   |      /      | Tanstack Router |                ✅                 |
|    Vite    |   React   |   Zustand   |  React Router   |                ✅                 |
|    Vite    |   React   |   Zustand   | Tanstack Router |                ✅                 |
|    Vite    |   React   | React Query | Tanstack Router |                ✅                 |
|    Vite    |   React   |    Jotai    |  React Router   |                ✅                 |
|    Vite    |   React   |    Jotai    | Tanstack Router |                ✅                 |
|  Webpack   |   React   |      /      |        /        | ✅(Tailwindcss is not supported ) |

-   tailwindcss : ✅ (less is still configured and needs to be removed manually)
-   use ESLint Stylistic as Formatter


# Specified Template

```bash
npx create-mori -t <template name>
# or
npm install create-mori -g
create-mori -t <template name>
```

## VS Code Extension

`template name` : `vscode-extension`

`alias` : `ve`


## ESLint Plugin

`template name` : `eslint-plugin`

`alias` : `ep`

## Npm Package

`template name` : `npm-package`

`alias` : `pkg`

## MCP Server

`template name` : `mcp-server`

`alias` : `mcps`