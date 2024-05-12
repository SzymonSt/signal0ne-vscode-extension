import * as vscode from 'vscode';
import { AuthDataNode } from '../types/auth';
import { join } from 'path';
import { Signal0neProvider } from '../auth/signal0ne.provider';

export class LoginDataProvider
  implements vscode.TreeDataProvider<AuthDataNode>
{
  private _onDidChangeTreeData: vscode.EventEmitter<any> =
    new vscode.EventEmitter<any>();
  readonly onDidChangeTreeData: vscode.Event<any> =
    this._onDidChangeTreeData.event;

  public getChildren(element?: AuthDataNode): AuthDataNode[] {
    if (!element) {
      return [
        {
          description: 'Login to Signal0ne account',
          iconPath: join(
            __dirname,
            '..',
            '..',
            'resources',
            'signal_img_logo.svg'
          ),
          id: 'login',
          label: 'Login To Signal0ne'
        }
      ];
    }

    return [];
  }

  public getParent(element: AuthDataNode): AuthDataNode | undefined {
    return element.parent;
  }

  public getTreeItem(element: AuthDataNode): vscode.TreeItem {
    return {
      collapsibleState: vscode.TreeItemCollapsibleState.None,
      command: {
        command: 'signal0ne.login',
        title: 'Login'
      },
      description: element.description,
      iconPath: element.iconPath,
      id: element.id,
      label: element.label
    };
  }
}

export class Login {
  constructor(
    _context: vscode.ExtensionContext,
    signal0neProvider: Signal0neProvider
  ) {
    const loginDataProvider = new LoginDataProvider();

    vscode.commands.registerCommand('signal0ne.login', async () =>
      signal0neProvider.loginInitialSession()
    );

    vscode.window.createTreeView('signal0ne', {
      treeDataProvider: loginDataProvider
    });
  }
}
