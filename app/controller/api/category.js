const { Controller } = require('egg');

class CategoryController extends Controller {
  // 新增标签
  async createCategory() {
    const { ctx } = this;

    const category = await ctx.model.Category.create(ctx.request.body);
    ctx.body = {
      errCode: 1000,
      errMsg: '',
      data: category,
    };

  }

}

module.exports = CategoryController;
