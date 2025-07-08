function onloadFunc(){
    console.log("test");
    loadData();
}

async function loadData() {
            // Du deklarierst eine asynchrone Funktion, weil du innerhalb await benutzen willst.
            // Das bedeutet: Die Funktion gibt implizit ein Promise zurück und kann nicht blockierend arbeiten.

    try {
            // Ein try-Block fängt Fehler innerhalb des Blocks ab, damit du sie im catch behandeln kannst.
            // Saubere Fehlerbehandlung bei asynchronem Code ist Pflicht, vor allem bei API-Zugriffen!

        let response = await fetch(BASE_URL + ".json");
            // Du machst einen HTTP-Request mit fetch an eine Firebase-URL (z. B. https://...firebaseio.com/.json).
            // await bedeutet: JavaScript wartet auf die Antwort, bevor es weitergeht.
            // response ist ein Response-Objekt, kein JSON!
        
        if (!response.ok) {
            throw new Error("Fehler beim Abrufen: " + response.status);
            // Du prüfst, ob der Server eine erfolgreiche Antwort gesendet hat (ok === true bei Status 200–299).
            // Wenn nicht, wirfst du manuell einen Fehler mit throw new Error(...).
            // Damit springt der Code direkt in den catch-Block.
        }

        let data = await response.json();
            // Jetzt parst du den Body der Antwort von Text in echtes JavaScript-Objekt (JSON → JS-Objekt).
            // Auch das ist asynchron, daher wieder await.

        console.log("Geladene Daten:", data);
            // Du gibst die geparsten Daten aus
            // Gut zum Debuggen oder Weiterverarbeiten

    } catch (err) {
            // Wenn irgendwo im try-Block ein Fehler passiert (z. B. kein Internet, falsche URL, JSON kaputt), wird dieser Block ausgeführt.
        console.error("Fehler beim Laden:", err);
            // Fehlerausgabe im Browser-Console-Log.
            // Damit du weißt, was schiefgelaufen ist, z. B.:
            // TypeError: Failed to fetch
            // SyntaxError: Unexpected token <
            // Fehler beim Abrufen: 404
    }
}
