const order = require('./order');
const cutOff = require('./cutOff');
const cancel = require('./cancel');
const modify = require('./modify');

module.exports = context => {
  const { text } = context.event.message;

  if (/我要(取消|收回)/.test(text)) {
    return cancel;
  }

  if (/修改訂單/.test(text)) {
    return modify;
  }

  if (/^我也?要點?(.*)/.test(text)) {
    return order;
  }

  if (text === '截止' || text === '收') {
    return cutOff;
  }
};
