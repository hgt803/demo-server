const { Controller } = require('egg');

class HomeController extends Controller {
  // 获取首页数据
  async getHomeData() {
    const { ctx } = this;

    // isBanner: {type: BIGINT, defaultValue: 0,},  // 是否在首页Banner
    // isRecommended: {type: BIGINT, defaultValue: 0,},  // 是否在首页Recommended
    // isPopular: {type: BIGINT, defaultValue: 0,},  // 是否在首页Popular
    const category = await ctx.model.Category.find({
      inHome: 1,
    });

    const banner = await ctx.model.Goods.find({
      isBanner: 1,
    });

    const recommended = await ctx.model.Goods.find({
      isRecommended: 1,
    });

    const popular = await ctx.model.Goods.find({
      isPopular: 1,
    });


    ctx.body = {
      errCode: 1000,
      errMsg: '',
      data: {
        category,
        banner,
        recommended,
        popular,
      },
    };

  }

}

module.exports = HomeController;
