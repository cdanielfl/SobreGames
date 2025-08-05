const apiKey = '9813456eb32940b0af1acfe404f4e057';

function getQueryParam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}

let currentPage = 1;
let isLoading = false;
let hasMore = true;

async function fetchSearchResults(query, page = 1) {
  let url;
  if (query) {
    url = `https://api.rawg.io/api/games?key=${apiKey}&search=${encodeURIComponent(query)}&page_size=40&page=${page}`;
  } else {
    url = `https://api.rawg.io/api/games?key=${apiKey}&page_size=40&page=${page}`;
  }
  const response = await fetch(url);
  if (!response.ok) throw new Error('Erro na API');
  const data = await response.json();
  return data;
}

function createCard(game) {
  const card = document.createElement('div');
  card.className = 'card-template';

  // Extract genres names
  const genres = game.genres ? game.genres.map(g => g.name).join(', ') : 'N/A';

  // Rating and ratings count
  const rating = game.rating ? game.rating.toFixed(1) : 'N/A';
  const ratingsCount = game.ratings_count || 0;

  card.innerHTML = `
    <img src="${game.background_image || ''}" class="card-img-top" alt="${game.name}" />
    <div class="card-body">
      <h5 class="card-title">${game.name}</h5>
      <p class="card-text">${game.released ? `Lançamento: ${game.released}` : 'Data desconhecida'}</p>
      <p class="card-text"><strong>Gêneros:</strong> ${genres}</p>
      <p class="card-text"><strong>Avaliação:</strong> ${rating} (${ratingsCount} avaliações)</p>
      <a href="${game.website || '#'}" class="btn btn-primary" target="_blank" rel="noopener noreferrer">Veja Mais</a>
    </div>
  `;
  return card;
}

async function loadSearch() {
  const query = getQueryParam('query');
  const container = document.getElementById('search-results');
  const loadMoreContainer = document.getElementById('load-more-container');

  if (!query) {
    container.textContent = 'Buscando todos os jogos...';
  } else {
    container.textContent = `Buscando por "${query}"...`;
  }

  if (isLoading || !hasMore) return;
  isLoading = true;

  try {
    const data = await fetchSearchResults(query, currentPage);
    const results = data.results;

    if (currentPage === 1) {
      container.innerHTML = '';
    }

    if (results.length === 0 && currentPage === 1) {
      container.textContent = 'Nenhum jogo encontrado.';
      hasMore = false;
      isLoading = false;
      return;
    }

    results.forEach(game => {
      container.appendChild(createCard(game));
    });

    if (data.next) {
      hasMore = true;
      if (!loadMoreContainer) {
        const btn = document.createElement('button');
        btn.id = 'load-more-btn';
        btn.textContent = 'Carregar mais';
        btn.className = 'btn btn-primary my-3';
        btn.addEventListener('click', () => {
          currentPage++;
          loadSearch();
        });
        const parent = container.parentNode;
        const div = document.createElement('div');
        div.id = 'load-more-container';
        div.appendChild(btn);
        parent.appendChild(div);
      }
    } else {
      hasMore = false;
      if (loadMoreContainer) {
        loadMoreContainer.remove();
      }
    }
  } catch (error) {
    container.textContent = 'Erro ao carregar os resultados.';
    console.error(error);
  } finally {
    isLoading = false;
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
