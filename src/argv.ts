
/**
 * @fileOverview
 * 定义命令行解析配置
 * 各个业务模块可以导入本文件，获取需要的命令行配置
 * 使用：import cmdLine from '../cmdLine'
 * 
 * 命令行参数解析说明:
 * xxx-program [cmd] -arg1 xxx -arg2 1 --arg3-long 111 222 333 444 -arg4 
 * 1. 命令参数:
 *    解析：在第一个"-"之前的所有参数，合并为空格分割字符串
 *    定义：short为空的参数将被设置为此参数，不能有多个short为空的命令定义
 * 2. 参数分割：
 *    两个以 '-' 为起始的参数 之间所有字符，去除左右的空格和\"引号，作为第一个参数的值
 *    即 arg3-long 的值为字符串 "111 222 333 444"
 * 3. 命令：
 *    命令为第一个不带 “-” 的参数
 *    命令定义映射名称：command
 * 
 * 定义文件写法：

export default _.mapValues(new CmdLineParser(`
Frame3 server
using: 'mmod frame3Server.mod [-c configDir] [-p port]' 
`, {
    conf: {
      short: 'c',
      desc: 'config directory ,default is ./config',
      value: '', // 缺省值
    }
  }).parse(), o => o.value);

 */


import process = require('process');

class CmdLineParser<T> {
  // 私有成员
  private _progName: string;
  private _progVersion: string;
  private _cmdDesc: string;
  private _cmdLine: T;
  private _defaultCmdKey: string | null = null;
  private _lastArg: string | null = null;

  // 构造函数
  constructor(progName: string, progVersion: string, cmdDesc: string, cmdDefine: T) {
    this._progName = progName;
    this._progVersion = progVersion;
    this._cmdDesc = cmdDesc;
    this._cmdLine = cmdDefine;
    // 添加参数显示版本信息
    this._addVersionArg();
    this._addHelpArg();
  }

  // 私有函数
  private _addVersionArg() {
    const cmdline: any = this._cmdLine;
    cmdline['version'] = {
      short: 'v',
      desc: 'show current version',
      value: false, // 缺省值
    }
  }

  private _addHelpArg() {
    const cmdline: any = this._cmdLine;
    cmdline['help'] = {
      short: 'h',
      desc: 'show current version',
      value: false, // 缺省值
    }
  }

  /**
   * 查找短参数关联对象
   * @param short 短参数，不含 ‘-’
   * @returns 短参数对应的 arg name
   */
  private _findShort(short: string): string | null {
    const cmdline: any = this._cmdLine;
    const keys = Object.keys(cmdline);
    for (let v of keys) {
      if (cmdline[v].short === short) {
        return v;
      }
    }
    return null;
  }

  _setLastArg(arg: string): void {
    const cmdline: any = this._cmdLine;
    debugger;
    // 如果是 bool 类型的参数，直接设置为true
    if (typeof cmdline[arg].value === 'boolean') {
      cmdline[arg].value = true;
    } else {
      // 设置lastArg名称
      this._lastArg = arg;
    }
  }

  // 公有函数
  // 执行解析，返回结果
  parse(): T {
    // 遍历所有参数，检测是否是参数定义，检测是长参数还是短参数
    const cmdline: any = this._cmdLine;
    // debugger;
    process.argv.forEach((arg, i) => {
      // 跳过参数 0,1
      if (i === 0 || i === 1) return;

      if (arg.startsWith("--")) {
        // 长参数
        const a = arg.substr(2);
        if (cmdline[a]) {
          this._setLastArg(a);
        } else {
          this.printHelp('Invalid arg:' + a, true);
        }
      } else if (arg.startsWith("-")) {
        // 短参数
        const a = arg.substr(1);
        const findedArg = this._findShort(a);
        if (findedArg) {
          this._setLastArg(findedArg);
        } else {
          this.printHelp('Invalid arg:' + a, true);
        }

      } else {
        // 第一个命令或者是上一个参数的值
        if (this._lastArg === null) {
          // 第一个无 “-” 的参数，为命令参数
          if (cmdline['command']) {
            // 设置命令参数
            if (cmdline['command'].value) {
              // 多个命令，不支持
              this.printHelp('Not Support Multi Command:' + arg + ',' + cmdline['command'], true);
            } else {
              // 设置命令的值
              cmdline['command'].value = arg;
            }
          } else {
            // 打印错误
            this.printHelp('Invalid Command:' + arg, true);
            process.exit(1);
          }
        } else {
          // 解析为上一个参数的值
          if (cmdline[this._lastArg]) {
            cmdline[this._lastArg].value = arg;
          } else {
            this.printHelp('Parse CmdLine Error:' + this._lastArg + "," + arg, true);
          }
        }
      }
    })

    // 检测是否是缺省命令,--help 或者 --version，执行缺省命令并退出
    if (cmdline.version.value) {
      console.log(this._progName + ':' + this._progVersion);
      process.exit(1);
    } else if (cmdline.help.value) {
      this.printHelp(undefined, true);
    }

    return this._cmdLine;
  }

  printHelp(err?: string, exit?: boolean) {
    if (err) {
      console.log("ERROR:" + err);
    }
    // 输出版本信息
    console.log(this._progName + ':' + this._progVersion);

    // 输出命令简介
    console.log(this._cmdDesc);

    // 输出使用说明
    console.log('Usage:');
    const cmdline: any = this._cmdLine;
    Object.keys(cmdline).forEach((cmd) => {
      // short 参数不为空则显示短参数
      const short = cmdline[cmd].short.length > 0 ? `[-${cmdline[cmd].short}]` : '';
      console.log(`\t--${cmd} ${short}: ${cmdline[cmd].desc}`);
    })

    if (exit) {
      process.exit(1);
    }
  }
}

//定义映射value类型
type ICmdItem = {
  [k: string]: {
    short: string,
    value: string | number | boolean,
    desc: string
  }
};

// 从原始对象定义中组织新对象
type IValue<T extends ICmdItem> = {[P in keyof T]: T[P]['value']};

// 导出映射对象，
export default function <T extends ICmdItem>(progName: string, progVersion: string, desc: string, define: T)
  : Readonly<IValue<T>> {
  // map 解析后的cmd对象
  // const mapCmdLine = _.mapValues(new CmdLineParser(progName, progVersion, desc, define)
  //   .parse(), o => o.value);
  const parsed: any = new CmdLineParser(progName, progVersion, desc, define).parse();
  Object.keys(parsed).map(function (key, index) {
    parsed[key] = parsed[key].value;
  });
  return parsed;

  // return mapCmdLine;
}

