import * as vscode from 'vscode';
import { AuthDataNode } from '../types/auth';
import { join } from 'path';
import { Signal0neProvider } from '../auth/signal0ne.provider';

export class LogoutDataProvider
  implements vscode.TreeDataProvider<AuthDataNode>
{
  private _onDidChangeTreeData: vscode.EventEmitter<any> =
    new vscode.EventEmitter<any>();
  readonly onDidChangeTreeData: vscode.Event<any> =
    this._onDidChangeTreeData.event;

  private items: AuthDataNode[] = [
    {
      description: 'Logout from Signal0ne account',
      iconPath: join(__dirname, '..', '..', 'resources', 'signal_img_logo.svg'),
      id: 'logout',
      label: 'Logout'
    }
  ];

  public getChildren(element?: AuthDataNode): Thenable<AuthDataNode[]> {
    if (element) {
      return Promise.resolve(element.children);
    } else {
      return Promise.resolve(this.items);
    }
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
}

export class Logout {
  constructor(
    _context: vscode.ExtensionContext,
    signal0neProvider: Signal0neProvider
  ) {
    const logoutDataProvider = new LogoutDataProvider();

    vscode.commands.registerCommand('signal0ne.logout', () =>
      signal0neProvider.logout()
    );

    vscode.window.createTreeView('signal0neAccount', {
      treeDataProvider: logoutDataProvider
    });
  }
}
