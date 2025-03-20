import { defineBuildConfig } from 'unbuild';

export default defineBuildConfig({
    entries: [
        'src/index',
        'src/rules',
    ],
    declaration: 'node16',
    clean: true,
});
