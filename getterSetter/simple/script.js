// Einfaches Beispiel für Getter und Setter
const person = {
    // Private Eigenschaften (durch Konvention mit _ markiert)
    _firstName: 'Max',
    _lastName: 'Mustermann',
    
    // Getter für firstName
    get firstName() {
        console.log('Getter für firstName wurde aufgerufen');
        return this._firstName;
    },
    
    // Setter für firstName
    set firstName(value) {
        console.log('Setter für firstName wurde aufgerufen mit:', value);
        if (typeof value === 'string' && value.length > 0) {
            this._firstName = value;
        } else {
            throw new Error('Vorname muss ein nicht-leerer String sein');
        }
    },
    
    // Getter für lastName
    get lastName() {
        console.log('Getter für lastName wurde aufgerufen');
        return this._lastName;
    },
    
    // Setter für lastName
    set lastName(value) {
        console.log('Setter für lastName wurde aufgerufen mit:', value);
        if (typeof value === 'string' && value.length > 0) {
            this._lastName = value;
        } else {
            throw new Error('Nachname muss ein nicht-leerer String sein');
        }
    },
    
    // Getter für den vollständigen Namen (nur getter, kein setter)
    get fullName() {
        console.log('Getter für fullName wurde aufgerufen');
        return `${this._firstName} ${this._lastName}`;
    }
};

// Funktionen für die Benutzeroberfläche
function showName() {
    const output = document.getElementById('output');
    output.innerHTML = `
        <strong>Aktuelle Namen:</strong><br>
        Vorname: ${person.firstName}<br>
        Nachname: ${person.lastName}
    `;
}

function changeName() {
    try {
        person.firstName = 'Anna';
        person.lastName = 'Schmidt';
        
        const output = document.getElementById('output');
        output.innerHTML = `
            <strong>Name wurde geändert!</strong><br>
            Neuer Vorname: ${person.firstName}<br>
            Neuer Nachname: ${person.lastName}
        `;
    } catch (error) {
        const output = document.getElementById('output');
        output.innerHTML = `<strong>Fehler:</strong> ${error.message}`;
    }
}

function showFullName() {
    const output = document.getElementById('output');
    output.innerHTML = `
        <strong>Vollständiger Name:</strong><br>
        ${person.fullName}
    `;
}

// Beispiel für ungültige Eingabe beim Laden der Seite
console.log('=== Beispiel für Getter und Setter ===');
console.log('Aktueller Name:', person.fullName);

// Versuche ungültige Werte zu setzen
try {
    person.firstName = '';
} catch (error) {
    console.log('Fehler beim Setzen des Vornamens:', error.message);
}