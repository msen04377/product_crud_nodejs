// create server using http
const http = require('http');

// request handler
const app = require('./app')

// Port
const port = process.env.PORT || 3000;

// server
const server = http.createServer(app);


// server listening
server.listen(port);