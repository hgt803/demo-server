'use strict';

module.exports = () => {
  return async function notFoundHandler(ctx, next) {
    await next();
    if (ctx.status === 404 && !ctx.body) {
      if (ctx.acceptJSON) {
        ctx.body = { res: { err: '404', reason: '没找到资源' }, resp: '' };
      } else {
        ctx.status = 301;
        ctx.redirect('/404');
      }
    }
  };
};
