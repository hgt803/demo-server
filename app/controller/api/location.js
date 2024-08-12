const { Controller } = require('egg');

class LocationController extends Controller {
  // 新增收货地址
  async createLocation() {
    const { ctx } = this;

    const userId = ctx.state.user.userInfo.id;
    const { location, lng, lat } = ctx.request.body;

    const result = await ctx.model.Location.create({
      location,
      userId, lng, lat,
    });

    ctx.body = {
      errCode: 1000,
      errMsg: '',
      data: result,
    };

  }

  // 删除收货地址
  async removeLocation() {
    const { ctx } = this;

    // const userId = ctx.state.user.userInfo.id;
    const { id } = ctx.request.body;

    const result = await ctx.model.Location.remove({
      id,
    });

    ctx.body = {
      errCode: 1000,
      errMsg: '',
      data: result,
    };

  }

  // 修改收货地址
  async updateLocation() {
    const { ctx } = this;

    // const userId = ctx.state.user.userInfo.id;
    const { location, id, lng, lat } = ctx.request.body;

    const result = await ctx.model.Location.update(
      {
        id,
      }, {
        location, lng, lat,
      });

    ctx.body = {
      errCode: 1000,
      errMsg: '',
      data: result,
    };

  }

  // 获取收货地址
  async getLocation() {
    const { ctx } = this;

    const userId = ctx.state.user.userInfo.id;
    const { size, page } = ctx.request.body;

    const total = await ctx.model.Location
      .find({
        userId,
      }).count();

    const list = await ctx.model.Location
      .find({
        userId,
      })
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

module.exports = LocationController;
