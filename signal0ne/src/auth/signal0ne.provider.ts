import * as vsc from 'vscode';
import {getPort} from 'get-port-please';
import * as uuid from 'uuid';
import { API_URL } from '../extension';

const AUTH_URL = 'http://localhost:37001';
const AUTH_API_URL = `${API_URL}/auth`;
const SESSION_SECRET_KEY = 'signal0ne.sessions';
const REFRESH_TOKEN_KEY = 'signal0ne.refresh_token';

export class Signal0neProvider implements vsc.AuthenticationProvider, vsc.Disposable{

    private _sessionChangeEmitter = new vsc.EventEmitter<vsc.AuthenticationProviderAuthenticationSessionsChangeEvent>();
    private _disposable: vsc.Disposable;

    private _onDidAuthenticate = new vsc.EventEmitter<void>();
    readonly onDidAuthenticate: vsc.Event<void> = this._onDidAuthenticate.event;

    constructor(private context: vsc.ExtensionContext) {
      this._disposable = vsc.Disposable.from(
        vsc.authentication.registerAuthenticationProvider('signal0ne', 'Signal0ne', this, {supportsMultipleAccounts: false})
      )
    }

    get onDidChangeSessions() {
      return this._sessionChangeEmitter.event;
    }

    public async createSession(scopes: readonly string[]): Promise<vsc.AuthenticationSession> {
      try{
        const port = await getPort();
        const uri = vsc.Uri.parse(`${AUTH_URL}/login?callbackUrl=http://localhost:${port}`);
        vsc.env.openExternal(uri);
        const tokenPair = await this.login(port);
        const session: vsc.AuthenticationSession = {
            id: uuid.v4(),
            accessToken: tokenPair.accessToken,
            scopes: scopes,
            //To be parametrized with user details
            account: {label: 'Signal0ne', id: 'signal0ne'},
        }
        await this.context.secrets.store(SESSION_SECRET_KEY, JSON.stringify([session]));
        await this.context.secrets.store(REFRESH_TOKEN_KEY, tokenPair.refreshToken);
        this._sessionChangeEmitter.fire({added: [session], removed: [], changed: []});
        this._onDidAuthenticate.fire();
        console.log('Session created', session.accessToken);
        return session;
      }catch(err){
        vsc.window.showErrorMessage(`Sign in failed: ${err}`);
        throw err;
      }
    }

    public async removeSession(sessionId: string): Promise<void> {
        const sessions = await this.getSessions();
        const sessionIndex = sessions.findIndex(session => session.id === sessionId);
        if(sessionIndex !== -1){
          var session = sessions[sessionIndex];
            var newSessions = sessions.slice(0, sessionIndex).concat(sessions.slice(sessionIndex + 1));
            await this.context.secrets.store(SESSION_SECRET_KEY, JSON.stringify(newSessions));
            this._sessionChangeEmitter.fire({added: [], removed: [session], changed: []});
        }
        return;
    }

    public async getSessions(scopes?: readonly string[] | undefined): Promise<readonly vsc.AuthenticationSession[]> {
        const sessionData = await this.context.secrets.get(SESSION_SECRET_KEY);
        if(sessionData){
            return JSON.parse(sessionData) as vsc.AuthenticationSession[];
        }
        return [];
    }

    public async refreshSession(session: vsc.AuthenticationSession, scopes: readonly string[]): Promise<vsc.AuthenticationSession> {
        const refreshToken = await this.context.secrets.get(REFRESH_TOKEN_KEY);
        if(refreshToken){
          const response = await fetch(`${AUTH_API_URL}/token/refresh`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              refreshToken: refreshToken
            })
          });
          if(response.ok){
            const tokenPair: any = await response.json();
            this.removeSession(session.id);
            const newSession: vsc.AuthenticationSession = {
              id: uuid.v4(),
              accessToken: tokenPair.accessToken,
              scopes: scopes,
              //To be parametrized with user details
              account: {label: 'Signal0ne', id: 'signal0ne'}
            }
            await this.context.secrets.store(SESSION_SECRET_KEY, JSON.stringify([newSession]));
            await this.context.secrets.store(REFRESH_TOKEN_KEY, tokenPair.refreshToken);
            this._sessionChangeEmitter.fire({added: [newSession], removed: [], changed: []});
            return newSession;
          } else {
            throw new Error('Failed to refresh session');
          }
        }
        return session;
    }

    async login(port: any): Promise<any> {
        const token = await new Promise<any>(async (resolve, reject) => {
            var server = require('http').createServer(async (req: any, res: any) => {
              const url = new URL(req.url, 'http://localhost');
              const requestToken = url.searchParams.get('access_token');
              const refreshToken = url.searchParams.get('refresh_token');
              if(requestToken){
                resolve(
                  {
                    requestToken: requestToken, 
                    refreshToken: refreshToken
                  }
                );
                res.end('Login successful! You can now close this tab.');
                server.close();
              }else{
                reject('Login failed! Please try again.')
                res.end('Login failed! Please try again.');
                server.close();
              }
            }).listen(port);
          });
        return {
          accessToken: token.requestToken,
          refreshToken: token.refreshToken
        };
    }

    public async dispose() {
      this._disposable.dispose();
    }
}