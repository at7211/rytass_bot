module.exports = async context => {
  const userId = context.session.userId;

  const userIndex = context.state.orders.findIndex(
    order => order.id === userId
  );

  context.setState({
    orders: [
      ...context.state.orders.slice(0, userIndex - 1),
      ...context.state.orders.slice(userIndex + 1),
    ],
  });

  context.sendText('好的取消摟！');
};
