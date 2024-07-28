/** @type Egg.EggPlugin */
module.exports = {
  // had enabled by egg
  // static: {
  //   enable: true,
  // }
  orm: {
    enable: true,
    package: 'egg-orm',
  },
  routerPlus: {
    enable: true,
    package: 'egg-router-plus',
  },
  jwt: {
    enable: true,
    package: 'egg-jwt',
  },
};
