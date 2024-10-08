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
  // 获取通知列表
  router.get(`${namespace}/getNotification`, jwt, controller.api.notification.getNotification);
  // 已读通知
  router.put(`${namespace}/readNotification`, jwt, controller.api.notification.readNotification);

  // 新增商品
  router.post(`${namespace}/createGoods`, jwt, controller.api.goods.createGoods);
  // 获取商品详情
  router.get(`${namespace}/getGoodsDetail`, jwt, controller.api.goods.getGoodsDetail);
  // 获取商品列表
  router.get(`${namespace}/getGoodsList`, jwt, controller.api.goods.getGoodsList);

  // 新增标签
  router.post(`${namespace}/createCategory`, jwt, controller.api.category.createCategory);

  // 首页
  router.get(`${namespace}/getHomeData`, jwt, controller.api.home.getHomeData);

  // 添加心愿
  router.post(`${namespace}/createWishlist`, jwt, controller.api.wishlist.createWishlist);
  // 删除心愿
  router.delete(`${namespace}/deleteWishlist`, jwt, controller.api.wishlist.deleteWishlist);
  // 获取心愿清单列表
  router.get(`${namespace}/getWishlist`, jwt, controller.api.wishlist.getWishlist);


  // 添加配送地址
  router.post(`${namespace}/createLocation`, jwt, controller.api.location.createLocation);
  // 删除配送地址
  router.delete(`${namespace}/removeLocation`, jwt, controller.api.location.removeLocation);
  // 修改配送地址
  router.put(`${namespace}/updateLocation`, jwt, controller.api.location.updateLocation);
  // 获取配送地址
  router.get(`${namespace}/getLocation`, jwt, controller.api.location.getLocation);

  // 修改购物车数据【单个商品】
  router.post(`${namespace}/editCart`, jwt, controller.api.cart.editCart);
  // 获取购物车数据
  router.get(`${namespace}/getCart`, jwt, controller.api.cart.getCart);

  // 创建订单
  router.post(`${namespace}/createOrder`, jwt, controller.api.order.createOrder);
  // 修改订单状态
  router.put(`${namespace}/updateOrderStatus`, jwt, controller.api.order.updateOrderStatus);
  // 获取订单列表
  router.get(`${namespace}/getOrderList`, jwt, controller.api.order.getOrderList);
  // 计算费用
  router.post(`${namespace}/calculateCost`, jwt, controller.api.order.calculateCost);
  // 支付
  router.post(`${namespace}/pay`, jwt, controller.api.order.pay);
};
