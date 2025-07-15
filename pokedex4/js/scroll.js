
function initInfiniteScroll() {
    window.addEventListener('scroll', () => {
        if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 100) {
            if (!loading) {
                console.log('Loading more Pokémon...');
                dataArray();
            }
        }
    });
}