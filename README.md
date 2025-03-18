# create-mori

<img src="./assets/logo1.5.png" />
Quickly create project templates to support the required repositories as much as possible

# usage

```bash
npm create mori
# or
npm install create-mori -g
create-mori
```

# supported templates

## Application

| build tool | framework |  store  |     router      |             template             |
| :--------: | :-------: | :-----: | :-------------: | :------------------------------: |
|    Vite    |   React   |    /    |        /        |                ✅                 |
|    Vite    |   React   | Zustand |        /        |                ✅                 |
|    Vite    |   React   |  Jotai  |        /        |                ✅                 |
|    Vite    |   React   |    /    |  React Router   |                ✅                 |
|    Vite    |   React   |    /    | Tanstack Router |                ✅                 |
|    Vite    |   React   | Zustand |  React Router   |                ✅                 |
|    Vite    |   React   | Zustand | Tanstack Router |                ✅                 |
|    Vite    |   React   |  Jotai  |  React Router   |                ✅                 |
|    Vite    |   React   |  Jotai  | Tanstack Router |                ✅                 |
|  Webpack   |   React   |    /    |        /        | ✅(Tailwindcss is not supported ) |

-   tailwindcss : ✅ (less is still configured and needs to be removed manually)
-   use ESLint Stylistic as Formatter

## VS Code Extension

```bash
npm create mori -- -t vscode-extension
# or
npm install create-mori -g
create-mori -t vscode-extension
```
