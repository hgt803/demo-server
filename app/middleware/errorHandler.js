'use strict';
const ERROR_INFO = new Map([
  [ 1000, { code: 1000, msg: '成功' }],
  [ 1001, { code: 1001, msg: '服务器错误' }],
  [ 1002, { code: 1002, msg: '请登录后操作' }],
  [ 1003, { code: 1003, msg: '参数错误' }],
  [ 1004, { code: 1004, msg: '暂无数据' }],
  [ 1005, { code: 1005, msg: '修改失败' }],
  [ 1006, { code: 1006, msg: '删除失败' }],
  [ 1007, { code: 1007, msg: '添加失败' }],
  [ 1008, { code: 1008, msg: '保存文件失败' }],
]);

module.exports = () => {
  return async function errorHandler(ctx, next) {
    try {
      ctx.logger.info('\n================= request start ================');
      if (ctx.method === 'GET')ctx.logger.info(JSON.stringify(ctx.request.query, null, 2));
      else ctx.logger.info(JSON.stringify(ctx.request.body, null, 2));
      ctx.logger.info('\n================= request end ================');

      await next();
      if (!ctx.errCode) throw Error('服务器错误：缺少errCode');
      ctx.body = {
        err: ERROR_INFO.get(ctx.errCode),
        resp: ctx.body || '',
      };
      ctx.status = 200;
      ctx.logger.info('\n================ response start =================');
      ctx.logger.info(JSON.stringify(ctx.body, null, 2));
      ctx.logger.info('\n================ response end =================');

    } catch (err) {
      // 所有的异常都在 app 上触发一个 error 事件，框架会记录一条错误日志
      ctx.app.emit('error', err, ctx);

      const status = err.status || 500;
      // 生产环境时 500 错误的详细错误内容不返回给客户端，因为可能包含敏感信息
      const error = status === 500 && ctx.app.config.env === 'prod'
        ? 'Internal Server Error'
        : err.message;

      // 从 error 对象上读出各个属性，设置到响应中
      ctx.body = { error };
      if (status === 422) {
        ctx.body.detail = err.errors;
      }
      ctx.status = status;
    }
  };
};
