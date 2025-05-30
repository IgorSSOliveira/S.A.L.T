const livros = [
  { nome: "Gênesis", id: "Gênesis", capitulos: 50 },
  { nome: "Êxodo", id: "Êxodo", capitulos: 40 },
  { nome: "Levítico", id: "Levítico", capitulos: 27 },
  { nome: "Números", id: "Números", capitulos: 36 },
  { nome: "Deuteronômio", id: "Deuteronômio", capitulos: 34 },
  { nome: "Josué", id: "Josué", capitulos: 24 },
  { nome: "Juízes", id: "Juízes", capitulos: 21 },
  { nome: "Rute", id: "Rute", capitulos: 4 },
  { nome: "1 Samuel", id: "1 Samuel", capitulos: 31 },
  { nome: "2 Samuel", id: "2 Samuel", capitulos: 24 },
  { nome: "1 Reis", id: "1 Reis", capitulos: 22 },
  { nome: "2 Reis", id: "2 Reis", capitulos: 25 },
  { nome: "1 Crônicas", id: "1 Crônicas", capitulos: 29 },
  { nome: "2 Crônicas", id: "2 Crônicas", capitulos: 36 },
  { nome: "Esdras", id: "Esdras", capitulos: 10 },
  { nome: "Neemias", id: "Neemias", capitulos: 13 },
  { nome: "Ester", id: "Ester", capitulos: 10 },
  { nome: "Jó", id: "Jó", capitulos: 42 },
  { nome: "Salmos", id: "Salmos", capitulos: 150 },
  { nome: "Provérbios", id: "Provérbios", capitulos: 31 },
  { nome: "Eclesiastes", id: "Eclesiastes", capitulos: 12 },
  { nome: "Cânticos", id: "Cânticos", capitulos: 8 },
  { nome: "Isaías", id: "Isaías", capitulos: 66 },
  { nome: "Jeremias", id: "Jeremias", capitulos: 52 },
  { nome: "Lamentações", id: "Lamentações", capitulos: 5 },
  { nome: "Ezequiel", id: "Ezequiel", capitulos: 48 },
  { nome: "Daniel", id: "Daniel", capitulos: 12 },
  { nome: "Oseias", id: "Oseias", capitulos: 14 },
  { nome: "Joel", id: "Joel", capitulos: 3 },
  { nome: "Amós", id: "Amós", capitulos: 9 },
  { nome: "Obadias", id: "Obadias", capitulos: 1 },
  { nome: "Jonas", id: "Jonas", capitulos: 4 },
  { nome: "Miquéias", id: "Miquéias", capitulos: 7 },
  { nome: "Naum", id: "Naum", capitulos: 3 },
  { nome: "Habacuque", id: "Habacuque", capitulos: 3 },
  { nome: "Sofonias", id: "Sofonias", capitulos: 3 },
  { nome: "Ageu", id: "Ageu", capitulos: 2 },
  { nome: "Zacarias", id: "Zacarias", capitulos: 14 },
  { nome: "Malaquias", id: "Malaquias", capitulos: 4 },
  { nome: "Mateus", id: "Mateus", capitulos: 28 },
  { nome: "Marcos", id: "Marcos", capitulos: 16 },
  { nome: "Lucas", id: "Lucas", capitulos: 24 },
  { nome: "João", id: "João", capitulos: 21 },
  { nome: "Atos", id: "Atos", capitulos: 28 },
  { nome: "Romanos", id: "Romanos", capitulos: 16 },
  { nome: "1 Coríntios", id: "1 Coríntios", capitulos: 16 },
  { nome: "2 Coríntios", id: "2 Coríntios", capitulos: 13 },
  { nome: "Gálatas", id: "Gálatas", capitulos: 6 },
  { nome: "Efésios", id: "Efésios", capitulos: 6 },
  { nome: "Filipenses", id: "Filipenses", capitulos: 4 },
  { nome: "Colossenses", id: "Colossenses", capitulos: 4 },
  { nome: "1 Tessalonicenses", id: "1 Tessalonicenses", capitulos: 5 },
  { nome: "2 Tessalonicenses", id: "2 Tessalonicenses", capitulos: 3 },
  { nome: "1 Timóteo", id: "1 Timóteo", capitulos: 6 },
  { nome: "2 Timóteo", id: "2 Timóteo", capitulos: 4 },
  { nome: "Tito", id: "Tito", capitulos: 3 },
  { nome: "Filemom", id: "Filemom", capitulos: 1 },
  { nome: "Hebreus", id: "Hebreus", capitulos: 13 },
  { nome: "Tiago", id: "Tiago", capitulos: 5 },
  { nome: "1 Pedro", id: "1 Pedro", capitulos: 5 },
  { nome: "2 Pedro", id: "2 Pedro", capitulos: 3 },
  { nome: "1 João", id: "1 João", capitulos: 5 },
  { nome: "2 João", id: "2 João", capitulos: 1 },
  { nome: "3 João", id: "3 João", capitulos: 1 },
  { nome: "Judas", id: "Judas", capitulos: 1 },
  { nome: "Apocalipse", id: "Apocalipse", capitulos: 22 }
];


