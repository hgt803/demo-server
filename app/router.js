/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller, middleware, jwt } = app;
  router.get('/', controller.home.index);

  const namespace = '/onlineShop';
  // const errorHandler = middleware.errorHandler;
  // 登录
  router.post(`${namespace}/signIn`, controller.api.users.signIn);
  // 注册
  router.post(`${namespace}/signUp`, controller.api.users.signUp);
  // 获取用户信息
  router.get(`${namespace}/getUserInfo`, jwt, controller.api.users.getUserInfo);
  // 获取验证码
  router.get(`${namespace}/getVerificationCode`, controller.api.verificationCode.getVerificationCode);

};
