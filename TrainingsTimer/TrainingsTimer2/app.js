// Hauptfunktionen der App

// Musik-Datei laden
musicFile.addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (file) {
        const url = URL.createObjectURL(file);
        audioPlayer.src = url;
        audioPlayer.volume = 0.7;
        progressEl.textContent = `Datei geladen: ${file.name}`;
        
        // Validierung des Dateityps
        const allowedTypes = ['audio/mpeg', 'audio/wav', 'audio/mp4', 'audio/ogg'];
        if (!allowedTypes.includes(file.type)) {
            alert('Warnung: Dieser Dateityp wird möglicherweise nicht unterstützt.');
        }
    }
});

// Training starten
function startTraining() {
    if (!audioPlayer.src) {
        alert('Bitte wähle zuerst eine MP3-Datei aus!');
        return;
    }
    
    // Einstellungen validieren und laden
    if (!validateSettings()) {
        return;
    }
    
    loadSettings();
    
    // Timer-Status setzen
    isRunning = true;
    isPaused = false;
    isCountdownPhase = true;
    isTrainingPhase = false;
    timeLeft = settings.countdownTime;
    
    // Reset für neues Training
    currentRound = 1;
    currentSet = 1;
    
    // Einstellungen verstecken
    settingsEl.classList.add('hidden');
    
    // Display aktualisieren und Timer starten
    updateDisplay();
    startTimer();
    
    // Buttons aktivieren/deaktivieren
    startBtn.disabled = true;
    pauseBtn.disabled = false;
    stopBtn.disabled = false;
}

// Training pausieren/fortsetzen
function pauseTraining() {
    if (!isRunning) return;
    
    if (isPaused) {
        // Fortsetzen
        if (isTrainingPhase && !isCountdownPhase && audioPlayer.src) {
            audioPlayer.play();
        }
        startTimer();
        pauseBtn.textContent = "Pause";
        isPaused = false;
    } else {
        // Pausieren
        clearInterval(currentTimer);
        if (audioPlayer.src) {
            audioPlayer.pause();
        }
        pauseBtn.textContent = "Fortsetzen";
        isPaused = true;
    }
}

// Training stoppen
function stopTraining() {
    if (!isRunning) return;
    
    // Timer stoppen
    clearInterval(currentTimer);
    if (audioPlayer.src) {
        audioPlayer.pause();
        audioPlayer.currentTime = 0;
    }
    
    // Status zurücksetzen
    isRunning = false;
    isPaused = false;
    isCountdownPhase = false;
    
    // Display zurücksetzen
    statusEl.textContent = "⏹️ Training gestoppt";
    statusEl.className = "status";
    timerEl.textContent = "00:00";
    progressEl.textContent = "Bereit für neuen Start";
    volumeInfoEl.textContent = "";
    
    // Buttons zurücksetzen
    startBtn.disabled = false;
    pauseBtn.disabled = true;
    pauseBtn.textContent = "Pause";
    stopBtn.disabled = true;
    
    // Timer-Variablen zurücksetzen
    resetTimer();
}

// Tastatur-Shortcuts
document.addEventListener('keydown', function(e) {
    // Nur reagieren wenn nicht in Input-Feld
    if (e.target.tagName !== 'INPUT') {
        switch(e.key) {
            case ' ': // Leertaste
                e.preventDefault();
                if (isRunning) {
                    pauseTraining();
                } else {
                    startTraining();
                }
                break;
            case 'Escape':
                e.preventDefault();
                stopTraining();
                break;
            case 's':
            case 'S':
                e.preventDefault();
                toggleSettings();
                break;
        }
    }
});

// Fehlerbehandlung für Audio
audioPlayer.addEventListener('error', function(e) {
    console.error('Audio-Fehler:', e);
    alert('Fehler beim Abspielen der Audio-Datei. Bitte versuche es mit einer anderen Datei.');
});

// Warnung vor Verlassen der Seite während des Trainings
window.addEventListener('beforeunload', function(e) {
    if (isRunning) {
        e.preventDefault();
        e.returnValue = '';
        return 'Das Training läuft noch. Möchten Sie wirklich die Seite verlassen?';
    }
});

// Initialisierung beim Laden der Seite
document.addEventListener('DOMContentLoaded', function() {
    // Event Listener für Einstellungen initialisieren
    initializeSettingsListeners();
    
    // Einstellungen laden
    loadSettings();
    
    // Display initialisieren
    updateDisplay();
    
    // Service Worker registrieren (falls verfügbar)
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('sw.js').catch(function(error) {
            console.log('Service Worker Registrierung fehlgeschlagen:', error);
        });
    }
});

// Hilfsfunktionen
function showNotification(message, type = 'info') {
    // Einfache Benachrichtigung (kann später erweitert werden)
    console.log(`${type.toUpperCase()}: ${message}`);
}

function logTrainingSession() {
    // Training-Session loggen (für zukünftige Statistiken)
    const session = {
        date: new Date().toISOString(),
        settings: { ...settings },
        completed: !isRunning
    };
    
    console.log('Training Session:', session);
    
    // Hier könnte später localStorage oder eine API verwendet werden
    // localStorage.setItem('lastTrainingSession', JSON.stringify(session));
}