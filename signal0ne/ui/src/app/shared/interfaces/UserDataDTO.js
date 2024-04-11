"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserDataDTO = void 0;
class UserDataDTO {
    id;
    userName;
    isPro;
    constructor(id, userName, isPro = false) {
        this.id = id;
        this.userName = userName;
        this.isPro = isPro;
    }
}
exports.UserDataDTO = UserDataDTO;
//# sourceMappingURL=UserDataDTO.js.map