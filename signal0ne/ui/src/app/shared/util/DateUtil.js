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
exports.DateUtil = void 0;
const moment = __importStar(require("moment"));
const class_transformer_1 = require("class-transformer");
class DateUtil {
    constructor() {
    }
    static parseDateString(value) {
        const parsedMoment = moment(value, 'YYYY-MM-DD');
        if (parsedMoment.isValid()) {
            return parsedMoment.toDate();
        }
        else {
            return null;
        }
    }
    static createDateString(value) {
        const parsedMoment = moment(value);
        if (parsedMoment.isValid()) {
            return parsedMoment.format('YYYY-MM-DD');
        }
        else {
            return null;
        }
    }
    static createPolishDateString(value) {
        const parsedMoment = moment(value);
        if (parsedMoment.isValid()) {
            return parsedMoment.format('DD-MM-YYYY');
        }
        else {
            return null;
        }
    }
    static parseTimeString(value) {
        const parsedMoment = moment(value, 'HH:mm:ss');
        if (parsedMoment.isValid()) {
            return parsedMoment.toDate();
        }
        else {
            return null;
        }
    }
    static createTimeString(value) {
        const parsedMoment = moment(value);
        if (parsedMoment.isValid()) {
            return parsedMoment.format('HH:mm:ss');
        }
        else {
            return null;
        }
    }
    static parseTimeWithNoSecondsString(value) {
        const parsedMoment = moment(value, 'HH:mm');
        if (parsedMoment.isValid()) {
            return parsedMoment.toDate();
        }
        else {
            return null;
        }
    }
    static createTimeWithNoSecondsString(value) {
        const parsedMoment = moment(value);
        if (parsedMoment.isValid()) {
            return parsedMoment.format('HH:mm');
        }
        else {
            return null;
        }
    }
    static parseDateTimeString(value) {
        const parsedMoment = moment.utc(value, 'YYYY-MM-DD[T]HH:mm:ss[Z]');
        if (parsedMoment.isValid()) {
            return parsedMoment.toDate();
        }
        else {
            return null;
        }
    }
    static createDateTimeString(value) {
        const parsedMoment = moment.utc(value);
        if (parsedMoment.isValid()) {
            return parsedMoment.format('YYYY-MM-DD[T]HH:mm:ss[Z]');
        }
        else {
            return null;
        }
    }
    static dateConversion(params) {
        if (params.type === class_transformer_1.TransformationType.CLASS_TO_PLAIN) {
            return DateUtil.createDateString(params.value);
        }
        else if (params.type === class_transformer_1.TransformationType.PLAIN_TO_CLASS) {
            return DateUtil.parseDateString(params.value);
        }
    }
    static timeConversion(params) {
        if (params.type === class_transformer_1.TransformationType.CLASS_TO_PLAIN) {
            return DateUtil.createTimeString(params.value);
        }
        else if (params.type === class_transformer_1.TransformationType.PLAIN_TO_CLASS) {
            return DateUtil.parseTimeString(params.value);
        }
    }
    static timeWithNoSecondsConversion(params) {
        if (params.type === class_transformer_1.TransformationType.CLASS_TO_PLAIN) {
            return DateUtil.createTimeWithNoSecondsString(params.value);
        }
        else if (params.type === class_transformer_1.TransformationType.PLAIN_TO_CLASS) {
            return DateUtil.parseTimeWithNoSecondsString(params.value);
        }
    }
    static dateTimeConversion(params) {
        if (params.type === class_transformer_1.TransformationType.CLASS_TO_PLAIN) {
            return DateUtil.createDateTimeString(params.value);
        }
        else if (params.type === class_transformer_1.TransformationType.PLAIN_TO_CLASS) {
            return DateUtil.parseDateTimeString(params.value);
        }
    }
}
exports.DateUtil = DateUtil;
//# sourceMappingURL=DateUtil.js.map