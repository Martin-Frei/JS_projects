# Getter & Setter - Einfaches Beispiel

## Beschreibung
Dieses Beispiel zeigt die grundlegende Verwendung von Getter und Setter in JavaScript. Es demonstriert, wie man den Zugriff auf Objekteigenschaften kontrollieren und validieren kann.

## Funktionen
- **Getter**: Ermöglicht kontrollierten Zugriff auf private Eigenschaften
- **Setter**: Ermöglicht Validierung beim Setzen von Werten
- **Computed Properties**: Eigenschaften die aus anderen Eigenschaften berechnet werden

## Verwendete Konzepte
- Object Literal mit get/set Syntax
- Validierung von Eingabewerten
- Fehlerbehandlung mit try/catch
- Logging zur Nachverfolgung von Zugriffen

## Dateien
- `index.html` - HTML-Struktur
- `style.css` - CSS-Styling
- `script.js` - JavaScript-Logik

## Ausführung
1. Öffne `index.html` in einem Webbrowser
2. Verwende die Buttons um verschiedene Getter/Setter-Funktionen zu testen
3. Schaue in die Konsole für detaillierte Logs

## Beispiel-Code
```javascript
const person = {
    _firstName: 'Max',
    
    get firstName() {
        return this._firstName;
    },
    
    set firstName(value) {
        if (typeof value === 'string' && value.length > 0) {
            this._firstName = value;
        } else {
            throw new Error('Vorname muss ein nicht-leerer String sein');
        }
    }
};
```

## Lernziele
- Verstehen der get/set Syntax
- Unterschied zwischen öffentlichen und privaten Eigenschaften
- Validierung von Eingabewerten
- Computed Properties (fullName)
- Fehlerbehandlung bei ungültigen Eingaben