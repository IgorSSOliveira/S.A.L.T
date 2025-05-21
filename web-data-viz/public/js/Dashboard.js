// DASHBOARD BIBLIA
const ctx = document.getElementById('graficoRosquinha').getContext('2d');

// Porcentagem que você quer mostrar
const porcentagem = 72.5;

// Atualiza o texto no centro da rosquinha
document.getElementById('porcentagemCentro').innerText = porcentagem + '%';

const data = {
    labels: ['Lido', 'Não lido'],
    datasets: [{
        data: [porcentagem, 100 - porcentagem],
        backgroundColor: ['#50CF01', '#ddd'],
        borderWidth: 0
    }]
};


const grafico = new Chart(ctx, {
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

const livros = [
    { nome: "Gênesis", lidos: 25, total: 50 },
    { nome: "Êxodo", lidos: 0, total: 40 },
    { nome: "Levítico", lidos: 0, total: 27 },
    { nome: "Números", lidos: 0, total: 36 },
    { nome: "Deuteronômio", lidos: 0, total: 34 },
    { nome: "Josué", lidos: 0, total: 24 },
    { nome: "Juízes", lidos: 0, total: 21 },
    { nome: "Rute", lidos: 0, total: 4 },
    { nome: "1 Samuel", lidos: 0, total: 31 },
    { nome: "2 Samuel", lidos: 0, total: 24 },
    { nome: "1 Reis", lidos: 0, total: 22 },
    { nome: "2 Reis", lidos: 0, total: 25 },
    { nome: "1 Crônicas", lidos: 0, total: 29 },
    { nome: "2 Crônicas", lidos: 0, total: 36 },
    { nome: "Esdras", lidos: 0, total: 10 },
    { nome: "Neemias", lidos: 0, total: 13 },
    { nome: "Ester", lidos: 0, total: 10 },
    { nome: "Jó", lidos: 0, total: 42 },
    { nome: "Salmos", lidos: 70, total: 150 },
    { nome: "Provérbios", lidos: 18, total: 31 },
    { nome: "Eclesiastes", lidos: 0, total: 12 },
    { nome: "Cantares de Salomão", lidos: 0, total: 8 },
    { nome: "Isaías", lidos: 0, total: 66 },
    { nome: "Jeremias", lidos: 0, total: 52 },
    { nome: "Lamentações", lidos: 0, total: 5 },
    { nome: "Ezequiel", lidos: 0, total: 48 },
    { nome: "Daniel", lidos: 0, total: 12 },
    { nome: "Oseias", lidos: 0, total: 14 },
    { nome: "Joel", lidos: 0, total: 3 },
    { nome: "Amós", lidos: 0, total: 9 },
    { nome: "Obadias", lidos: 0, total: 1 },
    { nome: "Jonas", lidos: 0, total: 4 },
    { nome: "Miquéias", lidos: 0, total: 7 },
    { nome: "Naum", lidos: 0, total: 3 },
    { nome: "Habacuque", lidos: 0, total: 3 },
    { nome: "Sofonias", lidos: 0, total: 3 },
    { nome: "Ageu", lidos: 0, total: 2 },
    { nome: "Zacarias", lidos: 0, total: 14 },
    { nome: "Malaquias", lidos: 0, total: 4 },
    { nome: "Mateus", lidos: 15, total: 28 },
    { nome: "Marcos", lidos: 0, total: 16 },
    { nome: "Lucas", lidos: 0, total: 24 },
    { nome: "João", lidos: 0, total: 21 },
    { nome: "Atos", lidos: 0, total: 28 },
    { nome: "Romanos", lidos: 0, total: 16 },
    { nome: "1 Coríntios", lidos: 0, total: 16 },
    { nome: "2 Coríntios", lidos: 0, total: 13 },
    { nome: "Gálatas", lidos: 0, total: 6 },
    { nome: "Efésios", lidos: 0, total: 6 },
    { nome: "Filipenses", lidos: 0, total: 4 },
    { nome: "Colossenses", lidos: 0, total: 4 },
    { nome: "1 Tessalonicenses", lidos: 0, total: 5 },
    { nome: "2 Tessalonicenses", lidos: 0, total: 3 },
    { nome: "1 Timóteo", lidos: 0, total: 6 },
    { nome: "2 Timóteo", lidos: 0, total: 4 },
    { nome: "Tito", lidos: 0, total: 3 },
    { nome: "Filemom", lidos: 0, total: 1 },
    { nome: "Hebreus", lidos: 0, total: 13 },
    { nome: "Tiago", lidos: 0, total: 5 },
    { nome: "1 Pedro", lidos: 0, total: 5 },
    { nome: "2 Pedro", lidos: 0, total: 3 },
    { nome: "1 João", lidos: 0, total: 5 },
    { nome: "2 João", lidos: 0, total: 1 },
    { nome: "3 João", lidos: 0, total: 1 },
    { nome: "Judas", lidos: 0, total: 1 },
    { nome: "Apocalipse", lidos: 0, total: 22 }
];


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

    // Aplica filtro logo ao carregar
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

carregarLivros();
