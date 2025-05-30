var express = require("express");
var router = express.Router();

var DashboardController = require("../controllers/DashboardController");


//Recebendo os dados do html e direcionando para a função cadastrar de usuarioController.js
router.get("/BuscarprogressoBiblia", function (req, res) {
  DashboardController.BuscarprogressoBiblia(req, res);
})

router.get("/BuscarProgressoLivros", function (req, res) {
  DashboardController.BuscarProgressoLivros(req, res);
});

router.post("/inserirLeitura", function (req, res) {
  DashboardController.inserirLeitura(req, res);
});

module.exports = router;