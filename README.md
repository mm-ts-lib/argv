# @tslib/argv

[中文说明](./README.cn.md)

TypeScript Parse Argument Cmd Line


* full code hint
* full typed, all cmdline param have 
* very sample, no third dependencies

# install

```
  yarn add @tslib/argv
```

# usage
```

```


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