const livroSelect = document.getElementById('livro');
const capituloSelect = document.getElementById('capitulo');
const textoBiblico = document.getElementById('textoBiblico');

livros.forEach(livro => {
  const option = document.createElement('option');
  option.value = livro.id;
  option.textContent = livro.nome;
  livroSelect.appendChild(option);
});

livroSelect.addEventListener('change', () => {
  capituloSelect.innerHTML = '';
  const livroSelecionado = livros.find(l => l.id === livroSelect.value);
  for (let i = 1; i <= livroSelecionado.capitulos; i++) {
    const option = document.createElement('option');
    option.value = i;
    option.textContent = i;
    capituloSelect.appendChild(option);
  }

  capituloSelect.selectedIndex = 0;

  carregarTexto();
});

capituloSelect.addEventListener('change', carregarTexto);

function carregarTexto() {
  const livro = livroSelect.value;
  const capitulo = capituloSelect.value;
  const chave = `${livro}-${capitulo}`;

  fetch(`https://bible-api.com/${livro}+${capitulo}?translation=almeida`)
    .then(response => response.json())
    .then(data => {
      if (data.verses) {
        textoBiblico.innerHTML = data.verses.map(v => `<strong>${v.verse}</strong> ${v.text}`).join('<br><br>');
      } else {
        textoBiblico.innerText = "Erro ao carregar capítulo.";
      }

      // Atualiza botão de "lido"
      const jaLido = capitulosLidos.has(chave);
      btnMarcarLido.textContent = jaLido ? '✓ Lido' : 'Marcar como lido';
      btnMarcarLido.setAttribute('aria-pressed', String(jaLido));
      btnMarcarLido.classList.toggle('marked', jaLido);
    })
    .catch(error => {
      console.error(error);
      textoBiblico.innerText = "Erro ao conectar com a API.";
    });
}



livroSelect.selectedIndex = 0;
livroSelect.dispatchEvent(new Event('change'));


const botaoAnterior = document.getElementById('anteriorCapitulo');
const botaoProximo = document.getElementById('proximoCapitulo');

botaoAnterior.addEventListener('click', () => {
  const capAtual = parseInt(capituloSelect.value);
  if (capAtual > 1) {
    capituloSelect.value = capAtual - 1;
    carregarTexto();
  }
});

botaoProximo.addEventListener('click', () => {
  const livroSelecionado = livros.find(l => l.id === livroSelect.value);
  const capAtual = parseInt(capituloSelect.value);
  if (capAtual < livroSelecionado.capitulos) {
    capituloSelect.value = capAtual + 1;
    carregarTexto();
  }
});



const capitulosLidos = new Set();


btnMarcarLido.addEventListener('click', () => {
  const livro = livroSelect.value;
  const capitulo = capituloSelect.value;
  const chave = `${livro}-${capitulo}`;
  const idUsuario = sessionStorage.ID_USUARIO;

  const jaLido = capitulosLidos.has(chave);

  if (jaLido) {
    capitulosLidos.delete(chave);
    btnMarcarLido.textContent = 'Marcar como lido';
    btnMarcarLido.setAttribute('aria-pressed', 'false');
    btnMarcarLido.classList.remove('marked');
  } else {
    capitulosLidos.add(chave);
    btnMarcarLido.textContent = '✓ Lido';
    btnMarcarLido.setAttribute('aria-pressed', 'true');
    btnMarcarLido.classList.add('marked');

    // Envia para o backend com ID do usuário
    fetch("/dashboard/inserirLeitura", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        idUsuario: idUsuario,
        livro: livro,
        capitulo: capitulo
      })
    })
      .then(res => {
        if (res.ok) {
          console.log("Leitura registrada com sucesso!");
        } else {
          console.error("Erro ao registrar leitura");
        }
      })
      .catch(err => {
        console.error("Erro de conexão ao registrar leitura:", err);
      });
  }
});


