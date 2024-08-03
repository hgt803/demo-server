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
  // 修改用户信息
  router.put(`${namespace}/updateUserInfo`, jwt, controller.api.users.updateUserInfo);
  // 上传头像图片
  router.post(`${namespace}/uploadImage`, jwt, controller.api.users.uploadImage);
  // 获取验证码
  router.get(`${namespace}/getVerificationCode`, controller.api.verificationCode.getVerificationCode);


  // 新增通知
  router.post(`${namespace}/createNotification`, jwt, controller.api.notification.createNotification);
  // 获取通知
  router.get(`${namespace}/getNotification`, jwt, controller.api.notification.getNotification);

};
