const livros = [
  { nome: "Gênesis", id: "genesis", capitulos: 50 },
  { nome: "Êxodo", id: "exodo", capitulos: 40 },
  { nome: "Levítico", id: "levitico", capitulos: 27 },
  { nome: "Números", id: "numeros", capitulos: 36 },
  { nome: "Deuteronômio", id: "deuteronomio", capitulos: 34 },
  { nome: "Josué", id: "josue", capitulos: 24 },
  { nome: "Juízes", id: "juizes", capitulos: 21 },
  { nome: "Rute", id: "rute", capitulos: 4 },
  { nome: "1 Samuel", id: "1samuel", capitulos: 31 },
  { nome: "2 Samuel", id: "2samuel", capitulos: 24 },
  { nome: "1 Reis", id: "1reis", capitulos: 22 },
  { nome: "2 Reis", id: "2reis", capitulos: 25 },
  { nome: "1 Crônicas", id: "1cronicas", capitulos: 29 },
  { nome: "2 Crônicas", id: "2cronicas", capitulos: 36 },
  { nome: "Esdras", id: "esdras", capitulos: 10 },
  { nome: "Neemias", id: "neemias", capitulos: 13 },
  { nome: "Ester", id: "ester", capitulos: 10 },
  { nome: "Jó", id: "jo", capitulos: 42 },
  { nome: "Salmos", id: "salmos", capitulos: 150 },
  { nome: "Provérbios", id: "proverbios", capitulos: 31 },
  { nome: "Eclesiastes", id: "eclesiastes", capitulos: 12 },
  { nome: "Cânticos", id: "canticos", capitulos: 8 },
  { nome: "Isaías", id: "isaias", capitulos: 66 },
  { nome: "Jeremias", id: "jeremias", capitulos: 52 },
  { nome: "Lamentações", id: "lamentacoes", capitulos: 5 },
  { nome: "Ezequiel", id: "ezequiel", capitulos: 48 },
  { nome: "Daniel", id: "daniel", capitulos: 12 },
  { nome: "Oseias", id: "oseias", capitulos: 14 },
  { nome: "Joel", id: "joel", capitulos: 3 },
  { nome: "Amós", id: "amos", capitulos: 9 },
  { nome: "Obadias", id: "obadias", capitulos: 1 },
  { nome: "Jonas", id: "jonas", capitulos: 4 },
  { nome: "Miquéias", id: "miqueias", capitulos: 7 },
  { nome: "Naum", id: "naum", capitulos: 3 },
  { nome: "Habacuque", id: "habacuque", capitulos: 3 },
  { nome: "Sofonias", id: "sofonias", capitulos: 3 },
  { nome: "Ageu", id: "ageu", capitulos: 2 },
  { nome: "Zacarias", id: "zacarias", capitulos: 14 },
  { nome: "Malaquias", id: "malaquias", capitulos: 4 },
  { nome: "Mateus", id: "mateus", capitulos: 28 },
  { nome: "Marcos", id: "marcos", capitulos: 16 },
  { nome: "Lucas", id: "lucas", capitulos: 24 },
  { nome: "João", id: "joao", capitulos: 21 },
  { nome: "Atos", id: "atos", capitulos: 28 },
  { nome: "Romanos", id: "romanos", capitulos: 16 },
  { nome: "1 Coríntios", id: "1corintios", capitulos: 16 },
  { nome: "2 Coríntios", id: "2corintios", capitulos: 13 },
  { nome: "Gálatas", id: "galatas", capitulos: 6 },
  { nome: "Efésios", id: "efesios", capitulos: 6 },
  { nome: "Filipenses", id: "filipenses", capitulos: 4 },
  { nome: "Colossenses", id: "colossenses", capitulos: 4 },
  { nome: "1 Tessalonicenses", id: "1tessalonicenses", capitulos: 5 },
  { nome: "2 Tessalonicenses", id: "2tessalonicenses", capitulos: 3 },
  { nome: "1 Timóteo", id: "1timoteo", capitulos: 6 },
  { nome: "2 Timóteo", id: "2timoteo", capitulos: 4 },
  { nome: "Tito", id: "tito", capitulos: 3 },
  { nome: "Filemom", id: "filemom", capitulos: 1 },
  { nome: "Hebreus", id: "hebreus", capitulos: 13 },
  { nome: "Tiago", id: "tiago", capitulos: 5 },
  { nome: "1 Pedro", id: "1pedro", capitulos: 5 },
  { nome: "2 Pedro", id: "2pedro", capitulos: 3 },
  { nome: "1 João", id: "1joao", capitulos: 5 },
  { nome: "2 João", id: "2joao", capitulos: 1 },
  { nome: "3 João", id: "3joao", capitulos: 1 },
  { nome: "Judas", id: "judas", capitulos: 1 },
  { nome: "Apocalipse", id: "apocalipse", capitulos: 22 }
];


const livroSelect = document.getElementById('livro');
const capituloSelect = document.getElementById('capitulo');
const textoBiblico = document.getElementById('textoBiblico');
const lerBtn = document.getElementById('lerBtn');

// Preenche o select com os livros
livros.forEach(livro => {
  const option = document.createElement('option');
  option.value = livro.id;
  option.textContent = livro.nome;
  livroSelect.appendChild(option);
});

// Atualiza capítulos quando o livro muda
livroSelect.addEventListener('change', () => {
  capituloSelect.innerHTML = '';
  const livroSelecionado = livros.find(l => l.id === livroSelect.value);
  for (let i = 1; i <= livroSelecionado.capitulos; i++) {
    const option = document.createElement('option');
    option.value = i;
    option.textContent = i;
    capituloSelect.appendChild(option);
  }
});

// Carrega capítulos iniciais para o primeiro livro
livroSelect.dispatchEvent(new Event('change'));

// Botão para ler capítulo
lerBtn.addEventListener('click', () => {
  const livro = livroSelect.value;
  const capitulo = capituloSelect.value;

  fetch(`https://bible-api.com/${livro}+${capitulo}?translation=almeida`)
    .then(response => response.json())
    .then(data => {
      if (data.verses) {
        textoBiblico.innerHTML = data.verses.map(v => `<strong>${v.verse}</strong> ${v.text}`).join('<br>');
      } else {
        textoBiblico.innerText = "Erro ao carregar capítulo.";
      }
    })
    .catch(error => {
      console.error(error);
      textoBiblico.innerText = "Erro ao conectar com a API.";
    });
});
