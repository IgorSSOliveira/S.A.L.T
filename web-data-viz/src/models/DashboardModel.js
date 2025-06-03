var database = require("../database/config")


async function inserirLeitura(fkUsuario, nomeLivro, capitulo) {

    const buscarIdLivroSql = `
        SELECT id FROM livro WHERE nome = '${nomeLivro}';
    `;

    try {
        const resultado = await database.executar(buscarIdLivroSql);
        if (resultado.length === 0) {
            throw new Error("Livro não encontrado");
        }

        const fkLivro = resultado[0].id;

        const inserirSql = `
            INSERT INTO leitura (fkUsuario, fkLivro, livro, capitulo)
            VALUES (${fkUsuario}, ${fkLivro}, '${nomeLivro}', ${capitulo});
        `;
        console.log("Executando:\n", inserirSql);
        return database.executar(inserirSql);

    } catch (erro) {
        console.error("Erro ao inserir leitura:", erro);
        throw erro;
    }
}


function obterProgresso(idUsuario) {
    const instrucaoSql =
        `SELECT * FROM view_biblia WHERE fkUsuario = ${idUsuario};
    `;
    return database.executar(instrucaoSql);
}

function listarLivrosComProgresso(idUsuario) {
    const instrucaoSql = `
        SELECT * FROM view_livro WHERE fkUsuario = ${idUsuario};
    `;
    return database.executar(instrucaoSql);
}

function buscarCapitulosLidos(idUsuario) {
  const instrucaoSql = `
    SELECT livro, capitulo 
    FROM leitura 
    WHERE fkUsuario = ${idUsuario};
  `;

  return database.executar(instrucaoSql);
}


function removerLeitura(idUsuario, livro, capitulo) {
  const instrucaoSql = `
    DELETE FROM leitura WHERE fkUsuario = ${idUsuario} AND livro = '${livro}' AND capitulo = ${capitulo};
`;
  return database.executar(instrucaoSql);
}




module.exports = {
    inserirLeitura,
    obterProgresso,
    listarLivrosComProgresso,
    buscarCapitulosLidos,
    removerLeitura
};