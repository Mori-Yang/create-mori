import { defineExtension, useCommand } from 'reactive-vscode';
import { window } from 'vscode';

// See https://kermanx.com/reactive-vscode/guide/
// for the doc about the reactive-vscode
const { activate, deactivate } = defineExtension(() => {
    useCommand('mori.hello', () => {
        window.showInformationMessage('Hello Mori');
    });
});

export { activate, deactivate };
