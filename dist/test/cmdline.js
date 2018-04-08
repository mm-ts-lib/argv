"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const argv_1 = __importDefault(require("../argv"));
const package_json_1 = __importDefault(require("../../package.json"));
/**
 * 导出解析后的命令行
 */
exports.default = argv_1.default(package_json_1.default.name, package_json_1.default.version, `  Example using for Test ts argv library
  you can using: "${package_json_1.default.name} [cmd] params ..." to test it
  `, {
    cmd: {
        short: null,
        desc: 'config directory ,default is ./config',
        value: 'run',
    },
    port: {
        short: 'p',
        desc: 'service listen port,default:3000',
        value: 3000,
    },
    boo: {
        short: 'b',
        desc: 'service listen port,default:3000',
        value: false,
    }
});
//# sourceMappingURL=cmdline.js.map