// Timer-Status Variablen
let isRunning = false;
let isPaused = false;
let currentTimer = null;
let currentRound = 1;
let currentSet = 1;
let timeLeft = 45;
let isTrainingPhase = true;
let isCountdownPhase = false;

// DOM-Elemente
const audioPlayer = document.getElementById('audioPlayer');
const statusEl = document.getElementById('status');
const timerEl = document.getElementById('timer');
const progressEl = document.getElementById('progress');
const volumeInfoEl = document.getElementById('volumeInfo');
const startBtn = document.getElementById('startBtn');
const pauseBtn = document.getElementById('pauseBtn');
const stopBtn = document.getElementById('stopBtn');
const musicFile = document.getElementById('musicFile');
const settingsEl = document.getElementById('settings');

// Display aktualisieren
function updateDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    timerEl.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    
    if (isCountdownPhase) {
        statusEl.textContent = "🕐 VORBEREITUNG";
        statusEl.className = "status pause";
        volumeInfoEl.textContent = "Gleich geht's los!";
        progressEl.textContent = `Block ${currentSet}/${settings.totalSets} - Runde ${currentRound}/${settings.roundsPerSet}`;
    } else if (isTrainingPhase) {
        statusEl.textContent = "🔥 JETZT TRAINING";
        statusEl.className = "status training";
        volumeInfoEl.textContent = "Lautstärke: Normal";
        if (audioPlayer.src) {
            audioPlayer.volume = 0.7;
        }
        progressEl.textContent = `Block ${currentSet}/${settings.totalSets} - Runde ${currentRound}/${settings.roundsPerSet}`;
    } else {
        statusEl.textContent = "⏸️ JETZT PAUSE";
        statusEl.className = "status pause";
        volumeInfoEl.textContent = "Lautstärke: Leiser";
        if (audioPlayer.src) {
            audioPlayer.volume = 0.2;
        }
        progressEl.textContent = `Block ${currentSet}/${settings.totalSets} - Runde ${currentRound}/${settings.roundsPerSet}`;
    }
}

// Timer starten
function startTimer() {
    currentTimer = setInterval(() => {
        timeLeft--;
        updateDisplay();
        
        if (timeLeft <= 0) {
            clearInterval(currentTimer);
            
            if (isCountdownPhase) {
                // Countdown beendet, jetzt Training starten
                isCountdownPhase = false;
                isTrainingPhase = true;
                timeLeft = settings.trainingTime;
                
                // Musik starten
                if (audioPlayer.src) {
                    audioPlayer.play();
                }
                updateDisplay();
                startTimer();
            } else {
                nextPhase();
            }
        }
    }, 1000);
}

// Zur nächsten Phase wechseln
function nextPhase() {
    if (isTrainingPhase) {
        // Training beendet, jetzt Pause
        isTrainingPhase = false;
        
        if (currentRound < settings.roundsPerSet) {
            // Kurze Pause
            timeLeft = settings.shortBreakTime;
        } else {
            // Lange Pause
            timeLeft = settings.longBreakTime;
        }
        
        updateDisplay();
        startTimer();
    } else {
        // Pause beendet, jetzt Training
        isTrainingPhase = true;
        
        if (currentRound < settings.roundsPerSet) {
            // Nächste Runde im aktuellen Block
            currentRound++;
            timeLeft = settings.trainingTime;
            updateDisplay();
            startTimer();
        } else {
            // Block beendet
            if (currentSet < settings.totalSets) {
                // Nächster Block
                currentSet++;
                currentRound = 1;
                timeLeft = settings.trainingTime;
                
                // Musik neu starten
                if (audioPlayer.src) {
                    audioPlayer.currentTime = 0;
                }
                
                updateDisplay();
                startTimer();
            } else {
                // Alle Blöcke beendet
                completeTraining();
            }
        }
    }
}

// Training beenden
function completeTraining() {
    isRunning = false;
    isCountdownPhase = false;
    statusEl.textContent = "✅ Training beendet!";
    statusEl.className = "status";
    timerEl.textContent = "00:00";
    progressEl.textContent = "Alle Blöcke abgeschlossen!";
    volumeInfoEl.textContent = "";
    
    if (audioPlayer.src) {
        audioPlayer.pause();
        audioPlayer.currentTime = 0;
    }
    
    startBtn.disabled = false;
    pauseBtn.disabled = true;
    stopBtn.disabled = true;
    
    // Reset für nächstes Training
    resetTimer();
}

// Timer zurücksetzen
function resetTimer() {
    currentRound = 1;
    currentSet = 1;
    timeLeft = settings.trainingTime;
    isTrainingPhase = true;
    isCountdownPhase = false;
    isRunning = false;
    isPaused = false;
    
    if (currentTimer) {
        clearInterval(currentTimer);
        currentTimer = null;
    }
}

// Timer formatieren (Hilfsfunktion)
function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
}