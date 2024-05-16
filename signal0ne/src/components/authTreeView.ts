import * as vscode from 'vscode';
import { join } from 'path';
import { Signal0neProvider } from '../auth/signal0ne.provider';

export class AuthTreeDataProvider
  implements vscode.TreeDataProvider<vscode.TreeItem>
{
  private _onDidChangeTreeData: vscode.EventEmitter<
    vscode.TreeItem | undefined
  > = new vscode.EventEmitter();
  readonly onDidChangeTreeData: vscode.Event<vscode.TreeItem | undefined> =
    this._onDidChangeTreeData.event;

  private showAccountTreeItems = false;

  private items: vscode.TreeItem[] = [
    {
      collapsibleState: vscode.TreeItemCollapsibleState.None,
      command: {
        command: 'signal0ne.logout',
        title: 'Logout'
      },
      description: 'Logout from Signal0ne account',
      iconPath: join(__dirname, '..', '..', 'resources', 'signal_img_logo.svg'),
      id: 'logout',
      label: 'Logout'
    }
  ];

  public getChildren(_element?: vscode.TreeItem) {
    if (!this.showAccountTreeItems) return [];

    return this.items;
  }

  public getTreeItem(element: vscode.TreeItem) {
    return element;
  }

  public refresh() {
    this._onDidChangeTreeData.fire(undefined);
  }

  public setShowAccountTreeItems(value: boolean) {
    this.showAccountTreeItems = value;
    this.refresh();
  }
}

export class AuthTreeView {
  private authTreeDataProvider;
  public authTreeViewRef: vscode.TreeView<vscode.TreeItem>;

  constructor(
    _context: vscode.ExtensionContext,
    signal0neProvider: Signal0neProvider
  ) {
    this.authTreeDataProvider = new AuthTreeDataProvider();

    vscode.commands.registerCommand('signal0ne.login', () => {
      signal0neProvider.loginInitialSession();
    });

    vscode.commands.registerCommand('signal0ne.logout', () =>
      signal0neProvider.logout()
    );

    this.authTreeViewRef = vscode.window.createTreeView('signal0ne', {
      treeDataProvider: this.authTreeDataProvider
    });
  }

  public setShowAccountTreeItems(value: boolean) {
    this.authTreeDataProvider.setShowAccountTreeItems(value);
  }
}
