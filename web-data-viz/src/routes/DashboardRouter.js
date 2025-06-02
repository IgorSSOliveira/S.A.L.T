var express = require("express");
var router = express.Router();

var DashboardController = require("../controllers/DashboardController");


//Recebendo os dados do html e direcionando para a função cadastrar de usuarioController.js

router.post("/inserirLeitura", function (req, res) {
  DashboardController.inserirLeitura(req, res);
});


router.get("/progresso/:idUsuario", function (req, res) {
  DashboardController.obterProgresso(req, res);
});

router.get("/livros/:idUsuario", function (req, res) {
  DashboardController.listarLivros(req, res);
});

router.get("/capitulos-lidos/:idUsuario", function (req, res) {
  DashboardController.listarCapitulosLidos(req, res);
});

router.delete("/removerLeitura", function (req, res) {
  DashboardController.removerLeitura(req, res);
});

module.exports = router;