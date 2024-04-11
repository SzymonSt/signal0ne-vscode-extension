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
exports.LoginComponent = void 0;
const core_1 = require("@angular/core");
const forms_1 = require("@angular/forms");
const resend_verification_link_popup_component_1 = require("app/auth/components/resendVerificationLink/resend-verification-link-popup.component");
const environment_development_1 = require("environment/environment.development");
let LoginComponent = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'app-login',
            templateUrl: './login.component.html',
            styleUrls: ['./login.component.scss'],
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var LoginComponent = class {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            LoginComponent = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        authStateService;
        dialog;
        loginForm;
        isSubmitted = false;
        githubLoginUrl = `https://github.com/login/oauth/authorize?scope=user&client_id=${environment_development_1.environment.githubClientId}`;
        googleLoginUrl = `https://accounts.google.com/o/oauth2/v2/auth?scope=openid%20email&nonce=${Math.random() * 100000000}&response_type=id_token&redirect_uri=http://localhost:37001/google-login&client_id=${environment_development_1.environment.googleLoginProvider}`;
        constructor(authStateService, dialog) {
            this.authStateService = authStateService;
            this.dialog = dialog;
        }
        ngOnInit() {
            this.initForm();
        }
        submitForm() {
            this.isSubmitted = true;
            this.loginForm.markAsDirty();
            this.loginForm.markAllAsTouched();
            if (this.loginForm.valid) {
                this.authStateService
                    .login(this.loginForm.get('email').value, this.loginForm.get('password').value)
                    .then()
                    .catch(() => this.loginForm.get('password').setValue(null));
            }
        }
        openResendVerificationLinkModal() {
            this.dialog.open(resend_verification_link_popup_component_1.ResendVerificationLinkPopupComponent, {
                width: '500px',
            });
        }
        openResendVerificationLinkModalKeydown(event) {
            if (event instanceof KeyboardEvent && event.key === 'Enter') {
                this.dialog.open(resend_verification_link_popup_component_1.ResendVerificationLinkPopupComponent, {
                    width: '500px',
                });
            }
        }
        initForm() {
            this.loginForm = new forms_1.FormGroup({
                email: new forms_1.FormControl(null, [forms_1.Validators.required, forms_1.Validators.email]),
                password: new forms_1.FormControl(null, [
                    forms_1.Validators.required,
                    forms_1.Validators.minLength(8),
                ]),
            });
        }
    };
    return LoginComponent = _classThis;
})();
exports.LoginComponent = LoginComponent;
//# sourceMappingURL=login.component.js.map