// DASHBOARD BIBLIA

const idUsuario = sessionStorage.ID_USUARIO;
const doughnut = document.getElementById('graficoRosquinha').getContext('2d');

// Função para buscar o progresso real do banco
fetch(`/dashboard/progresso/${idUsuario}`)
  .then(response => {
    if (!response.ok) {
      throw new Error("Erro ao buscar progresso");
    }
    return response.json();
  })
  .then(data => {
    const porcentagem = data.progresso; // Assume que a view retorna { progresso: XX }

    document.getElementById('porcentagemCentro').innerText = porcentagem + '%';

    const naoLido = 100 - porcentagem;

    const chartData = {
      labels: ['Lido', 'Não lido'],
      datasets: [{
        data: [porcentagem, naoLido],
        backgroundColor: ['#50CF01', '#ddd'],
        borderWidth: 0
      }]
    };

    new Chart(doughnut, {
      type: 'doughnut',
      data: chartData,
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
  })
  .catch(error => {
    console.error("Erro ao carregar gráfico:", error);
  });



// DASHBOARDS LIVRO

let livros = [];

async function buscarLivrosDaAPI() {
  const idUsuario = sessionStorage.ID_USUARIO; // ou pegue de onde for salvo
  try {
    const response = await fetch(`/dashboard/livros/${idUsuario}`); // <-- aqui é a rota real
    const data = await response.json();

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
    <span class="containerRegistro"> 
      <div class="nomeLivro">${livro.nome}</div> 
      <span class="porcentagem">${porcentagem}%</span>
    </span>
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

