"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Constants = void 0;
class Constants {
    static paginationLimit = 10;
    static PASSWORD_MIN_LENGTH = 8;
    static PASSWORD_PATTERN = new RegExp(`^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[~!@#$%^&*()_+-]).{${Constants.PASSWORD_MIN_LENGTH},}$`);
}
exports.Constants = Constants;
//# sourceMappingURL=Constant.js.map