import * as vscode from 'vscode';
import { API_URL } from '../data/const';
import {
  CodeAsContextResponseBody,
  CodeContext,
  Issue,
  IssueTreeDataNode,
  IssuesResponseBody
} from '../types/issue';
import { Signal0neProvider } from '../auth/signal0ne.provider';

const DEFAULT_ROOTS_ISSUES: IssueTreeDataNode[] = [
  {
    description: 'Local Environment',
    iconPath: 'resources/environment.svg',
    id: 'environment.local',
    label: 'Local',
    parent: undefined,
    type: 'environment'
  }
];
const INTEGRATION_API_URL = `${API_URL}/integration`;
const USER_API_URL = `${API_URL}/user`;
let focusedIssue: IssueTreeDataNode;

export class IssuesDataProvider
  implements vscode.TreeDataProvider<IssueTreeDataNode>
{
  private defaultRoots = DEFAULT_ROOTS_ISSUES;
  private _onDidChangeTreeData: vscode.EventEmitter<any> =
    new vscode.EventEmitter<any>();
  readonly onDidChangeTreeData: vscode.Event<any> =
    this._onDidChangeTreeData.event;

  constructor(private signal0neProvider: Signal0neProvider) {}

  public async getChildren(
    element?: IssueTreeDataNode
  ): Promise<IssueTreeDataNode[] | undefined> {
    if (!element) return this.defaultRoots;

    const sessions = await this.signal0neProvider.getSessions();

    if (element.type === 'environment' && sessions.length) {
      console.log('SESSIONS:', sessions);
      const options = {
        headers: {
          Authorization: `Bearer ${sessions[0].accessToken}`,
          'Content-Type': 'application/json'
        },
        method: 'GET'
      };

      const res = await fetch(`${USER_API_URL}/issues`, options);
      const resData = (await res.json()) as IssuesResponseBody;

      if (res.ok) {
        const { issues } = resData;

        if (issues.length) {
          return issues.map(issue => ({
            description: issue.title,
            iconPath: 'resources/issues.svg',
            id: issue.id,
            label: issue.title,
            parent: element,
            type: 'issue'
          }));
        } else {
          return [
            {
              description: '',
              iconPath: '',
              id: 'issues-list-empty',
              label: 'No issues available',
              parent: element,
              type: 'empty'
            }
          ];
        }
      } else {
        return [];
      }
    } else {
      return [];
    }
  }

  public getParent(element: IssueTreeDataNode): IssueTreeDataNode | undefined {
    return element.parent;
  }

  public getTreeItem(element: IssueTreeDataNode): vscode.TreeItem {
    const commonTreeItemProps = {
      description: element.description,
      iconPath: element.iconPath,
      id: element.id,
      label: element.label
    };

    switch (element.type) {
      case 'empty':
        return {
          ...commonTreeItemProps,
          collapsibleState: vscode.TreeItemCollapsibleState.None
        };
      case 'environment':
        return {
          ...commonTreeItemProps,
          collapsibleState: vscode.TreeItemCollapsibleState.Expanded
        };
      case 'issue':
        return {
          ...commonTreeItemProps,
          collapsibleState: vscode.TreeItemCollapsibleState.None,
          command: {
            arguments: [element],
            command: 'signal0ne.issueFocus',
            title: 'Focus Issue'
          },
          contextValue: 'issue'
        };
      default:
        return {
          ...commonTreeItemProps,
          collapsibleState: vscode.TreeItemCollapsibleState.None
        };
    }
  }

  public refresh(): void {
    this._onDidChangeTreeData.fire(undefined);
  }
}

export class Issues {
  private signal0neProvider: Signal0neProvider;
  public issuesViewDataProvider: IssuesDataProvider;

  constructor(
    _context: vscode.ExtensionContext,
    signal0neProvider: Signal0neProvider
  ) {
    this.issuesViewDataProvider = new IssuesDataProvider(signal0neProvider);
    this.signal0neProvider = signal0neProvider;

    vscode.commands.registerCommand(
      'signal0ne.issueFocus',
      async (node: IssueTreeDataNode) => {
        if (node.type === 'issue') {
          focusedIssue = node;
          const focusedIssueDetails = await this.getIssueDetails(focusedIssue);
        }
      }
    );

    vscode.window.createTreeView('signal0neIssue', {
      showCollapseAll: true,
      treeDataProvider: this.issuesViewDataProvider
    });
  }

  public async fixCode(codeContext: CodeContext): Promise<string> {
    const sessions = await this.signal0neProvider.getSessions();

    const options = {
      body: JSON.stringify(codeContext),
      headers: {
        Authorization: `Bearer ${sessions[0]?.accessToken}`,
        'Content-Type': 'application/json'
      },
      method: 'POST'
    };

    const res = await fetch(
      `${INTEGRATION_API_URL}/issues/${focusedIssue.id}/add-code-as-context`,
      options
    );
    const resBody = (await res.json()) as CodeAsContextResponseBody;

    if (res.ok) return resBody.newCode;

    return '';
  }

  public async getIssueDetails(issue: IssueTreeDataNode): Promise<Issue> {
    const sessions = await this.signal0neProvider.getSessions();

    const options = {
      headers: {
        Authorization: `Bearer ${sessions[0].accessToken}`,
        'Content-Type': 'application/json'
      },
      method: 'GET'
    };

    const res = await fetch(`${USER_API_URL}/issues/${issue.id}`, options);
    const resBody = (await res.json()) as Issue;

    if (res.ok) {
      return resBody;
    }

    return {} as Issue;
  }
}
