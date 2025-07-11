// Mittleres Beispiel: Temperatursensor mit Validierung, Caching und History
class TemperatureSensor {
    constructor() {
        this._temperature = null;
        this._history = [];
        this._lastAccess = null;
        this._accessCount = 0;
    }
    
    // Getter für Temperatur mit Logging und Statistiken
    get temperature() {
        this._accessCount++;
        this._lastAccess = new Date();
        
        console.log(`Temperature accessed (${this._accessCount}. mal)`);
        
        if (this._temperature === null) {
            return 'Nicht gesetzt';
        }
        
        return this._temperature;
    }
    
    // Setter für Temperatur mit Validierung
    set temperature(value) {
        const oldTemp = this._temperature;
        
        // Validierung
        if (typeof value !== 'number') {
            throw new Error('Temperatur muss eine Zahl sein');
        }
        
        if (value < -50 || value > 50) {
            throw new Error('Temperatur muss zwischen -50°C und 50°C liegen');
        }
        
        // Temperatur setzen
        this._temperature = Math.round(value * 10) / 10; // Auf 1 Dezimalstelle runden
        
        // History aktualisieren
        this._history.push({
            timestamp: new Date(),
            oldValue: oldTemp,
            newValue: this._temperature,
            change: oldTemp !== null ? this._temperature - oldTemp : 0
        });
        
        // Maximal 10 Einträge in der History behalten
        if (this._history.length > 10) {
            this._history.shift();
        }
        
        console.log(`Temperature set to ${this._temperature}°C`);
        this.updateDisplay();
    }
    
    // Getter für Temperatur in Fahrenheit
    get fahrenheit() {
        if (this._temperature === null) return null;
        return Math.round((this._temperature * 9/5 + 32) * 10) / 10;
    }
    
    // Setter für Temperatur in Fahrenheit
    set fahrenheit(value) {
        if (typeof value !== 'number') {
            throw new Error('Temperatur muss eine Zahl sein');
        }
        // Umrechnung von Fahrenheit zu Celsius
        this.temperature = (value - 32) * 5/9;
    }
    
    // Getter für Temperatur-Status
    get status() {
        if (this._temperature === null) return 'Unbekannt';
        if (this._temperature < 0) return 'Gefroren';
        if (this._temperature < 15) return 'Kalt';
        if (this._temperature < 25) return 'Angenehm';
        if (this._temperature < 35) return 'Warm';
        return 'Heiß';
    }
    
    // Getter für Statistiken
    get stats() {
        if (this._history.length === 0) {
            return {
                count: 0,
                average: null,
                min: null,
                max: null,
                lastAccess: this._lastAccess,
                accessCount: this._accessCount
            };
        }
        
        const temps = this._history.map(h => h.newValue);
        return {
            count: this._history.length,
            average: Math.round((temps.reduce((a, b) => a + b, 0) / temps.length) * 10) / 10,
            min: Math.min(...temps),
            max: Math.max(...temps),
            lastAccess: this._lastAccess,
            accessCount: this._accessCount
        };
    }
    
    // Getter für History
    get history() {
        return [...this._history]; // Kopie zurückgeben
    }
    
    // Methode zum Löschen der History
    clearHistory() {
        this._history = [];
        this._accessCount = 0;
        this._lastAccess = null;
        console.log('History cleared');
    }
    
    updateDisplay() {
        const display = document.getElementById('tempDisplay');
        if (this._temperature !== null) {
            display.innerHTML = `
                🌡️ ${this._temperature}°C (${this.fahrenheit}°F) - ${this.status}
            `;
            display.style.background = this.getTemperatureColor();
        }
        
        this.updateHistory();
    }
    
    getTemperatureColor() {
        if (this._temperature < 0) return 'linear-gradient(45deg, #74b9ff, #0984e3)';
        if (this._temperature < 15) return 'linear-gradient(45deg, #55efc4, #00b894)';
        if (this._temperature < 25) return 'linear-gradient(45deg, #fdcb6e, #e17055)';
        if (this._temperature < 35) return 'linear-gradient(45deg, #fd79a8, #e84393)';
        return 'linear-gradient(45deg, #ff6b6b, #ee5a24)';
    }
    
    updateHistory() {
        const historyList = document.getElementById('historyList');
        if (this._history.length === 0) {
            historyList.innerHTML = 'Keine Einträge vorhanden';
            return;
        }
        
        historyList.innerHTML = this._history
            .slice(-5) // Nur die letzten 5 anzeigen
            .reverse()
            .map(entry => `
                <div class="history-item">
                    ${entry.timestamp.toLocaleTimeString()}: ${entry.newValue}°C
                    ${entry.change !== 0 ? `(${entry.change > 0 ? '+' : ''}${entry.change}°C)` : ''}
                </div>
            `).join('');
    }
}

// Sensor-Instanz erstellen
const sensor = new TemperatureSensor();

// UI-Funktionen
function setRandomTemp() {
    try {
        const temp = Math.random() * 60 - 30; // -30 bis +30
        sensor.temperature = temp;
        
        const output = document.getElementById('output');
        output.innerHTML = `
            <strong>Zufällige Temperatur gesetzt:</strong><br>
            ${sensor.temperature}°C (${sensor.fahrenheit}°F)<br>
            Status: ${sensor.status}
        `;
    } catch (error) {
        showError(error.message);
    }
}

function setManualTemp() {
    try {
        const input = document.getElementById('tempInput');
        const temp = parseFloat(input.value);
        
        if (isNaN(temp)) {
            throw new Error('Bitte gib eine gültige Zahl ein');
        }
        
        sensor.temperature = temp;
        input.value = '';
        
        const output = document.getElementById('output');
        output.innerHTML = `
            <strong>Temperatur manuell gesetzt:</strong><br>
            ${sensor.temperature}°C (${sensor.fahrenheit}°F)<br>
            Status: ${sensor.status}
        `;
    } catch (error) {
        showError(error.message);
    }
}

function showStats() {
    const stats = sensor.stats;
    const output = document.getElementById('output');
    
    if (stats.count === 0) {
        output.innerHTML = '<strong>Keine Statistiken verfügbar</strong> - Setze zuerst eine Temperatur!';
        return;
    }
    
    output.innerHTML = `
        <strong>Temperatur-Statistiken:</strong><br>
        Messungen: ${stats.count}<br>
        Durchschnitt: ${stats.average}°C<br>
        Minimum: ${stats.min}°C<br>
        Maximum: ${stats.max}°C<br>
        Zugriffe: ${stats.accessCount}<br>
        Letzter Zugriff: ${stats.lastAccess ? stats.lastAccess.toLocaleString() : 'Nie'}
    `;
}

function clearHistory() {
    sensor.clearHistory();
    const output = document.getElementById('output');
    output.innerHTML = '<strong>History gelöscht!</strong>';
    
    const historyList = document.getElementById('historyList');
    historyList.innerHTML = 'Keine Einträge vorhanden';
}

function showError(message) {
    const output = document.getElementById('output');
    output.innerHTML = `<strong style="color: red;">Fehler:</strong> ${message}`;
}

// Initialisierung
console.log('=== Temperatursensor Beispiel ===');
console.log('Sensor erstellt, bereit für Temperaturmessungen');