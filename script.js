const apiKey = '9813456eb32940b0af1acfe404f4e057';

function redirectToSearchPage() {
  const query = document.getElementById('search-input').value.trim();
  if (query) {
    window.location.href = `search/search.html?query=${encodeURIComponent(query)}`;
  }
  return false;
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
      <button class="btn btn-primary" onclick="openGamePage('${game.id}')">Ver Detalhes</button>
    </div>
  `;
  return card;
}

async function loadPopularGames() {
  const url = `https://api.rawg.io/api/games?key=${apiKey}&ordering=-added&page_size=10`;
  const res = await fetch(url);
  if (!res.ok) throw new Error('Erro na API');
  const data = await res.json();

  const games = data.results;
  const container = document.getElementById('popular-row');
  container.innerHTML = '';

  games.forEach(game => {
    container.appendChild(createCard(game));
  });
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
    li.innerHTML = `<a class="dropdown-item" href="search/search.html?query=${encodeURIComponent(genre.name)}">${genre.name}</a>`;
    list.appendChild(li);
  });
}

// Navegação dos botões scroll
const btnLeft = document.getElementById('scroll-left');
const btnRight = document.getElementById('scroll-right');
const row = document.getElementById('popular-row');

btnLeft.addEventListener('click', () => {
  row.scrollBy({ left: -400, behavior: 'smooth' });
});
btnRight.addEventListener('click', () => {
  row.scrollBy({ left: 400, behavior: 'smooth' });
});

// Navegação para Jogos Recentes
const btnLeftRecent = document.getElementById('scroll-left-recent');
const btnRightRecent = document.getElementById('scroll-right-recent');
const rowRecent = document.getElementById('recent-row');

btnLeftRecent.addEventListener('click', () => {
  rowRecent.scrollBy({ left: -400, behavior: 'smooth' });
});
btnRightRecent.addEventListener('click', () => {
  rowRecent.scrollBy({ left: 400, behavior: 'smooth' });
});

// Navegação para Jogos Bem Avaliados
const btnLeftRated = document.getElementById('scroll-left-rated');
const btnRightRated = document.getElementById('scroll-right-rated');
const rowRated = document.getElementById('rated-row');

btnLeftRated.addEventListener('click', () => {
  rowRated.scrollBy({ left: -400, behavior: 'smooth' });
});
btnRightRated.addEventListener('click', () => {
  rowRated.scrollBy({ left: 400, behavior: 'smooth' });
});

// Navegação para Próximos Lançamentos
const btnLeftUpcoming = document.getElementById('scroll-left-upcoming');
const btnRightUpcoming = document.getElementById('scroll-right-upcoming');
const rowUpcoming = document.getElementById('upcoming-row');

btnLeftUpcoming.addEventListener('click', () => {
  rowUpcoming.scrollBy({ left: -400, behavior: 'smooth' });
});
btnRightUpcoming.addEventListener('click', () => {
  rowUpcoming.scrollBy({ left: 400, behavior: 'smooth' });
});

// Navegação para Jogos Gratuitos
const btnLeftFree = document.getElementById('scroll-left-free');
const btnRightFree = document.getElementById('scroll-right-free');
const rowFree = document.getElementById('free-row');

btnLeftFree.addEventListener('click', () => {
  rowFree.scrollBy({ left: -400, behavior: 'smooth' });
});
btnRightFree.addEventListener('click', () => {
  rowFree.scrollBy({ left: 400, behavior: 'smooth' });
});

// Função para carregar jogos mais recentes
async function loadRecentGames() {
  const url = `https://api.rawg.io/api/games?key=${apiKey}&ordering=-released&page_size=10`;
  const res = await fetch(url);
  if (!res.ok) throw new Error('Erro na API');
  const data = await res.json();

  const games = data.results;
  const container = document.getElementById('recent-row');
  container.innerHTML = '';

  games.forEach(game => {
    container.appendChild(createCard(game));
  });
}

// Função para carregar jogos mais bem avaliados
async function loadTopRatedGames() {
  const url = `https://api.rawg.io/api/games?key=${apiKey}&ordering=-rating&page_size=10`;
  const res = await fetch(url);
  if (!res.ok) throw new Error('Erro na API');
  const data = await res.json();

  const games = data.results;
  const container = document.getElementById('rated-row');
  container.innerHTML = '';

  games.forEach(game => {
    container.appendChild(createCard(game));
  });
}

// Função para carregar próximos lançamentos
async function loadUpcomingGames() {
  const url = `https://api.rawg.io/api/games?key=${apiKey}&dates=2024-12-01,2025-12-31&ordering=released&page_size=10`;
  const res = await fetch(url);
  if (!res.ok) throw new Error('Erro na API');
  const data = await res.json();

  const games = data.results;
  const container = document.getElementById('upcoming-row');
  container.innerHTML = '';

  games.forEach(game => {
    container.appendChild(createCard(game));
  });
}

// Função para carregar jogos gratuitos
async function loadFreeGames() {
  const url = `https://api.rawg.io/api/games?key=${apiKey}&tags=freetoplay&page_size=10`;
  const res = await fetch(url);
  if (!res.ok) throw new Error('Erro na API');
  const data = await res.json();

  const games = data.results;
  const container = document.getElementById('free-row');
  container.innerHTML = '';

  games.forEach(game => {
    container.appendChild(createCard(game));
  });
}

function openGamePage(gameId) {
  window.location.href = `gamepage/gamepage.html?id=${gameId}`;
}

window.onload = () => {
  loadPopularGames();
  loadCategories();
  loadRecentGames();
  loadTopRatedGames();
  loadUpcomingGames();
  loadFreeGames();
};
