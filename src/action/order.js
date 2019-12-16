const random = require('random-item');

module.exports = async context => {
  const [, ordered] = context.event.message.text.match(/我也?要點?(.*)/);

  const items = ordered.split(' ').filter(d => d.match(/(\S\D)/));

  items.forEach(item => {
    const [, content, num] = item.match(/^([^\*xX]*)[\*Xx]?(\d*)?$/);

    if (/(微微|分糖|熱的|溫的|微糖|無糖|去冰|分冰)/.test(content)) {
      context.setState({
        orders: [
          ...context.state.orders.slice(0, context.state.orders.length - 1),
          {
            ...context.state.orders[context.state.orders.length - 1],
            type: content || '',
          },
        ],
      });
    } else {
      context.setState({
        orders: [
          ...context.state.orders,
          {
            order: content.trim(),
            count: Number(num) || 1,
            type: '',
          },
        ],
      });
    }
  });

  await context.postMessage(
    random([
      `摁摁 ${items.join('、')}`,
      `你點的是 ${items.join('、')}（筆記中.......`,
      `好喔>__< 你點的是 ${items.join('、')}`,
    ])
  );
};
