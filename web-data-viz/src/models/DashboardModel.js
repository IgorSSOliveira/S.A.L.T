var database = require("../database/config")

function BuscarprogressoBiblia(id) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ", email, senha)
    var instrucaoSql = `
        SELECT * FROM view_biblia WHERE usuario.id = '${id}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

// Coloque os mesmos parâmetros aqui. Vá para a var instrucaoSql
function BuscarProgressoLivros(id) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", nome, email, senha);

    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var instrucaoSql = `
        SELECT * FROM view_livro WHERE usuario.id = '${id}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}



async function InserirLeitura(fkUsuario, nomeLivro, capitulo) {
    // 1. Buscar o ID do livro pelo nome
    const buscarIdLivroSql = `
        SELECT idLivro FROM Livro WHERE nome = '${nomeLivro}';
    `;

    try {
        const resultado = await database.executar(buscarIdLivroSql);
        if (resultado.length === 0) {
            throw new Error("Livro não encontrado");
        }

        const fkLivro = resultado[0].idLivro;

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



module.exports = {
    BuscarprogressoBiblia,
    BuscarProgressoLivros,
    InserirLeitura
};