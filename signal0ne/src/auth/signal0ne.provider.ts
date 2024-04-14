import * as vsc from 'vscode';
import {getPort} from 'get-port-please';
import * as uuid from 'uuid';

const AUTH_URL = 'http://localhost:8088';
const SESSION_SECRET_KEY = 'signal0ne.sessions';

export class Signal0neProvider implements vsc.AuthenticationProvider, vsc.Disposable{

    private _sessionChangeEmitter = new vsc.EventEmitter<vsc.AuthenticationProviderAuthenticationSessionsChangeEvent>();
    private _disposable: vsc.Disposable;

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
        const token = await this.login(port);
        const session: vsc.AuthenticationSession = {
            id: uuid.v4(),
            accessToken: token,
            scopes: scopes,
            //To be parametrized with user details
            account: {label: 'Signal0ne', id: 'signal0ne'},
        }
        await this.context.secrets.store(SESSION_SECRET_KEY, JSON.stringify([session]));
        this._sessionChangeEmitter.fire({added: [session], removed: [], changed: []});
        console.log('Session created', session.accessToken);
        return session;
      }catch(err){
        vsc.window.showErrorMessage(`Sign in failed: ${err}`);
        throw err;
      }
    }

    public async removeSession(sessionId: string): Promise<void> {
        return;
    }

    public async getSessions(scopes?: readonly string[] | undefined): Promise<readonly vsc.AuthenticationSession[]> {
        const sessionData = await this.context.secrets.get(SESSION_SECRET_KEY);
        if(sessionData){
            return JSON.parse(sessionData) as vsc.AuthenticationSession[];
        }
        return [];
    }

    async login(port: any): Promise<string> {
        const token = await new Promise<string>(async (resolve, reject) => {
            var server = require('http').createServer(async (req: any, res: any) => {
              const requestToken = new URL(req.url, 'http://localhost').searchParams.get('access_token');
              if(requestToken){
                resolve(requestToken);
                res.end('Login successful! You can now close this tab.');
                server.close();
              }else{
                reject('Login failed! Please try again.')
                res.end('Login failed! Please try again.');
                server.close();
              }
            }).listen(port);
          });
        return token;
    }

    public async dispose() {
      this._disposable.dispose();
    }
}