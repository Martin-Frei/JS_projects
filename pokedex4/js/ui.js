
function showLoadingSpinner() {
    if (!document.getElementById('loadingSpinner')) {
        const spinner = document.createElement('div');
        spinner.id = 'loadingSpinner';
        spinner.innerHTML = createLoadingSpinnerTemplate();
        cardInBox.appendChild(spinner);
    }
}


function hideLoadingSpinner() {
    const spinner = document.getElementById('loadingSpinner');
    if (spinner) {
        spinner.remove();
    }
}


function smallCardTemplate(pokemon) {
    const cardDiv = document.createElement("div");
    const type = pokemon.types[0].type.name;
    
    cardDiv.style.background = types[type] || "grey";
    cardDiv.className = "pokemon-card";
    cardDiv.innerHTML = createSmallCardTemplate(pokemon);
    
    cardInBox.appendChild(cardDiv);
    cardDiv.addEventListener("click", () => bigModel(pokemon.id));
}


async function loadPokemonData(id) {
    const pokemon = pokemonCache.get(id) || await fetchPokemon(id);
    
    if (!pokemon) {
        console.error('Pokémon not found');
        throw new Error('Pokémon not found');
    }
    
    return pokemon;
}


function renderBigModel(pokemon, id) {
    model.innerHTML = createBigModelTemplate(pokemon);
    setupNavigationEventListeners(id);
    setupTabEventListeners();
    setupCloseButtonEventListener();
}

n
async function bigModel(id) {
    showLoadingSpinner();
    
    try {
        const pokemon = await loadPokemonData(id);
        renderBigModel(pokemon, id);
        
    } catch (error) {
        console.error("Fehler beim Laden des Pokémon:", error);
        showAndHide(true);
        hideLoadingSpinner();
        return;
    }
    
    hideLoadingSpinner();
    showAndHide(false);
}


function setupNavigationEventListeners(currentId) {
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            if (currentId > 1) {
                bigModel(currentId - 1);
            }
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            if (currentId < 1010) {
                bigModel(currentId + 1);
            }
        });
    }
}


function setupTabEventListeners() {
    const tabBtns = model.querySelectorAll('.tab-btn');
    const tabPanes = model.querySelectorAll('.tab-pane');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            tabBtns.forEach(b => b.classList.remove('active'));
            tabPanes.forEach(p => p.classList.remove('active'));
            btn.classList.add('active');
            const targetTab = btn.dataset.tab;
            const targetPane = document.getElementById(`${targetTab}-tab`);
            if (targetPane) {
                targetPane.classList.add('active');
            }
        });
    });
}


function setupCloseButtonEventListener() {
    const closeBtn = model.querySelector('.close-btn');
    if (closeBtn) {
        closeBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            showAndHide(true);
        });
    }
}


function setupModalOverlayEventListener() {
    model.addEventListener('click', (e) => {
        if (e.target.closest('.modelContent')) {
            e.stopPropagation();
            return;
        }
        if (e.target === model) {
            showAndHide(true);
        }
    });
}


function showAndHide(hide) {
    if (hide) {
        model.classList.add('hidden');
        document.body.style.overflow = "auto";
    } else {
        model.classList.remove('hidden');
        document.body.style.overflow = "hidden";
    }
}


function initializeUI() {
    setupModalOverlayEventListener();
}


document.addEventListener('DOMContentLoaded', initializeUI);