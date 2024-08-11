const { Controller } = require('egg');

class NotificationController extends Controller {
  // 新增通知
  async createNotification() {
    const { ctx } = this;
    const notification = await ctx.model.Notification.create(ctx.request.body);
    ctx.body = {
      errCode: 1000,
      errMsg: '',
      data: notification,
    };

  }
  // 获取通知
  async getNotification() {
    const { ctx } = this;

    const userId = ctx.state.user.userInfo.id;
    const { size, page } = ctx.query;
    const total = await ctx.model.Notification
      .find({
        userId,
      }).count();

    const list = await ctx.model.Notification
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

  // 已阅读通知
  async readNotification() {
    const { ctx } = this;

    const { id } = ctx.request.body;
    await ctx.model.Notification.update(
      { id },
      {
        read: true,
      }
    );

    ctx.body = {
      errCode: 1000,
      errMsg: '',
      data: {},
    };

  }
}

module.exports = NotificationController;
