const { Controller } = require('egg');
const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

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
    const id = ctx.state.user.userInfo.id;
    const userInfo = await ctx.model.Users.findOne({
      id,
    });
    ctx.body = {
      errCode: 1000,
      errMsg: '',
      data: userInfo,
    };
  }

  // 修改用户信息
  async updateUserInfo() {
    const { ctx } = this;
    const id = ctx.state.user.userInfo.id;
    // const data = ctx.request.body;
    const result = await ctx.model.Users.update(
      { id },
      {
        ...ctx.request.body,
      }
    );
    if (result) {
      const userInfo = await ctx.model.Users.findOne({
        id,
      });
      ctx.body = {
        errCode: 1000,
        errMsg: '',
        data: userInfo,
      };
    } else {
      ctx.body = {
        errCode: 1005,
        errMsg: '修改失败',
        data: {},
      };
    }

  }

  // 上传头像图片
  async uploadImage() {
    const ctx = this.ctx;
    const file = ctx.request.files[0];
    const name = uuidv4() + path.basename(file.filename);
    // 文件处理，上传到云存储等等
    const url = path.join('/public/image/', name);
    const sysUrl = path.join(process.cwd(), '/app', url);
    try {
      const fileData = fs.readFileSync(file.filepath);
      fs.writeFileSync(sysUrl, fileData);
    } catch (err) {
      throw err;
    }

    ctx.body = {
      url,
    };
  }
}

module.exports = UsersController;
