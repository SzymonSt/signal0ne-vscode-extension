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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Token = void 0;
const moment = __importStar(require("moment"));
class Token {
    constructor() {
    }
    isExpired() {
        const now = moment();
        return moment(this.expiryDate).isSameOrBefore(now, 'second');
    }
    isNearlyExpired(advance = this.calculateDefaultAdvance()) {
        const now = moment();
        const minuteDifference = moment(this.expiryDate).diff(now, 'minutes');
        if (minuteDifference <= advance.as('minutes')) {
            return true;
        }
        else {
            return false;
        }
    }
    wouldBeNearlyExpired(date, advance = this.calculateDefaultAdvance()) {
        const then = moment(date);
        const minuteDifference = moment(this.expiryDate).diff(then, 'minutes');
        if (minuteDifference <= advance.as('minutes')) {
            return true;
        }
        else {
            return false;
        }
    }
    calculateDefaultAdvance() {
        // 1/3 (rounded) of token lifetime, but no less than 2 minutes
        return moment.duration(Math.max(Math.floor(Math.round(this.lifetime.as('minutes')) / 1.5), 2), 'minutes');
    }
}
exports.Token = Token;
//# sourceMappingURL=Token.js.map