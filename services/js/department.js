
document.addEventListener('DOMContentLoaded', function() {
    // FAQ Accordion functionality
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            // Close other open FAQs
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle current FAQ
            item.classList.toggle('active');
        });
    });
    
    // Interactive Service Items
    const serviceItems = document.querySelectorAll('.service-item');
    
    serviceItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            item.classList.add('hover');
        });
        
        item.addEventListener('mouseleave', () => {
            item.classList.remove('hover');
        });
    });
    
    // Handle appointment form submission for department page
    const appointmentForm = document.getElementById('appointmentForm');
    const formSuccess = document.getElementById('formSuccess');
    
    if (appointmentForm) {
        appointmentForm.addEventListener('submit', function(e) {
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
                // Add loading state
                const submitButton = appointmentForm.querySelector('button[type="submit"]');
                const originalText = submitButton.textContent;
                submitButton.textContent = 'Processing...';
                submitButton.disabled = true;
                
                // Simulate form submission delay
                setTimeout(() => {
                    appointmentForm.style.display = 'none';
                    if (formSuccess) formSuccess.style.display = 'block';
                    
                    // Reset form
                    submitButton.textContent = originalText;
                    submitButton.disabled = false;
                    appointmentForm.reset();
                }, 1500);
            }
        });
    }
    
    // Animate stats on scroll
    const statsSection = document.querySelector('.emergency-stats');
    
    if (statsSection) {
        const statItems = statsSection.querySelectorAll('.stat-item');
        
        function isInViewport(element) {
            const rect = element.getBoundingClientRect();
            return (
                rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8 &&
                rect.bottom >= 0
            );
        }
        
        function animateStats() {
            if (isInViewport(statsSection) && !statsSection.classList.contains('animated')) {
                statsSection.classList.add('animated');
                
                statItems.forEach((item, index) => {
                    setTimeout(() => {
                        item.classList.add('animate');
                    }, index * 200);
                });
            }
        }
        
        // Check on scroll
        window.addEventListener('scroll', animateStats);
        
        // Initial check
        animateStats();
    }
    
    // Highlight related department on hover
    const relatedCards = document.querySelectorAll('.related-card');
    
    relatedCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            relatedCards.forEach(c => {
                if (c !== card) {
                    c.classList.add('dimmed');
                }
            });
        });
        
        card.addEventListener('mouseleave', () => {
            relatedCards.forEach(c => {
                c.classList.remove('dimmed');
            });
        });
    });
    
    // Add custom styles for the department page
    const style = document.createElement('style');
    style.textContent = `
        .stat-item {
            transform: translateY(20px);
            opacity: 0;
            transition: transform 0.5s ease-out, opacity 0.5s ease-out;
        }
        
        .stat-item.animate {
            transform: translateY(0);
            opacity: 1;
        }
        
        .service-item.hover {
            border-left: 4px solid var(--primary-color);
        }
        
        .related-card.dimmed {
            opacity: 0.5;
            transform: scale(0.95);
        }
    `;
    document.head.appendChild(style);
});
