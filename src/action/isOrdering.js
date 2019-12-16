const { router, text } = require('bottender/router');
const order = require('./order');
const cutOff = require('./cutOff');
const cancel = require('./cancel');
const modify = require('./modify');

module.exports = () => {
  return router([
    text(/我要(取消|收回)/, cancel),
    text(/修改訂單/, modify),
    text(/^我也?要點?(.*)/, order),
    text(['截止', '收'], cutOff),
  ]);
};
