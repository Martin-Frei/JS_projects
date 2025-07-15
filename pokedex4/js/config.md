# config.js

Beinhaltet globale Konfigurationswerte und DOM-Zugriffe.

## Inhalte:

- Globale Variablen:
  - `offset`, `limit`, `loading`, `searchTimeout` für das Paging
  - DOM-Referenzen: `model`, `cardInBox`, `searchInput`, `searchResults`
  - `pokemonCache`: speichert bereits geladene Pokémon zur Wiederverwendung
  - `allPokemonNames`: Map mit allen Pokémonnamen für die Suche

- Farbtabelle:
  - `types`: Ordnet jedem Pokémon-Typ eine Farbe zu.
