const random = require('random-item');
// const fetch = require('node-fetch');

module.exports = async context => {
  // invalid auth QAQ
  // fetch('https://slack.com/api/users.identity', { token: process.env.SLACK_VERIFICATION_TOKEN })
  //   .then(res => console.log('res', res))
  //   .then(() => console.log('---'));

  const [, ordered] = context.event.message.text.match(/我也?要點?(.*)/);

  const items = ordered.split(' ').filter(d => d.match(/(\S\D)/));

  items.forEach(item => {
    const [, content, num] = item.match(/^([^\*xX]*)[\*Xx]?(\d*)?$/);

    switch (true) {
      case /(感謝|謝謝)/.test(content):
        break;
      case /(不加|不＋｜不+)/.test(content):
        const [, ordered, , notAddType] = content.match(/([^\不]*)(不加|不＋|不+)(.*)/)

        context.setState({
          orders: [
            ...context.state.orders,
            {
              order: ordered.trim(),
              count: Number(num) || 1,
              type: `不加${notAddType}` || '',
            },
          ],
        });

        break;
      case (/^([^\+＋加]*)[\+＋加](.*)/).test(content):
        const [, order, type] = content.match(/^([^\+＋加]*)[\+＋加](.*)/);

        context.setState({
          orders: [
            ...context.state.orders,
            {
              order: order.trim(),
              count: Number(num) || 1,
              type: type || '',
            },
          ],
        });

        break;
      case /(微微|分糖|熱的|溫的|微糖|無糖|去冰|分冰|半半)/.test(content):
        context.setState({
          orders: [
            ...context.state.orders.slice(0, context.state.orders.length - 1),
            {
              ...context.state.orders[context.state.orders.length - 1],
              type: content || '',
            },
          ],
        });
        break;
      default:
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
        break;
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
