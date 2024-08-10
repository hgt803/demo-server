const { Controller } = require('egg');

class GoodsController extends Controller {
  // 新增商品
  async createGoods() {
    const { ctx } = this;

    const goods = await ctx.model.Goods.create(ctx.request.body);
    ctx.body = {
      errCode: 1000,
      errMsg: '',
      data: goods,
    };

  }

}

module.exports = GoodsController;
