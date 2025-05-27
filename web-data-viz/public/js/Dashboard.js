// DASHBOARD BIBLIA
const doughnut = document.getElementById('graficoRosquinha').getContext('2d');

// Porcentagem que você quer mostrar
const porcentagem = 50;

// Atualiza o texto no centro da rosquinha
document.getElementById('porcentagemCentro').innerText = porcentagem + '%';

const naoLido = 100 - porcentagem;

const data = {
    labels: ['Lido', 'Não lido'],
    datasets: [{
        data: [porcentagem, naoLido],
        backgroundColor: ['#50CF01', '#ddd'],
        borderWidth: 0
    }]
};


const grafico = new Chart(doughnut, {
    type: 'doughnut',
    data: data,
    options: {
        plugins: {
            legend: {
                labels: {
                    color: 'white'
                }
            }
        }
    }
});


// DASHBOARDS LIVRO

let livros = [];

async function buscarLivrosDaAPI() {
    try {
        const response = await fetch('/sua_rota_da_api/view_livro'); // ajuste conforme sua API
        const data = await response.json();

        // Exemplo esperado de data: [{ nome: "Gênesis", lidos: 25, total: 50 }, ...]
        livros = data;

        carregarLivros(); // Só chama após obter os dados
    } catch (error) {
        console.error('Erro ao buscar livros:', error);
    }
}

function gerarHTMLLivro(livro) {
    const porcentagem = livro.total > 0 ? (livro.lidos / livro.total * 100).toFixed(2) : 0;
    return `
    <div class="itemLivro" data-lidos="${livro.lidos}">
      <div class="nomeLivro">${livro.nome}</div>
      <div class="barraProgresso">
        <div class="barraInterna" style="width: ${porcentagem}%;"></div>
      </div>
      <div class="qtdCapitulos">${livro.lidos}/${livro.total}</div>
    </div>
  `;
}

function carregarLivros() {
    const listaOrdenada = [...livros].sort((a, b) => (b.lidos / b.total) - (a.lidos / a.total));
    const principais = listaOrdenada.slice(0, 4);
    const todos = listaOrdenada;

    document.getElementById("listaLivrosPrincipais").innerHTML = principais.map(gerarHTMLLivro).join("");
    document.getElementById("todosLivros").innerHTML = todos.map(gerarHTMLLivro).join("");

    filtrarLivrosSemProgresso();
}

function abrirPopup() {
    document.getElementById("popupTodosLivros").classList.remove("hidden");
}

function fecharPopup() {
    document.getElementById("popupTodosLivros").classList.add("hidden");
}

function filtrarLivrosSemProgresso() {
    const ocultar = document.getElementById("ocultarSemProgresso").checked;
    const livros = document.querySelectorAll("#todosLivros .itemLivro");
    livros.forEach(el => {
        const lidos = parseInt(el.getAttribute("data-lidos"));
        el.style.display = ocultar && lidos === 0 ? "none" : "block";
    });
}

// Inicia o carregamento ao abrir a página
buscarLivrosDaAPI();

