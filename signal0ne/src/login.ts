import * as vsc from 'vscode';
import { basename, dirname, join } from 'path';
import {getPort} from 'get-port-please';

export interface LoginDataNode {
    label: string;
    id: string;
    description: string;
    iconPath: string;
    parent ?: LoginDataNode;
}

export class LoginDataProvider implements vsc.TreeDataProvider<LoginDataNode>, vsc.TextDocumentContentProvider {
    private _onDidChangeTreeData: vsc.EventEmitter<any> = new vsc.EventEmitter<any>();
    readonly onDidChangeTreeData: vsc.Event<any> = this._onDidChangeTreeData.event;
    
    constructor() {}

    public getTreeItem(element: LoginDataNode): vsc.TreeItem {
        return {
            label: element.label,
            id: element.id,
            description: element.description,
            iconPath: element.iconPath,
            collapsibleState: vsc.TreeItemCollapsibleState.None,
            command: {
                    command: 'signal0ne.login',
                    title: 'Login',
                    arguments: [element]
                }
        };
    }

    public getChildren(element?: LoginDataNode): LoginDataNode[] {
        if (!element) {
            return [
                {label: 'Login To Signal0ne', id: 'login', description: 'Login to Signal0ne', iconPath: join(__dirname, '..', 'resources', 'signal_img_logo.svg')}
            ];
        }
        return [];
    }
    
	public getParent(element: LoginDataNode): LoginDataNode | undefined {
		return element.parent;
	}

    public provideTextDocumentContent(uri: vsc.Uri): string {
        return `HEllo World!`
    }
}

export class Login{
    private loginView: vsc.TreeView<LoginDataNode>;

    constructor(context: vsc.ExtensionContext){
        const loginDataProvider = new LoginDataProvider();

        context.subscriptions.push(vsc.workspace.registerTextDocumentContentProvider('login', loginDataProvider));
        
        this.loginView = vsc.window.createTreeView('signal0ne', {treeDataProvider: loginDataProvider, showCollapseAll: true});

        vsc.commands.registerCommand('signal0ne.login', async (node: LoginDataNode) => {
            const port = await getPort();
            const uri = vsc.Uri.parse(`http://localhost:8088?callbackUrl=http://localhost:${port}`);
            vsc.env.openExternal(uri);
            let token = await this.login(port);
            console.log('token', token);
        });
    }

    async login(port: any): Promise<string> {

        const token = await new Promise<string>(async (resolve, reject) => {
            var server = require('http').createServer(async (req: any, res: any) => {
              const requestToken = new URL(req.url, 'http://localhost').searchParams.get('token');
              if(requestToken){
                resolve(requestToken);
                res.end('Login successful! You can now close this tab.');
                server.close();
              }
            }).listen(port);
          });
        return token;
    }
}