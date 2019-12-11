const startOrder = require('./startOrder');

module.exports = async context => {
  const { text } = context.event.message;

  // how to use
  if (/(怎麼?|如何)(用|操作|點|開團|指令)/.test(text)) {
    await context.postMessage(`
      指令：\n
      - 開團：請輸入『開團』\n
      - 截止： 請輸入『截止』或『收』\n
      - 下訂單： 請輸入『我要點XXX』
    `);
  }

  // start order
  if (context.event.text === '開團') {
    return startOrder;
  }
};
