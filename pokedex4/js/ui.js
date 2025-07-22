
const POKEMON_MIN_ID = 1;
const POKEMON_MAX_ID = 1025;


function getPrevButton() {
    return document.getElementById('prevBtn');
}


function getNextButton() {
    return document.getElementById('nextBtn');
}


function disablePrevButton() {
    const prevBtn = getPrevButton();
    if (prevBtn) {
        prevBtn.disabled = true;
        prevBtn.classList.add('btn-disabled');
    }
}


function enablePrevButton() {
    const prevBtn = getPrevButton();
    if (prevBtn) {
        prevBtn.disabled = false;
        prevBtn.classList.remove('btn-disabled');
    }
}


function shouldDisablePrevButton(currentId) {
    return currentId <= POKEMON_MIN_ID;
}


function updatePrevButtonState(currentId) {
    if (shouldDisablePrevButton(currentId)) {
        disablePrevButton();
    } else {
        enablePrevButton();
    }
}


function disableNextButton() {
    const nextBtn = getNextButton();
    if (nextBtn) {
        nextBtn.disabled = true;
        nextBtn.classList.add('btn-disabled');
    }
}


function enableNextButton() {
    const nextBtn = getNextButton();
    if (nextBtn) {
        nextBtn.disabled = false;
        nextBtn.classList.remove('btn-disabled');
    }
}


function shouldDisableNextButton(currentId) {
    return currentId >= POKEMON_MAX_ID;
}


function updateNextButtonState(currentId) {
    if (shouldDisableNextButton(currentId)) {
        disableNextButton();
    } else {
        enableNextButton();
    }
}


function setupPrevButtonListener(currentId) {
    const prevBtn = getPrevButton();
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            if (currentId > POKEMON_MIN_ID) {
                bigModel(currentId - 1);
            }
        });
    }
}


function setupNextButtonListener(currentId) {
    const nextBtn = getNextButton();
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            if (currentId < POKEMON_MAX_ID) {
                bigModel(currentId + 1);
            }
        });
    }
}


function updateNavigationButtons(currentId) {
    updatePrevButtonState(currentId);
    updateNextButtonState(currentId);
}


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
   
    updateNavigationButtons(currentId);
 
    setupPrevButtonListener(currentId);
    setupNextButtonListener(currentId);
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