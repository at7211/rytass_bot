const isOrdering = require('./action/isOrdering');
const notOrdering = require('./action/notOrdering');

module.exports = async function App(context) {
  if (context.state.ordering) {
    return isOrdering;
  }

  return notOrdering;
};
