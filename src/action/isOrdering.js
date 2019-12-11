const order = require('./order');
const cutOff = require('./cutOff');

module.exports = context => {
  const { text } = context.event.message;

  if (/^我也?要點?(.*)/.test(text)) {
    return order;
  }
  if (text === '截止' || text === '收') {
    return cutOff;
  }
};
