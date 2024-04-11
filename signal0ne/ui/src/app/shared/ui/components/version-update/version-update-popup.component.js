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
exports.VersionUpdatePopupComponent = void 0;
const core_1 = require("@angular/core");
const stripe_js_1 = require("@stripe/stripe-js");
const environment_development_1 = require("environment/environment.development");
let VersionUpdatePopupComponent = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'app-version-update-popup',
            templateUrl: './version-update-popup.component.html',
            styleUrls: ['./version-update-popup.component.scss'],
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var VersionUpdatePopupComponent = class {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            VersionUpdatePopupComponent = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        dialogRef;
        http;
        price = environment_development_1.environment.proAccountPrice;
        stripePromise = (0, stripe_js_1.loadStripe)(environment_development_1.environment.stripePublicKey);
        constructor(dialogRef, http) {
            this.dialogRef = dialogRef;
            this.http = http;
        }
        async tryProUpdate() {
            const payment = {
                name: 'Signal0ne Pro',
                currency: 'eur',
                amount: environment_development_1.environment.proAccountPrice * 100,
                quantity: 1,
                cancelUrl: 'http://localhost:37001/version-update/cancel',
                successUrl: 'http://localhost:37001/version-update/success',
            };
            const stripe = await this.stripePromise;
            this.http
                .post(`${environment_development_1.environment.apiUrl}/user/upgrade-pro`, payment)
                .subscribe((data) => {
                stripe.redirectToCheckout({
                    sessionId: data.id,
                });
            });
        }
        close() {
            this.dialogRef.close();
        }
    };
    return VersionUpdatePopupComponent = _classThis;
})();
exports.VersionUpdatePopupComponent = VersionUpdatePopupComponent;
//# sourceMappingURL=version-update-popup.component.js.map