
function createLoadingSpinnerTemplate() {
    return `
        <div class="pokeball-spinner">
            <div class="pokeball">
                <div class="pokeball-button"></div>
            </div>
            <p>Loading Pokémon...</p>
        </div>
    `;
}


function createSmallCardTemplate(pokemon) {
    const heightInM = (pokemon.height / 10).toFixed(2);
    const weightInKg = (pokemon.weight / 10).toFixed(1);
    const capitalizedName = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
    
    return `
        <div class="smallImg">
            <h2>#${pokemon.id} ${capitalizedName}</h2>   
            <h2>Experience: ${pokemon.base_experience} <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}"></h2> 
            <h3>Height: ${heightInM}m</h3>
            <h3>Weight: ${weightInKg}Kg</h3>
            ${pokemon.types.map(t => `<span>Type: ${t.type.name} </span>`).join('')}
        </div>
    `;
}


function createBigModelTemplate(pokemon) {
    const heightInM = (pokemon.height / 10).toFixed(2);
    const weightInKg = (pokemon.weight / 10).toFixed(1);
    const capitalizedName = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
    const totalStats = pokemon.stats.reduce((sum, stat) => sum + stat.base_stat, 0);
    
    return `
        <div class="modelContent">
            <button class="close-btn">&times;</button>            
            <div class="pokemon-header">
                <h2>#${pokemon.id} ${capitalizedName}</h2>
                <button class="nav-btn prev-btn" id="prevBtn">← Prev</button>
                <button class="nav-btn next-btn" id="nextBtn">Next →</button>
            </div>
            
            ${createPokemonImagesTemplate(pokemon)}
            
            <div class="pokemon-info">
                ${createBasicInfoTemplate(pokemon, heightInM, weightInKg)}
                ${createTypesTemplate(pokemon)}
                ${createAbilitiesTemplate(pokemon)}
                ${createTabNavigationTemplate()}
                ${createTabContentTemplate(pokemon, totalStats)}
            </div>
        </div>
    `;
}


function createPokemonImagesTemplate(pokemon) {
    return `
        <div class="pokemon-images">
            <img src="${pokemon.sprites.front_default}" alt="${pokemon.name} front">
            <img src="${pokemon.sprites.back_default}" alt="${pokemon.name} back">
            ${pokemon.sprites.front_shiny ? `<img src="${pokemon.sprites.front_shiny}" alt="${pokemon.name} shiny" title="Shiny Form">` : ''}
        </div>
    `;
}


function createBasicInfoTemplate(pokemon, heightInM, weightInKg) {
    return `
        <div class="basic-info">
            <p><strong>Height:</strong> ${heightInM}m</p>
            <p><strong>Weight:</strong> ${weightInKg}kg</p>
            <p><strong>Base Experience:</strong> ${pokemon.base_experience}</p>
            <p><strong>Order:</strong> ${pokemon.order}</p>
        </div>
    `;
}


function createTypesTemplate(pokemon) {
    return `
        <div class="types">
            <strong>Types:</strong>
            ${pokemon.types.map(t => `<span class="type-badge" style="background-color: ${types[t.type.name] || 'grey'}">${t.type.name}</span>`).join('')}
        </div>
    `;
}


function createAbilitiesTemplate(pokemon) {
    return `
        <div class="abilities">
            <strong>Abilities:</strong>
            ${pokemon.abilities.map(a => `
                <span class="ability-badge ${a.is_hidden ? 'hidden-ability' : ''}">
                    ${a.ability.name}${a.is_hidden ? ' (Hidden)' : ''}
                </span>
            `).join('')}
        </div>
    `;
}


function createTabNavigationTemplate() {
    return `
        <div class="tab-navigation">
            <button class="tab-btn active" data-tab="stats">Base Stats</button>
            <button class="tab-btn" data-tab="moves">Moves</button>
        </div>
    `;
}


function createTabContentTemplate(pokemon, totalStats) {
    return `
        <div class="tab-content">
            ${createStatsTabTemplate(pokemon, totalStats)}
            ${createMovesTabTemplate(pokemon)}
        </div>
    `;
}


function createStatsTabTemplate(pokemon, totalStats) {
    return `
        <div id="stats-tab" class="tab-pane active">
            <div class="stats-grid">
                ${pokemon.stats.map(stat => `
                    <div class="stat-item">
                        <div class="stat-name">${stat.stat.name.replace('-', ' ').toUpperCase()}</div>
                        <div class="stat-value">${stat.base_stat}</div>
                        <div class="stat-bar">
                            <div class="stat-fill" style="width: ${(stat.base_stat / 200) * 100}%"></div>
                        </div>
                    </div>
                `).join('')}
            </div>
            <div class="total-stats">
                <strong>Total: ${totalStats}</strong>
            </div>
        </div>
    `;
}


function createMovesTabTemplate(pokemon) {
    return `
        <div id="moves-tab" class="tab-pane">
            <div class="moves-list">
                ${pokemon.moves.slice(0, 12).map(move => `
                    <span class="move-badge">${move.move.name.replace('-', ' ')}</span>
                `).join('')}
            </div>
            ${pokemon.moves.length > 12 ? `<p class="moves-count">...and ${pokemon.moves.length - 12} more moves</p>` : ''}
        </div>
    `;
}


function createSearchResultTemplate(result) {
    return `
        <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${result.id}.png" 
                alt="${result.name}" class="search-result-img">
        <div class="search-result-info">
            <div class="search-result-name">${result.name.charAt(0).toUpperCase() + result.name.slice(1)}</div>
            <div class="search-result-id">#${result.id}</div>
        </div>
    `;
}