const express = require('express');
const helmet = require('helmet');

const projectRouter = require('./projects/project-router.js');
const actionRouter = require('./actions/action-router.js');

const server = express();

server.use(helmet());
server.use(express.json());

server.use('/api/projects', projectRouter);
server.use('/api/actions', actionRouter);

server.get('/', (req, res) => {
  res.send('<h2>Testing come you see this?</h2>')
});

module.exports = server;
