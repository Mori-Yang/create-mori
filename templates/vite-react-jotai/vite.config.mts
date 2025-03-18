import react from '@vitejs/plugin-react';
import { ConfigEnv, defineConfig } from 'vite';
import reactScanPlugin from './plugins/react-scan-plugin';

export default defineConfig((configEnv: ConfigEnv) => {
    return {
        plugins: [react(), reactScanPlugin(configEnv.mode)],
    };
});
