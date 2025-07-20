


async function searchBooks() {
  const query = document.getElementById("searchInput").value.trim();
  const result = document.getElementById("result");

  result.innerHTML = "Loading ....";

  try {
    const response = await fetch(`https://openlibrary.org/search.json?q=${query}`);
    const data = await response.json();

    result.innerHTML = ""; // vorherige Ergebnisse löschen

    if (data.docs.length === 0) {
      result.innerHTML = `<p>No books found.</p>`;
      return;
    }

    data.docs.forEach((book) => {
      const div = document.createElement("div");
      div.className = "book-card"; // optional, für Styling

      // Cover-URL bauen, wenn vorhanden
      const coverId = book.cover_i;
      const imageUrl = coverId 
        ? `https://covers.openlibrary.org/b/id/${coverId}-M.jpg`
        : "https://via.placeholder.com/128x190?text=No+Cover";

      // Autor korrekt als String
      const authors = book.author_name 
        ? book.author_name.join(", ")
        : "Unknown Author";

      // HTML-Inhalt
      div.innerHTML = `
        <img src="${imageUrl}" alt="Book Cover">
        <h3>${book.title}</h3>
        <h4>${authors}</h4>
      `;

      result.appendChild(div);
    });
  } catch (error) {
    result.innerHTML = `<p>Error fetching data.</p>`;
    console.error("Fehler beim Laden:", error);
  }
}

