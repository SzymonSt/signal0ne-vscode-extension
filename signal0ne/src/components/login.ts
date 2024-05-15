import * as vscode from 'vscode';
import { AuthDataNode } from '../types/auth';
import { join } from 'path';
import { Signal0neProvider } from '../auth/signal0ne.provider';

export class LoginDataProvider
  implements vscode.TreeDataProvider<AuthDataNode>
{
  private _onDidChangeTreeData: vscode.EventEmitter<AuthDataNode | undefined> =
    new vscode.EventEmitter<AuthDataNode | undefined>();
  readonly onDidChangeTreeData: vscode.Event<AuthDataNode | undefined> =
    this._onDidChangeTreeData.event;

  private showItems: boolean = false;

  private items: AuthDataNode[] = [
    {
      description: 'Logout from Signal0ne account',
      iconPath: join(__dirname, '..', '..', 'resources', 'signal_img_logo.svg'),
      id: 'logout',
      label: 'Logout'
    }
  ];

  public setShowItems(value: boolean) {
    this.showItems = value;
    this.refresh();
  }

  public getChildren(_element?: AuthDataNode): AuthDataNode[] {
    if (!this.showItems) return [];

    return this.items;
  }

  public getParent(element: AuthDataNode): AuthDataNode | undefined {
    return element.parent;
  }

  public getTreeItem(element: AuthDataNode): vscode.TreeItem {
    return {
      collapsibleState: vscode.TreeItemCollapsibleState.None,
      command: {
        command: 'signal0ne.logout',
        title: 'Logout'
      },
      description: element.description,
      iconPath: element.iconPath,
      id: element.id,
      label: element.label
    };
  }

  public refresh() {
    this._onDidChangeTreeData.fire(undefined);
  }
}

export class Login {
  public loginDataProvider;

  constructor(
    _context: vscode.ExtensionContext,
    signal0neProvider: Signal0neProvider
  ) {
    this.loginDataProvider = new LoginDataProvider();

    vscode.commands.registerCommand('signal0ne.login', async () =>
      signal0neProvider.loginInitialSession()
    );

    vscode.commands.registerCommand('signal0ne.logout', () =>
      signal0neProvider.logout()
    );

    vscode.window.createTreeView('signal0ne', {
      treeDataProvider: this.loginDataProvider
    });
  }
}
