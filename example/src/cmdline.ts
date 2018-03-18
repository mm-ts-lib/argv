import argv from './argv';

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
      short: null,
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
      value: false, // 缺省值      
    }
  }
);

