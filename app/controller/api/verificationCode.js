const { Controller } = require('egg');

function getRandomIntInRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

class GetVerificationCodeController extends Controller {
  // 获取验证码
  async getVerificationCode() {
    const { ctx } = this;
    const { phoneNumber } = ctx.request.body;

    var reg = /^1[3456789]\d{9}$/;
    // ^1  以1开头
    // [3456789] 第2位，使用原子表里的任意一个原子都可以
    // \d{9}$  第三位  朝后可以是任意数字  并且最后结尾必须是数字

    if(!reg.test(phoneNumber)){
      ctx.body = {
        errCode: 1010,
        errMsg: '请输入正确的手机号码',
        verificationCode: '',
      };
      return;
    }

    const verificationCode = getRandomIntInRange(1000, 9999);

    await ctx.model.VerificationCode.create({
      verificationCode,
      phoneNumber,
    });


    ctx.body = {
      errCode: 1000,
      errMsg: '',
      verificationCode,
    };
  }
}

module.exports = GetVerificationCodeController;
