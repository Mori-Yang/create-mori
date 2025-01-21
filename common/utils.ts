import { readdirSync } from "fs";

export const isEmptyDir = (path: string): boolean => {
    try {
        const files = readdirSync(path);
        return files.length === 0;
    } catch (error) {
        return false;
    }
};
