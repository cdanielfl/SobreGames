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

// Navegação dos botões scroll (se quiser, posso adicionar, só avisar)
const btnLeft = document.getElementById('scroll-left');
const btnRight = document.getElementById('scroll-right');
const row = document.getElementById('popular-row');

btnLeft.addEventListener('click', () => {
  row.scrollBy({ left: -400, behavior: 'smooth' });
});
btnRight.addEventListener('click', () => {
  row.scrollBy({ left: 400, behavior: 'smooth' });
});

window.onload = () => {
  loadPopularGames();
  loadCategories();
};
