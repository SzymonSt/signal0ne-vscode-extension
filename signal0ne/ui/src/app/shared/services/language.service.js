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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LangugageService = void 0;
const core_1 = require("@angular/core");
const common_1 = require("@angular/common");
const pl_1 = __importDefault(require("@angular/common/locales/pl"));
const en_GB_1 = __importDefault(require("@angular/common/locales/en-GB"));
const chronos_1 = require("ngx-bootstrap/chronos");
const locale_1 = require("ngx-bootstrap/locale");
const ApplicationConfig_1 = require("app/config/ApplicationConfig");
const LanguageVersion_1 = require("app/shared/enum/LanguageVersion");
const moment = __importStar(require("moment"));
let LangugageService = (() => {
    let _classDecorators = [(0, core_1.Injectable)({ providedIn: 'root' })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var LangugageService = class {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            LangugageService = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        translateService;
        localeService;
        constructor(translateService, localeService) {
            this.translateService = translateService;
            this.localeService = localeService;
            this.setLanguage(ApplicationConfig_1.ApplicationConfig.defaultLanguage);
        }
        initialize() {
            this.translateService.addLangs([LanguageVersion_1.LanguageVersion.EN, LanguageVersion_1.LanguageVersion.PL]);
        }
        setLanguage(language) {
            switch (language) {
                case LanguageVersion_1.LanguageVersion.EN: {
                    this.translateService.use(LanguageVersion_1.LanguageVersion.EN);
                    (0, common_1.registerLocaleData)(en_GB_1.default, 'en-GB');
                    (0, chronos_1.defineLocale)('en-gb', locale_1.enGbLocale);
                    this.localeService.use('en-gb');
                    moment.locale('en-gb');
                    break;
                }
                case LanguageVersion_1.LanguageVersion.PL: {
                    this.translateService.use(LanguageVersion_1.LanguageVersion.PL);
                    (0, common_1.registerLocaleData)(pl_1.default, 'pl');
                    (0, chronos_1.defineLocale)('pl', locale_1.plLocale);
                    this.localeService.use('pl');
                    moment.locale('pl');
                    break;
                }
            }
        }
    };
    return LangugageService = _classThis;
})();
exports.LangugageService = LangugageService;
//# sourceMappingURL=language.service.js.map