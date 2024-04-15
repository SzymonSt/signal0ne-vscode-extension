import { API_URL } from "./extension";
import * as vsc from 'vscode';

const USER_API_URL = `${API_URL}/user`;
const INTEGRATION_API_URL = `${API_URL}/agent`;

export interface IssueTreeDataNode {
    label: string;
    id: string;
    description: string;
    iconPath: string;
    type: string; // allowed : ['environment', 'issue']
    parent ?: IssueTreeDataNode;
}

export class IssuesDataProvider implements vsc.TreeDataProvider<IssueTreeDataNode>, vsc.TextDocumentContentProvider {
    private _onDidChangeTreeData: vsc.EventEmitter<any> = new vsc.EventEmitter<any>();
    readonly onDidChangeTreeData: vsc.Event<any> = this._onDidChangeTreeData.event;
    private defaultRoots: IssueTreeDataNode[] = [
        {
            label: 'Local',
            id: 'environment.local',
            description: 'Local Environment',
            iconPath: 'resources/environment.svg',
            type: 'environment',
            parent: undefined
        }
    ];
    
    constructor() {}

    public getTreeItem(element: IssueTreeDataNode): vsc.TreeItem {
        if (element.type === 'environment') {
            return {
                label: element.label,
                id: element.id,
                description: element.description,
                iconPath: element.iconPath,
                collapsibleState: vsc.TreeItemCollapsibleState.Expanded,
                command: {
                        command: 'signal0ne.fetchIssues',
                        title: 'Fetch Issues',
                        arguments: [element]
                    }
            };
        }
        else if (element.type === 'issue') {
            return {
                label: element.label,
                id: element.id,
                description: element.description,
                iconPath: element.iconPath,
                collapsibleState: vsc.TreeItemCollapsibleState.None,
                command: {
                        command: 'signal0ne.getIssueDetails',
                        title: 'Get Issue Details',
                        arguments: [element]
                    }
            };
        }
        else{
            return {
                label: element.label,
                id: element.id,
                description: element.description,
                iconPath: element.iconPath,
                collapsibleState: vsc.TreeItemCollapsibleState.None,
            };
        }
    }

    public getChildren(element?: IssueTreeDataNode): IssueTreeDataNode[] {
        if (!element) {
            return this.defaultRoots;
        }else {
            if (element.type === 'environment') {
                return [
                    {
                        label: 'Issues',
                        id: 'issue.1',
                        description: 'Issues',
                        iconPath: 'resources/issues.svg',
                        type: 'issue',
                        parent: element
                    }
                ];
            }
            else {
                return [];
            }
        }
    }
    
	public getParent(element: IssueTreeDataNode): IssueTreeDataNode | undefined {
		return element.parent;
	}

    public provideTextDocumentContent(uri: vsc.Uri): string {
        return `HEllo World!`
    }
}

export class Issues{
    private isuessView: vsc.TreeView<IssueTreeDataNode>;

    constructor(context: vsc.ExtensionContext){
        const issuesViewDataProvider = new IssuesDataProvider();

        context.subscriptions.push(vsc.workspace.registerTextDocumentContentProvider('login', issuesViewDataProvider));
        
        this.isuessView = vsc.window.createTreeView('signal0neIssue', {treeDataProvider: issuesViewDataProvider, showCollapseAll: true});

        // vsc.commands.registerCommand('', async (node: IssueTreeDataNode) => {
            
        // });
    }


}