// Einstellungen für den Timer
const settings = {
    countdownTime: 10,
    totalSets: 3,
    roundsPerSet: 3,
    trainingTime: 45,
    shortBreakTime: 15,
    longBreakTime: 60
};

// Einstellungen aus den Input-Feldern laden
function loadSettings() {
    settings.countdownTime = parseInt(document.getElementById('countdownTime').value);
    settings.totalSets = parseInt(document.getElementById('totalSets').value);
    settings.roundsPerSet = parseInt(document.getElementById('roundsPerSet').value);
    settings.trainingTime = parseInt(document.getElementById('trainingTime').value);
    settings.shortBreakTime = parseInt(document.getElementById('shortBreakTime').value);
    settings.longBreakTime = parseInt(document.getElementById('longBreakTime').value);
}

// Einstellungen anzeigen/verstecken
function toggleSettings() {
    const settingsEl = document.getElementById('settings');
    settingsEl.classList.toggle('hidden');
}

// Event Listener für Einstellungsänderungen
function initializeSettingsListeners() {
    document.getElementById('countdownTime').addEventListener('change', loadSettings);
    document.getElementById('totalSets').addEventListener('change', loadSettings);
    document.getElementById('roundsPerSet').addEventListener('change', loadSettings);
    document.getElementById('trainingTime').addEventListener('change', loadSettings);
    document.getElementById('shortBreakTime').addEventListener('change', loadSettings);
    document.getElementById('longBreakTime').addEventListener('change', loadSettings);
}

// Einstellungen validieren
function validateSettings() {
    const elements = [
        'countdownTime', 'totalSets', 'roundsPerSet', 
        'trainingTime', 'shortBreakTime', 'longBreakTime'
    ];
    
    for (let elementId of elements) {
        const element = document.getElementById(elementId);
        const value = parseInt(element.value);
        const min = parseInt(element.min);
        const max = parseInt(element.max);
        
        if (isNaN(value) || value < min || value > max) {
            alert(`Ungültiger Wert für ${elementId}. Erlaubter Bereich: ${min}-${max}`);
            return false;
        }
    }
    
    return true;
}

// Standardeinstellungen wiederherstellen
function resetToDefaults() {
    document.getElementById('countdownTime').value = 10;
    document.getElementById('totalSets').value = 3;
    document.getElementById('roundsPerSet').value = 3;
    document.getElementById('trainingTime').value = 45;
    document.getElementById('shortBreakTime').value = 15;
    document.getElementById('longBreakTime').value = 60;
    
    loadSettings();
}