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
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OAuth2TokenDTO = void 0;
const class_transformer_1 = require("class-transformer");
const moment = __importStar(require("moment"));
const _ = __importStar(require("lodash"));
const Token_1 = require("app/shared/interfaces/Token");
const DateUtil_1 = require("app/shared/util/DateUtil");
let OAuth2TokenDTO = (() => {
    let _classSuper = Token_1.Token;
    let _instanceExtraInitializers = [];
    let _issuedAt_decorators;
    let _issuedAt_initializers = [];
    let _issuedAt_extraInitializers = [];
    let _get_expiryDate_decorators;
    let _get_lifetime_decorators;
    return class OAuth2TokenDTO extends _classSuper {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            _issuedAt_decorators = [(0, class_transformer_1.Transform)(DateUtil_1.DateUtil.dateTimeConversion)];
            _get_expiryDate_decorators = [(0, class_transformer_1.Exclude)()];
            _get_lifetime_decorators = [(0, class_transformer_1.Exclude)()];
            __esDecorate(this, null, _get_expiryDate_decorators, { kind: "getter", name: "expiryDate", static: false, private: false, access: { has: obj => "expiryDate" in obj, get: obj => obj.expiryDate }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _get_lifetime_decorators, { kind: "getter", name: "lifetime", static: false, private: false, access: { has: obj => "lifetime" in obj, get: obj => obj.lifetime }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(null, null, _issuedAt_decorators, { kind: "field", name: "issuedAt", static: false, private: false, access: { has: obj => "issuedAt" in obj, get: obj => obj.issuedAt, set: (obj, value) => { obj.issuedAt = value; } }, metadata: _metadata }, _issuedAt_initializers, _issuedAt_extraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        accessToken = __runInitializers(this, _instanceExtraInitializers);
        refreshToken;
        expiresIn; // in seconds
        issuedAt = __runInitializers(this, _issuedAt_initializers, void 0); // this is not OAuth2 standard, see below
        constructor() {
            super();
            __runInitializers(this, _issuedAt_extraInitializers);
            // standard of OAuth2 token doesn't have issue date in it, only expiresIn passed,
            // but it needs to be persisted somehow, so that later on, during loading from storage, it's not lost
            // (expiresIn has to have a point of reference)
            // so the assumption is, that issue date would be the date of creation of this object.
            // when loaded from storage, it would temporarily set this date to current date, but then it's going to
            // be overwritten by actual date in storage
            this.issuedAt = new Date();
        }
        get expiryDate() {
            if (!_.isNil(this.expiresIn) && !_.isNil(this.issuedAt)) {
                return moment(this.issuedAt).add(this.expiresIn, 'seconds').toDate();
            }
            else {
                return null;
            }
        }
        get lifetime() {
            return moment.duration(this.expiresIn, 'seconds');
        }
        // OAuth2 properties follow the snake_case convention, we map them to our camelCase
        static fromOAuth2Object(oAuth2Object) {
            let token = new OAuth2TokenDTO();
            token.accessToken = oAuth2Object['accessToken'];
            token.refreshToken = oAuth2Object['refreshToken'];
            token.expiresIn = _.isNumber(oAuth2Object['expiresIn']) ? oAuth2Object['expiresIn'] : undefined;
            return token;
        }
    };
})();
exports.OAuth2TokenDTO = OAuth2TokenDTO;
//# sourceMappingURL=OAuth2TokenDTO.js.map