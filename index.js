const server = require('./server');

const clientesRoutes = require('./rotas/clientes');
const produtosRoutes = require('./rotas/produtos');

clientesRoutes(server);
produtosRoutes(server);

const PORT = 3000;

server.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
