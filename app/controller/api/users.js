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
    const { ctx, app } = this;
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

      // 生成 token 的方式
      const token = app.jwt.sign({
        userInfo, // 需要存储的 token 数据
      }, app.config.jwt.secret);
      // 前端的使用
      //     config.headers['Authorization'] = `Bearer ${getToken()}`

      ctx.body = {
        errCode: 1000,
        errMsg: '',
        data: {
          token,
        },
      };
    } else {
      ctx.body = {
        errCode: 1004,
        errMsg: '密码错误',
        data: {},
      };
    }
  }
  // 获取用户信息
  async getUserInfo() {
    const { ctx } = this;
    const phoneNumber = ctx.state.user.userInfo.phoneNumber;
    const userInfo = await ctx.model.Users.findOne({
      phoneNumber,
    });
    ctx.body = {
      errCode: 1000,
      errMsg: '',
      data: userInfo,
    };
  }
}

module.exports = UsersController;
