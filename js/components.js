document.addEventListener('DOMContentLoaded', function() {
    // Load header and footer
    loadComponent('header', 'components/header.html');
    loadComponent('footer', 'components/footer.html');
    loadComponent('pathway', 'components/pathway.html', initializePathway);
    loadComponent('japanesePathway', 'components/japanesePathway.html');

    // Function to load components
    function loadComponent(id, url) {
        fetch(url)
            .then(response => response.text())
            .then(html => {
                document.getElementById(id).innerHTML = html;
                if(id === 'header') {
                    initializeNavigation();
                }
            })
            .catch(error => console.error('Error loading component:', error));
    }

    // Initialize navigation functionality
    function initializeNavigation() {
        const hamburger = document.querySelector('.hamburger');
        const navList = document.querySelector('.nav-list');
        const navItems = document.querySelectorAll('.nav-item');
        const hasNested = document.querySelectorAll('.has-nested');

        hamburger?.addEventListener('click', function() {
            navList.classList.toggle('active');
            hamburger.classList.toggle('active');
        });

        navItems.forEach(item => {
            const link = item.querySelector('.nav-link');
            if (link && item.querySelector('.dropdown-content')) {
                link.addEventListener('click', function(e) {
                    if (window.innerWidth <= 1024) {
                        e.preventDefault();
                        item.classList.toggle('active');
                        
                        navItems.forEach(otherItem => {
                            if (otherItem !== item) {
                                otherItem.classList.remove('active');
                            }
                        });
                    }
                });
            }
        });

        document.addEventListener('click', function(e) {
            if (!navList.contains(e.target) && !hamburger.contains(e.target)) {
                navList.classList.remove('active');
                hamburger.classList.remove('active');
                navItems.forEach(item => item.classList.remove('active'));
                hasNested.forEach(item => item.classList.remove('active'));
            }
        });

        window.addEventListener('resize', function() {
            if (window.innerWidth > 1024) {
                navList.classList.remove('active');
                hamburger.classList.remove('active');
                navItems.forEach(item => item.classList.remove('active'));
                hasNested.forEach(item => item.classList.remove('active'));
            }
        });

        
    }

     // Initialize pathway functionality
     function initializePathway() {
        const navButtons = document.querySelectorAll('.pathway-nav-button');
        const contentCards = document.querySelectorAll('.content-card');

        function setActiveSection(sectionId) {
            // Remove active classes
            navButtons.forEach(btn => {
                btn.classList.remove('active');
                if(btn.getAttribute('data-section') === sectionId) {
                    btn.classList.add('active');
                }
            });

            contentCards.forEach(card => {
                card.classList.remove('active');
                if(card.id === sectionId) {
                    card.classList.add('active');
                }
            });
        }

        // Set initial active section
        setActiveSection('research');

        // Add click handlers
        navButtons.forEach(button => {
            button.addEventListener('click', () => {
                const sectionId = button.getAttribute('data-section');
                setActiveSection(sectionId);
            });
        });
    }


});