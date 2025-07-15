
function filterPokemon(query, limit = 10) {
    if (query.length < 3) return null;
    
    const results = [];
    const lowerQuery = query.toLowerCase();
    
    for (let [id, name] of allPokemonNames) {
        if (name.toLowerCase().includes(lowerQuery)) {
            results.push({ id, name });
            if (results.length >= limit) break;
        }
    }
    
    return results;
}


function renderSearchResults(results) {
    if (results.length === 0) {
        searchResults.innerHTML = '<div class="search-no-results">No Pokémon found</div>';
        return;
    }
    
    searchResults.innerHTML = '';
    
    for (let result of results) {
        const resultElement = document.createElement('div');
        resultElement.className = 'search-result-item';
        resultElement.innerHTML = createSearchResultTemplate(result);
        
        resultElement.addEventListener('click', () => {
            bigModel(result.id);
            searchInput.value = '';
            searchResults.classList.remove('show');
        });
        
        searchResults.appendChild(resultElement);
    }
}


async function searchPokemon(query) {
    const results = filterPokemon(query);
    
    if (results === null) {
        searchResults.classList.remove('show');
        return;
    }
    
    searchResults.innerHTML = '<div class="search-loading">Searching...</div>';
    searchResults.classList.add('show');
    
    renderSearchResults(results);
}


searchInput.addEventListener('input', (e) => {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
        searchPokemon(e.target.value);
    }, 300);
});


document.addEventListener('click', (e) => {
    if (!e.target.closest('.search-container')) {
        searchResults.classList.remove('show');
    }
});