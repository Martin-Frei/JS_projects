
async function loadAllPokemonNames() {
    try {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=1010');
        const data = await response.json();
        
        data.results.forEach((pokemon, index) => {
            allPokemonNames.set(index + 1, pokemon.name);
        });
    } catch (error) {
        console.error('Fehler beim Laden der Pokémon-Namen:', error);
    }
}


async function fetchPokemon(id) {
    try {
        let response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        return await response.json();
    } catch {
        return null;
    }
}


async function loadPokemonBatch(startIndex, batchSize) {
    let data = [];
    for (let i = startIndex; i < startIndex + batchSize; i++) {
        data.push(fetchPokemon(i));
    }
    
    let results = await Promise.all(data);
    results.forEach((p) => {
        if (p) {
            pokemonCache.set(p.id, p);
            smallCardTemplate(p);
        }
    });
}


async function dataArray() {
    if (loading) return;
    loading = true;
    
    showLoadingSpinner();
    
    try {
        await loadPokemonBatch(offset, limit);
        offset += limit;
    } catch (error) {
        console.error('Fehler beim Laden der Pokémon:', error);
    } finally {
        loading = false;
        hideLoadingSpinner();
    }
}
