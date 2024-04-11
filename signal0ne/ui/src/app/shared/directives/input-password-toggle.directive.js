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
exports.InputPasswordToggleDirective = void 0;
const core_1 = require("@angular/core");
let InputPasswordToggleDirective = (() => {
    let _classDecorators = [(0, core_1.Directive)({
            selector: 'input[type="password"][appInputPasswordToggle]',
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var InputPasswordToggleDirective = class {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            InputPasswordToggleDirective = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        el;
        inputParent;
        toggleIcon;
        onPasswordToggleClickBoundFunction;
        onPasswordToggleKeydownBoundFunction;
        constructor(el) {
            this.el = el;
        }
        ngOnInit() {
            this.onPasswordToggleClickBoundFunction =
                this.onPasswordToggleClick.bind(this);
            this.onPasswordToggleKeydownBoundFunction =
                this.onPasswordToggleKeydown.bind(this);
            this.toggleIcon = document.createElement('span');
            this.toggleIcon.tabIndex = 0;
            this.toggleIcon.classList.add('password-toggle-icon');
            this.toggleIcon.addEventListener('click', this.onPasswordToggleClickBoundFunction);
            this.toggleIcon.addEventListener('keydown', this.onPasswordToggleKeydownBoundFunction);
            this.inputParent = this.el.nativeElement.parentNode;
            this.inputParent.classList.add('password-toggle');
            this.inputParent.appendChild(this.toggleIcon);
        }
        ngOnDestroy() {
            this.toggleIcon.removeEventListener('click', this.onPasswordToggleClickBoundFunction);
            this.toggleIcon.removeEventListener('keydown', this.onPasswordToggleKeydownBoundFunction);
            this.onPasswordToggleClickBoundFunction = null;
            this.onPasswordToggleKeydownBoundFunction = null;
        }
        onPasswordToggleClick(event) {
            this.togglePasswordInput();
        }
        onPasswordToggleKeydown(event) {
            if (event instanceof KeyboardEvent && event.key === 'Enter') {
                this.togglePasswordInput();
            }
        }
        togglePasswordInput() {
            const inputType = this.el.nativeElement.attributes.type;
            if (inputType.value === 'password') {
                this.el.nativeElement.setAttribute('type', 'text');
            }
            else {
                this.el.nativeElement.setAttribute('type', 'password');
            }
        }
    };
    return InputPasswordToggleDirective = _classThis;
})();
exports.InputPasswordToggleDirective = InputPasswordToggleDirective;
//# sourceMappingURL=input-password-toggle.directive.js.map