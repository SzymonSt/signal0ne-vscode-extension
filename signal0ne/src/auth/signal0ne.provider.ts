import * as uuid from 'uuid';
import * as vscode from 'vscode';
import { API_URL } from '../data/const';
import { getPort } from 'get-port-please';
import { IncomingMessage, ServerResponse } from 'http';
import { jwtDecode } from 'jwt-decode';
import { Signal0neJwtPayload, TokenPair } from '../types/auth';

const AUTH_URL = 'http://localhost:37003';
const AUTH_API_URL = `${API_URL}/auth`;
const REFRESH_TOKEN_KEY = 'signal0ne.refresh_token';
const SESSION_SECRET_KEY = 'signal0ne.sessions';

export class Signal0neProvider
  implements vscode.AuthenticationProvider, vscode.Disposable
{
  private _disposable: vscode.Disposable;
  private _onDidAuthenticate = new vscode.EventEmitter<void>();
  private _onDidLogout = new vscode.EventEmitter<void>();
  private _sessionChangeEmitter =
    new vscode.EventEmitter<vscode.AuthenticationProviderAuthenticationSessionsChangeEvent>();
  readonly onDidAuthenticate: vscode.Event<void> =
    this._onDidAuthenticate.event;
  readonly onDidLogout: vscode.Event<void> = this._onDidLogout.event;

  private tokenPair: TokenPair | undefined;

  constructor(private context: vscode.ExtensionContext) {
    this._disposable = vscode.Disposable.from(
      vscode.authentication.registerAuthenticationProvider(
        'signal0ne',
        'Signal0ne',
        this,
        { supportsMultipleAccounts: false }
      )
    );
  }

  get onDidChangeSessions() {
    return this._sessionChangeEmitter.event;
  }

  async login(port: number): Promise<TokenPair> {
    const token = await new Promise<TokenPair>(async (resolve, reject) => {
      const server = require('http')
        .createServer(async (req: IncomingMessage, res: ServerResponse) => {
          const url = new URL(req.url!, 'http://localhost');
          const accessToken = url.searchParams.get('access_token');
          const refreshToken = url.searchParams.get('refresh_token');

          if (accessToken && refreshToken) {
            resolve({
              accessToken,
              refreshToken
            });

            res.end('Login successful! You can now close this tab.');
            server.close();
          } else {
            reject('Login failed! Please try again.');

            res.end('Login failed! Please try again.');
            server.close();
          }
        })
        .listen(port);
    });

    return {
      accessToken: token.accessToken,
      refreshToken: token.refreshToken
    };
  }

  public async createSession(
    scopes: readonly string[]
  ): Promise<vscode.AuthenticationSession> {
    try {
      if (!this.tokenPair) throw new Error('Token pair is not available');

      const decodedToken = jwtDecode<Signal0neJwtPayload>(
        this.tokenPair.accessToken
      );
      const session: vscode.AuthenticationSession = {
        accessToken: this.tokenPair.accessToken,
        account: { id: decodedToken.id, label: decodedToken.userName },
        id: uuid.v4(),
        scopes
        //To be parametrized with user details
      };

      await this.context.secrets.store(
        SESSION_SECRET_KEY,
        JSON.stringify([session])
      );

      await this.context.secrets.store(
        REFRESH_TOKEN_KEY,
        this.tokenPair.refreshToken
      );

      this._sessionChangeEmitter.fire({
        added: [session],
        changed: [],
        removed: []
      });

      this._onDidAuthenticate.fire();

      console.log('Session created', session.accessToken);
      return session;
    } catch (err) {
      vscode.window.showErrorMessage(`Failed to sign in: ${err}`);
      throw err;
    }
  }

  public async dispose() {
    this._disposable.dispose();
  }

  public async getSessions(): Promise<readonly vscode.AuthenticationSession[]> {
    const sessionData = await this.context.secrets.get(SESSION_SECRET_KEY);

    if (sessionData) {
      return JSON.parse(sessionData) as vscode.AuthenticationSession[];
    }

    return [];
  }

  public async loginInitialSession(): Promise<void> {
    try {
      const port = await getPort();
      const uri = vscode.Uri.parse(
        `${AUTH_URL}/login?callbackUrl=http://localhost:${port}`
      );

      vscode.env.openExternal(uri);

      this.tokenPair = await this.login(port);
      await this.createSession([]);
    } catch (err) {
      vscode.window.showErrorMessage(`Failed to sign in: ${err}`);
      throw err;
    }
  }

  public async logout() {
    const sessions = await this.getSessions();

    if (sessions[0]) {
      this.removeSession(sessions[0].id);
      this._onDidLogout.fire();
    }
  }

  public async refreshSession(
    session: vscode.AuthenticationSession
  ): Promise<vscode.AuthenticationSession> {
    const refreshToken = await this.context.secrets.get(REFRESH_TOKEN_KEY);

    if (refreshToken) {
      const options = {
        body: JSON.stringify({
          refreshToken
        }),
        headers: {
          'Content-Type': 'application/json'
        },
        method: 'POST'
      };

      const response = await fetch(`${AUTH_API_URL}/token/refresh`, options);

      if (response.ok) {
        this.tokenPair = (await response.json()) as TokenPair;
        await this.removeSession(session.id);

        return await this.createSession(session.scopes);
      } else {
        throw new Error('Failed to refresh the session');
      }
    }

    return session;
  }

  public async removeSession(sessionId: string) {
    const sessions = await this.getSessions();
    const sessionIndex = sessions.findIndex(({ id }) => id === sessionId);

    if (sessionIndex !== -1) {
      const session = sessions[sessionIndex];
      const newSessions = sessions
        .slice(0, sessionIndex)
        .concat(sessions.slice(sessionIndex + 1));

      await this.context.secrets.store(
        SESSION_SECRET_KEY,
        JSON.stringify(newSessions)
      );

      this._sessionChangeEmitter.fire({
        added: [],
        changed: [],
        removed: [session]
      });
    }
  }
}
