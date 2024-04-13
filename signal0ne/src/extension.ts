// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import axios from 'axios';
import { Login } from './login';
import { Signal0neProvider } from './auth/signal0ne.provider';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
    const signal0neProvider = new Signal0neProvider(context);
    context.subscriptions.push(
        signal0neProvider,
    )
    new Login(context, signal0neProvider);


}

// This method is called when your extension is deactivated
export function deactivate() {}
