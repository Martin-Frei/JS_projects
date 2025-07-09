// Asynchrone Funktion zum Laden von Daten aus der Firebase Realtime Database
async function loadData(path = "") {
    try {
        let response = await fetch(BASE_URL + path + ".json");
        
        if (!response.ok) {
            throw new Error("Fehler beim Abrufen: " + response.status);
        }

        let data = await response.json();
        console.log("Geladene Daten:", data);
        return data;
        
    } catch (err) {
        console.error("Fehler beim Laden:", err);
        return null;
    }
}

// Asynchrone Funktion zum Schreiben von Daten in die Firebase Realtime Database
async function postData(path = "", data = {}) {
    try {
        let response = await fetch(BASE_URL + path + ".json", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        let result = await response.json();
        return result;
    } catch (err) {
        console.error("Fehler beim Speichern:", err);
        return null;
    }
}

// Asynchrone Funktion zum Löschen von Daten aus der Firebase-Datenbank
async function deleteData(path = "") {
    try {
        let response = await fetch(BASE_URL + path + ".json", {
            method: "DELETE"
        });

        let result = await response.json();
        return result;
    } catch (err) {
        console.error("Fehler beim Löschen:", err);
        return null;
    }
}

// NEUE FUNKTION: Löscht eine Notiz und aktualisiert die Anzeige
async function deleteNote(path) {
    try {
        // Löschen der Notiz
        await deleteData(path);
        
        // Daten neu laden und anzeigen
        const data = await loadData("notes");
        renderData(data);
        
        console.log("Notiz erfolgreich gelöscht:", path);
    } catch (err) {
        console.error("Fehler beim Löschen der Notiz:", err);
        alert("Fehler beim Löschen der Notiz!");
    }
}

// Funktion zum Verarbeiten des Speichern-Buttons
async function handleSubmit() {
    const title = document.getElementById("noteTitle").value;
    const text = document.getElementById("noteText").value;

    // Einfache Validierung
    if (!title || !text) {
        alert("Bitte Titel und Text eingeben!");
        return;
    }

    // Objekt erstellen und an Firebase senden
    await postData("notes", { title, text });

    // Eingabefelder leeren
    document.getElementById("noteTitle").value = "";
    document.getElementById("noteText").value = "";

    // Daten neu laden und anzeigen
    const data = await loadData("notes");
    renderData(data);
}

// Wird automatisch aufgerufen, sobald die Seite geladen wird
async function onloadFunc() {
    const data = await loadData("notes");
    renderData(data);
}

// Funktion zum Anzeigen der geladenen Daten im Browser
function renderData(data) {
    const output = document.getElementById("output");
    output.innerHTML = "";

    if (!data) {
        output.innerHTML = "<p>Keine Notizen vorhanden</p>";
        return;
    }

    // Durch alle Notizen im JSON-Datenobjekt gehen
    for (let id in data) {
        const note = data[id];

        const div = document.createElement("div");
        div.className = "note";

        // Den Inhalt der Notiz als HTML einfügen
        div.innerHTML = `
            <span><strong>${note.title}</strong></span>: 
            <span>${note.text}</span>
            <button class="btn" onclick="deleteNote('notes/${id}')">🗑️</button>
        `;

        output.appendChild(div);
    }
}