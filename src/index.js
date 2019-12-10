const random = require('random-item');

async function startOrder(context) {
  const { user } = context.session;

  // await context.postMessage('session', context.session);
  console.log('user', user);
  console.log('session', context.session);

  context.setState({
    ordering: true,
    host: user.id,
  });

  await context.postMessage(`${user.id} 開團囉! 大家快來點!`);
}

async function order(context) {
  const { name } = context.session.user;
  const [, item] = context.event.message.text.match(/^我也?要點?(.*)/);

  context.setState({
    orders: [
      ...context.state.orders,
      {
        name: name,
        order: item.trim(),
      },
    ],
  });

  await context.postMessage(
    random([`我知道 ${name} 你點的是 ${item}`, '（筆記中.......', '好喔>__<'])
  );
}

async function cutOff(context) {
  const { host } = context.state;
  const userId = context.session.user.id;

  if (host === userId) {
    await context.postMessage('截止囉!');

    const orders = context.state.orders
      .map(item => `- ${item.order}`)
      .join('\n');
    await context.postMessage(`訂單：\n${orders}`);
    await context.postMessage('大家記得要給錢喔>__<')

    context.resetState();
  } else {
    await context.postMessage('不是你開的團，不讓你截止(#`皿´)');
  }
}

async function unOrder(context) {
  const { text } = context.event.message;

  // how to use
  if (/(怎麼?|如何)(用|操作|點|開團)/.test(text)) {
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
}

function isOrdering(context) {
  const { text } = context.event.message;

  if (/^我也?要點?(.*)/.test(text)) {
    return order;
  }
  if (text === '截止' || text === '收') {
    return cutOff;
  }
}

module.exports = async function App(context) {
  if (context.state.ordering) {
    return isOrdering;
  }

  return unOrder;
};
