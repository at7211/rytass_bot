const order = require('./order');

module.exports = async context => {
  const userId = context.session.userId;

  const userIndex = context.state.orders.findIndex(
    order => order.id === userId
  );

  context.setState({
    orders: [
      ...context.state.orders.slice(0, userIndex - 1),
      {
        ...context.state.orders[userIndex],
      },
      ...context.state.orders.slice(userIndex + 1),
    ],
  });

  context.sendText('好啦幫你修改個');

  return order;
};
