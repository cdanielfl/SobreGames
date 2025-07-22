const apiKey = '9813456eb32940b0af1acfe404f4e057';
const url = `https://api.rawg.io/api/games?key=${apiKey}&page_size=10`;

// Função para traduzir texto usando a API gratuita MyMemory (suporta CORS)
async function traduzirTexto(texto, targetLang = 'pt') {
  const encodedText = encodeURIComponent(texto);
  const url = `https://api.mymemory.translated.net/get?q=${encodedText}&langpair=en|${targetLang}`;

  const response = await fetch(url);
  const data = await response.json();

  if (data.responseStatus !== 200) {
    console.error('Erro na tradução:', data.responseDetails);
    return texto; // Retorna o texto original em caso de erro
  }

  return data.responseData.translatedText;
}

// Função para traduzir os campos relevantes dos jogos
async function traduzirJogos(jogos) {
  const jogosTraduzidos = [];
  for (const jogo of jogos) {
    const nomeTraduzido = await traduzirTexto(jogo.name);
    // Adicione aqui outros campos que deseja traduzir, por exemplo, descrição, gêneros, etc.
    jogosTraduzidos.push({
      ...jogo,
      name: nomeTraduzido
    });
  }
  return jogosTraduzidos;
}

fetch(url)
  .then(response => response.json())
  .then(async data => {
    const jogosTraduzidos = await traduzirJogos(data.results);
    console.log(jogosTraduzidos);
  })
  .catch(error => {
    console.error("Erro ao buscar dados:", error);
  });
