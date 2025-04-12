

document.addEventListener('DOMContentLoaded', function() {
    // Services filtering functionality
    const filterButtons = document.querySelectorAll('.filter-btn');
    const serviceItems = document.querySelectorAll('.service-item');
    const noResultsMessage = document.querySelector('.no-results');
    
    // Function to filter services
    function filterServices(category) {
        let hasVisibleItems = false;
        
        serviceItems.forEach(item => {
            const itemCategories = item.dataset.category.split(' ');
            
            if (category === 'all' || itemCategories.includes(category)) {
                item.style.display = 'flex';
                hasVisibleItems = true;
            } else {
                item.style.display = 'none';
            }
        });
        
        // Show/hide no results message
        if (noResultsMessage) {
            noResultsMessage.style.display = hasVisibleItems ? 'none' : 'block';
        }
    }
    
    // Add click event listeners to filter buttons
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            // Get filter category
            const filterCategory = this.dataset.filter;
            
            // Apply filtering
            filterServices(filterCategory);
            
            // Animate filtered items
            setTimeout(() => {
                animateFilteredItems();
            }, 100);
        });
    });
    
    // Function to animate filtered items
    function animateFilteredItems() {
        const visibleItems = document.querySelectorAll('.service-item[style="display: flex;"]');
        
        visibleItems.forEach((item, index) => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
            }, index * 100);
        });
    }
    
    // Initialize animation for all items on page load
    function initialAnimation() {
        serviceItems.forEach((item, index) => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
            }, 300 + index * 100);
        });
    }
    
    // Run initial animation
    initialAnimation();
    
    // Service item hover effects
    serviceItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            const image = item.querySelector('.service-image');
            if (image) {
                image.style.transform = 'scale(1.05)';
                image.style.transition = 'transform 0.5s ease';
            }
        });
        
        item.addEventListener('mouseleave', () => {
            const image = item.querySelector('.service-image');
            if (image) {
                image.style.transform = 'scale(1)';
            }
        });
    });
    
    // Handle appointment form submission for all services page
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
    
    // Dynamic department selection based on service item clicked
    const serviceLinks = document.querySelectorAll('.service-item .btn-outline');
    const departmentSelect = document.getElementById('department');
    
    serviceLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Get the service name from the parent service item
            const serviceItem = this.closest('.service-item');
            const serviceTitle = serviceItem.querySelector('h3').textContent.trim();
            
            // Find the matching option in the department dropdown
            if (departmentSelect) {
                for (let i = 0; i < departmentSelect.options.length; i++) {
                    if (departmentSelect.options[i].text.includes(serviceTitle)) {
                        departmentSelect.selectedIndex = i;
                        break;
                    }
                }
            }
        });
    });
    
    // Add custom styles for the services page
    const style = document.createElement('style');
    style.textContent = `
        .service-item {
            transition: transform 0.3s ease, box-shadow 0.3s ease, opacity 0.5s ease;
        }
        
        .service-image {
            transition: transform 0.5s ease;
        }
        
        .filter-btn {
            position: relative;
            overflow: hidden;
        }
        
        .filter-btn::after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 0;
            width: 0;
            height: 2px;
            background-color: var(--primary-color);
            transition: width 0.3s ease;
        }
        
        .filter-btn:hover::after {
            width: 100%;
        }
        
        .filter-btn.active::after {
            width: 100%;
        }
    `;
    document.head.appendChild(style);
});



