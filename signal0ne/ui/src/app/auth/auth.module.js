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
exports.AuthModule = void 0;
const core_1 = require("@angular/core");
const core_2 = require("@ngx-translate/core");
const common_1 = require("@angular/common");
const google_login_component_1 = require("app/auth/components/googleLogin/google-login.component");
const register_component_1 = require("app/auth/components/register/register.component");
const resend_verification_link_popup_component_1 = require("app/auth/components/resendVerificationLink/resend-verification-link-popup.component");
const SharedModule_1 = require("app/shared/SharedModule");
const ng_select_1 = require("@ng-select/ng-select");
const forms_1 = require("@angular/forms");
const ng_bootstrap_1 = require("@ng-bootstrap/ng-bootstrap");
const datepicker_1 = require("ngx-bootstrap/datepicker");
const auth_routing_module_1 = require("app/auth/auth-routing.module");
const login_component_1 = require("app/auth/components/login/login.component");
const http_1 = require("@angular/common/http");
const auth_interceptor_1 = require("app/shared/interceptors/auth.interceptor");
const github_login_component_1 = require("app/auth/components/githubLogin/github-login.component");
let AuthModule = (() => {
    let _classDecorators = [(0, core_1.NgModule)({
            declarations: [login_component_1.LoginComponent, github_login_component_1.GithubLoginComponent, google_login_component_1.GoogleLoginComponent, register_component_1.RegisterComponent, resend_verification_link_popup_component_1.ResendVerificationLinkPopupComponent],
            imports: [
                common_1.CommonModule,
                core_2.TranslateModule,
                SharedModule_1.SharedModule,
                ng_select_1.NgSelectModule,
                forms_1.FormsModule,
                forms_1.ReactiveFormsModule,
                ng_bootstrap_1.NgbModule,
                datepicker_1.BsDatepickerModule,
                auth_routing_module_1.AuthRoutingModule
            ],
            exports: [],
            providers: [
                { provide: http_1.HTTP_INTERCEPTORS, useClass: auth_interceptor_1.AuthInterceptor, multi: true }
            ]
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var AuthModule = class {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            AuthModule = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
    };
    return AuthModule = _classThis;
})();
exports.AuthModule = AuthModule;
//# sourceMappingURL=auth.module.js.map