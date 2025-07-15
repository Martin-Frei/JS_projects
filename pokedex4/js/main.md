# main.js

Zentrale Initialisierungsdatei der App.

## Funktion:

### `init()`
- Führt beim Seitenstart:
  1. `loadAllPokemonNames()` → für Suchfunktion
  2. `dataArray()` → lädt erste 30 Pokémon
  3. `initInfiniteScroll()` → aktiviert das Scroll-Event
