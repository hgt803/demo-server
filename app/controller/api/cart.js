const { Controller } = require('egg');

class CartController extends Controller {
  // 修改购物车数据【单个商品】
  async editCart() {
    const { ctx } = this;

    const userId = ctx.state.user.userInfo.id;
    const { goodsId, amount } = ctx.request.body;

    const item = await ctx.model.Cart.findOne({
      goodsId,
      userId,
    });
    let result;
    if (item) {
      if (amount > 0) {
        result = await ctx.model.Cart.update({
          goodsId,
          userId,
        }, {
          amount,
        });
      } else {
        result = await ctx.model.Cart.remove({
          goodsId,
          userId,
        });
      }
    } else {
      if (amount > 0) {
        result = await ctx.model.Cart.create({
          goodsId,
          userId,
          amount,
        });
      }
    }


    ctx.body = {
      errCode: 1000,
      errMsg: '',
      data: result,
    };
  }

  // 获取购物车数据
  async getCart() {
    const { ctx } = this;

    const userId = ctx.state.user.userInfo.id;
    const { size, page } = ctx.query;
    const total = await ctx.model.Cart
      .find({
        userId,
      }).count();

    const list = await ctx.model.Cart
      .find({
        userId,
      })
      .with('goods')
      .order('updatedAt desc')
      .limit(size)
      .offset((page - 1) * size);

    ctx.body = {
      errCode: 1000,
      errMsg: '',
      data: {
        list,
        total,
        size,
        page,
      },
    };
  }
}

module.exports = CartController;
