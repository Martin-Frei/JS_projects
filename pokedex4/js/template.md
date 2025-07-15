# templates.js

Verantwortlich für HTML-Template-Generierung.

## Funktionen:

### `createLoadingSpinnerTemplate()`
- Erstellt Pokéball-Loading-Spinner HTML.

### `createSmallCardTemplate(pokemon)`
- Generiert HTML für kleine Pokémon-Karten in der Hauptansicht.
- Zeigt ID, Name, Erfahrung, Größe, Gewicht und Typ.

### `createBigModelTemplate(pokemon)`
- Haupttemplate für Modal-Ansicht.
- Kombiniert alle Teilkomponenten zu vollständiger Detailansicht.

### `createPokemonImagesTemplate(pokemon)`
- Erstellt Bildergalerie (Front, Back, Shiny-Form).

### `createBasicInfoTemplate(pokemon, heightInM, weightInKg)`
- Generiert Grundinformationen (Größe, Gewicht, Erfahrung).

### `createTypesTemplate(pokemon)`
- Erstellt Typ-Badges mit Farbkodierung.

### `createAbilitiesTemplate(pokemon)`
- Generiert Fähigkeiten-Badges (inkl. versteckte Fähigkeiten).

### `createTabNavigationTemplate()`
- Erstellt Tab-Navigation für Modal (Stats, Moves).

### `createTabContentTemplate(pokemon, totalStats)`
- Kombiniert alle Tab-Inhalte.

### `createStatsTabTemplate(pokemon, totalStats)`
- Generiert Statistiken-Tab mit Balkendiagramm.

### `createMovesTabTemplate(pokemon)`
- Erstellt Attacken-Tab (limitiert auf 12 Angriffe).

### `createSearchResultTemplate(result)`
- Template für Suchergebnisse mit Bild und Namen.