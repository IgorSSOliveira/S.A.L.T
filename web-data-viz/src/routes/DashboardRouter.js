var express = require("express");
var router = express.Router();

var usuarioController = require("../controllers/usuarioController");


//Recebendo os dados do html e direcionando para a função cadastrar de usuarioController.js
router.get("/BuscarprogressoBiblia", function (req, res) {
    usuarioController.BuscarprogressoBiblia(req, res);
})

router.get("/BuscarProgressoLivros", function (req, res) {
    usuarioController.BuscarProgressoLivros(req, res);
});

router.post("/InserirLeitura", function (req, res) {
  usuarioController.InserirLeitura(req, res);
});

module.exports = router;