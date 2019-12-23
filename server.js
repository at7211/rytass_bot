const { initializeServer } = require('bottender');

const server = initializeServer();

const port = process.env.PORT || 8080;
server.listen(port, () => {
  console.log(`server is listening on ${port} port...`);
});
