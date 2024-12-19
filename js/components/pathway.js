// js/components/pathway.js
export function initializePathway() {
    // Add intersection observer for animation
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
                // Add class to trigger animations
                const leftContent = entry.target.querySelector('[class*="md:text-right"]');
                const rightContent = entry.target.querySelector('[class*="md:pl-12"]');
                
                if (leftContent) leftContent.classList.add('md:translate-x-0', 'opacity-100');
                if (rightContent) rightContent.classList.add('md:translate-x-0', 'opacity-100');
            }
        });
    }, {
        threshold: 0.1
    });

    // Observe all timeline groups
    document.querySelectorAll('.group').forEach(group => {
        observer.observe(group);
    });

    // Update progress line on scroll
    function updateProgressLine() {
        const progressLine = document.getElementById('progress-line');
        if (!progressLine) return;

        const timeline = document.querySelector('.space-y-12');
        const scrollPosition = window.scrollY;
        const timelineTop = timeline.offsetTop;
        const timelineHeight = timeline.offsetHeight;
        const windowHeight = window.innerHeight;

        let progress = (scrollPosition - timelineTop + windowHeight/2) / timelineHeight;
        progress = Math.max(0, Math.min(1, progress));

        progressLine.style.height = `${progress * 100}%`;
    }

    // Add scroll listener for progress line
    window.addEventListener('scroll', updateProgressLine);
    // Initial update
    updateProgressLine();
}