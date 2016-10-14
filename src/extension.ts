'use strict';
import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {

    console.log('Congratulations, your extension "kcide" is now active!');

    let previewUri = vscode.Uri.parse('kcide://test');

    class TextDocumentContentProvider implements vscode.TextDocumentContentProvider {
        public provideTextDocumentContent(uri: vscode.Uri): string {
            return `
            <!doctype html>
            <html lang="en-us">
            <body>
                <p>Hello World</p>
                <div class="emscripten_border">
                <canvas class="emscripten" id="canvas" oncontextmenu="event.preventDefault()"></canvas>
                </div>
                <script type='text/javascript'>
                var Module = {
                    preRun: [],
                    postRun: [],
                    print: (function() {
                    return function(text) {
                        console.log(text);
                    };
                    })(),
                    printErr: function(text) {
                    console.error(text);
                    },
                    canvas: (function() {
                    var canvas = document.getElementById('canvas');
                    return canvas;
                    })(),
                    setStatus: function(text) {
                    },
                    monitorRunDependencies: function(left) {
                    }
                };
                window.onerror = function(event) {
                };
                </script>
                <script type="text/javascript" src="http://floooh.github.com/virtualkc/yakcapp.js"></script>
            </body>
            </html>`
        }
    }

    let provider = new TextDocumentContentProvider();
    let registration = vscode.workspace.registerTextDocumentContentProvider('kcide', provider);

    let disposable = vscode.commands.registerCommand('extension.kcide', () => {
        return vscode.commands.executeCommand('vscode.previewHtml', previewUri, vscode.ViewColumn.Two, 'KC IDE').then((success) => {            
        }, (reason) => { 
            vscode.window.showErrorMessage(reason);
        });
    });

    context.subscriptions.push(disposable);
}

export function deactivate() {
}