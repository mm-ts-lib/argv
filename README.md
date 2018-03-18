# @tslib/argv

[中文说明](./README.cn.md)

# @tslib/argv

## minimalist TypeScript command line parsing library

* Complete code hinting and type resolution
* Supports standard command line syntax: program run -p 9000 -h 127.0.0.1
* Supports long and short parameters, such as: "-p" or "--port"
* The command and all parameters support default values
* Automatically generate help information
* Clean and very simple code with no more than 200 lines of comments
* Independent code, no third-party dependent libraries?
* Convenient reference

# Install

```bash
  yarn add @tslib/argv
```

# Instructions
## 1. Introducing argv library
> 1. Add the command line definition file: "cmdline.ts"
```typescript
import argv from '@tslib/argv';
// Automatically import version information, it can also be manually defined
import pkg = require('../package.json');

/**
 * Export the parsed command line
 */
export default argv(
  pkg.name,
  pkg.version,
  ` Example using for Test ts argv library
  You can using: "${pkg.name} [cmd] params ..." to test it
  `,
  {
    cmd: {
      short: null, / / ​​Define short is null, set cmd to command parameter parsing mode
      desc: 'config directory ,default is ./config',
      value: 'run', // default value
    },
    port: {
      short: 'p',
      desc: 'service listen port,default:3000',
      value: 3000, // default value
    },
    boo: {
      short: 'b',
      desc: 'service listen port,default:3000',
      value: true, // default value
    }
  }
);

```

## 2. Create a .json import file definition [optional].
> jsonImport.ts added to the project source file directory, without using import import
```typescript
declare module "*.json" {
  const value: any;
  export = value;
}

```

## 3. Using Command Line Parameters
>
```typescript

import cmdline from './cmdline';

console.log('cmd', cmdline.cmd);
console.log('port', cmdline.port);
console.log('boo', cmdline.boo);

```
# Other notes
> * import cmdline is a read-only object that prevents accidental changes to variables
> * boolean type parameter receives  'null', '0', 'false', as false, others are true


# @tslib
> TypeScript full stack development library, dedicated to all types of front and back end component development
