
document.addEventListener('DOMContentLoaded', function() {
    // Testimonial slider functionality
    const testimonialsTrack = document.querySelector('.testimonial-track');
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    
    if (testimonialsTrack && testimonialCards.length > 0) {
        let currentIndex = 0;
        const totalSlides = testimonialCards.length;
        
        // Function to update slider position
        function updateSliderPosition() {
            testimonialsTrack.style.transform = `translateX(-${currentIndex * 100}%)`;
            
            // Update active dot
            dots.forEach((dot, index) => {
                if (index === currentIndex) {
                    dot.classList.add('active');
                } else {
                    dot.classList.remove('active');
                }
            });
        }
        
        // Next button click handler
        if (nextBtn) {
            nextBtn.addEventListener('click', function() {
                currentIndex = (currentIndex + 1) % totalSlides;
                updateSliderPosition();
            });
        }
        
        // Previous button click handler
        if (prevBtn) {
            prevBtn.addEventListener('click', function() {
                currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
                updateSliderPosition();
            });
        }
        
        // Dot click handlers
        dots.forEach((dot, index) => {
            dot.addEventListener('click', function() {
                currentIndex = index;
                updateSliderPosition();
            });
        });
        
        // Auto slide every 5 seconds
        let autoSlideInterval = setInterval(() => {
            currentIndex = (currentIndex + 1) % totalSlides;
            updateSliderPosition();
        }, 5000);
        
        // Clear interval on user interaction
        const sliderControls = document.querySelector('.testimonial-controls');
        if (sliderControls) {
            sliderControls.addEventListener('mouseenter', () => {
                clearInterval(autoSlideInterval);
            });
            
            sliderControls.addEventListener('mouseleave', () => {
                autoSlideInterval = setInterval(() => {
                    currentIndex = (currentIndex + 1) % totalSlides;
                    updateSliderPosition();
                }, 5000);
            });
        }
    }
    
    // Animation for service cards on scroll
    const serviceCards = document.querySelectorAll('.service-card');
    
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.9 &&
            rect.bottom >= 0
        );
    }
    
    function handleScrollAnimation() {
        serviceCards.forEach(card => {
            if (isInViewport(card)) {
                card.classList.add('animate');
            }
        });
    }
    
    // Initial check on load
    handleScrollAnimation();
    
    // Check on scroll
    window.addEventListener('scroll', handleScrollAnimation);
    
    // Highlight active nav item based on scroll position
    function updateActiveNavItem() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-menu a');
        
        let currentSectionId = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            
            if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
                currentSectionId = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href');
            if (href && href.includes(currentSectionId)) {
                link.classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', updateActiveNavItem);
    
    // Initialize counter animation for stats
    function animateCounters() {
        const counters = document.querySelectorAll('.counter');
        const speed = 200;
        
        counters.forEach(counter => {
            const target = +counter.getAttribute('data-target');
            let count = 0;
            
            const updateCount = () => {
                const increment = target / speed;
                
                if (count < target) {
                    count += increment;
                    counter.innerText = Math.ceil(count);
                    setTimeout(updateCount, 1);
                } else {
                    counter.innerText = target;
                }
            };
            
            updateCount();
        });
    }
    
    // Trigger counter animation when stats section is in view
    const statsSection = document.querySelector('.stats-section');
    if (statsSection) {
        window.addEventListener('scroll', function() {
            if (isInViewport(statsSection)) {
                animateCounters();
                // Remove event listener after animation is triggered
                window.removeEventListener('scroll', this);
            }
        });
    }
});
