import { defineConfig } from 'tsup';

export default defineConfig({
    entry: [
        'src/index.ts',
    ],
    outDir: 'lib',
    format: ['cjs'],
    shims: true,
    dts: false,
});
