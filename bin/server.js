const app = require('../src');
const http = require('http');

const port = process.env.PORT || 9001;
app.set('port', port);

const server = http.createServer(app);

server.listen(port);
console.log('API rodando em http://localhost:' + port);
