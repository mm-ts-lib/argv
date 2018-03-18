# @tslib/argv

## 极简 TypeScript 命令行解析库

* 完整的代码提示和类型解析
* 支持标准的命令行语法：program run -p 9000 -h 127.0.0.1
* 支持长短参数，如："-p" 或者 "--port"
* 命令和所有参数均支持默认值
* 自动生成帮助信息
* 干净和非常简单的代码,含注释不超过200行
* 独立代码,无第三方依赖库 
* 便捷的引用方式

# 安装

```bash
  yarn add @tslib/argv
```

# 使用方法
## 1. 引入argv库
> 1. 添加命令行定义文件："cmdline.ts"
```typescript
import argv from '@tslib/argv';
// 自动导入版本信息，也可手工定义
import pkg = require('../package.json');

/**
 * 导出解析后的命令行
 */
export default argv(
  pkg.name,
  pkg.version,
  `  Example using for Test ts argv library
  you can using: "${pkg.name} [cmd] params ..." to test it
  `,
  {
    cmd: {
      short: null,// 定义short为null，设置cmd为命令参数解析模式
      desc: 'config directory ,default is ./config',
      value: 'run', // 缺省值
    },
    port: {
      short: 'p',
      desc: 'service listen port,default:3000',
      value: 3000, // 缺省值
    },
    boo: {
      short: 'b',
      desc: 'service listen port,default:3000',
      value: true, // 缺省值      
    }
  }
);

```

## 2. 创建 .json 导入文件定义 [可选].
> jsonImport.ts 添加到工程源文件目录即可，无需使用import导入
```typescript
declare module "*.json" {
  const value: any;
  export = value;
}

```

## 3. 使用命令行参数
> 
```typescript

import cmdline from './cmdline';

console.log('cmd', cmdline.cmd);
console.log('port', cmdline.port);
console.log('boo', cmdline.boo);

```
# 其他注意事项
> * import cmdline 为只读对象，防止意外改变变量
> * boolean 类型参数接收: null,0,false为 false值，其他为true


# @tslib 
> TypeScript全栈开发库，致力于全部类型化的前后端组件开发