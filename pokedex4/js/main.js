
async function init() {
    await loadAllPokemonNames();
    await dataArray();
    initInfiniteScroll();
}


init();