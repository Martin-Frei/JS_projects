let isRunning = false;
let isPaused = false;
let currentTimer = null;
let currentRound = 1;
let currentSet = 1;
let timeLeft = 45;
let isTrainingPhase = true;
let isCountdownPhase = false;

const audioPlayer = document.getElementById('audioPlayer');
const statusEl = document.getElementById('status');
const timerEl = document.getElementById('timer');
const progressEl = document.getElementById('progress');
const volumeInfoEl = document.getElementById('volumeInfo');
const startBtn = document.getElementById('startBtn');
const pauseBtn = document.getElementById('pauseBtn');
const stopBtn = document.getElementById('stopBtn');
const musicFile = document.getElementById('musicFile');

// Musik-Datei laden
musicFile.addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (file) {
        const url = URL.createObjectURL(file);
        audioPlayer.src = url;
        audioPlayer.volume = 0.7; // Normale Lautstärke
        progressEl.textContent = `Datei geladen: ${file.name}`;
    }
});

function updateDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    timerEl.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    
    if (isCountdownPhase) {
        statusEl.textContent = "🕐 VORBEREITUNG";
        statusEl.className = "status pause";
        volumeInfoEl.textContent = "Gleich geht's los!";
        progressEl.textContent = `Satz ${currentSet}/3 - Runde ${currentRound}/3`;
    } else if (isTrainingPhase) {
        statusEl.textContent = "🔥 JETZT TRAINING";
        statusEl.className = "status training";
        volumeInfoEl.textContent = "Lautstärke: Normal";
        audioPlayer.volume = 0.7;
        progressEl.textContent = `Satz ${currentSet}/3 - Runde ${currentRound}/3`;
    } else {
        statusEl.textContent = "⏸️ JETZT PAUSE";
        statusEl.className = "status pause";
        volumeInfoEl.textContent = "Lautstärke: Leiser";
        audioPlayer.volume = 0.2;
        progressEl.textContent = `Satz ${currentSet}/3 - Runde ${currentRound}/3`;
    }
}

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
                timeLeft = 45;
                
                // Musik starten
                audioPlayer.play();
                updateDisplay();
                startTimer();
            } else {
                nextPhase();
            }
        }
    }, 1000);
}

function nextPhase() {
    if (isTrainingPhase) {
        // Training beendet, jetzt Pause
        isTrainingPhase = false;
        
        if (currentRound < 3) {
            // Kurze Pause (15 Sekunden)
            timeLeft = 15;
        } else {
            // Lange Pause (60 Sekunden)
            timeLeft = 60;
        }
        
        updateDisplay();
        startTimer();
    } else {
        // Pause beendet, jetzt Training
        isTrainingPhase = true;
        
        if (currentRound < 3) {
            // Nächste Runde im aktuellen Satz
            currentRound++;
            timeLeft = 45;
            updateDisplay();
            startTimer();
        } else {
            // Satz beendet
            if (currentSet < 3) {
                // Nächster Satz
                currentSet++;
                currentRound = 1;
                timeLeft = 45;
                
                // Musik neu starten
                audioPlayer.currentTime = 0;
                
                updateDisplay();
                startTimer();
            } else {
                // Alle Sätze beendet
                completeTraining();
            }
        }
    }
}

function completeTraining() {
    isRunning = false;
    isCountdownPhase = false;
    statusEl.textContent = "✅ Training beendet!";
    statusEl.className = "status";
    timerEl.textContent = "00:00";
    progressEl.textContent = "Alle Sätze abgeschlossen!";
    volumeInfoEl.textContent = "";
    
    audioPlayer.pause();
    audioPlayer.currentTime = 0;
    
    startBtn.disabled = false;
    pauseBtn.disabled = true;
    stopBtn.disabled = true;
    
    // Reset für nächstes Training
    currentRound = 1;
    currentSet = 1;
    timeLeft = 45;
    isTrainingPhase = true;
}

function startTraining() {
    if (!audioPlayer.src) {
        alert('Bitte wähle zuerst eine MP3-Datei aus!');
        return;
    }
    
    isRunning = true;
    isPaused = false;
    isCountdownPhase = true;
    isTrainingPhase = false;
    timeLeft = 10; // 10 Sekunden Countdown
    
    updateDisplay();
    startTimer();
    
    startBtn.disabled = true;
    pauseBtn.disabled = false;
    stopBtn.disabled = false;
}

function pauseTraining() {
    if (!isRunning) return;
    
    if (isPaused) {
        // Fortsetzen
        audioPlayer.play();
        startTimer();
        pauseBtn.textContent = "Pause";
        isPaused = false;
    } else {
        // Pausieren
        clearInterval(currentTimer);
        audioPlayer.pause();
        pauseBtn.textContent = "Fortsetzen";
        isPaused = true;
    }
}

function stopTraining() {
    if (!isRunning) return;
    
    clearInterval(currentTimer);
    audioPlayer.pause();
    audioPlayer.currentTime = 0;
    
    isRunning = false;
    isPaused = false;
    isCountdownPhase = false;
    
    statusEl.textContent = "⏹️ Training gestoppt";
    statusEl.className = "status";
    timerEl.textContent = "00:00";
    progressEl.textContent = "Bereit für neuen Start";
    volumeInfoEl.textContent = "";
    
    startBtn.disabled = false;
    pauseBtn.disabled = true;
    pauseBtn.textContent = "Pause";
    stopBtn.disabled = true;
    
    // Reset
    currentRound = 1;
    currentSet = 1;
    timeLeft = 45;
    isTrainingPhase = true;
}

// Initialisierung
updateDisplay();