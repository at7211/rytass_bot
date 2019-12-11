module.exports = async context => {
  const { host } = context.state;
  const userId = context.session.user.id;

  if (host === userId) {
    await context.postMessage('截止囉!');

    const orders = context.state.orders
      .map(item => {
        const counts = item.count > 1 ? `* ${item.count}` : '';
        console.log('item', item);

        return `- ${item.order} ${counts} (${item.type})`;
      })
      .join('\n');
    await context.postMessage(`訂單：\n${orders}`);
    await context.postMessage('大家記得要給錢喔>__<');

    context.resetState();
  } else {
    await context.postMessage('不是你開的團，不讓你截止(#`皿´)');
  }
};
