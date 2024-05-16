import * as vscode from 'vscode';
import { AuthTreeView } from './components/authTreeView';
import { IssuesTreeView } from './components/issuesTreeView';
import { jwtDecode } from 'jwt-decode';
import { Signal0neProvider } from './auth/signal0ne.provider';

const ISSUES_LIST_REFRESH_INTERVAL = 1000 * 15;
const TOKEN_REFRESH_INTERVAL = 1000 * 60;
const TOKEN_REFRESH_TIMEOUT_THRESHOLD = 1000 * 60 * 3;

export async function activate(context: vscode.ExtensionContext) {
  const signal0neProvider = new Signal0neProvider(context);
  let authTreeView: AuthTreeView;
  let issuesTreeView: IssuesTreeView | null;
  let refreshIssuesInterval: NodeJS.Timeout;

  await vscode.commands.executeCommand('setContext', 'showWelcomeView', true);

  context.subscriptions.push(signal0neProvider);

  setInterval(async () => {
    const sessions = await signal0neProvider.getSessions();

    if (sessions.length > 0) {
      const session = sessions[0];
      const currentToken = session.accessToken;
      const decodedToken = jwtDecode(currentToken);

      const tokenExpiration = decodedToken.exp || 0;
      const currentTime = Math.floor(Date.now() / 1000);
      const tokenTimeout = tokenExpiration - currentTime;

      if (tokenTimeout < TOKEN_REFRESH_TIMEOUT_THRESHOLD) {
        await signal0neProvider.refreshSession(session);
      }
    }
  }, TOKEN_REFRESH_INTERVAL);

  authTreeView = new AuthTreeView(context, signal0neProvider);

  signal0neProvider.onDidAuthenticate(async () => {
    await vscode.commands.executeCommand('setContext', 'showIssuesView', true);
    await vscode.commands.executeCommand(
      'setContext',
      'showWelcomeView',
      false
    );

    authTreeView.authTreeViewRef.title = 'Account';
    authTreeView.setShowAccountTreeItems(true);

    if (!issuesTreeView) {
      issuesTreeView = new IssuesTreeView(context, signal0neProvider);

      refreshIssuesInterval = setInterval(() => {
        issuesTreeView?.refresh();
      }, ISSUES_LIST_REFRESH_INTERVAL);
    }
  });

  signal0neProvider.onDidLogout(async () => {
    await vscode.commands.executeCommand('setContext', 'showIssuesView', false);
    await vscode.commands.executeCommand('setContext', 'showWelcomeView', true);

    authTreeView.authTreeViewRef.title = 'Signal0ne';
    authTreeView.setShowAccountTreeItems(false);
    issuesTreeView = null;

    clearInterval(refreshIssuesInterval);
  });

  vscode.commands.registerCommand('signal0ne.fixCode', async () => {
    const editor = vscode.window.activeTextEditor;

    if (!editor) return;

    const { document, edit, selection } = editor;
    const code = document.getText(selection);
    const lang = document.languageId;

    const codeSnippetContext = {
      code,
      lang
    };

    if (!issuesTreeView) {
      vscode.window.showErrorMessage('Please login to Signal0ne first');
      return;
    }

    const newCode = await issuesTreeView.fixCode(codeSnippetContext);

    if (newCode === '') {
      vscode.window.showErrorMessage(
        'Failed to fix the selected code. Please try again with different code snippet.'
      );
      return;
    }

    edit(editBuilder =>
      editBuilder.replace(
        selection ?? new vscode.Selection(0, 0, 0, 0),
        newCode
      )
    );
  });
}

export function deactivate() {}
