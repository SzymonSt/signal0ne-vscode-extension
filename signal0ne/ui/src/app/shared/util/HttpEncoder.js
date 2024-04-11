"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpEncoder = void 0;
class HttpEncoder {
    encodeKey(key) {
        return encodeURIComponent(key);
    }
    encodeValue(value) {
        return encodeURIComponent(value);
    }
    decodeKey(key) {
        return decodeURIComponent(key);
    }
    decodeValue(value) {
        return decodeURIComponent(value);
    }
}
exports.HttpEncoder = HttpEncoder;
//# sourceMappingURL=HttpEncoder.js.map