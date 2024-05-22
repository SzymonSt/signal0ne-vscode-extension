import * as vscode from 'vscode';
import { AuthTreeView } from './components/authTreeView';
import { issueDetailsSidePanel } from './components/issueDetailsView';
import { IssuesTreeView } from './components/issuesTreeView';
import { Signal0neProvider } from './auth/signal0ne.provider';

const ISSUES_LIST_REFRESH_INTERVAL = 1000 * 15; // In milliseconds
const TOKEN_REFRESH_INTERVAL = 1000 * 10; // In milliseconds

export async function activate(context: vscode.ExtensionContext) {
  const signal0neProvider = new Signal0neProvider(context);
  let authTreeView: AuthTreeView = new AuthTreeView(context, signal0neProvider);
  let issuesTreeView: IssuesTreeView | null;
  let refreshIssuesInterval: NodeJS.Timeout;

  const sessionHandler = async () => {
    const sessions = await signal0neProvider.getSessions();

    if (sessions.length > 0 && sessions[0]) {
      const refreshToken = await signal0neProvider.getAndValidateRefreshToken();

      if (!refreshToken) return;

      const isAccessTokenValid = await signal0neProvider.validateAccessToken(
        sessions[0]
      );

      if (!isAccessTokenValid) {
        await signal0neProvider.refreshSession(sessions[0]);

        await vscode.commands.executeCommand(
          'setContext',
          'showIssuesView',
          true
        );
        await vscode.commands.executeCommand(
          'setContext',
          'showWelcomeView',
          false
        );

        return;
      }

      signal0neProvider.setTokenPair({
        accessToken: sessions[0].accessToken,
        refreshToken
      });

      await vscode.commands.executeCommand(
        'setContext',
        'showIssuesView',
        true
      );
      await vscode.commands.executeCommand(
        'setContext',
        'showWelcomeView',
        false
      );

      signal0neProvider.createSession([]);
    } else {
      teardownExtension();
    }
  };

  const teardownExtension = async () => {
    await vscode.commands.executeCommand('setContext', 'showIssuesView', false);
    await vscode.commands.executeCommand('setContext', 'showWelcomeView', true);

    authTreeView.authTreeViewRef.title = 'Signal0ne';
    authTreeView.setShowAccountTreeItems(false);
    issuesTreeView = null;

    if (issueDetailsSidePanel) {
      issueDetailsSidePanel.dispose();
    }

    clearInterval(refreshIssuesInterval);
  };

  sessionHandler();

  context.subscriptions.push(signal0neProvider);

  setInterval(async () => {
    sessionHandler();
  }, TOKEN_REFRESH_INTERVAL);

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

      refreshIssuesInterval = setInterval(async () => {
        const sessions = await signal0neProvider.getSessions();

        if (sessions.length > 0) {
          issuesTreeView?.refresh();
        }
      }, ISSUES_LIST_REFRESH_INTERVAL);
    }
  });

  signal0neProvider.onDidLogout(async () => {
    teardownExtension();
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

export function deactivate() {
  // if (issueDetailsSidePanel) {
  //   issueDetailsSidePanel.dispose();
  // }
}
