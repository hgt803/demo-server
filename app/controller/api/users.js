const { Controller } = require('egg');

function getRandomIntInRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

class UsersController extends Controller {
  // 注册
  async signUp() {
    const { ctx } = this;
    const { pwd, phoneNumber, name, verificationCode } = ctx.request.body;
    const userInfo = await ctx.model.Users.find({
      phoneNumber,
    });
    if (userInfo.length) {
      ctx.body = {
        errCode: 1001,
        errMsg: '该手机号码已注册',
      };
    } else {
      const a = await ctx.model.VerificationCode.findOne({
        phoneNumber,
      });
      if (!a || a.verificationCode !== verificationCode) {
        ctx.body = {
          errCode: 1002,
          errMsg: '验证码错误',
          data: {},
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
  }
  // 登录
  async signIn() {
    const { ctx } = this;
    const { pwd, phoneNumber } = ctx.request.body;
    const userInfo = await ctx.model.Users.findOne({
      phoneNumber,
    });
    if (!userInfo) {
      ctx.body = {
        errCode: 1003,
        errMsg: '无此用户，请注册',
        data: {},
      };
      return;
    }
    if (userInfo.pwd === pwd) {
      // 调用 rotateCsrfSecret 刷新用户的 CSRF token
      ctx.rotateCsrfSecret();
      // 设置用户session-id
      ctx.body = {
        errCode: 1000,
        errMsg: '',
        data: userInfo,
      };
    } else {
      ctx.body = {
        errCode: 1004,
        errMsg: '密码错误',
        data: {},
      };
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
