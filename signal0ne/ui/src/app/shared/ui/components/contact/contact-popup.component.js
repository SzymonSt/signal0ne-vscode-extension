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
exports.ContactPopupComponent = void 0;
const core_1 = require("@angular/core");
const forms_1 = require("@angular/forms");
const ContactRequestDTO_1 = require("app/shared/interfaces/ContactRequestDTO");
let ContactPopupComponent = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'app-contact-popup',
            templateUrl: './contact-popup.component.html',
            styleUrls: ['./contact-popup.component.scss'],
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var ContactPopupComponent = class {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            ContactPopupComponent = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        dialogRef;
        clipboard;
        toastrService;
        translateService;
        contactService;
        contactForm;
        isSubmitted = false;
        get emailControl() {
            return this.contactForm.get('email');
        }
        get messageTitleControl() {
            return this.contactForm.get('messageTitle');
        }
        get messageContentControl() {
            return this.contactForm.get('messageContent');
        }
        constructor(dialogRef, clipboard, toastrService, translateService, contactService) {
            this.dialogRef = dialogRef;
            this.clipboard = clipboard;
            this.toastrService = toastrService;
            this.translateService = translateService;
            this.contactService = contactService;
        }
        ngOnInit() {
            this.initForm();
        }
        submitContact() {
            this.isSubmitted = true;
            this.contactForm.markAsDirty();
            this.contactForm.markAllAsTouched();
            if (this.contactForm.valid) {
                this.contactService
                    .sendContactMessage(new ContactRequestDTO_1.ContactRequestDTO(this.contactForm.value.email.toLowerCase(), this.contactForm.value.messageTitle, this.contactForm.value.messageContent))
                    .subscribe((res) => {
                    this.toastrService.success(this.translateService.instant('UI.CONTACT_POPUP.MESSAGE_SEND_SUCCESS'));
                    this.close();
                });
            }
        }
        close() {
            this.dialogRef.close();
        }
        copyDiscordUrl() {
            this.clipboard.copy('https://discord.gg/vAZrxKs5f6');
            this.toastrService.success(this.translateService.instant('UI.CONTACT_POPUP.COPY_DISCORD_URL_SUCCESS'));
        }
        copyGithubUrl() {
            this.clipboard.copy('https://github.com/Signal0ne');
            this.toastrService.success(this.translateService.instant('UI.CONTACT_POPUP.COPY_GITHUB_URL_SUCCESS'));
        }
        copyLinkedinUrl() {
            this.clipboard.copy('https://www.linkedin.com/company/signal0ne/');
            this.toastrService.success(this.translateService.instant('UI.CONTACT_POPUP.COPY_LINKEDIN_URL_SUCCESS'));
        }
        initForm() {
            this.contactForm = new forms_1.FormGroup({
                email: new forms_1.FormControl(null, [forms_1.Validators.email, forms_1.Validators.required]),
                messageTitle: new forms_1.FormControl(null, [forms_1.Validators.required]),
                messageContent: new forms_1.FormControl(null, [forms_1.Validators.required]),
            });
        }
    };
    return ContactPopupComponent = _classThis;
})();
exports.ContactPopupComponent = ContactPopupComponent;
//# sourceMappingURL=contact-popup.component.js.map