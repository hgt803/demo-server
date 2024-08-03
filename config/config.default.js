/* eslint valid-jsdoc: "off" */

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1722079991481_9132';

  // add your middleware config here
  config.middleware = [];

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  config.orm = {
    host: '192.168.100.7',
    port: '3306',
    user: 'stop_online',
    password: 'fpKbibQhanKj',
    database: 'stop_online',
    client: 'mysql',
    baseDir: 'model',
    // charset: 'utf8mb4',
  };

  // 关闭csrf
  config.security = {
    csrf: {
      enable: false,
      ignoreJSON: true,
    },
    // domainWhiteList: [ '*' ],
  };

  config.jwt = {
    secret: '123456',
  };

  config.cors = {
    origin: '*',
    // credentials: true,
    // withCredentials: true,
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH',
  };

  config.multipart = {
    mode: 'file',
  };

  config.redis = {
    client: {
      port: '6379',
      host: '192.168.100.7',
      password: '123456',
      db: 0,
    },
  };

  return {
    ...config,
    ...userConfig,
  };
};
