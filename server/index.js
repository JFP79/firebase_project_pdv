const server = require('./server');

const clientesRoutes = require('./src/routes/clientes');
const produtosRoutes = require('./src/routes/produtos');

clientesRoutes(server);
produtosRoutes(server);

const PORT = 3000;

server.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
