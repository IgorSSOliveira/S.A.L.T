var usuarioModel = require("../models/usuarioModel");

function InserirLeitura(req, res) {
    const { idUsuario, livro, capitulo } = req.body;

    usuarioModel.InserirLeitura(idUsuario, livro, capitulo)
        .then(() => res.status(200).send("Leitura inserida com sucesso!"))
        .catch(erro => {
            console.error(erro);
            res.status(500).send("Erro ao inserir leitura.");
        });
}


module.exports = {
  InserirLeitura
};
