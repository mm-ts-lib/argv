"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const process_1 = __importDefault(require("process"));
class CmdLineParser {
    // 构造函数
    constructor(progName, progVersion, cmdDesc, cmdDefine) {
        this._defaultCmdKey = null;
        this._lastArg = null;
        this._progName = progName;
        this._progVersion = progVersion;
        this._cmdDesc = cmdDesc;
        this._cmdLine = cmdDefine;
        // 添加参数显示版本信息
        this._addVersionArg();
        this._addHelpArg();
    }
    // 私有函数
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
    /**
     * 查找短参数关联对象
     * @param short 短参数，不含 ‘-’
     * @returns 短参数对应的 arg name
     */
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
        // 如果是 bool 类型的参数，直接设置为true
        if (typeof cmdline[arg].value === 'boolean') {
            cmdline[arg].value = true;
        }
    }
    // 公有函数
    // 执行解析，返回结果
    parse() {
        // 遍历所有参数，检测是否是参数定义，检测是长参数还是短参数
        const cmdline = this._cmdLine;
        // 检测命令参数
        const commandArg = Object.keys(cmdline).find(function (key) {
            return cmdline[key].short === null;
        });
        // debugger;
        process_1.default.argv.forEach((arg, i) => {
            // 跳过参数 0,1
            if (i === 0 || i === 1)
                return;
            if (arg.startsWith("--")) {
                // 长参数
                const a = arg.substr(2);
                if (cmdline[a]) {
                    this._setLastArg(a);
                }
                else {
                    this.printHelp('Invalid arg:' + a, true);
                }
            }
            else if (arg.startsWith("-")) {
                // 短参数
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
                // 第一个命令或者是上一个参数的值
                if (this._lastArg === null) {
                    if (!commandArg) {
                        // 如果未设置命令参数则报错
                        this.printHelp('Not Need Command Param:', true);
                    }
                    else {
                        cmdline[commandArg].value = arg;
                    }
                }
                else {
                    // 解析为上一个参数的值
                    if (cmdline[this._lastArg]) {
                        cmdline[this._lastArg].value = this._getValue(cmdline[this._lastArg].value, arg);
                    }
                    else {
                        this.printHelp('Parse CmdLine Error:' + this._lastArg + "," + arg, true);
                    }
                }
            }
        });
        // 检测是否是缺省命令,--help 或者 --version，执行缺省命令并退出
        if (cmdline.version.value) {
            console.log(this._progName + ' v' + this._progVersion);
            process_1.default.exit(1);
        }
        else if (cmdline.help.value) {
            this.printHelp(undefined, true);
            process_1.default.exit(1);
        }
        return this._cmdLine;
    }
    printHelp(err, exit) {
        if (err) {
            console.log("ERROR:" + err);
        }
        // 输出版本
        console.log(this._progName + ' v' + this._progVersion);
        // 输出命令简介
        console.log(this._cmdDesc);
        // 输出使用说明
        console.log('Params:');
        const cmdline = this._cmdLine;
        Object.keys(cmdline).forEach((cmd) => {
            // short 参数不为空则显示短参数
            if (cmdline[cmd].short) {
                console.log(`\t-${cmdline[cmd].short} [ --${cmd} ]: ${cmdline[cmd].desc}`);
            }
            else {
                // 命令说明
                console.log(`COMMAND: ${cmd} : ${cmdline[cmd].desc}`);
            }
            // const short = cmdline[cmd].short ? `[-${cmdline[cmd].short}]` : '';
            // console.log(`\t--${cmd} ${short}: ${cmdline[cmd].desc}`);
        });
        if (exit) {
            process_1.default.exit(1);
        }
    }
}
// 导出映射对象，
function default_1(progName, progVersion, desc, define) {
    // map 解析后的cmd对象
    // const mapCmdLine = _.mapValues(new CmdLineParser(progName, progVersion, desc, define)
    //   .parse(), o => o.value);
    const parsed = new CmdLineParser(progName, progVersion, desc, define).parse();
    Object.keys(parsed).map(function (key, index) {
        parsed[key] = parsed[key].value;
    });
    return parsed;
}
exports.default = default_1;
//# sourceMappingURL=argv.js.map