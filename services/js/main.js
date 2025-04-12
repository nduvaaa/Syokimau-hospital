document.addEventListener('DOMContentLoaded', function () {
    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    const navMenu = document.querySelector('.nav-menu');
    const headerContainer = document.querySelector('.header-container');
    const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
    const sectionToggles = document.querySelectorAll('.section-toggle');
    const contentSections = document.querySelectorAll('.content-section');
    const desktopDropdowns = document.querySelectorAll('.nav-menu-desktop .dropdown');

    if (menuToggle && mobileMenu) {
        menuToggle.addEventListener('click', function () {
            mobileMenu.classList.toggle('active');
            menuToggle.setAttribute('aria-expanded', mobileMenu.classList.contains('active'));

            // Toggle animation for the hamburger icon
            const spans = this.querySelectorAll('span');
            spans.forEach(span => span.classList.toggle('active'));
        });
    }

    // Dropdown functionality for mobile
    dropdownToggles.forEach(toggle => {
        toggle.addEventListener('click', function (e) {
            if (window.innerWidth <= 768) {
                e.preventDefault();
                const dropdownMenu = this.nextElementSibling;
                dropdownMenu.classList.toggle('show');
            }
        });
    });

    // Section toggles
    function setActiveSection(sectionName) {
        contentSections.forEach(section => section.classList.remove('active'));
        sectionToggles.forEach(t => t.classList.remove('active'));

        const targetSection = document.getElementById(sectionName);
        if (targetSection) {
            targetSection.classList.add('active');
        }

        document.querySelectorAll(`.section-toggle[data-section="${sectionName}"]`).forEach(el => {
            el.classList.add('active');
        });
    }

    sectionToggles.forEach(toggle => {
        toggle.addEventListener('click', function (e) {
            e.preventDefault();
            const sectionName = this.getAttribute('data-section');
            setActiveSection(sectionName);

            if (mobileMenu && mobileMenu.classList.contains('active')) {
                mobileMenu.classList.remove('active');
                menuToggle.setAttribute('aria-expanded', 'false');
            }
        });
    });

    setActiveSection('patients');

    // Desktop dropdowns
    desktopDropdowns.forEach(dropdown => {
        const trigger = dropdown.querySelector('.dropdown-arrow');

        if (trigger) {
            trigger.addEventListener('click', function (e) {
                if (e.target === trigger || trigger.contains(e.target)) {
                    e.preventDefault();

                    desktopDropdowns.forEach(otherDropdown => {
                        if (otherDropdown !== dropdown) {
                            otherDropdown.classList.remove('active');
                        }
                    });

                    dropdown.classList.toggle('active');
                }
            });

            const links = dropdown.querySelectorAll('.dropdown-content a');
            links.forEach(link => {
                link.addEventListener('click', () => {
                    dropdown.classList.remove('active');
                });
            });
        }
    });

    // Close desktop dropdowns when clicking outside
    document.addEventListener('click', function (e) {
        desktopDropdowns.forEach(dropdown => {
            if (!dropdown.contains(e.target)) {
                dropdown.classList.remove('active');
            }
        });

        if (
            !headerContainer.contains(e.target) &&
            mobileMenu &&
            !mobileMenu.contains(e.target) &&
            mobileMenu.classList.contains('active')
        ) {
            mobileMenu.classList.remove('active');
            menuToggle.setAttribute('aria-expanded', 'false');
        }
    });

    // Search icon functionality
    const searchIcons = document.querySelectorAll('.search-icon');
    searchIcons.forEach(icon => {
        icon.addEventListener('click', function () {
            alert('Search functionality to be implemented!');
        });
    });

    // Smooth scrolling for anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]:not([href="#"])');
    anchorLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Scroll to top button
    const scrollTopBtn = document.getElementById('scrollTopBtn');
    if (scrollTopBtn) {
        window.addEventListener('scroll', function () {
            if (window.pageYOffset > 300) {
                scrollTopBtn.classList.add('visible');
            } else {
                scrollTopBtn.classList.remove('visible');
            }
        });

        scrollTopBtn.addEventListener('click', function () {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Appointment form submission
    const appointmentForm = document.getElementById('appointmentForm');
    const formSuccess = document.getElementById('formSuccess');

    if (appointmentForm) {
        appointmentForm.addEventListener('submit', function (e) {
            e.preventDefault();

            // Basic form validation
            const requiredFields = appointmentForm.querySelectorAll('[required]');
            let isValid = true;

            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.classList.add('error');
                } else {
                    field.classList.remove('error');
                }
            });

            if (isValid) {
                // Simulate form submission
                setTimeout(() => {
                    appointmentForm.style.display = 'none';
                    if (formSuccess) formSuccess.style.display = 'block';
                }, 1000);
            }
        });
    }

    // Dynamically load Google Translate script
    const translateScript = document.createElement('script');
    translateScript.type = 'text/javascript';
    translateScript.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
    translateScript.onerror = () => console.error('Google Translate script failed to load.');
    document.body.appendChild(translateScript);
});

// Handle window resize for responsive navigation
window.addEventListener('resize', function () {
    const navMenu = document.querySelector('.nav-menu');
    const menuToggle = document.querySelector('.menu-toggle');

    // Reset mobile menu when resizing to desktop
    if (window.innerWidth > 768 && navMenu && navMenu.classList.contains('show')) {
        navMenu.classList.remove('show');

        // Reset hamburger icon
        if (menuToggle) {
            const spans = menuToggle.querySelectorAll('span');
            spans.forEach(span => span.classList.remove('active'));
        }
    }
});