"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.confirmPasswordValidator = void 0;
const confirmPasswordValidator = (control) => {
    return control.value.password === control.value.passwordConfirmation
        ? null
        : { passwordNoMatch: true };
};
exports.confirmPasswordValidator = confirmPasswordValidator;
//# sourceMappingURL=confirm-password.validator.js.map