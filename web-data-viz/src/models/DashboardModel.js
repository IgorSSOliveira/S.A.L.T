var database = require("../database/config")


async function inserirLeitura(fkUsuario, nomeLivro, capitulo) {
    // 1. Buscar o ID do livro pelo nome
    const buscarIdLivroSql = `
        SELECT id FROM Livro WHERE nome = '${nomeLivro}';
    `;

    try {
        const resultado = await database.executar(buscarIdLivroSql);
        if (resultado.length === 0) {
            throw new Error("Livro não encontrado");
        }

        const fkLivro = resultado[0].id;

        // 2. Inserir leitura com fkLivro
        const inserirSql = `
            INSERT INTO Leitura (fkUsuario, fkLivro, Livro, capítulo)
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
        `SELECT * FROM view_biblia WHERE fkUsuario = ${idUsuario};`;
    return database.executar(instrucaoSql);
}

function listarLivrosComProgresso(idUsuario) {
    const instrucaoSql = `
        SELECT * FROM view_livro WHERE fkUsuario = ${idUsuario};`;
    return database.executar(instrucaoSql);
}




module.exports = {
    inserirLeitura,
    obterProgresso,
    listarLivrosComProgresso
};