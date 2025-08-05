// Função para buscar dados reais da API
async function loadGameData() {
    const urlParams = new URLSearchParams(window.location.search);
    const gameId = urlParams.get('id');
    
    if (!gameId) {
        document.body.innerHTML = '<h1>ID do jogo não fornecido</h1>';
        return;
    }
    
    try {
        const apiKey = '9813456eb32940b0af1acfe404f4e057';
        const response = await fetch(`https://api.rawg.io/api/games/${gameId}?key=${apiKey}`);
        
        if (!response.ok) {
            throw new Error('Jogo não encontrado');
        }
        
        const game = await response.json();
        
        // Preencher elementos HTML
        document.getElementById('game-cover').src = game.background_image || 'https://via.placeholder.com/300x400';
        document.getElementById('game-title').textContent = game.name;
        document.getElementById('game-developer').textContent = `Desenvolvedor: ${game.developers?.[0]?.name || 'N/A'}`;
        document.getElementById('game-release').textContent = `Lançamento: ${game.released || 'N/A'}`;
        document.getElementById('game-description').textContent = game.description_raw || game.description || 'Descrição não disponível';
        document.getElementById('game-genre').textContent = game.genres?.map(g => g.name).join(', ') || 'N/A';
        document.getElementById('game-rating').textContent = game.rating || 'N/A';
        
        // Preencher plataformas
        const platformsContainer = document.getElementById('game-platforms');
        const platformsList = document.getElementById('game-platforms-list');
        
        platformsContainer.innerHTML = '';
        platformsList.innerHTML = '';
        
        if (game.platforms) {
            game.platforms.forEach(platform => {
                const span = document.createElement('span');
                span.textContent = platform.platform.name;
                span.className = 'platform-badge';
                platformsContainer.appendChild(span);
                
                const p = document.createElement('p');
                p.textContent = platform.platform.name;
                platformsList.appendChild(p);
            });
        }
        
    } catch (error) {
        console.error('Erro ao carregar jogo:', error);
        document.body.innerHTML = `
            <div style="text-align: center; padding: 50px;">
                <h1>Erro ao carregar jogo</h1>
                <p>${error.message}</p>
                <button onclick="history.back()" class="btn btn-primary">Voltar</button>
            </div>
        `;
    }
}

async function loadRelatedGames(genres) {
    if (!genres || genres.length === 0) return;

    const apiKey = '9813456eb32940b0af1acfe404f4e057';
    const genreNames = genres.map(g => g.name).join(',');

    try {
        // Buscar jogos da mesma categoria (usando o primeiro gênero para simplicidade)
        const response = await fetch(`https://api.rawg.io/api/games?key=${apiKey}&genres=${genreNames}&page_size=10`);
        if (!response.ok) throw new Error('Erro ao buscar jogos relacionados');
        const data = await response.json();

        const container = document.getElementById('related-games-container');
        container.innerHTML = '';

        data.results.forEach(game => {
            const gameCard = document.createElement('div');
            gameCard.className = 'related-game-card';
            gameCard.innerHTML = `
                <img src="${game.background_image || 'https://via.placeholder.com/150'}" alt="${game.name}" />
                <p>${game.name}</p>
            `;
            gameCard.onclick = () => {
                window.location.href = `gamepage.html?id=${game.id}`;
            };
            container.appendChild(gameCard);
        });
    } catch (error) {
        console.error(error);
    }
}

async function loadGameData() {
    const urlParams = new URLSearchParams(window.location.search);
    const gameId = urlParams.get('id');
    
    if (!gameId) {
        document.body.innerHTML = '<h1>ID do jogo não fornecido</h1>';
        return;
    }
    
    try {
        const apiKey = '9813456eb32940b0af1acfe404f4e057';
        const response = await fetch(`https://api.rawg.io/api/games/${gameId}?key=${apiKey}`);
        
        if (!response.ok) {
            throw new Error('Jogo não encontrado');
        }
        
        const game = await response.json();
        
        // Preencher elementos HTML
        document.getElementById('game-cover').src = game.background_image || 'https://via.placeholder.com/300x400';
        document.getElementById('game-title').textContent = game.name;
        document.getElementById('game-developer').textContent = `Desenvolvedor: ${game.developers?.[0]?.name || 'N/A'}`;
        document.getElementById('game-release').textContent = `Lançamento: ${game.released || 'N/A'}`;
        document.getElementById('game-description').textContent = game.description_raw || game.description || 'Descrição não disponível';
        document.getElementById('game-genre').textContent = game.genres?.map(g => g.name).join(', ') || 'N/A';
        document.getElementById('game-rating').textContent = game.rating || 'N/A';
        
        // Preencher plataformas
        const platformsContainer = document.getElementById('game-platforms');
        const platformsList = document.getElementById('game-platforms-list');
        
        platformsContainer.innerHTML = '';
        platformsList.innerHTML = '';
        
        if (game.platforms) {
            game.platforms.forEach(platform => {
                const span = document.createElement('span');
                span.textContent = platform.platform.name;
                span.className = 'platform-badge';
                platformsContainer.appendChild(span);
                
                const p = document.createElement('p');
                p.textContent = platform.platform.name;
                platformsList.appendChild(p);
            });
        }

        // Carregar jogos relacionados
        await loadRelatedGames(game.genres);

    } catch (error) {
        console.error('Erro ao carregar jogo:', error);
        document.body.innerHTML = `
            <div style="text-align: center; padding: 50px;">
                <h1>Erro ao carregar jogo</h1>
                <p>${error.message}</p>
                <button onclick="history.back()" class="btn btn-primary">Voltar</button>
            </div>
        `;
    }
}

document.addEventListener('DOMContentLoaded', loadGameData);
