const express = require('express');
const cors = require('cors');

const bodyParser = require('body-parser');
const swagger = require('./swagger/swaggerDef');
const swaggerUi = require('swagger-ui-express');


const server = express();


server.use(bodyParser.json());
server.use(cors());
server.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swagger));

module.exports = server;
