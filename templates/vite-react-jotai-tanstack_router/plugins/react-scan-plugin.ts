import type { ConfigEnv, Plugin } from 'vite';

const reactScanPlugin = (mode: ConfigEnv['mode']): Plugin => {
    return {
        name: 'react-scan-plugin',
        transformIndexHtml: (html) => {
            if (mode === 'development') {
                return html.replace(
                    '<!--react-scan-->',
                    '<script src=\'https://unpkg.com/react-scan/dist/auto.global.js\'></script>',
                );
            }
            return html;
        },
    };
};

export default reactScanPlugin;
