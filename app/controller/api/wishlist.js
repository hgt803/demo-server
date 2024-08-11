const { Controller } = require('egg');

class WishlistController extends Controller {
  // 添加心愿
  async createWishlist() {
    const { ctx } = this;

    const userId = ctx.state.user.userInfo.id;
    const { id: goodsId } = ctx.request.body;

    const wishlist = await ctx.model.Wishlist.create({
      goodsId,
      userId,
    });

    ctx.body = {
      errCode: 1000,
      errMsg: '',
      data: wishlist,
    };
  }

  // 删除心愿
  async deleteWishlist() {
    const { ctx } = this;

    const userId = ctx.state.user.userInfo.id;
    const { id: goodsId } = ctx.request.body;

    const wishlist = await ctx.model.Wishlist.remove({
      goodsId,
      userId,
    });

    ctx.body = {
      errCode: 1000,
      errMsg: '',
      data: wishlist,
    };
  }

  // 获取心愿清单列表
  async getWishlist() {
    const { ctx } = this;

    const userId = ctx.state.user.userInfo.id;
    const { size, page } = ctx.query;

    const total = await ctx.model.Wishlist
      .find({
        userId,
      }).count();

    const list = await ctx.model.Wishlist
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

module.exports = WishlistController;
