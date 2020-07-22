'use strict'

const { User } = require('./models');
const express = require('express');
var jwt = require('jsonwebtoken');

const router = express();

const $where = function () {
  return (this.D_E_L_E_T_ === "" && this.email !== "admin@admin.io")
}

router.get('/', async (req, res, next) => {
  let users = await User.find({ $where });
  res.json({ message: "Tudo ok por aqui!", users });
});

router.get('/clientes', verifyJWT, (req, res, next) => {
  res.json([{ id: 1, nome: 'AndreOneti' }]);
});

//authentication
router.post('/login', (req, res, next) => {
  //esse teste abaixo deve ser feito no seu banco de dados
  const { username, password } = req.body;
  const { authorization = '' } = req.headers;

  if (username === 'AndreOneti' && password === '123' && authorization === 'Basic QW5kcmVPbmV0aToxMjM=') {

    const expires_in = 300;

    //auth ok
    const id = 1; //esse id viria do banco de dados

    var access_token = jwt.sign({ id }, process.env.SECRET, {
      expiresIn: expires_in // expires in 5min
    });

    return res.json({ access_token, expires_in });
  }

  res.status(400).json({ message: 'Login inválido!' });
});

router.post('/logout', function (req, res) {
  res.json({ auth: false, token: null });
});

function verifyJWT(req, res, next) {
  const { authorization } = req.headers;
  const token = authorization.split(' ')[1] || '';

  if (!token) return res.status(401).json({ auth: false, message: 'No token provided.' });

  jwt.verify(token, process.env.SECRET, function (err, decoded) {

    if (err) return res.status(401).json({ auth: false, message: 'Failed to authenticate token.' });

    // se tudo estiver ok, salva no request para uso posterior
    req.userId = decoded.id;
    console.log(decoded);

    next();
  });
}

module.exports = router;
