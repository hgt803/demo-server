const { Controller } = require('egg');

function getRandomIntInRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

class GetVerificationCodeController extends Controller {
  // 获取验证码
  async getVerificationCode() {
    const { ctx } = this;
    const { phoneNumber } = ctx.request.body;


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
