"use strict";
var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const http_1 = require("@angular/common/http");
const core_1 = require("@angular/core");
const OAuth2TokenDTO_1 = require("app/shared/interfaces/OAuth2TokenDTO");
const environment_development_1 = require("environment/environment.development");
const rxjs_1 = require("rxjs");
let AuthService = (() => {
    let _classDecorators = [(0, core_1.Injectable)({ providedIn: 'root' })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var AuthService = class {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            AuthService = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        httpClient;
        storageUtil;
        static TOKEN_KEY = 'signal_token';
        constructor(httpClient, storageUtil) {
            this.httpClient = httpClient;
            this.storageUtil = storageUtil;
        }
        login(email, password) {
            return this.httpClient.post(`${environment_development_1.environment.authUrl}/login`, { email, password })
                .pipe((0, rxjs_1.map)((response) => {
                const token = OAuth2TokenDTO_1.OAuth2TokenDTO.fromOAuth2Object(response);
                return { token: token };
            }));
        }
        register(email, password) {
            return this.httpClient.post(`${environment_development_1.environment.authUrl}/register`, { email, password });
        }
        resendVerificationLink(email) {
            return this.httpClient.post(`${environment_development_1.environment.authUrl}/email-confirmation-link-resend`, { email });
        }
        loginWithGoogle(accessToken) {
            return this.httpClient.post(`${environment_development_1.environment.authUrl}/login-with-google`, { idToken: accessToken })
                .pipe((0, rxjs_1.map)((response) => {
                const token = OAuth2TokenDTO_1.OAuth2TokenDTO.fromOAuth2Object(response);
                return { token: token };
            }));
        }
        loginWithGithub(code) {
            return this.httpClient.post(`${environment_development_1.environment.authUrl}/login-with-github`, { code })
                .pipe((0, rxjs_1.map)((response) => {
                const token = OAuth2TokenDTO_1.OAuth2TokenDTO.fromOAuth2Object(response);
                return { token: token };
            }));
        }
        logout(token) {
            return this.httpClient.post(`${environment_development_1.environment.authUrl}/logout`, { refreshToken: token.refreshToken })
                .pipe((0, rxjs_1.map)(() => {
                return;
            }));
        }
        refresh(token) {
            const headers = new http_1.HttpHeaders({
                'Content-Type': 'application/json',
                Accept: 'application/json'
            });
            return this.httpClient.post(`${environment_development_1.environment.authUrl}/token/refresh`, JSON.stringify({ refreshToken: token.refreshToken }), { headers })
                .pipe((0, rxjs_1.map)((response) => {
                const refreshedToken = OAuth2TokenDTO_1.OAuth2TokenDTO.fromOAuth2Object(response);
                return { token: refreshedToken };
            }));
        }
        authAgent(token) {
            const headers = new http_1.HttpHeaders({
                'Content-Type': 'application/json',
                Accept: 'application/json',
            });
            return this.httpClient.post(`${environment_development_1.environment.apiUrl}/user/agent/authenticate`, null, { headers })
                .pipe((0, rxjs_1.map)((response) => {
                return { agentToken: response['token'] };
            }));
        }
        startPasswordReset(email) {
            return this.httpClient.post(`${environment_development_1.environment.apiUrl}/accounts/${encodeURIComponent(email)}/password/init-reset`, {})
                .pipe((0, rxjs_1.map)(() => {
                return;
            }));
        }
        setToken(token) {
            return new rxjs_1.Observable((observer) => {
                this.storageUtil.saveData(token, AuthService.TOKEN_KEY)
                    .then((result) => {
                    observer.next(result);
                    observer.complete();
                })
                    .catch((error) => {
                    observer.error(error);
                });
            });
        }
        getToken() {
            return new rxjs_1.Observable((observer) => {
                this.storageUtil.loadData(AuthService.TOKEN_KEY, OAuth2TokenDTO_1.OAuth2TokenDTO)
                    .then((result) => {
                    observer.next(result);
                    observer.complete();
                })
                    .catch((error) => {
                    observer.error(error);
                });
            });
        }
        deleteToken() {
            return new rxjs_1.Observable((observer) => {
                this.storageUtil.deleteData(AuthService.TOKEN_KEY)
                    .then(() => {
                    observer.next();
                    observer.complete();
                })
                    .catch((error) => {
                    observer.error(error);
                });
            });
        }
        static {
            __runInitializers(_classThis, _classExtraInitializers);
        }
    };
    return AuthService = _classThis;
})();
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map