const swaggerRoutes = require('./swaggerRota');

const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
      title: 'PDV API',
      version: '1.0.0',
      description: 'API para gerenciamento de ponto de venda (PDV)',
    },
    servers: [
      {
        url: `http://localhost:${process.env.PORT || 3000}`,
        description: 'Servidor local',
      },
    ],
    presets: [
      {
        apply: (req, res, next) => {
          res.setHeader('Access-Control-Allow-Origin', '*');
          next();
        },
      },
    ],
    layout: 'Standalone layout',
    paths: {
      ...swaggerRoutes.paths,
    }
  };
  
  module.exports = swaggerDefinition;
  