# search.js

Verantwortlich für Pokémon-Suchfunktionalität.

## Funktionen:

### `filterPokemon(query, limit = 10)`
- Filtert Pokémon-Namen basierend auf Suchanfrage.
- Mindestens 3 Zeichen erforderlich, maximal 10 Ergebnisse.

### `renderSearchResults(results)`
- Erstellt HTML-Elemente für Suchergebnisse.
- Fügt Click-Events für Modal-Öffnung hinzu.

### `searchPokemon(query)`
- Hauptfunktion für Pokémon-Suche.
- Zeigt Loading-Status und verwaltet UI-Sichtbarkeit.

## Event-Listener:

### Input-Event
- Debounced Search mit 300ms Verzögerung.
- Verhindert zu häufige API-Aufrufe.

### Click-Event
- Schließt Suchergebnisse bei Klick außerhalb.