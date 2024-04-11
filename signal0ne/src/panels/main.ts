import * as vsc from 'vscode';

function getUri(webview: vsc.Webview, extensionUri: vsc.Uri, pathList: string[]) {
    return webview.asWebviewUri(vsc.Uri.joinPath(extensionUri, ...pathList));
}

function getNonce() {
    let text = "";
    const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (let i = 0; i < 32; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  }

export class MainProvider implements vsc.WebviewViewProvider {

    public static readonly viewType = 'signal0ne';

    private _view?: vsc.WebviewView;

    constructor(
      private readonly _extensionUri: vsc.Uri,
    ) { }

    public resolveWebviewView(
      webviewView: vsc.WebviewView,
      context: vsc.WebviewViewResolveContext,
      _token: vsc.CancellationToken,
    ) {
      this._view = webviewView;
  
      webviewView.webview.options = {
        // Allow scripts in the webview
        enableScripts: true,
  
        localResourceRoots: [
          this._extensionUri
        ]
      };
  
      webviewView.webview.html = this._getWebviewContent(webviewView.webview, this._extensionUri);
      console.log('webviewView.webview.html', webviewView.webview.html);
  
      webviewView.webview.onDidReceiveMessage(data => {
        switch (data.type) {
          case 'colorSelected':
            {
              vsc.window.activeTextEditor?.insertSnippet(new vsc.SnippetString(`#${data.value}`));
              break;
            }
        }
      });
    }

    private _getWebviewContent(webview: vsc.Webview, extensionUri: vsc.Uri) {

        const stylesUri = getUri(webview, extensionUri, ["ui", "dist", "styles.832b436bf4079dde.css"]);
        // The JS files from the Angular dist output
        const runtimeUri = getUri(webview, extensionUri, ["ui", "dist", "runtime.adb016b72eeb62ea.js"]);
        const polyfillsUri = getUri(webview, extensionUri, ["ui", "dist", "polyfills.77d0a540d5c8cf7d.js"]);
        const scriptUri = getUri(webview, extensionUri, ["ui", "dist", "main.6fdead5a2a0a47af.js"]);
    
        const nonce = getNonce();
    
        // Tip: Install the es6-string-html VS Code extension to enable code highlighting below
        return /*html*/ `
          <!DOCTYPE html>
          <html lang="en">
            <head>
              <meta charset="UTF-8" />
              <meta name="viewport" content="width=device-width, initial-scale=1.0" />
              <meta http-equiv="Content-Security-Policy" content="default-src 'none'; style-src ${webview.cspSource}; script-src 'nonce-${nonce}';">
              <link rel="stylesheet" type="text/css" href="${stylesUri}">
              <title>Hello World</title>
            </head>
            <body>
              <app-root></app-root>
              <script type="module" nonce="${nonce}" src="${runtimeUri}"></script>
              <script type="module" nonce="${nonce}" src="${polyfillsUri}"></script>
              <script type="module" nonce="${nonce}" src="${scriptUri}"></script>
            </body>
          </html>
        `;
    }
}