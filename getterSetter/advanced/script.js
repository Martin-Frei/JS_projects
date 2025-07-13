// Fortgeschrittenes Beispiel: Proxy-basiertes User Management System
// mit Observern, Validierung, Computed Properties und Metaprogrammierung

class AdvancedUserManager {
    constructor() {
        this.observers = new Set();
        this.history = [];
        this.changeCount = 0;
        this.validationRules = new Map();
        this.computedProperties = new Map();
        this.methodLogs = [];
        
        this.setupValidationRules();
        this.setupComputedProperties();
        
        // Proxy für erweiterte Funktionalität
        return new Proxy(this, {
            get: this.proxyGet.bind(this),
            set: this.proxySet.bind(this),
            has: this.proxyHas.bind(this),
            ownKeys: this.proxyOwnKeys.bind(this),
            getOwnPropertyDescriptor: this.proxyGetOwnPropertyDescriptor.bind(this)
        });
    }
    
    setupValidationRules() {
        this.validationRules.set('name', (value) => {
            if (typeof value !== 'string') return false;
            return value.length >= 2 && value.length <= 50;
        });
        
        this.validationRules.set('email', (value) => {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(value);
        });
        
        this.validationRules.set('age', (value) => {
            const num = parseInt(value);
            return !isNaN(num) && num >= 0 && num <= 120;
        });
        
        this.validationRules.set('status', (value) => {
            return ['active', 'inactive', 'pending', 'banned'].includes(value);
        });
    }
    
    setupComputedProperties() {
        this.computedProperties.set('fullProfile', () => {
            return `${this.name || 'Unbekannt'} (${this.age || 'N/A'}) - ${this.email || 'Keine Email'} [${this.status || 'Unbekannt'}]`;
        });
        
        this.computedProperties.set('isAdult', () => {
            return this.age && this.age >= 18;
        });
        
        this.computedProperties.set('displayName', () => {
            return this.name ? this.name.charAt(0).toUpperCase() + this.name.slice(1) : 'Anonymer Benutzer';
        });
    }
    
    // Proxy Handler: get
    proxyGet(target, property) {
        this.logMethod('GET', property);
        
        // Computed Properties
        if (this.computedProperties.has(property)) {
            return this.computedProperties.get(property).call(this);
        }
        
        // Dynamische Eigenschaften
        if (property.startsWith('dynamic_')) {
            const baseProp = property.replace('dynamic_', '');
            return `[DYNAMIC] ${target[baseProp] || 'Nicht definiert'}`;
        }
        
        // Normale Eigenschaften
        return target[property];
    }
    
    // Proxy Handler: set
    proxySet(target, property, value) {
        this.logMethod('SET', property, value);
        
        // Validierung
        if (this.validationRules.has(property)) {
            if (!this.validationRules.get(property)(value)) {
                this.showNotification(`Ungültiger Wert für ${property}: ${value}`, 'error');
                return false;
            }
        }
        
        // Alte Werte speichern
        const oldValue = target[property];
        
        // Neuen Wert setzen
        target[property] = value;
        
        // Change Tracking
        this.trackChange(property, oldValue, value);
        
        // Observer benachrichtigen
        this.notifyObservers(property, oldValue, value);
        
        return true;
    }
    
    // Proxy Handler: has
    proxyHas(target, property) {
        this.logMethod('HAS', property);
        
        if (this.computedProperties.has(property)) {
            return true;
        }
        
        if (property.startsWith('dynamic_')) {
            return true;
        }
        
        return property in target;
    }
    
    // Proxy Handler: ownKeys
    proxyOwnKeys(target) {
        this.logMethod('OWNKEYS');
        
        const keys = Object.getOwnPropertyNames(target);
        const computedKeys = Array.from(this.computedProperties.keys());
        
        return [...keys, ...computedKeys];
    }
    
    // Proxy Handler: getOwnPropertyDescriptor
    proxyGetOwnPropertyDescriptor(target, property) {
        this.logMethod('GETOWNPROPERTYDESCRIPTOR', property);
        
        if (this.computedProperties.has(property)) {
            return {
                enumerable: true,
                configurable: true,
                get: this.computedProperties.get(property).bind(this)
            };
        }
        
        return Object.getOwnPropertyDescriptor(target, property);
    }
    
    // Logging
    logMethod(method, property, value) {
        const timestamp = new Date().toLocaleTimeString();
        const logEntry = value !== undefined 
            ? `${timestamp}: ${method}(${property}) = ${value}`
            : `${timestamp}: ${method}(${property})`;
        
        this.methodLogs.push(logEntry);
        
        // Nur die letzten 50 Einträge behalten
        if (this.methodLogs.length > 50) {
            this.methodLogs.shift();
        }
    }
    
    // Change Tracking
    trackChange(property, oldValue, newValue) {
        const change = {
            property,
            oldValue,
            newValue,
            timestamp: new Date().toISOString()
        };
        
        this.history.push(change);
        this.changeCount++;
        
        // UI aktualisieren
        this.updateUI();
    }
    
