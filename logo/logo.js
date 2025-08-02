// logo.js
document.addEventListener("DOMContentLoaded", () => {
  fetch("logo/logo.html")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Falha ao carregar logo.html");
      }
      return response.text();
    })
    .then((html) => {
      const container = document.getElementById("logo-container");
      if (container) {
        container.innerHTML = html;
        // Ajustes para o container da logo
        container.classList.add("d-flex", "align-items-center");
        container.style.position = "relative";
        container.style.width = "70px";
        container.style.height = "70px";
      }
    })
    .catch((error) => {
      console.error("Erro ao carregar logo:", error);
    });
});
