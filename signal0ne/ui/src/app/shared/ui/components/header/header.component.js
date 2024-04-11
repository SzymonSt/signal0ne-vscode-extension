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
exports.HeaderComponent = void 0;
const core_1 = require("@angular/core");
const LanguageVersion_1 = require("app/shared/enum/LanguageVersion");
const contact_popup_component_1 = require("app/shared/ui/components/contact/contact-popup.component");
const version_update_popup_component_1 = require("app/shared/ui/components/version-update/version-update-popup.component");
let HeaderComponent = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'app-header',
            templateUrl: './header.component.html',
            styleUrls: ['./header.component.scss'],
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var HeaderComponent = class {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            HeaderComponent = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        languageService;
        applicationStateService;
        configurationService;
        authStateService;
        dialog;
        router;
        LanguageVersion = LanguageVersion_1.LanguageVersion;
        activeLanguage$;
        isLoggedIn$;
        isProVisible = false;
        constructor(languageService, applicationStateService, configurationService, authStateService, dialog, router) {
            this.languageService = languageService;
            this.applicationStateService = applicationStateService;
            this.configurationService = configurationService;
            this.authStateService = authStateService;
            this.dialog = dialog;
            this.router = router;
            this.activeLanguage$ = this.applicationStateService.language$;
            this.isLoggedIn$ = this.authStateService.isLoggedIn$;
        }
        changeLanguage(language) {
            this.applicationStateService.setLanguage(language);
        }
        changeLanguageKeydown(language, event) {
            if (event instanceof KeyboardEvent &&
                (event.key === 'Enter' || event.key === ' ')) {
                if (event.key === ' ')
                    event.preventDefault();
                this.applicationStateService.setLanguage(language);
            }
        }
        openContactModal() {
            this.dialog.open(contact_popup_component_1.ContactPopupComponent, {
                width: '500px',
            });
        }
        openProInfoModal() {
            this.dialog.open(version_update_popup_component_1.VersionUpdatePopupComponent, {
                width: '500px',
            });
        }
        openContactModalKeydown(event) {
            if (event instanceof KeyboardEvent &&
                (event.key === 'Enter' || event.key === ' ')) {
                if (event.key === ' ')
                    event.preventDefault();
                this.dialog.open(contact_popup_component_1.ContactPopupComponent, {
                    width: '500px',
                });
            }
        }
        logOut() {
            this.authStateService.logout();
        }
    };
    return HeaderComponent = _classThis;
})();
exports.HeaderComponent = HeaderComponent;
//# sourceMappingURL=header.component.js.map