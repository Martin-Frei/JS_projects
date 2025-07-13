# 🏋️ Training Timer

Ein konfigurierbarer Timer für Intervall-Training mit Musik-Unterstützung.

## 📋 Features

- **Konfigurierbare Einstellungen**: Alle Zeiten und Wiederholungen frei einstellbar
- **Musik-Integration**: MP3, WAV, M4A und OGG Dateien unterstützt
- **Automatische Lautstärke-Anpassung**: Musik wird während Pausen leiser
- **Visuelle Anzeige**: Klare Unterscheidung zwischen Training und Pause
- **Tastatur-Shortcuts**: Schnelle Bedienung per Tastatur
- **Responsive Design**: Funktioniert auf Desktop und Mobile

## 🎯 Verwendung

### 1. Setup
1. Alle Dateien in einem Ordner ablegen
2. `index.html` in einem Webbrowser öffnen
3. MP3-Datei auswählen

### 2. Konfiguration
- Klick auf "⚙️ Einstellungen" zum Anpassen der Parameter
- Alle Einstellungen werden automatisch beim Training-Start übernommen

### 3. Training starten
- "Start Training" klicken
- Timer beginnt mit konfigurierbarem Countdown
- Musik startet automatisch bei Trainingsbeginn

## ⚙️ Einstellungen

| Parameter | Beschreibung | Bereich |
|-----------|-------------|---------|
| Countdown Start | Vorbereitungszeit in Sekunden | 1-60 |
| Anzahl Blöcke | Anzahl der Trainingsblöcke | 1-10 |
| Runden pro Block | Runden in jedem Block | 1-10 |
| Trainingszeit | Dauer jeder Trainingsphase | 10-300 |
| Kurze Pause | Pause zwischen Runden | 5-120 |
| Lange Pause | Pause zwischen Blöcken | 10-300 |

## ⌨️ Tastatur-Shortcuts

- **Leertaste**: Training starten/pausieren
- **Escape**: Training stoppen
- **S**: Einstellungen ein-/ausblenden

## 📁 Datei-Struktur

```
training-timer/
├── index.html          # Haupt-HTML-Datei
├── styles.css          # Styling und Layout
├── settings.js         # Einstellungen-Management
├── timer.js            # Timer-Logik
├── app.js              # Hauptfunktionen und Event-Handler
└── README.md           # Diese Datei
```

## 🔧 Technische Details

### JavaScript-Module

**settings.js**
- Verwaltet alle konfigurierbaren Parameter
- Validierung der Eingaben
- Event-Listener für Einstellungsänderungen

**timer.js**
- Kern-Timer-Logik
- Phasen-Management (Countdown, Training, Pause)
- Display-Updates

**app.js**
- Hauptfunktionen (Start, Pause, Stop)
- Musik-Management
- Tastatur-Shortcuts
- Fehlerbehandlung

### CSS-Features
- Glasmorphismus-Design
- Animationen und Übergänge
- Responsive Layout
- Gradient-Hintergrund

## 🎵 Unterstützte Audio-Formate

- MP3 (empfohlen)
- WAV
- M4A
- OGG

## 📱 Browser-Kompatibilität

- Chrome 60+
- Firefox 55+
- Safari 11+
- Edge 79+

## 🚀 Erweiterungsmöglichkeiten

- **Service Worker**: Offline-Funktionalität
- **Statistiken**: Training-Sessions speichern
- **Benachrichtigungen**: Browser-Notifications
- **Themes**: Verschiedene Farbschemas
- **Presets**: Vordefinierte Training-Programme

## 🐛 Bekannte Probleme

- Auf iOS Safari kann Autoplay blockiert werden
- Sehr große Audio-Dateien können Performance beeinträchtigen

## 📝 Änderungsprotokoll

### Version 1.1
- Vollständige Modularisierung in separate JS-Dateien
- Erweiterte Einstellungsmöglichkeiten
- Tastatur-Shortcuts hinzugefügt
- Responsive Design verbessert
- Konfigurierbare Timer

## 🤝 Beitragen

Verbesserungen und Erweiterungen sind willkommen! Bitte:

1. Fork erstellen
2. Feature-Branch erstellen
3. Änderungen committen
4. Pull Request erstellen

## 📃 Lizenz

Dieses Projekt ist **frei nutzbar für Lern- und Demonstrationszwecke**. Kommerzielle Nutzung nach Rücksprache.

---

## 👤 Autor

Martin Freimuth  
📧 mat.frei@gmx.de  
📍 83135 Schechen  
📆 Erstellt: Juni 2025 