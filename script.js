const apiKey = '9813456eb32940b0af1acfe404f4e057';
const url = `https://api.rawg.io/api/games?key=${apiKey}&page_size=20`; // Pegando mais jogos pra preencher a fileira

// Função opcional para traduzir nome
async function traduzirTexto(texto, targetLang = 'pt') {
  const encodedText = encodeURIComponent(texto);
  const endpoint = `https://api.mymemory.translated.net/get?q=${encodedText}&langpair=en|${targetLang}`;
  const response = await fetch(endpoint);
  const data = await response.json();
  return data.responseData?.translatedText || texto;
}

async function carregarJogos() {
  const response = await fetch(url);
  const data = await response.json();

  const modelo = document.querySelector('.card-template');
  const row = document.getElementById('movie-row');

  // Armazenar todos os cards
  const cards = [];

  for (const jogo of data.results) {
    // Traduz nome (opcional)
    jogo.name = await traduzirTexto(jogo.name);

    const card = modelo.cloneNode(true);
    card.classList.remove('d-none', 'card-template');

    card.querySelector('.card-img-top').src = jogo.background_image;
    card.querySelector('.card-img-top').alt = jogo.name;
    card.querySelector('.card-title').textContent = jogo.name;
    card.querySelector('.card-text').textContent = jogo.released ? `Lançamento: ${jogo.released}` : 'Data de lançamento desconhecida';
    card.querySelector('.btn-primary').href = jogo.website || '#';

    cards.push(card);
  }

  let startIndex = 0;
  let endIndex = 5;

  // Função para renderizar cards visíveis
  function renderCards() {
    row.innerHTML = '';
    for (let i = startIndex; i < endIndex && i < cards.length; i++) {
      row.appendChild(cards[i]);
    }
  }

  renderCards();

  // Botões de navegação
  const btnLeft = document.getElementById('scroll-left');
  const btnRight = document.getElementById('scroll-right');

  btnLeft.addEventListener('click', () => {
    if (startIndex > 0) {
      startIndex = Math.max(0, startIndex - 2);
      endIndex = startIndex + 5;
      renderCards();
    }
  });

  btnRight.addEventListener('click', () => {
    if (endIndex < cards.length) {
      endIndex = Math.min(cards.length, endIndex + 2);
      startIndex = endIndex - 5;
      renderCards();
    }
  });
}

carregarJogos();
