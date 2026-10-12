export function initSearch() {
    const input = document.querySelector('.search-input');
    if (!input) return;

    input.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase();
        const cards = document.querySelectorAll('.product-card');
        cards.forEach(card => {
            const name = card.querySelector('.product-card__name').textContent.toLowerCase();
            card.style.display = name.includes(query) ? 'flex' : 'none';
        });
    });
}
