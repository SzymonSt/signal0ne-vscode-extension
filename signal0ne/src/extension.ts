// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import axios from 'axios';
import { Login } from './login';
import { Signal0neProvider } from './auth/signal0ne.provider';
import { jwtDecode } from "jwt-decode";
import { Issues } from './issues';

const TOKEN_REFRESH_INTERVAL = 1000 * 60;
const TOKEN_REFRESH_TIMEOUT_THRESHOLD = 1000 * 60 * 3;

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
    const signal0neProvider = new Signal0neProvider(context);
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
        new Issues(context, signal0neProvider);
    });
}

// This method is called when your extension is deactivated
export function deactivate() {}
