# Getter & Setter - Mittleres Beispiel

## Beschreibung
Dieses Beispiel zeigt erweiterte Verwendung von Getter und Setter in JavaScript mit einer Temperatursensor-Klasse. Es demonstriert Validierung, Datenhistorie, Computed Properties und automatische UI-Updates.

## Funktionen
- **Temperatur-Validierung**: Werte zwischen -50°C und 50°C
- **Automatische Umrechnung**: Celsius ↔ Fahrenheit
- **Datenhistorie**: Speichert die letzten 10 Temperaturänderungen
- **Statistiken**: Durchschnitt, Min/Max, Zugriffszähler
- **Dynamische UI**: Farbwechsel basierend auf Temperatur
- **Status-Berechnung**: Gefroren, Kalt, Angenehm, Warm, Heiß

## Verwendete Konzepte
- **ES6 Klassen** mit Getter/Setter
- **Validierung** mit detaillierter Fehlerbehandlung
- **Computed Properties** (fahrenheit, status, stats)
- **Datenhistorie** mit automatischer Begrenzung
- **Observer Pattern** für UI-Updates
- **Defensive Programmierung** mit Eingabevalidierung

## Dateien
- `index.html` - HTML-Struktur
- `style.css` - Responsives CSS mit Gradients
- `script.js` - TemperatureSensor Klasse und UI-Logik

## Klassen-Struktur
```javascript
class TemperatureSensor {
    // Private Eigenschaften
    _temperature, _history, _lastAccess, _accessCount
    
    // Getter/Setter
    get/set temperature    // Haupt-Temperatur in Celsius
    get/set fahrenheit     // Automatische Umrechnung
    get status             // Berechneter Status
    get stats              // Statistiken
    get history            // Kopie der Historie
}
```

## Ausführung
1. Öffne `index.html` in einem Webbrowser
2. Setze Temperaturen über die Buttons oder das Eingabefeld
3. Beobachte die dynamischen Farbänderungen
4. Schaue dir Statistiken und Historie an

## Erweiterte Features
- **Datenvalidierung**: Typ- und Wertebereichsprüfung
- **Automatische Rundung**: Auf 1 Dezimalstelle
- **Farbkodierung**: Temperatur-abhängige Visualisierung
- **Responsive Design**: Funktioniert auf allen Geräten
- **Logging**: Detaillierte Konsolen-Ausgaben

## Lernziele
- Klassen-basierte Getter/Setter
- Komplexe Validierungslogik
- Datenhistorie und Statistiken
- Computed Properties mit Abhängigkeiten
- Automatische UI-Updates
- Defensive Programmierung