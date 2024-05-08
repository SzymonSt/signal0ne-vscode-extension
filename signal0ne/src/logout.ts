import * as vsc from 'vscode';
import { join } from 'path';
import { Signal0neProvider } from './auth/signal0ne.provider';

export interface LogoutDataNode {
    label: string;
    id: string;
    description: string;
    iconPath: string;
    parent ?: LogoutDataNode;
}

export class LogoutDataProvider implements vsc.TreeDataProvider<LogoutDataNode>, vsc.TextDocumentContentProvider {
    private _onDidChangeTreeData: vsc.EventEmitter<any> = new vsc.EventEmitter<any>();
    readonly onDidChangeTreeData: vsc.Event<any> = this._onDidChangeTreeData.event;
    
    constructor() {}

    public getTreeItem(element: LogoutDataNode): vsc.TreeItem {
        
        return {
            label: element.label,
            id: element.id,
            description: element.description,
            iconPath: element.iconPath,
            collapsibleState: vsc.TreeItemCollapsibleState.None,
            command: {
                    command: 'signal0ne.Logout',
                    title: 'Logout',
                    arguments: [element]
                }
        };
    }

    public getChildren(element?: LogoutDataNode): LogoutDataNode[] {
        console.log('TEST', element)
        if (!element) {
            return [
                {label: 'Logout', id: 'Logout', description: 'Logout', iconPath: join(__dirname, '..', 'resources', 'signal_img_logo.svg')}
            ];
        }
        return [];
    }
    
	public getParent(element: LogoutDataNode): LogoutDataNode | undefined {
		return element.parent;
	}

    public provideTextDocumentContent(uri: vsc.Uri): string {
        return `HEllo World!`
    }
}

export class Logout{
    private LogoutView: vsc.TreeView<LogoutDataNode>;

    constructor(context: vsc.ExtensionContext, signal0neProvider: Signal0neProvider){
        const logoutDataProvider = new LogoutDataProvider();

        context.subscriptions.push(vsc.workspace.registerTextDocumentContentProvider('Logout', logoutDataProvider));
        
        this.LogoutView = vsc.window.createTreeView('signal0ne', {treeDataProvider: logoutDataProvider, showCollapseAll: true});

        vsc.commands.registerCommand('signal0ne.Logout', async (node: LogoutDataNode) => {
            signal0neProvider.logout();
        });
    }


}