const { Controller } = require('egg');

class OrderController extends Controller {
  // 创建订单
  async createOrder() {
    const { ctx } = this;

    const userId = ctx.state.user.userInfo.id;
    const { goodsId, amount, orderId, locationId, subTotal, tax, handling, total } = ctx.request.body;
    // orderId : order_${yyyMMddHHmmss}_${uuid}
    const order = await ctx.model.Order.create({
      userId,
      goodsId,
      locationId,
      amount,
      orderId,
      status: 1,
      subTotal,
      tax,
      handling,
      total,
    });

    ctx.body = {
      errCode: 1000,
      errMsg: '',
      data: order,
    };
  }

  // 修改订单状态
  async updateOrderStatus() {
    const { ctx } = this;

    const { orderId, status } = ctx.request.body;

    // status: -1:cancelled 1:pending 2:on going 3:completed

    await ctx.model.Order.update({
      orderId,
    }, {
      status,
    });

    const order = await ctx.model.Order.findOne({
      orderId,
    }).with('goods');

    const userId = ctx.state.user.userInfo.id;
    let statusTxt;
    if (+status === -1) statusTxt = '已取消';
    else if (+status === 1) statusTxt = '等待配送';
    else if (+status === 2) statusTxt = '配送中';
    else if (+status === 3) statusTxt = '已送达';
    else statusTxt = '为未知状态';
    const content = `您购买的${order.goods.name}商品${statusTxt}`;

    await ctx.model.Notification.create({
      userId,
      content,
      vendor: 'system',
      read: 0,
    });

    ctx.body = {
      errCode: 1000,
      errMsg: '',
      data: order,
    };
  }


  // 计算费用
  async calculateCost() {
    const { ctx } = this;

    const { goods, subtotal, locationId } = ctx.request.body;
    // goods = [
    //   {
    //     id: 2,
    //     amount: 1,
    //   },
    //   {
    //     id: 2,
    //     amount: 1,
    //   },
    // ];

    // locationId


    ctx.body = {
      errCode: 1000,
      errMsg: '',
      data: {
        tax: subtotal * 0.01,
        handling: subtotal * 0.1,
      },
    };
  }

  // 获取订单列表
  async getOrderList() {
    const { ctx } = this;

    const { size, page } = ctx.query;

    const total = await ctx.model.Order.count();
    const userId = ctx.state.user.userInfo.id;

    const list = await ctx.model.Order
      .find({
        userId,
      })
      .with('goods')
      .with('location')
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
  // 获取订单列表
  async pay() {
    const { ctx } = this;

    const userId = ctx.state.user.userInfo.id;
    const { type, orderIdList } = ctx.request.body;
    // orderIdList = JSON.parse(orderIdList);
    const orderList = await ctx.model.Order
      .find({
        // userId,
        orderId: orderIdList,
      });
    let total = 0;

    orderList.forEach(item => {
      total = +total + +item.total;

    });

    const user = await ctx.model.Users
      .findOne({
        id: userId,
      });
    const payment = +user.payment - +total;
    await ctx.model.Users
      .update({
        id: userId,
      }, {
        payment,
      });
    if (type === 'payment') {
      ctx.body = {
        errCode: 1000,
        errMsg: '',
        data: {
          payment,
        },
      };
      return;
    }

    ctx.body = {
      errCode: 1020,
      errMsg: '支付方式错误',
      data: {},
    };
  }
}

module.exports = OrderController;
