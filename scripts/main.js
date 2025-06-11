document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('.content-section');
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    sections.forEach(sec => observer.observe(sec));

    // Respect user motion preferences
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!reducedMotion) {
        // Create overlay for zoom transition effect
        const overlay = document.createElement('div');
        overlay.className = 'zoom-overlay';
        document.body.appendChild(overlay);

        // Apply zoom effect on designated links
        const zoomLinks = document.querySelectorAll('a.zoom-link');
        zoomLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const rect = link.getBoundingClientRect();
                overlay.style.transformOrigin = `${rect.left + rect.width / 2}px ${rect.top + rect.height / 2}px`;
                overlay.classList.add('active');
                const url = this.href;
                overlay.addEventListener('transitionend', () => {
                    window.location.href = url;
                }, { once: true });
            });
        });
    }

    console.log('JavaScript is loaded and ready!');
});
