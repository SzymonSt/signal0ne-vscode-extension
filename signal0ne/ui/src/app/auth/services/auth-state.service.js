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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthStateService = void 0;
const core_1 = require("@angular/core");
const UserDataDTO_1 = require("app/shared/interfaces/UserDataDTO");
const _ = __importStar(require("lodash"));
const moment = __importStar(require("moment"));
const rxjs_1 = require("rxjs");
const jwt_decode_1 = require("jwt-decode");
let AuthStateService = (() => {
    let _classDecorators = [(0, core_1.Injectable)({ providedIn: 'root' })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var AuthStateService = class {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            AuthStateService = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        zone;
        authService;
        router;
        configurationService;
        static TOKEN_REFRESH_INTERVAL = moment.duration('1', 'minutes');
        token$ = new rxjs_1.BehaviorSubject(null);
        isLoggedIn$ = new rxjs_1.BehaviorSubject(false);
        userData$ = new rxjs_1.BehaviorSubject(null);
        wasNavigatedFromLogin = false;
        tokenRefreshIntervalId;
        constructor(zone, authService, router, configurationService) {
            this.zone = zone;
            this.authService = authService;
            this.router = router;
            this.configurationService = configurationService;
        }
        get token() {
            return this.token$.value;
        }
        set token(value) {
            if (value && !this.userData) {
                this.decodeTokenToUserData(value.accessToken);
            }
            else {
                this.userData = null;
            }
            this.token$.next(value);
        }
        get isLoggedIn() {
            return this.isLoggedIn$.value;
        }
        set isLoggedIn(value) {
            this.isLoggedIn$.next(value);
        }
        get userData() {
            return this.userData$.value;
        }
        set userData(value) {
            this.userData$.next(value);
        }
        set userDataProVersion(value) {
            const userData = { ...this.userData };
            userData.isPro = value;
            this.userData = userData;
        }
        ngOnDestroy() {
            this.cancelTokenRefreshSchedule();
        }
        login(email, password, silent = false) {
            return new Promise((resolve, reject) => {
                this.authService.login(email, password).toPromise()
                    .then((result) => {
                    this.setToken(result.token)
                        .then((savedToken) => {
                        this.manageLoginSuccess(result);
                        resolve(this.token);
                    })
                        .catch((error) => {
                        this.token = null;
                        this.isLoggedIn = false;
                        reject(error);
                    });
                })
                    .catch((error) => {
                    this.token = null;
                    this.isLoggedIn = false;
                    reject(error);
                });
            });
        }
        loginWithGoogle(accessToken) {
            return new Promise((resolve, reject) => {
                this.authService.loginWithGoogle(accessToken).toPromise()
                    .then((result) => {
                    this.setToken(result.token)
                        .then((savedToken) => {
                        this.manageLoginSuccess(result);
                        resolve(this.token);
                    })
                        .catch((error) => {
                        this.token = null;
                        this.isLoggedIn = false;
                        reject(error);
                    });
                })
                    .catch((error) => {
                    this.token = null;
                    this.isLoggedIn = false;
                    reject(error);
                });
            });
        }
        loginWithGithub(code) {
            return new Promise((resolve, reject) => {
                this.authService.loginWithGithub(code).toPromise()
                    .then((result) => {
                    this.setToken(result.token)
                        .then((savedToken) => {
                        this.manageLoginSuccess(result);
                        resolve(this.token);
                    })
                        .catch((error) => {
                        this.token = null;
                        this.isLoggedIn = false;
                        reject(error);
                    });
                })
                    .catch((error) => {
                    this.token = null;
                    this.isLoggedIn = false;
                    reject(error);
                });
            });
        }
        logout(silent = false) {
            this.deleteToken()
                .then(() => {
                this.manageTokenDeletion();
            })
                .catch((error) => {
                this.manageTokenDeletion();
            });
        }
        manageTokenDeletion() {
            this.token = null;
            this.isLoggedIn = false;
            this.cancelTokenRefreshSchedule();
            this.goToLogin();
        }
        refresh(token) {
            return new Promise((resolve, reject) => {
                this.authService.refresh(token).toPromise()
                    .then((result) => {
                    this.setToken(result.token)
                        .then((savedToken) => {
                        this.token = result.token;
                        this.rescheduleRefresh(this.token);
                        resolve(this.token);
                    })
                        .catch((error) => {
                        reject(error);
                    });
                })
                    .catch((error) => {
                    reject(error);
                });
            });
        }
        recoverToken() {
            return new Promise((resolve, reject) => {
                this.getToken()
                    .then((token) => {
                    if (_.isNil(token)) {
                        this.isLoggedIn = false;
                        reject();
                    }
                    else {
                        if (token.isExpired() || token.isNearlyExpired()) {
                            this.refresh(token)
                                .then((refreshedToken) => {
                                this.isLoggedIn = true;
                                resolve(refreshedToken);
                            })
                                .catch((error) => {
                                this.isLoggedIn = false;
                                reject(error);
                            });
                        }
                        else {
                            this.token = token;
                            this.isLoggedIn = true;
                            this.scheduleTokenRefresh(token);
                            resolve(token);
                        }
                    }
                })
                    .catch((error) => {
                    this.isLoggedIn = false;
                    reject(error);
                });
            });
        }
        // TODO Add to be called after unauthorized
        clearTokenData() {
            this.deleteToken()
                .finally(() => {
                this.token = null;
                this.cancelTokenRefreshSchedule();
            });
        }
        scheduleTokenRefresh(token) {
            this.zone.runOutsideAngular(() => {
                this.tokenRefreshIntervalId = setInterval(() => {
                    this.zone.run(() => {
                        if (this.token.isNearlyExpired()) {
                            this.refresh(this.token)
                                .then((refreshedToken) => {
                            })
                                .catch((error) => {
                            });
                        }
                    });
                }, AuthStateService.TOKEN_REFRESH_INTERVAL.as('milliseconds'));
            });
        }
        cancelTokenRefreshSchedule() {
            if (this.tokenRefreshIntervalId) {
                clearInterval(this.tokenRefreshIntervalId);
                // @ts-ignore
                this.tokenRefreshIntervalId = null;
            }
        }
        rescheduleRefresh(token) {
            this.cancelTokenRefreshSchedule();
            this.scheduleTokenRefresh(token);
        }
        setToken(token) {
            return this.authService.setToken(token).toPromise();
        }
        getToken() {
            return this.authService.getToken().toPromise();
        }
        deleteToken() {
            return this.authService.deleteToken().toPromise();
        }
        goToDashboard() {
            if (!this.wasNavigatedFromLogin) {
                this.router.navigateByUrl('/issues-dashboard');
            }
            this.wasNavigatedFromLogin = true;
        }
        goToLogin() {
            this.router.navigateByUrl('/login');
            this.wasNavigatedFromLogin = false;
        }
        async authenthicateAgent() {
            const agentToken = await this.authService.authAgent(this.token).toPromise().then((result) => {
                return result.agentToken;
            });
            this.configurationService.setAgentAuthData({ token: agentToken, userId: this.userData.id });
        }
        manageLoginSuccess(result) {
            this.token = result.token;
            this.isLoggedIn = true;
            if (!_.isNil(this.token)) {
                this.scheduleTokenRefresh(this.token);
            }
            this.authenthicateAgent();
            this.configurationService.getCurrentAgentState();
            this.configurationService.setAgentState({ state: true });
            this.goToDashboard();
        }
        decodeTokenToUserData(accessToken) {
            const decodedToken = (0, jwt_decode_1.jwtDecode)(accessToken);
            // @ts-ignore
            this.userData = new UserDataDTO_1.UserDataDTO(decodedToken['id'], decodedToken['userName'], decodedToken['isPro']);
        }
        static {
            __runInitializers(_classThis, _classExtraInitializers);
        }
    };
    return AuthStateService = _classThis;
})();
exports.AuthStateService = AuthStateService;
//# sourceMappingURL=auth-state.service.js.map