    // Observer Pattern
    addObserver(callback) {
        this.observers.add(callback);
        this.updateUI();
    }
    
    removeObserver(callback) {
        this.observers.delete(callback);
        this.updateUI();
    }
    
    notifyObservers(property, oldValue, newValue) {
        this.observers.forEach(callback => {
            try {
                callback(property, oldValue, newValue);
            } catch (error) {
                console.error('Observer error:', error);
            }
        });
    }
    
    // UI Update
    updateUI() {
        // Benutzer-Info aktualisieren
        const userInfo = document.getElementById('userInfo');
        if (userInfo) {
            userInfo.innerHTML = `
                <div class="info-item">
                    <span>Name:</span>
                    <span>${this.name || 'Nicht gesetzt'}</span>
                </div>
                <div class="info-item">
                    <span>Email:</span>
                    <span>${this.email || 'Nicht gesetzt'}</span>
                </div>
                <div class="info-item">
                    <span>Alter:</span>
                    <span>${this.age || 'Nicht gesetzt'}</span>
                </div>
                <div class="info-item">
                    <span>Status:</span>
                    <span>${this.status || 'Nicht gesetzt'}</span>
                </div>
                <div class="info-item">
                    <span>Vollständiges Profil:</span>
                    <span>${this.fullProfile}</span>
                </div>
                <div class="info-item">
                    <span>Volljährig:</span>
                    <span>${this.isAdult ? 'Ja' : 'Nein'}</span>
                </div>
            `;
        }
        
        // Live Stats aktualisieren
        const observerCount = document.getElementById('observerCount');
        const changeCount = document.getElementById('changeCount');
        const lastChange = document.getElementById('lastChange');
        
        if (observerCount) observerCount.textContent = this.observers.size;
        if (changeCount) changeCount.textContent = this.changeCount;
        if (lastChange) {
            const lastChangeData = this.history[this.history.length - 1];
            lastChange.textContent = lastChangeData 
                ? `${lastChangeData.property}: ${lastChangeData.newValue}`
                : 'Keine';
        }
    }
    
    // Utility Methoden
    showNotification(message, type = 'success') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        document.body.appendChild(notification);
        
        setTimeout(() => notification.classList.add('show'), 100);
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => document.body.removeChild(notification), 300);
        }, 3000);
    }
    
    // Serialisierung
    toJSON() {
        return {
            name: this.name,
            email: this.email,
            age: this.age,
            status: this.status,
            fullProfile: this.fullProfile,
            isAdult: this.isAdult,
            displayName: this.displayName,
            changeCount: this.changeCount,
            observerCount: this.observers.size
        };
    }
    
    // Export/Import
    export() {
        return JSON.stringify(this.toJSON(), null, 2);
    }
    
    import(jsonData) {
        try {
            const data = JSON.parse(jsonData);
            Object.keys(data).forEach(key => {
                if (key !== 'changeCount' && key !== 'observerCount') {
                    this[key] = data[key];
                }
            });
            this.showNotification('Daten erfolgreich importiert!');
        } catch (error) {
            this.showNotification('Fehler beim Importieren der Daten!', 'error');
        }
    }
}

// Globale Instanz
let userManager = new AdvancedUserManager();

// Event Listeners und Initialisierung
document.addEventListener('DOMContentLoaded', () => {
    // Standard Observer hinzufügen
    userManager.addObserver((property, oldValue, newValue) => {
        const output = document.getElementById('output');
        if (output) {
            output.innerHTML += `<br>🔄 ${property} geändert: ${oldValue} → ${newValue}`;
            output.scrollTop = output.scrollHeight;
        }
    });
    
    // Weitere Observer für Demonstrationszwecke
    userManager.addObserver((property, oldValue, newValue) => {
        console.log(`Observer 2: ${property} changed from ${oldValue} to ${newValue}`);
    });
});

// UI Funktionen
function updateUser() {
    const name = document.getElementById('nameInput').value;
    const email = document.getElementById('emailInput').value;
    const age = document.getElementById('ageInput').value;
    const status = document.getElementById('statusSelect').value;
    
    let updated = false;
    
    if (name) {
        userManager.name = name;
        updated = true;
    }
    if (email) {
        userManager.email = email;
        updated = true;
    }
    if (age) {
        userManager.age = parseInt(age);
        updated = true;
    }
    if (status) {
        userManager.status = status;
        updated = true;
    }
    
    if (updated) {
        // Eingabefelder nach erfolgreicher Aktualisierung leeren
        document.getElementById('nameInput').value = '';
        document.getElementById('emailInput').value = '';
        document.getElementById('ageInput').value = '';
        document.getElementById('statusSelect').value = 'active';
        
        userManager.showNotification('Benutzer aktualisiert!');
    } else {
        userManager.showNotification('Keine Daten zum Aktualisieren eingegeben!', 'error');
    }
}

