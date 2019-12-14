module.exports = async context => {
  const { host } = context.state;
  const userId = context.session.user.id;

  if (host === userId) {
    await context.postMessage('截止囉!');

    console.log('context.state.orders', context.state.orders);

    const orders = context.state.orders
      .reduce((accum, curr) => {
        const index = accum.length ? (accum.findIndex(
          o => o.order === curr.order && o.type === curr.typed
        )) : -1;

        if (!~index)
          return [
            ...accum,
            {
              order: curr.order,
              type: curr.type,
              count: curr.count,
            },
          ];

        return [
          ...accum.slice(0, index - 1),
          {
            order: context.state.orders[index].order,
            type: context.state.orders[index].type,
            count: context.state.orders[index].count + curr.count,
          },
        ];
      }, [])
      .map(item => {
        const counts = item.count > 1 ? `* ${item.count}` : '';
        const type = item.type ? `(${item.type})` : '';

        return `- ${item.order} ${counts} ${type}`;
      })
      .join('\n');
    await context.postMessage(`訂單：\n${orders}`);
    await context.postMessage('大家記得要給錢喔>__<');

    context.resetState();
  } else {
    await context.postMessage('不是你開的團，不讓你截止(#`皿´)');
  }
};
