# [name]

MCP Server Template!

Created By Mori!

## Dev Steps

1. Run `pnpm i`
2. Update `package.json`
3. If your mcp server need environment variable, you should add them in `./src/env.ts`
4. All tools are managed in the tools folder (definitions and handlers)

## Usage

Node

```json
{
  "mcpServers": {
    "mori-mcp": {
      "command": "node",
      "args": [
        "./build/index.js"
      ],
      "env": {
        "ENV_VARIABLE_NAME": "mori"
      }
    }
  }
}
```

NPX

Need to link project to local repository or publish the project
```json
{
  "mcpServers": {
    "mori-mcp": {
      "command": "npx",
      "args": [
        "@mori/mcp-server"
      ],
      "env": {
        "ENV_VARIABLE_NAME": "mori"
      }
    }
  }
}
```
