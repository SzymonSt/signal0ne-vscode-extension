// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import axios from 'axios';
import { Login } from './login';
import { Signal0neProvider } from './auth/signal0ne.provider';
import { jwtDecode } from "jwt-decode";
import { Issues } from './issues';
import { Logout } from './logout';

const TOKEN_REFRESH_INTERVAL = 1000 * 60;
const ISSUES_LIST_REFRESH_INTERVAL = 1000 * 15;
const TOKEN_REFRESH_TIMEOUT_THRESHOLD = 1000 * 60 * 3;

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
    const signal0neProvider = new Signal0neProvider(context);
    var issueController!: Issues;
    var refreshIssuesInterval: NodeJS.Timeout;
    context.subscriptions.push(
        signal0neProvider,
    )

    setInterval(async () => {
        const sessions = await signal0neProvider.getSessions();
        if (sessions.length > 0) {
            const session = sessions[0];
            var currentToken = session.accessToken;
            var decodedToken = jwtDecode(currentToken);
            var tokenExpiration = decodedToken.exp ? decodedToken.exp : 0;
            var currentTime = Math.floor(Date.now() / 1000);
            var tokenTimeout = tokenExpiration - currentTime;
            if (tokenTimeout < TOKEN_REFRESH_TIMEOUT_THRESHOLD) {
                await signal0neProvider.refreshSession(session, session.scopes);
            }
        }           
    }, TOKEN_REFRESH_INTERVAL)


    new Login(context, signal0neProvider);
    
    signal0neProvider.onDidAuthenticate(() => {
        console.log('TEST ON DID AUTHENTICATE', context )
        new Logout(context, signal0neProvider);
        if (!issueController) {
            issueController = new Issues(context, signal0neProvider);
            refreshIssuesInterval = setInterval(async () => {
                issueController?.IssuesViewDataProvider.refresh();
            }, ISSUES_LIST_REFRESH_INTERVAL);
        }
    });

    signal0neProvider.onDidLogout(() => {
        console.log('ON DID LOGOUT')
        new Login(context, signal0neProvider);
        issueController = null as any;
        clearInterval(refreshIssuesInterval);
    })
 
    vscode.commands.registerCommand('signal0ne.fixCode', async () => {
        let editor = vscode.window.activeTextEditor;
        let selection = editor?.selection;
        let codeSnippet = editor?.document.getText(selection);
        let lang = editor?.document.languageId;
 		let codeSnippetContext = {
 			code: codeSnippet,
 			lang: lang
 		}
        if (!issueController) {
            vscode.window.showErrorMessage('Please login to Signal0ne first');
        }
        var newCode = await issueController.fixCode(codeSnippetContext);
        if (newCode === "") {
            vscode.window.showErrorMessage('Failed to fix code');
            return;
        }
        editor?.edit(editBuilder => {
            editBuilder.replace(selection ?? new  vscode.Selection(0,0,0,0) , newCode);
        });
    });
}

// This method is called when your extension is deactivated
export function deactivate() {}
