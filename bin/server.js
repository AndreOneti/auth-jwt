const app = require('../src');
const http = require('http');

const port = process.env.PORT || 9001;
const host = '0.0.0.0';

app.set('port', port);

const server = http.createServer(app);

server.listen(port, host);
console.log('API rodando em http://localhost:' + port);
