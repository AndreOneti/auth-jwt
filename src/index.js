'use strict'

// Dependencies
var cookieParser = require('cookie-parser');
const express = require('express');
var jwt = require('jsonwebtoken');
const helmet = require('helmet');
const morgan = require('morgan');
require("dotenv-safe").config();
const cors = require('cors');

// Create server
const app = express();

// Disable  x powered
app.disable('x-powered-by');

// Middleware
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res, next) => {
  res.json({ message: "Tudo ok por aqui!" });
});

app.get('/clientes', verifyJWT, (req, res, next) => {
  console.log("Retornou todos clientes!");
  res.json([{ id: 1, nome: 'AndreOneti' }]);
})

//authentication
app.post('/login', (req, res, next) => {
  //esse teste abaixo deve ser feito no seu banco de dados
  if (req.body.user === 'AndreOneti' && req.body.pwd === '123') {
    //auth ok
    const id = 1; //esse id viria do banco de dados
    var token = jwt.sign({ id }, process.env.SECRET, {
      // expiresIn: 300 // expires in 5min
      expiresIn: 10 // expires in 5min
    });
    return res.cookie("x-access-token", token).json({ auth: true, token: token });
  }
  res.status(400).json({ message: 'Login inválido!' });
});

app.post('/logout', function (req, res) {
  res.json({ auth: false, token: null });
});

function verifyJWT(req, res, next) {
  var token = req.headers['x-access-token'];
  console.log(req.cookies);
  if (!token) return res.status(401).json({ auth: false, message: 'No token provided.' });
  jwt.verify(token, process.env.SECRET, function (err, decoded) {
    if (err) return res.status(401).json({ auth: false, message: 'Failed to authenticate token.' });
    // se tudo estiver ok, salva no request para uso posterior
    req.userId = decoded.id;
    console.log(decoded);
    next();
  });
}

module.exports = app;
