# Plano para Adicionar Novas Fileiras à Página Principal

## Informações Coletadas:
- A página principal atual tem apenas uma seção "Mais Jogados"
- A API Rawg.io fornece endpoints para: jogos mais recentes, mais bem avaliados, próximos lançamentos, etc.
- A estrutura de cards já está implementada e pode ser reutilizada

## Novas Fileiras a Adicionar:

### 1. **Jogos Mais Recentes**
- Endpoint: `/games?ordering=-released`
- Mostra os jogos lançados mais recentemente
- Posição: Após "Mais Jogados"

### 2. **Jogos Mais Bem Avaliados**
- Endpoint: `/games?ordering=-rating`
- Mostra jogos com melhor avaliação dos usuários
- Posição: Após "Jogos Mais Recentes"

### 3. **Próximos Lançamentos**
- Endpoint: `/games?dates=2024-12-01,2025-12-31&ordering=released`
- Mostra jogos que serão lançados em breve
- Posição: Após "Jogos Mais Bem Avaliados"

### 4. **Jogos Gratuitos**
- Endpoint: `/games?tags=freetoplay`
- Mostra jogos gratuitos para jogar
- Posição: Após "Próximos Lançamentos"

## Implementação:

### Arquivos a Modificar:
1. `index.html` - Adicionar novas sections HTML
2. `script.js` - Adicionar novas funções de carregamento
3. `style.css` - Ajustar estilos se necessário

### Estrutura HTML para cada nova fileira:
```html
<section id="[novo-id]" class="container my-4" style="position: relative;">
  <h2 class="text-center mb-4 text-info">[Título da Seção]</h2>
  <button id="scroll-left-[id]" class="scroll-button">&#8249;</button>
  <div id="[id]-row" class="scroll-row">
    <!-- Cards serão populados por JS -->
  </div>
  <button id="scroll-right-[id]" class="scroll-button">&#8250;</button>
</section>
```

### Funções JavaScript a Adicionar:
- `loadRecentGames()`
- `loadTopRatedGames()`
- `loadUpcomingGames()`
- `loadFreeGames()`

### Estilos CSS:
- Reutilizar classes existentes
- Adicionar variações de cores para diferenciar seções
