"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cmdline_1 = __importDefault(require("./cmdline"));
console.log('cmd', cmdline_1.default.cmd);
console.log('port', cmdline_1.default.port, typeof (cmdline_1.default.port));
console.log('boo', cmdline_1.default.boo, typeof (cmdline_1.default.boo));
//# sourceMappingURL=index.js.map