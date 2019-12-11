const random = require('random-item');

module.exports = async context => {
  const { id } = context.session.user;
  const [, ordered] = context.event.message.text.match(/^我也?要點?(.*)/);

  const items = ordered.split(' ').filter(d => d.match(/(\S\D)/));

  items.forEach(item => {
    const [, content, num] = item.match(/^([^\*xX]*)[\*Xx]?(\d*)?$/);
    const index = context.state.orders.findIndex(o => o && o.order === content);

    if (!~index) {
      context.setState({
        orders: [
          ...context.state.orders,
          {
            order: content.trim(),
            count: Number(num) || 1,
          },
        ],
      });
    } else {
      context.setState({
        orders: [
          ...context.state.orders.slice(0, index),
          {
            order: content.trim(),
            count: Number(num)
              ? context.state.orders[index].count + Number(num)
              : context.state.orders[index].count + 1,
          },
          ...context.state.orders.slice(index + 1),
        ],
      });
    }
  });

  await context.postMessage(
    random([
      `我知道 ${id} 你點的是 ${items.join('、')}`,
      `你點的是 ${items.join('、')}（筆記中.......`,
      `好喔>__< 你點的是 ${items.join('、')}`,
    ])
  );
};
