const server = require('./server');

const clientesRoutes = require('./src/routes/clientes');
const produtosRoutes = require('./src/routes/produtos');
const pdvRoutes = require('./src/routes/ponto_de_venda');

clientesRoutes(server);
produtosRoutes(server);
pdvRoutes(server);

const PORT = 3000;

server.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
