import { defineBuildConfig } from 'unbuild';

export default defineBuildConfig({
    entries: [
        {
            input: 'src/index',
            name: 'index',
        },
    ],
    outDir: 'build',
    declaration: false,
    clean: true,
});
