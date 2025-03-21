"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Sorts steps by their number
 * @param a The first step
 * @param b The second step
 */
exports.default = (a, b) => {
    return a.number - b.number;
};
