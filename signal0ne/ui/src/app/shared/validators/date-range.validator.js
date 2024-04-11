"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dateRangeValidator = void 0;
const dateRangeValidator = (dateFromKey, dateToKey) => (group) => {
    const formGroup = group;
    const dateFromValue = formGroup.get(dateFromKey)?.value;
    const dateToValue = formGroup.get(dateToKey)?.value;
    if (dateFromValue && dateToValue && new Date(dateFromValue).getTime() > new Date(dateToValue).getTime()) {
        formGroup.get(dateFromKey)?.setErrors({ dateRangeInvalid: true });
        formGroup.get(dateToKey)?.setErrors({ dateRangeInvalid: true });
        return new Date(dateFromValue).getTime() > new Date(dateToValue).getTime() ? { dateRangeInvalid: true } : null;
    }
    else {
        formGroup.get(dateFromKey)?.setErrors(null);
        formGroup.get(dateToKey)?.setErrors(null);
        return null;
    }
};
exports.dateRangeValidator = dateRangeValidator;
//# sourceMappingURL=date-range.validator.js.map