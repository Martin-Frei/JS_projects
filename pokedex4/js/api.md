# data.js

Verantwortlich für Datenladung und API-Kommunikation.

## Funktionen:

### `loadAllPokemonNames()`
- Lädt alle Pokémon-Namen von der API (1010 Pokémon).
- Speichert Namen in `allPokemonNames` Map für Suchfunktion.

### `fetchPokemon(id)`
- Lädt einzelne Pokémon-Daten von der API.
- Gibt `null` zurück bei Fehlern.

### `loadPokemonBatch(startIndex, batchSize)`
- Lädt eine Gruppe von Pokémon parallel.
- Speichert Ergebnisse im Cache und erstellt Karten.

### `dataArray()`
- Hauptfunktion für Pokémon-Ladung mit Loading-Status.
- Verhindert mehrfaches Laden und verwaltet Offset.