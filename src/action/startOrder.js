module.exports = async context => {
  const { user } = context.session;

  context.setState({
    ordering: true,
    host: user.id,
  });

  await context.postMessage('開團囉! 大家快來點!');
};
