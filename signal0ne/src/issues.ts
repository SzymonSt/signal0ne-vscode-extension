import { Signal0neProvider } from "./auth/signal0ne.provider";
import { API_URL } from "./const";
import * as vsc from 'vscode';
import { Issue } from "./models/issue";
import { AdvancedFilter } from "./models/filtering_config";

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

var focusedIssue: IssueTreeDataNode;

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
    
    constructor(private signal0neProvider: Signal0neProvider ) {}

    public refresh(): void {
        this._onDidChangeTreeData.fire(undefined);
    }

    public getTreeItem(element: IssueTreeDataNode): vsc.TreeItem {
        if (element.type === 'environment') {
            return {
                label: element.label,
                id: element.id,
                description: element.description,
                iconPath: element.iconPath,
                collapsibleState: vsc.TreeItemCollapsibleState.Expanded,
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

    public async getChildren(element?: IssueTreeDataNode): Promise<IssueTreeDataNode[] | undefined> {
        if (!element) {
            return this.defaultRoots;
        }else {
            if (element.type === 'environment') {
                var sessions = await this.signal0neProvider.getSessions();
                console.log("SESSIONS:",sessions);
                const response = await fetch(`${USER_API_URL}/issues`, {
                    method: 'GET',
                    headers: {
                      'Content-Type': 'application/json',
                      'Authorization': `Bearer ${sessions[0].accessToken}`
                    },
                  });
                var responseBody: any = await response.json();
                console.log("FETCH ISSUES RESPONSE:",response.status);
                if(response.ok){
                    const issues: any = responseBody.issues;
                    return issues.map((issue: any) => {
                        return {
                            label: issue.title,
                            id: issue.id,
                            description: issue.title,
                            iconPath: 'resources/issues.svg',
                            type: 'issue',
                            parent: element
                        }
                    })
                }
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
    private IssuesList: IssueTreeDataNode[] = [];
    private signal0neProvider: Signal0neProvider;
    public IssuesViewDataProvider: IssuesDataProvider;

    constructor(context: vsc.ExtensionContext, signal0neProvider: Signal0neProvider){
        this.IssuesViewDataProvider = new IssuesDataProvider(signal0neProvider);
        this.signal0neProvider = signal0neProvider;

        context.subscriptions.push(vsc.workspace.registerTextDocumentContentProvider('login', this.IssuesViewDataProvider));
        
        this.isuessView = vsc.window.createTreeView('signal0neIssue', {treeDataProvider: this.IssuesViewDataProvider, showCollapseAll: true});
    
        vsc.commands.registerCommand('signal0ne.issueFocus', async (node: IssueTreeDataNode) => {
            focusedIssue = node;
            const focusedIssueDetails = await this.getIssueDetails(focusedIssue);
        });
    }

    public async fixCode(codeContext: any): Promise<string>{
        var sessions = await this.signal0neProvider.getSessions();
        const response = await fetch(`${USER_API_URL}/issues/${focusedIssue.id}/add-code-as-context`, {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                      'Authorization': `Bearer ${sessions[0].accessToken}`
                    },
                    body: JSON.stringify(codeContext)
                  });
        var responseBody: any = await response.json();
        console.log("RESPONSE:",response.status);
        if(response.ok){
            return responseBody.newCode;
        }
        return "";
    }

    public async getIssueDetails(issue: IssueTreeDataNode): Promise<Issue>{
        var sessions = await this.signal0neProvider.getSessions();
        const response = await fetch(`${USER_API_URL}/issues/${issue.id}`, {
                    method: 'GET',
                    headers: {
                      'Content-Type': 'application/json',
                      'Authorization': `Bearer ${sessions[0].accessToken}`
                    },
                  });
        var responseBody: any = await response.json();
        if(response.ok){
            return responseBody as Issue;
        }
        return {} as Issue;
    }

}