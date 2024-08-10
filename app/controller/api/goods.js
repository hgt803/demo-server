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

  // 获取商品详情
  async getGoodsDetail() {
    const { ctx } = this;
    const { id } = ctx.request.body;

    const userId = ctx.state.user.userInfo.id;

    const wishlist = await ctx.model.Wishlist.find({
      userId,
      goodsId: id,
    });

    const goods = await ctx.model.Goods.findOne({
      id,
    });

    goods.inWishlist = wishlist.length > 0;

    ctx.body = {
      errCode: 1000,
      errMsg: '',
      data: goods,
    };

  }


  // 获取商品列表
  async getGoodsList() {
    const { ctx } = this;

    const { size, page, name, barCode } = ctx.request.body;

    const search = {
      name: { $like: `%${name}%` },
      barCode: { $like: `%${barCode}%` },
    };

    const total = await ctx.model.Goods
      .find(search).count();

    const list = await ctx.model.Goods
      .find(search)
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

module.exports = GoodsController;
