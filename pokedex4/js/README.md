# Pokémon-Viewer mit PokeAPI 🐱‍👤

Dies ist eine Web-App, die Daten von der [PokeAPI](https://pokeapi.co/) nutzt, um Pokémon in einer durchsuchbaren und scrollbaren Oberfläche darzustellen. Die App lädt Informationen wie Name, ID, Typ, Fähigkeiten, Statuswerte und Moves.

## 🔧 Projektstruktur

Die Anwendung ist in mehrere JS-Dateien unterteilt:

| Datei         | Zweck |
|---------------|-------|
| `api.js`      | Kommunikation mit der PokeAPI |
| `config.js`   | Globale Variablen und Konfiguration |
| `main.js`     | Initialisierung beim Start |
| `scroll.js`   | Unendliches Scrollen |
| `search.js`   | Suchfunktion mit Vorschlägen |
| `template.js` | Rendert das Frontend |
| `ui.js`       | Darstellung der Pokémon als Karten & Detailansicht |

## ▶️ Verwendung

1. Klone das Repo oder speichere die Dateien lokal.
2. Öffne die `index.html` in einem Browser.
3. Gib eine Pokemon ein oder scrolle – neue Pokémon werden automatisch geladen.
4. Klicke auf ein Pokémon, um Details zu sehen.

## 📦 Technologien

- HTML, CSS, JavaScript (Vanilla)
- [PokeAPI](https://pokeapi.co/)

## 🚀 Features

- Unendliches Scrollen durch alle 1010 Pokémon
- Echtzeitsuche mit Live-Vorschlägen
- Detailansicht mit Stats, Moves, Fähigkeiten
- Farbige Typ-Darstellung

## 📁 Einzeldateien – Erklärung
(Siehe jeweilige Einzeldateien im Projektordner)

## 🔜 Ideen für Weiterentwicklung

- [ ] Sortierfunktion (z. B. nach Typ oder ID)
- [ ] Favoriten-Funktion mit LocalStorage
- [ ] Dark Mode
- [ ] Responsive Design optimieren
- [ ] Barrierefreiheit (z. B. Tastatursteuerung, ARIA-Tags)
- [ ] Caching persistenter machen
