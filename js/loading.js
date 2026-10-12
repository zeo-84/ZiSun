export function initLoading() {
    const screen = document.querySelector('.loading-screen');
    const bar = document.querySelector('.loading__progress-bar');
    if (!screen) return;

    let progress = 0;
    const interval = setInterval(() => {
        progress += Math.random() * 30;
        if (progress >= 100) {
            progress = 100;
            clearInterval(interval);
            setTimeout(() => {
                screen.classList.add('is-hidden');
            }, 500);
        }
        if (bar) bar.style.width = progress + '%';
    }, 300);
}
