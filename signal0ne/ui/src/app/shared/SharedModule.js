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
exports.SharedModule = void 0;
const common_1 = require("@angular/common");
const http_1 = require("@angular/common/http");
const core_1 = require("@angular/core");
const forms_1 = require("@angular/forms");
const progress_spinner_1 = require("@angular/material/progress-spinner");
const slide_toggle_1 = require("@angular/material/slide-toggle");
const tooltip_1 = require("@angular/material/tooltip");
const core_2 = require("@ngx-translate/core");
const angular_svg_icon_1 = require("angular-svg-icon");
const input_password_toggle_directive_1 = require("app/shared/directives/input-password-toggle.directive");
const error_handler_interceptor_1 = require("app/shared/interceptors/error-handler.interceptor");
const loading_interceptor_1 = require("app/shared/interceptors/loading.interceptor");
const configuration_dropdown_component_1 = require("app/shared/ui/components/configuration-dropdown/configuration-dropdown.component");
const contact_popup_component_1 = require("app/shared/ui/components/contact/contact-popup.component");
const version_update_popup_component_1 = require("app/shared/ui/components/version-update/version-update-popup.component");
const datepicker_1 = require("ngx-bootstrap/datepicker");
const header_component_1 = require("./ui/components/header/header.component");
const loader_component_1 = require("./ui/components/loader/loader.component");
let SharedModule = (() => {
    let _classDecorators = [(0, core_1.NgModule)({
            declarations: [
                loader_component_1.LoaderComponent,
                header_component_1.HeaderComponent,
                configuration_dropdown_component_1.ConfigurationDropdownComponent,
                contact_popup_component_1.ContactPopupComponent,
                input_password_toggle_directive_1.InputPasswordToggleDirective,
                version_update_popup_component_1.VersionUpdatePopupComponent
            ],
            imports: [
                common_1.CommonModule,
                core_2.TranslateModule,
                progress_spinner_1.MatProgressSpinnerModule,
                forms_1.FormsModule,
                slide_toggle_1.MatSlideToggleModule,
                http_1.HttpClientModule,
                angular_svg_icon_1.AngularSvgIconModule.forRoot(),
                tooltip_1.MatTooltipModule,
                forms_1.ReactiveFormsModule,
                datepicker_1.BsDatepickerModule
            ],
            exports: [
                loader_component_1.LoaderComponent,
                header_component_1.HeaderComponent,
                configuration_dropdown_component_1.ConfigurationDropdownComponent,
                contact_popup_component_1.ContactPopupComponent,
                input_password_toggle_directive_1.InputPasswordToggleDirective,
                version_update_popup_component_1.VersionUpdatePopupComponent
            ],
            providers: [
                { provide: http_1.HTTP_INTERCEPTORS, useClass: loading_interceptor_1.LoadingInterceptor, multi: true },
                { provide: http_1.HTTP_INTERCEPTORS, useClass: error_handler_interceptor_1.ErrorHandlerInterceptor, multi: true }
            ]
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var SharedModule = class {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            SharedModule = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
    };
    return SharedModule = _classThis;
})();
exports.SharedModule = SharedModule;
//# sourceMappingURL=SharedModule.js.map