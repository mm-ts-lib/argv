import argv from '../../src/argv';

/**
 * 导出解析后的命令行
 */
export default argv(
  'example',
  '1.0.0',
  `'mmod frame3Server.mod [-c configDir] [-p port]'`,
  {
    conf: {
      short: 'c',
      desc: 'config directory ,default is ./config',
      value: './config', // 缺省值
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

