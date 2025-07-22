const apiKey = '9813456eb32940b0af1acfe404f4e057';
const url = https://api.rawg.io/api/games?key=${apiKey}&page_size=100;

fetch(url)
  .then(response => response.json())
  .then(data => {
    console.log(data.results); 
  })
  .catch(error => {
    console.error("Erro ao buscar dados:", error);
  });