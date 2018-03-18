"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const argv_1 = require("../../src/argv");
exports.default = argv_1.default('example', '1.0.0', `'mmod frame3Server.mod [-c configDir] [-p port]'`, {
    conf: {
        short: 'c',
        desc: 'config directory ,default is ./config',
        value: './config',
    },
    port: {
        short: 'p',
        desc: 'service listen port,default:3000',
        value: 3000,
    },
    boo: {
        short: 'b',
        desc: 'service listen port,default:3000',
        value: true,
    }
});
