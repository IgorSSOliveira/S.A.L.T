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


function obterProgresso(req, res) {
  const idUsuario = req.params.idUsuario;

  DashboardModel.obterProgresso(idUsuario)
    .then(resultado => {
      if (resultado.length > 0) {
        res.json(resultado[0]);
      } else {
        res.status(404).send("Progresso não encontrado");
      }
    })
    .catch(erro => {
      console.error("Erro ao obter progresso:", erro);
      res.status(500).json(erro.sqlMessage || erro.message);
    });
}


function listarLivros(req, res) {
  const idUsuario = req.params.idUsuario;

  DashboardModel.listarLivrosComProgresso(idUsuario)
    .then(resultado => {
      res.json(resultado);
    })
    .catch(erro => {
      console.error("Erro ao listar livros:", erro);
      res.status(500).json(erro.sqlMessage || erro.message);
    });
}


async function listarCapitulosLidos(req, res) {
  const idUsuario = req.params.idUsuario;

  try {
    const resultado = await DashboardModel.buscarCapitulosLidos(idUsuario);
    res.status(200).json(resultado);
  } catch (erro) {
    console.error("Erro no controller ao listar capítulos lidos:", erro);
    res.status(500).json({ erro: "Erro ao buscar capítulos lidos." });
  }
}


function removerLeitura(req, res) {
  const { idUsuario, livro, capitulo } = req.body;

  DashboardModel.removerLeitura(idUsuario, livro, capitulo)
    .then(() => res.sendStatus(204))
    .catch(erro => {
      console.error("Erro ao remover leitura:", erro);
      res.status(500).json(erro.sqlMessage || erro.message);
    });
}



module.exports = {
  inserirLeitura,
  obterProgresso,
  listarLivros,
  listarCapitulosLidos,
  removerLeitura
};
