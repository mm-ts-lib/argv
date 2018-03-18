"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const process = require("process");
class CmdLineParser {
    constructor(progName, progVersion, cmdDesc, cmdDefine) {
        this._defaultCmdKey = null;
        this._lastArg = null;
        this._progName = progName;
        this._progVersion = progVersion;
        this._cmdDesc = cmdDesc;
        this._cmdLine = cmdDefine;
        this._addVersionArg();
        this._addHelpArg();
    }
    _addVersionArg() {
        const cmdline = this._cmdLine;
        cmdline['version'] = {
            short: 'v',
            desc: 'show current version',
            value: false,
        };
    }
    _addHelpArg() {
        const cmdline = this._cmdLine;
        cmdline['help'] = {
            short: 'h',
            desc: 'show help message',
            value: false,
        };
    }
    _findShort(short) {
        const cmdline = this._cmdLine;
        const keys = Object.keys(cmdline);
        for (let v of keys) {
            if (cmdline[v].short === short) {
                return v;
            }
        }
        return null;
    }
    _getValue(valType, val) {
        let a = val;
        if (typeof valType === 'number') {
            a = Number(val);
        }
        else if (typeof valType === 'boolean') {
            a = !['false', '0', 'null'].includes(val.toLowerCase());
        }
        return a;
    }
    _setLastArg(arg) {
        const cmdline = this._cmdLine;
        this._lastArg = arg;
    }
    parse() {
        const cmdline = this._cmdLine;
        const commandArg = Object.keys(cmdline).find(function (key) {
            return cmdline[key].short === null;
        });
        process.argv.forEach((arg, i) => {
            if (i === 0 || i === 1)
                return;
            if (arg.startsWith("--")) {
                const a = arg.substr(2);
                if (cmdline[a]) {
                    this._setLastArg(a);
                }
                else {
                    this.printHelp('Invalid arg:' + a, true);
                }
            }
            else if (arg.startsWith("-")) {
                const a = arg.substr(1);
                const findedArg = this._findShort(a);
                if (findedArg) {
                    this._setLastArg(findedArg);
                }
                else {
                    this.printHelp('Invalid arg:' + a, true);
                }
            }
            else {
                if (this._lastArg === null) {
                    if (!commandArg) {
                        this.printHelp('Not Need Command Param:', true);
                    }
                    else {
                        cmdline[commandArg].value = arg;
                    }
                }
                else {
                    if (cmdline[this._lastArg]) {
                        console.log('------!!', this._lastArg, arg);
                        cmdline[this._lastArg].value = this._getValue(cmdline[this._lastArg].value, arg);
                    }
                    else {
                        this.printHelp('Parse CmdLine Error:' + this._lastArg + "," + arg, true);
                    }
                }
            }
        });
        if (cmdline.version.value) {
            console.log(this._progName + ' v' + this._progVersion);
            process.exit(1);
        }
        else if (cmdline.help.value) {
            this.printHelp(undefined, true);
        }
        return this._cmdLine;
    }
    printHelp(err, exit) {
        if (err) {
            console.log("ERROR:" + err);
        }
        console.log(this._progName + ' v' + this._progVersion);
        console.log(this._cmdDesc);
        console.log('Params:');
        const cmdline = this._cmdLine;
        Object.keys(cmdline).forEach((cmd) => {
            if (cmdline[cmd].short) {
                console.log(`\t-${cmdline[cmd].short} [ --${cmd} ]: ${cmdline[cmd].desc}`);
            }
            else {
                console.log(`COMMAND: ${cmd} : ${cmdline[cmd].desc}`);
            }
        });
        if (exit) {
            process.exit(1);
        }
    }
}
function default_1(progName, progVersion, desc, define) {
    const parsed = new CmdLineParser(progName, progVersion, desc, define).parse();
    Object.keys(parsed).map(function (key, index) {
        parsed[key] = parsed[key].value;
    });
    return parsed;
}
exports.default = default_1;
