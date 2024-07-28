const { Controller } = require('egg');

function getRandomIntInRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

class UsersController extends Controller {
  // 注册
  async signUp() {
    const { ctx } = this;
    const { pwd, phoneNumber, name } = ctx.request.body;
    const userInfo = await ctx.model.Users.find({
      phoneNumber,
    });
    console.log('🚀 ~ UsersController ~ signUp ~ userInfo:', userInfo);
    if (userInfo.name) {
      ctx.body = {
        errCode: 1001,
        errMsg: '该手机号码已注册',
      };
    } else {
      const user = await ctx.model.Users.create({
        name,
        pwd,
        phoneNumber,
      });
      ctx.body = {
        errCode: 1000,
        errMsg: '',
        data: user,
      };
    }
  }
  // 登录
  async signIn() {
    const { ctx } = this;
    const { pwd, phoneNumber } = ctx.request.body;
    console.log('🚀 ~ UsersController ~ signIn ~ ctx.request.body:', ctx.request.body.phoneNumber);
    const userInfo = await ctx.model.Users.find({
      phoneNumber,
    });
    if (userInfo && userInfo.pwd === pwd) {
      // 调用 rotateCsrfSecret 刷新用户的 CSRF token
      ctx.rotateCsrfSecret();
      // 设置用户session-id
      ctx.body = {
        user: userInfo,
        errCode: 1000,
      };
    } else {
      ctx.errCode = 1003;
    }
  }
  // 获取验证码
  async verificationCode() {
    const { ctx } = this;
    ctx.body = {
      errCode: 1000,
      errMsg: '',
      verificationCode: getRandomIntInRange(100000, 999999),
    };
  }
}

module.exports = UsersController;