function createRandomUser() {
    const names = ['Anna', 'Max', 'Lisa', 'Tom', 'Sarah', 'Ben', 'Emma', 'Paul'];
    const domains = ['example.com', 'test.de', 'demo.org', 'sample.net'];
    const statuses = ['active', 'inactive', 'pending'];
    
    const randomName = names[Math.floor(Math.random() * names.length)];
    const randomEmail = `${randomName.toLowerCase()}@${domains[Math.floor(Math.random() * domains.length)]}`;
    const randomAge = Math.floor(Math.random() * 80) + 18;
    const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
    
    userManager.name = randomName;
    userManager.email = randomEmail;
    userManager.age = randomAge;
    userManager.status = randomStatus;
    
    userManager.showNotification('Zufälliger Benutzer erstellt!');
}

function showUserHistory() {
    const output = document.getElementById('output');
    if (output) {
        output.innerHTML = '<h4>📋 Änderungshistorie:</h4>';
        userManager.history.forEach((change, index) => {
            output.innerHTML += `<br>${index + 1}. ${change.property}: ${change.oldValue} → ${change.newValue} (${new Date(change.timestamp).toLocaleString()})`;
        });
        
        if (userManager.history.length === 0) {
            output.innerHTML += '<br>Keine Änderungen vorhanden.';
        }
    }
}

function addObserver() {
    const newObserver = (property, oldValue, newValue) => {
        userManager.showNotification(`Observer Alert: ${property} changed!`);
    };
    
    userManager.addObserver(newObserver);
    userManager.showNotification('Observer hinzugefügt!');
}

function removeObserver() {
    if (userManager.observers.size > 0) {
        const observerArray = Array.from(userManager.observers);
        userManager.removeObserver(observerArray[observerArray.length - 1]);
        userManager.showNotification('Observer entfernt!');
    } else {
        userManager.showNotification('Keine Observer vorhanden!', 'error');
    }
}

function showProxyLogs() {
    const methodLogs = document.getElementById('methodLogs');
    if (methodLogs) {
        methodLogs.innerHTML = userManager.methodLogs.join('<br>');
        methodLogs.scrollTop = methodLogs.scrollHeight;
    }
}

function resetSystem() {
    userManager = new AdvancedUserManager();
    
    // Standard Observer wieder hinzufügen
    userManager.addObserver((property, oldValue, newValue) => {
        const output = document.getElementById('output');
        if (output) {
            output.innerHTML += `<br>🔄 ${property} geändert: ${oldValue} → ${newValue}`;
            output.scrollTop = output.scrollHeight;
        }
    });
    
    document.getElementById('output').innerHTML = 'System zurückgesetzt! Willkommen zurück.';
    document.getElementById('methodLogs').innerHTML = 'Proxy-Methoden werden hier geloggt...';
    
    // Eingabefelder leeren
    document.getElementById('nameInput').value = '';
    document.getElementById('emailInput').value = '';
    document.getElementById('ageInput').value = '';
    document.getElementById('statusSelect').value = 'active';
    
    userManager.showNotification('System zurückgesetzt!');
}

// Proxy Demo Funktionen
function testDynamicProperties() {
    userManager.name = 'Test User';
    userManager.email = 'test@example.com';
    
    const output = document.getElementById('output');
    output.innerHTML = `
        <h4>🎯 Dynamische Eigenschaften Test:</h4>
        <br>Normale Eigenschaft: ${userManager.name}
        <br>Dynamische Eigenschaft: ${userManager.dynamic_name}
        <br>Dynamische Email: ${userManager.dynamic_email}
        <br>Existiert 'dynamic_name': ${'dynamic_name' in userManager}
    `;
}

function testComputedProperties() {
    const output = document.getElementById('output');
    output.innerHTML = `
        <h4>🧮 Berechnete Eigenschaften Test:</h4>
        <br>Vollständiges Profil: ${userManager.fullProfile}
        <br>Anzeigename: ${userManager.displayName}
        <br>Ist volljährig: ${userManager.isAdult}
        <br>Existiert 'fullProfile': ${'fullProfile' in userManager}
    `;
}

function testValidation() {
    const output = document.getElementById('output');
    output.innerHTML = '<h4>✅ Validierung Test:</h4>';
    
    // Gültige Werte
    try {
        userManager.name = 'Valid Name';
        output.innerHTML += '<br>✅ Gültiger Name gesetzt';
    } catch (e) {
        output.innerHTML += '<br>❌ Fehler bei gültigem Namen';
    }
    
    // Ungültige Werte
    try {
        userManager.email = 'invalid-email';
        output.innerHTML += '<br>❌ Ungültige Email wurde akzeptiert';
    } catch (e) {
        output.innerHTML += '<br>✅ Ungültige Email wurde abgelehnt';
    }
    
    try {
        userManager.age = -5;
        output.innerHTML += '<br>❌ Ungültiges Alter wurde akzeptiert';
    } catch (e) {
        output.innerHTML += '<br>✅ Ungültiges Alter wurde abgelehnt';
    }
}

function testSerialization() {
    const jsonData = userManager.export();
    const output = document.getElementById('output');
    output.innerHTML = `
        <h4>📤 Serialisierung Test:</h4>
        <br><pre>${jsonData}</pre>
    `;
}