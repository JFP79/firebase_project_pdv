const express = require('express');

const bodyParser = require('body-parser');
const swagger = require('./swagger/swaggerDef');
const swaggerUi = require('swagger-ui-express');

const server = express();

server.use(bodyParser.json());
server.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swagger));

module.exports = server;
