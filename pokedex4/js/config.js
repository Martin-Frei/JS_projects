
let model = document.getElementById("model");
let cardInBox = document.getElementById("bigCard");
let searchInput = document.getElementById("searchInput");
let searchResults = document.getElementById("searchResults");
let offset = 1;
let limit = 45;
let loading = false;
let searchTimeout;


let types = {
    normal: "#A8A878",
    fire: "#F08030",
    water: "#6890F0",
    electric: "#F8D030",
    grass: "#78C850",
    ice: "#98D8D8",
    fighting: "#C03028",
    poison: "#A040A0",
    ground: "#E0C068",
    flying: "#A890F0",
    bug: "#A8B820",
    rock: "#B8A038",
    ghost: "#705898",
    dragon: "#7038F8",
    dark: "#705848",
    steel: "#B8B8D0",
    fairy: "#EE99AC",
};


let pokemonCache = new Map();
let allPokemonNames = new Map(); 