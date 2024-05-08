"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logout = exports.LogoutDataProvider = void 0;
const vsc = __importStar(require("vscode"));
const path_1 = require("path");
class LogoutDataProvider {
    _onDidChangeTreeData = new vsc.EventEmitter();
    onDidChangeTreeData = this._onDidChangeTreeData.event;
    constructor() { }
    getTreeItem(element) {
        return {
            label: element.label,
            id: element.id,
            description: element.description,
            iconPath: element.iconPath,
            collapsibleState: vsc.TreeItemCollapsibleState.None,
            command: {
                command: 'signal0ne.Logout',
                title: 'Logout',
                arguments: [element]
            }
        };
    }
    getChildren(element) {
        console.log('TEST', element);
        if (!element) {
            return [
                { label: 'Logout', id: 'Logout', description: 'Logout', iconPath: (0, path_1.join)(__dirname, '..', 'resources', 'signal_img_logo.svg') }
            ];
        }
        return [];
    }
    getParent(element) {
        return element.parent;
    }
    provideTextDocumentContent(uri) {
        return `HEllo World!`;
    }
}
exports.LogoutDataProvider = LogoutDataProvider;
class Logout {
    LogoutView;
    constructor(context, signal0neProvider) {
        const logoutDataProvider = new LogoutDataProvider();
        context.subscriptions.push(vsc.workspace.registerTextDocumentContentProvider('Logout', logoutDataProvider));
        this.LogoutView = vsc.window.createTreeView('signal0ne', { treeDataProvider: logoutDataProvider, showCollapseAll: true });
        vsc.commands.registerCommand('signal0ne.Logout', async (node) => {
            signal0neProvider.LogoutInitialSession();
        });
    }
}
exports.Logout = Logout;
//# sourceMappingURL=logout.js.map