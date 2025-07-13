# 🏋️‍♂️ Training Timer – Interaktiver Trainingsbegleiter

## 📋 Projektbeschreibung

**Training Timer** ist ein browserbasiertes Tool zur strukturierten Durchführung von Trainingseinheiten, insbesondere für **Zirkeltraining**, **HIIT** oder **Eigengewichtübungen**. Die Anwendung steuert automatisch **Trainings- und Pausenphasen** und unterstützt den Nutzer durch visuelles Feedback und Musikuntermalung.

Die App funktioniert komplett **offline im Browser** und benötigt keine Installation oder Backend-Anbindung. Musik kann über eine lokale Datei eingebunden werden.

---

## 🎯 Funktionsumfang

- Auswahl einer eigenen Musikdatei (MP3, WAV, OGG etc.)
- Anzeige von **Trainingsstatus** und verbleibender Zeit
- Automatische Steuerung von:
  - **3 Sätzen**
  - je **3 Runden pro Satz**
  - **45 Sekunden Training**, gefolgt von
  - **15 Sekunden Pause** (bzw. 60 Sekunden nach Satzende)
- Anpassung der Musiklautstärke je nach Phase:
  - **Normal** im Training
  - **Leiser** in Pausen
- Fortschrittsanzeige (aktuelle Runde/Satz)
- Buttons für Start, Pause/Fortsetzen und Stop
- Reset aller Daten bei Trainingsende oder Abbruch

---

## 🧪 Einsatzbereiche

- Privatperson beim Heimtraining
- Fitness-Trainer zur Steuerung von Gruppenübungen
- Schulen oder Sportvereine zur Unterstützung von Intervalltraining

---

## 🧰 Technischer Überblick

| Bereich        | Technologie                |
|----------------|----------------------------|
| Frontend       | HTML5, CSS3, JavaScript    |
| Designstil     | Glassmorphism, responsive  |
| Logiksteuerung | reines "Vanilla JavaScript"|
| Audiohandling  | HTML `<audio>` API         |
| Besonderheiten | Kein Backend, keine Libs   |

---

## 💻 Nutzungshinweise

1. Projekt lokal öffnen oder auf einem Webserver bereitstellen
2. MP3-Datei über das Interface auswählen
3. Mit **"Start Training"** die Einheit starten
4. **"Pause"** unterbricht die Zeit, **"Stop"** setzt alles zurück

> Hinweis: Die App speichert keine Daten und funktioniert rein lokal im Browser.

---

## 📂 Zielgruppe & Motivation

Dieses Projekt richtet sich an:
- sportaffine Nutzer mit Bedarf an klarer Zeitstruktur
- Personen, die beim Training nicht ständig auf die Uhr schauen wollen
- Entwickler, die ein Beispiel für einfache Audio- und Timer-Steuerung mit Vanilla JS suchen

---

## 🛠️ Weiterentwicklungsideen

- Konfiguration von Trainings- und Pausenzeiten
- Auswahl aus mehreren Musikstücken oder Playlists
- Integration eines Dark-Modes
- Speichern des Trainingsfortschritts im Browser
- Unterstützung für Touch-Gesten (Mobile First)

---

## 📃 Lizenz

Dieses Projekt ist **frei nutzbar für Lern- und Demonstrationszwecke**. Kommerzielle Nutzung nach Rücksprache.

---

## 👤 Autor

Martin Freimuth  
📧 mat.frei@gmx.de  
📍 83135 Schechen  
📆 Erstellt: Juni 2025 