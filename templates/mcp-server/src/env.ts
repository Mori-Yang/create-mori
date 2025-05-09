export interface EnvironmentVariables {
    ENV_VARIABLE_NAME: string | undefined;
}

/**
 * TODO: get environment variables from "env" field in mcp.json. You can also add some logic for environment variables
 * e.g.
 *  if(!process.env.apikey){
 *      console.error('without apikey');
 *      process.exit(1);
 *  }
 */
export function getEnvironmentVariables(): EnvironmentVariables {
    return {
        ENV_VARIABLE_NAME: process.env.ENV_VARIABLE_NAME
    };
}