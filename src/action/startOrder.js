const getMenu = require('../webScraping');

module.exports = async context => {
  const { user } = context.session;

  const text = context.event.message.text.split(' ');

  context.setState({
    ordering: true,
    host: user.id,
  });

  await context.postMessage('開團囉! 大家快來點!');

  if (text.length === 1) return;

  const menu = await getMenu(text[1]);

  if (menu) {
    const list = menu.map(item => `- ${item}`).join('\n');

    await context.postMessage(`這是菜單\n${list}`);
  } else {
    await context.postMessage('找不到菜單ＱＡＱ');
  }
};
