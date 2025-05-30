var DashboardModel = require("../models/DashboardModel");

function inserirLeitura(req, res) {
  const { idUsuario, livro, capitulo } = req.body;

  DashboardModel.inserirLeitura(idUsuario, livro, capitulo)
    .then(() => res.status(200).send("Leitura inserida com sucesso!"))
    .catch(erro => {
      console.error(erro);
      res.status(500).send("Erro ao inserir leitura.");
    });
}


module.exports = {
  inserirLeitura
};
