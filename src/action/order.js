const random = require('random-item');

module.exports = async context => {
  console.log('text', context.event.message.text);
  const [, ordered] = context.event.message.text.match(/^我也?要點?(.*)/);

  const items = ordered.split(' ').filter(d => d.match(/(\S\D)/));

  items.forEach((item, itemIndex) => {
    const [, content, num] = item.match(/^([^\*xX]*)[\*Xx]?(\d*)?$/);
    const index = context.state.orders.findIndex(o => o && o.order === content);

    console.log('content', content);

    if (/(微微|分糖|熱的|溫的|微糖|無糖|去冰|分冰)/.test(content)) {
      console.log('---', {
        orders: [
          ...context.state.orders.slice(0, itemIndex - 1),
          {
            ...context.state.orders[itemIndex - 1],
            type: content,
          },
          ...context.state.orders.slice(itemIndex),
        ],
      });
      context.setState({
        orders: [
          ...context.state.orders.slice(0, itemIndex - 1),
          {
            ...context.state.orders[itemIndex - 1],
            type: content,
          },
          ...context.state.orders.slice(itemIndex),
        ],
      });
    } else {
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
