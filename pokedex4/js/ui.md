# ui.js

Verantwortlich für UI-Komponenten und Modal-Verwaltung.

## Funktionen:

### `showLoadingSpinner()` / `hideLoadingSpinner()`
- Zeigt/versteckt Loading-Spinner während Datenladung.

### `smallCardTemplate(pokemon)`
- Erstellt kleine Pokémon-Karten für die Hauptansicht.
- Fügt Click-Event für Modal-Öffnung hinzu.

### `bigModel(id)`
- Öffnet detaillierte Pokémon-Ansicht im Modal.
- Lädt Pokémon-Daten und rendert Template.

### `setupNavigationEventListeners(currentId)`
- Fügt Vor/Zurück-Navigation im Modal hinzu.

### `setupTabEventListeners()`
- Verwaltet Tab-Wechsel im Modal (Stats, Moves, etc.).

### `setupCloseButtonEventListener()`
- Fügt Close-Button-Funktionalität hinzu.

### `setupModalOverlayEventListener()`
- Schließt Modal bei Klick außerhalb des Inhalts.

### `showAndHide(hide)`
- Zeigt/versteckt Modal und verwaltet Body-Scroll.

### `initializeUI()`
- Initialisiert UI-Event-Listener beim Seitenload.