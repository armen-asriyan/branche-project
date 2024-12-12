// Sélection des éléments du menu hamburger et de la barre latérale
const sidebarMenu = document.getElementById("sidebar-menu");
const hamburgerMenuBtn = document.getElementById("hamburger-menu-btn");
const hamburgerBtnIcon = document.querySelector("#hamburger-menu-btn > i");

// Ajout d'un écouteur d'événements pour le bouton hamburger
hamburgerMenuBtn.addEventListener("click", (event) => {
  // Empêche le comportement par défaut
  event.preventDefault();
  // Bascule l'icône entre le hamburger et la croix
  hamburgerBtnIcon.classList.toggle("fa-x");
  // Ouvre/ferme le menu latéral
  sidebarMenu.classList.toggle("open");
  // Empêche le défilement de la page
  document.body.classList.toggle("no-scroll");
});

// Sélection des éléments de pagination
const paginationNumbers = document.getElementById("pagination-numbers");
const articles = document.querySelectorAll(".clickable-article");
const totalArticles = articles.length;

// Configuration de la pagination
const articlesPerPage = 2;
// Calcul du nombre total de pages
const pageCount = Math.ceil(totalArticles / articlesPerPage);
let currentPage = 1;

// Fonction pour afficher les articles d'une page spécifique
function displayPage(page) {
  // Calcul de l'index de début et de fin pour les articles de la page
  const startIndex = (page - 1) * articlesPerPage;
  const endIndex = startIndex + articlesPerPage;

  // Affiche/masque les articles en fonction de la page
  articles.forEach((article, index) => {
    if (index >= startIndex && index < endIndex) {
      article.style.display = "block";
    } else article.style.display = "none";
  });
}

// Fonction pour créer et ajouter un bouton de numéro de page
const appendPageNumber = (index) => {
  const pageNumber = document.createElement("button");

  // Configuration du bouton de pagination
  pageNumber.className = "pagination-number";
  pageNumber.textContent = index;
  pageNumber.setAttribute("aria-label", `Page ${index}`);

  // Ajout d'un écouteur d'événements pour changer de page
  pageNumber.addEventListener("click", () => {
    displayPage(index);
    updateActiveButton(pageNumber);
  });

  // Ajout du bouton à la zone de pagination
  paginationNumbers?.appendChild(pageNumber);
};

// Variable pour suivre le bouton actif
let currentActiveButton = null;

// Fonction pour mettre à jour le bouton de page actif
const updateActiveButton = (newActiveButton) => {
  // Retire la classe active du bouton précédent
  if (currentActiveButton) {
    currentActiveButton.classList.remove("active");
  }
  // Ajoute la classe active au nouveau bouton
  newActiveButton.classList.add("active");
  currentActiveButton = newActiveButton;
};

// Fonction pour générer les boutons de pagination
const getPaginationNumbers = () => {
  // Crée un bouton pour chaque page
  for (let i = 1; i <= pageCount; i++) {
    appendPageNumber(i);
  }
};

// Événement au chargement de la page
window.addEventListener("load", () => {
  // Génère les boutons de pagination
  getPaginationNumbers();
  // Sélectionne et active le premier bouton de page
  const firstPageButton = paginationNumbers?.querySelector("button");
  if (firstPageButton) {
    displayPage(1);
    updateActiveButton(firstPageButton);
  }
});
