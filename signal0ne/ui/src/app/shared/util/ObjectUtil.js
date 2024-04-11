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
exports.ObjectUtil = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const _ = __importStar(require("lodash"));
class ObjectUtil {
    constructor() {
    }
    static cloneDeepWithoutEmptyString(obj) {
        return _.transform(obj, (accumulator, value, key) => {
            if (_.isString(value) && _.isEmpty(_.trim(value))) {
                return;
            }
            else if (_.isArray(value)) {
                const result = ObjectUtil.cloneDeepWithoutEmptyString(value);
                _.remove(result, _.isUndefined);
                accumulator[key] = result;
            }
            else if (_.isObject(value)) {
                accumulator[key] = ObjectUtil.cloneDeepWithoutEmptyString(value);
            }
            else {
                accumulator[key] = value;
            }
        });
    }
    static cloneDeepWithoutNull(obj) {
        return _.transform(obj, (accumulator, value, key) => {
            if (_.isNull(value)) {
                return;
            }
            else if (_.isArray(value)) {
                const result = ObjectUtil.cloneDeepWithoutNull(value);
                _.remove(result, _.isUndefined);
                accumulator[key] = result;
            }
            else if (_.isObject(value)) {
                accumulator[key] = ObjectUtil.cloneDeepWithoutNull(value);
            }
            else {
                accumulator[key] = value;
            }
        });
    }
    static cloneDeepWithoutUndefined(obj) {
        return _.transform(obj, (accumulator, value, key) => {
            if (_.isUndefined(value)) {
                return;
            }
            else if (_.isArray(value)) {
                const result = ObjectUtil.cloneDeepWithoutUndefined(value);
                _.remove(result, _.isUndefined);
                accumulator[key] = result;
            }
            else if (_.isObject(value)) {
                accumulator[key] = ObjectUtil.cloneDeepWithoutUndefined(value);
            }
            else {
                accumulator[key] = value;
            }
        });
    }
    static cloneDeepWithoutEmptyObject(obj) {
        return _.transform(obj, (accumulator, value, key) => {
            if (!_.isArray(value) && _.isObject(value) && _.isEmpty(value)) {
                return;
            }
            else if (_.isArray(value)) {
                const result = ObjectUtil.cloneDeepWithoutEmptyObject(value);
                _.remove(result, _.isUndefined);
                accumulator[key] = result;
            }
            else if (_.isObject(value)) {
                const result = ObjectUtil.cloneDeepWithoutEmptyObject(value);
                if (!_.isEmpty(result)) {
                    accumulator[key] = result;
                }
                else {
                    return;
                }
            }
            else {
                accumulator[key] = value;
            }
        });
    }
    static cloneDeepWithValueAsString(obj) {
        return _.transform(obj, (accumulator, value, key) => {
            if (_.isArray(value)) {
                const result = ObjectUtil.cloneDeepWithValueAsString(value);
                if (result?.length > 0) {
                    accumulator[key] = result.toString();
                }
                else {
                    return;
                }
            }
            else if (_.isObject(value)) {
                accumulator[key] = ObjectUtil.cloneDeepWithValueAsString(value);
            }
            else {
                if (!_.isNil(value)) {
                    accumulator[key] = _.toString(value);
                }
                else {
                    return;
                }
            }
        });
    }
    static classToPlain(obj, noEmptyObject = false, noEmptyString = false, noNull = false, noUndefined = false, options = null) {
        let resultObj = (0, class_transformer_1.classToPlain)(obj, options);
        if (noEmptyString) {
            resultObj = ObjectUtil.cloneDeepWithoutEmptyString(resultObj);
        }
        if (noNull) {
            resultObj = ObjectUtil.cloneDeepWithoutNull(resultObj);
        }
        if (noUndefined) {
            resultObj = ObjectUtil.cloneDeepWithoutUndefined(resultObj);
        }
        if (noEmptyObject) {
            resultObj = ObjectUtil.cloneDeepWithoutEmptyObject(resultObj);
            if (_.isObject(resultObj) && _.isEmpty(resultObj)) {
                resultObj = undefined;
            }
        }
        return resultObj;
    }
    static classToPlainArray(obj, noEmptyObject = false, noEmptyString = false, noNull = false, noUndefined = false, options = null) {
        const resultObj = (0, class_transformer_1.classToPlain)(obj, options);
        if (noEmptyString) {
            _.forEach(resultObj, (value, key) => {
                resultObj[key] = ObjectUtil.cloneDeepWithoutEmptyString(value);
            });
        }
        if (noNull) {
            _.forEach(resultObj, (value, key) => {
                resultObj[key] = ObjectUtil.cloneDeepWithoutNull(value);
            });
        }
        if (noUndefined) {
            _.forEach(resultObj, (value, key) => {
                resultObj[key] = ObjectUtil.cloneDeepWithoutUndefined(value);
            });
        }
        if (noEmptyObject) {
            _.forEach(resultObj, (value, key) => {
                resultObj[key] = ObjectUtil.cloneDeepWithoutEmptyObject(value);
            });
            _.remove(resultObj, (value, key) => {
                return (_.isObject(value) && _.isEmpty(value));
            });
        }
        return resultObj;
    }
    static plainToClass(cls, obj, options = null) {
        return (0, class_transformer_1.plainToClass)(cls, obj, options);
    }
    static plainToClassArray(cls, obj, options = null) {
        return (0, class_transformer_1.plainToClass)(cls, obj, options);
    }
    static plainToClassFromExisting(clsObject, obj, options = null) {
        return (0, class_transformer_1.plainToClassFromExist)(clsObject, obj, options);
    }
    static plainToClassFromExistingArray(clsObject, obj, options = null) {
        return (0, class_transformer_1.plainToClassFromExist)(clsObject, obj, options);
    }
    static valueAsString(obj) {
        return ObjectUtil.cloneDeepWithValueAsString(obj);
    }
    static valueAsStringArray(objArray) {
        const resultObj = [];
        _.forEach(objArray, (value, key) => {
            resultObj[key] = ObjectUtil.cloneDeepWithValueAsString(value);
        });
        return resultObj;
    }
    static validateObject(obj, validatorOptions = null) {
        return (0, class_validator_1.validateSync)(obj, validatorOptions);
    }
    static validateObjectArray(objArray, validatorOptions = null) {
        const resultObj = {};
        _.forEach(objArray, (value, key) => {
            resultObj[key] = (0, class_validator_1.validateSync)(value, validatorOptions);
        });
        return resultObj;
    }
    static normalizeObject(obj) {
        (0, class_validator_1.validateSync)(obj, { whitelist: true });
    }
    static normalizeObjectArray(objArray) {
        _.forEach(objArray, (value, key) => {
            (0, class_validator_1.validateSync)(value, { whitelist: true });
        });
    }
}
exports.ObjectUtil = ObjectUtil;
//# sourceMappingURL=ObjectUtil.js.map