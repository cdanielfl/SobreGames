const apiKey = '9813456eb32940b0af1acfe404f4e057';

function getQueryParam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}

async function fetchSearchResults(query) {
  const url = `https://api.rawg.io/api/games?key=${apiKey}&search=${encodeURIComponent(query)}&page_size=20`;
  const response = await fetch(url);
  if (!response.ok) throw new Error('Erro na API');
  const data = await response.json();
  return data.results;
}

function createCard(game) {
  const card = document.createElement('div');
  card.className = 'card-template';
  card.innerHTML = `
    <img src="${game.background_image || ''}" class="card-img-top" alt="${game.name}" />
    <div class="card-body">
      <h5 class="card-title">${game.name}</h5>
      <p class="card-text">${game.released ? `Lançamento: ${game.released}` : 'Data desconhecida'}</p>
      <a href="${game.website || '#'}" class="btn btn-primary" target="_blank" rel="noopener noreferrer">Site Oficial</a>
    </div>
  `;
  return card;
}

async function loadSearch() {
  const query = getQueryParam('query');
  const container = document.getElementById('search-results');

  if (!query) {
    container.textContent = 'Nenhum termo de busca fornecido.';
    return;
  }

  container.textContent = `Buscando por "${query}"...`;

  try {
    const results = await fetchSearchResults(query);
    container.innerHTML = '';

    if (results.length === 0) {
      container.textContent = 'Nenhum jogo encontrado.';
      return;
    }

    results.forEach(game => {
      container.appendChild(createCard(game));
    });
  } catch (error) {
    container.textContent = 'Erro ao carregar os resultados.';
    console.error(error);
  }
}

function redirectToSearchPage() {
  const query = document.getElementById('search-input').value.trim();
  if (query) {
    window.location.href = `search.html?query=${encodeURIComponent(query)}`;
  }
  return false;
}

async function loadCategories() {
  const url = `https://api.rawg.io/api/genres?key=${apiKey}`;
  const res = await fetch(url);
  if (!res.ok) return;
  const data = await res.json();

  const list = document.getElementById('category-list');
  list.innerHTML = '';

  data.results.forEach(genre => {
    const li = document.createElement('li');
    li.innerHTML = `<a class="dropdown-item" href="search.html?query=${encodeURIComponent(genre.name)}">${genre.name}</a>`;
    list.appendChild(li);
  });
}

window.onload = () => {
  loadSearch();
  loadCategories();
};
