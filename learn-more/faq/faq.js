
    // Google Translate Initialization
    function googleTranslateElementInit() {
        new google.translate.TranslateElement({
            pageLanguage: 'en',
            includedLanguages: 'ar,en,es,fr,sw,zh-CN',
            layout: google.translate.TranslateElement.InlineLayout.SIMPLE,
            autoDisplay: false
        }, 'google_translate_element');

        new google.translate.TranslateElement({
            pageLanguage: 'en',
            includedLanguages: 'ar,en,es,fr,sw,zh-CN',
            layout: google.translate.TranslateElement.InlineLayout.SIMPLE,
            autoDisplay: false
        }, 'google_translate_element_mobile');
    }

    // Trigger language change for Google Translate
    function triggerLanguageChange(langCode) {
        const iframe = document.querySelector('.goog-te-banner-frame');
        if (iframe) {
            const innerDoc = iframe.contentDocument || iframe.contentWindow.document;
            const langSelect = innerDoc.querySelector('.goog-te-combo');
            if (langSelect) {
                langSelect.value = langCode;
                langSelect.dispatchEvent(new Event('change'));
            }
        } else {
            const desktopSelect = document.querySelector('#google_translate_element select');
            const mobileSelect = document.querySelector('#google_translate_element_mobile select');
            if (desktopSelect) {
                desktopSelect.value = langCode;
                desktopSelect.dispatchEvent(new Event('change'));
            } else if (mobileSelect) {
                mobileSelect.value = langCode;
                mobileSelect.dispatchEvent(new Event('change'));
            }
        }
    }

    // Main DOM Content Loaded Event Listener
    document.addEventListener('DOMContentLoaded', function () {
        // === Navigation Elements ===
        const menuToggle = document.querySelector('.menu-toggle');
        const mobileMenu = document.querySelector('.mobile-menu');
        const headerContainer = document.querySelector('.header-container');
        const dropdownToggles = mobileMenu?.querySelectorAll('.dropdown-toggle');
        const sectionToggles = document.querySelectorAll('.section-toggle');
        const contentSections = document.querySelectorAll('.content-section');
        const desktopDropdowns = document.querySelectorAll('.nav-menu-desktop .dropdown');

        // Mobile menu toggle
        menuToggle?.addEventListener('click', function () {
            mobileMenu.classList.toggle('active');
            menuToggle.setAttribute('aria-expanded', mobileMenu.classList.contains('active'));
        });

        // Mobile menu dropdown toggles
        dropdownToggles?.forEach(toggle => {
            toggle.addEventListener('click', function (e) {
                e.preventDefault();
                const submenuId = this.getAttribute('data-submenu');
                const submenu = document.getElementById(submenuId);

                dropdownToggles.forEach(otherToggle => {
                    if (otherToggle !== this) {
                        const otherSubmenuId = otherToggle.getAttribute('data-submenu');
                        const otherSubmenu = document.getElementById(otherSubmenuId);
                        if (otherSubmenu?.classList.contains('active')) {
                            otherSubmenu.classList.remove('active');
                            otherToggle.classList.remove('expanded');
                        }
                    }
                });

                this.classList.toggle('expanded');
                submenu?.classList.toggle('active');
            });
        });

        // Section toggles
        function setActiveSection(sectionName) {
            contentSections.forEach(section => section.classList.remove('active'));
            sectionToggles.forEach(t => t.classList.remove('active'));

            const targetSection = document.getElementById(sectionName);
            targetSection?.classList.add('active');

            document.querySelectorAll(`.section-toggle[data-section="${sectionName}"]`).forEach(el => {
                el.classList.add('active');
            });
        }

        sectionToggles.forEach(toggle => {
            toggle.addEventListener('click', function (e) {
                e.preventDefault();
                const sectionName = this.getAttribute('data-section');
                setActiveSection(sectionName);

                if (mobileMenu.classList.contains('active')) {
                    mobileMenu.classList.remove('active');
                    menuToggle.setAttribute('aria-expanded', 'false');
                }
            });
        });

        setActiveSection('patients');

        // Desktop dropdowns
        desktopDropdowns.forEach(dropdown => {
            const trigger = dropdown.querySelector('.dropdown-arrow');
            trigger?.addEventListener('click', function (e) {
                e.preventDefault();
                desktopDropdowns.forEach(otherDropdown => {
                    if (otherDropdown !== dropdown) {
                        otherDropdown.classList.remove('active');
                    }
                });
                dropdown.classList.toggle('active');
            });

            const links = dropdown.querySelectorAll('.dropdown-content a');
            links.forEach(link => {
                link.addEventListener('click', () => {
                    dropdown.classList.remove('active');
                });
            });
        });

        // Close desktop dropdowns when clicking outside
        document.addEventListener('click', function (e) {
            desktopDropdowns.forEach(dropdown => {
                if (!dropdown.contains(e.target)) {
                    dropdown.classList.remove('active');
                }
            });

            if (!headerContainer.contains(e.target) && !mobileMenu.contains(e.target) && mobileMenu.classList.contains('active')) {
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

        const heroSearchButton = document.querySelector('.hero-section .search-button');
        heroSearchButton?.addEventListener('click', function () {
            const query = document.querySelector('.hero-section .search-input')?.value;
            alert(`Searching for: "${query}" (Implementation needed)`);
        });

        // === FAQ Logic ===
        // FAQ Data
        const faqData = [
            {
                id: 1,
                question: "What are your visiting hours?",
                answer: "Our general visiting hours are from 10:00 AM to 8:00 PM daily. However, specific departments may have different visiting protocols:\n\n• ICU: 11:00 AM - 1:00 PM and 4:00 PM - 6:00 PM\n• Maternity Ward: 10:00 AM - 12:00 PM and 4:00 PM - 7:00 PM\n• Pediatric Ward: 10:00 AM - 8:00 PM (parents can stay 24/7)\n\nVisitors are limited to 2 per patient at any time. Please check with the nurse's station if you have special circumstances.",
                category: "Visiting"
            },
            {
                id: 2,
                question: "How do I schedule an appointment?",
                answer: "You can schedule an appointment in several ways:\n\n1. Online: Use our patient portal on our website\n2. Phone: Call our appointment line at +254 113 566 500\n3. In-person: Visit our reception desk during business hours\n\nPlease have your medical insurance information ready when scheduling. New patients should arrive 15 minutes early to complete necessary paperwork.",
                category: "Appointments"
            },
            {
                id: 3,
                question: "What insurance plans do you accept?",
                answer: "We accept most major insurance plans, including:\n\n• NHIF\n• AAR\n• Jubilee\n• CIC\n• Madison\n• Resolution Health\n• Britam\n• Heritage\n• Sanlam\n\nWe recommend contacting your insurance provider before your visit to verify coverage. Our billing department can assist with any insurance-related questions at +254 113 566 510.",
                category: "Billing"
            },
            {
                id: 4,
                question: "How can I access my medical records?",
                answer: "You can access your medical records through:\n\n1. Patient Portal: Create an account on our website for 24/7 access\n2. In-person: Visit our Medical Records department with valid ID\n3. Request Form: Submit a completed Medical Records Release Form\n\nFor third-party requests, we require written authorization from the patient. Processing may take 3-5 business days. There may be a nominal fee for printed copies exceeding 10 pages.",
                category: "Records"
            },
            {
                id: 5,
                question: "What should I bring to my first appointment?",
                answer: "For your first appointment, please bring:\n\n• Valid government-issued photo ID\n• Current insurance card\n• List of current medications (including doses)\n• Medical history documentation\n• Referral letter (if applicable)\n• Previous test results related to your visit\n• Payment method for any copays or deductibles\n\nArriving 15-20 minutes early will give you time to complete all necessary paperwork.",
                category: "Appointments"
            },
            {
                id: 6,
                question: "Do you offer emergency services?",
                answer: "Yes, our Emergency Department is open 24/7, 365 days a year to handle all medical emergencies. Our emergency team includes specialists in trauma, cardiac care, pediatrics, and critical care.\n\nWe operate on a triage system, which means patients are seen based on the severity of their condition rather than arrival time. For non-emergency situations, we recommend using our Urgent Care services for faster service.",
                category: "Services"
            },
            {
                id: 7,
                question: "How can I pay my hospital bill?",
                answer: "We offer several payment options:\n\n• Online: Through our secure patient portal\n• In-person: At our cashier's office (cash, credit/debit cards, M-Pesa)\n• Mobile Money: Through M-Pesa Paybill Number 222333\n• Bank Transfer: To our hospital account (details provided upon request)\n\nIf you're experiencing financial difficulties, please contact our financial counselors at +254 113 566 520 to discuss payment plans or financial assistance options.",
                category: "Billing"
            },
            {
                id: 8,
                question: "Do you have specialists on staff?",
                answer: "Yes, Syokimau Hospital has a comprehensive team of specialists covering all major medical disciplines, including:\n\n• Cardiology\n• Orthopedics\n• Neurology\n• Obstetrics & Gynecology\n• Pediatrics\n• Oncology\n• Urology\n• Gastroenterology\n• Dermatology\n• Ophthalmology\n\nOur specialists work closely with primary care physicians to provide coordinated care. You can find detailed profiles of our doctors on our website's 'Find a Doctor' section.",
                category: "Services"
            },
            {
                id: 9,
                question: "What COVID-19 precautions are you taking?",
                answer: "We maintain strict COVID-19 protocols:\n\n• Mandatory masking in clinical areas\n• Temperature screening at entrances\n• Enhanced cleaning and disinfection\n• Separate waiting areas for symptomatic patients\n• Modified visiting policies\n• Hand sanitizing stations throughout the facility\n• Regular testing of staff\n\nWe follow all Ministry of Health guidelines and update our protocols as recommendations evolve.",
                category: "Safety"
            },
            {
                id: 10,
                question: "Do you offer maternity services?",
                answer: "Yes, we offer comprehensive maternity services including:\n\n• Prenatal care and childbirth classes\n• Labor and delivery (natural and cesarean)\n• Level II NICU for specialized newborn care\n• Lactation support and breastfeeding classes\n• Postpartum care\n• Family planning services\n\nOur maternity ward features private rooms designed for mother-baby bonding. Tours of our maternity facilities are available by appointment.",
                category: "Services"
            },
            {
                id: 11,
                question: "Can I get a cost estimate before my procedure?",
                answer: "Yes, we provide cost estimates for scheduled procedures. Please contact our billing department at +254 113 566 515 with your procedure details and insurance information for an estimate.\n\nKeep in mind that estimates are based on typical cases and actual costs may vary depending on specific medical circumstances or complications. We recommend verifying coverage with your insurance company as well.",
                category: "Billing"
            },
            {
                id: 12,
                question: "What accommodations do you offer for overnight stays?",
                answer: "Our inpatient rooms include:\n\n• Private and semi-private options\n• Executive suites for enhanced comfort\n• Beds for parents in pediatric rooms\n• Television and WiFi\n• Adjustable beds with call buttons\n• Private bathrooms\n\nMeals are included for patients, and visitors can purchase meals at our cafeteria or order from local restaurants that deliver to the hospital.",
                category: "Facilities"
            },
            {
                id: 13,
                question: "How do I find the right doctor for my condition?",
                answer: "To find the right doctor:\n\n1. Use our 'Find a Doctor' tool on the website to search by specialty, condition, or name\n2. Call our physician referral line at +254 113 566 530\n3. Ask your primary care physician for a recommendation\n\nOur staff can match you with physicians who specialize in your condition and accept your insurance. We also consider factors like language preferences and scheduling availability.",
                category: "Appointments"
            },
            {
                id: 14,
                question: "What should I do if I have a complaint?",
                answer: "If you have a complaint or concern about your care:\n\n1. Speak directly with your care provider or the department manager\n2. Contact our Patient Advocacy office at +254 113 566 540\n3. Submit a formal complaint through our website or by email to feedback@syokimauhospital.co.ke\n\nAll complaints are taken seriously and investigated promptly. Our goal is to resolve issues and improve our services based on patient feedback.",
                category: "General"
            },
            {
                id: 15,
                question: "Do you offer transportation services for patients?",
                answer: "Yes, we offer several transportation options:\n\n• Non-emergency medical transport for scheduled appointments\n• Shuttle service between our main hospital and satellite clinics\n• Wheelchair assistance within the facility\n• Reserved parking for patients with mobility challenges\n\nTo arrange transportation or for more information, please call our transportation coordinator at +254 113 566 550 at least 48 hours before your appointment.",
                category: "Facilities"
            },
            {
                id: 16,
                question: "What amenities are available at your facility?",
                answer: "Our facility includes a range of amenities:\n\n• Cafeteria with healthy food options\n• Coffee shop\n• Gift shop\n• Chapel and prayer rooms\n• Free WiFi throughout the building\n• ATM machines\n• Pharmacy\n• Outdoor healing gardens\n• Mobile charging stations\n• Comfortable waiting areas with televisions\n\nWe strive to make your hospital experience as comfortable as possible.",
                category: "Facilities"
            },
            {
                id: 17,
                question: "How do I prepare for my surgery?",
                answer: "Surgery preparation varies by procedure, but generally:\n\n• Follow all fasting instructions (typically no food/drink after midnight)\n• Shower with antimicrobial soap if provided\n• Remove jewelry, makeup, and nail polish\n• Wear comfortable, loose clothing\n• Arrange for someone to drive you home\n• Bring your ID, insurance card, and current medication list\n\nYour surgeon's office will provide specific instructions for your procedure. Please follow them carefully to avoid postponement of your surgery.",
                category: "Appointments"
            },
            {
                id: 18,
                question: "Do you have interpreters available?",
                answer: "Yes, we provide interpretation services for patients with limited English proficiency or hearing impairments:\n\n• In-person interpreters for Swahili, Kikuyu, and sign language\n• Phone/video interpretation for other languages\n• Written materials in multiple languages\n\nPlease inform us of your language needs when scheduling your appointment so we can arrange appropriate services. There is no charge for interpretation services.",
                category: "General"
            },
            {
                id: 19,
                question: "What vaccinations do you offer?",
                answer: "We offer a comprehensive range of vaccinations including:\n\n• Routine childhood immunizations (per KEPI schedule)\n• Adolescent vaccines (HPV, etc.)\n• Adult vaccines (flu, pneumonia, shingles, etc.)\n• Travel vaccines (yellow fever, typhoid, etc.)\n• COVID-19 vaccines\n\nMost vaccinations are available through our primary care clinic or dedicated vaccination clinic. Some specialty vaccines may require an appointment.",
                category: "Services"
            },
            {
                id: 20,
                question: "How do I volunteer at Syokimau Hospital?",
                answer: "To volunteer at our hospital:\n\n1. Complete an application form available on our website\n2. Attend an orientation session\n3. Complete a background check and health screening\n4. Commit to a minimum number of hours (varies by department)\n\nVolunteers support our hospital in many ways, from greeting visitors to providing administrative support. For more information, contact our Volunteer Services office at +254 113 566 570.",
                category: "General"
            }
        ];

        // Categories with icons
        const categories = [
            {
                id: 'all',
                name: 'All Questions',
                icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>',
                count: faqData.length
            },
            {
                id: 'Appointments',
                name: 'Appointments',
                icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 2v4"></path><path d="M16 2v4"></path><rect width="18" height="18" x="3" y="4" rx="2"></rect><circle cx="16" cy="16" r="2"></circle><path d="M16 14v1"></path></svg>',
                count: faqData.filter(faq => faq.category === 'Appointments').length
            },
            {
                id: 'Billing',
                name: 'Billing & Insurance',
                icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2v20"></path><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>',
                count: faqData.filter(faq => faq.category === 'Billing').length
            },
            {
                id: 'Services',
                name: 'Our Services',
                icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path></svg>',
                count: faqData.filter(faq => faq.category === 'Services').length
            },
            {
                id: 'Records',
                name: 'Medical Records',
                icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><path d="M14 2v6h6"></path><path d="M16 13H8"></path><path d="M16 17H8"></path><path d="M10 9H8"></path></svg>',
                count: faqData.filter(faq => faq.category === 'Records').length
            },
            {
                id: 'Visiting',
                name: 'Visiting Hours',
                icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M22 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>',
                count: faqData.filter(faq => faq.category === 'Visiting').length
            },
            {
                id: 'Facilities',
                name: 'Facilities',
                icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>',
                count: faqData.filter(faq => faq.category === 'Facilities').length
            },
            {
                id: 'General',
                name: 'General Info',
                icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="10" r="3"></circle><path d="M7 20.662V19a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v1.662"></path></svg>',
                count: faqData.filter(faq => faq.category === 'General').length
            },
            {
                id: 'Safety',
                name: 'Safety & Protocols',
                icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>',
                count: faqData.filter(faq => faq.category === 'Safety').length
            }
        ];

        // State Management
        let activeCategory = 'all';
        let searchTerm = '';
        let visibleFaqs = 6;
        let filteredFaqs = [...faqData];

        // DOM Elements
        const categoriesContainer = document.querySelector('.categories-container');
        const faqContainer = document.querySelector('.faq-container');
        const searchForm = document.getElementById('search-form');
        const searchInput = document.getElementById('search-input');
        const loadMoreButton = document.getElementById('load-more-button');
        const loadMoreContainer = document.getElementById('load-more-container');
        const noResultsElement = document.getElementById('no-results');
        const resetFiltersButton = document.getElementById('reset-filters-button');
        const currentYearElement = document.getElementById('current-year');

        // Set current year in footer
        if (currentYearElement) {
            currentYearElement.textContent = new Date().getFullYear();
        }

        // Initialize categories
        function renderCategories() {
            if (!categoriesContainer) return;
            categoriesContainer.innerHTML = '';

            categories.forEach(category => {
                const isActive = activeCategory === category.id;
                const delay = Math.random() * 0.5;

                const categoryElement = document.createElement('div');
                categoryElement.className = `category-card ${isActive ? 'active' : ''}`;
                categoryElement.style.animationDelay = `${delay}s`;
                categoryElement.innerHTML = `
                    <div class="category-icon">
                        ${category.icon}
                    </div>
                    <h3 class="category-name">${category.name}</h3>
                    <span class="category-count">${category.count} questions</span>
                `;

                categoryElement.addEventListener('click', () => {
                    activeCategory = category.id;
                    filterFaqs();
                    renderCategories();
                });

                categoriesContainer.appendChild(categoryElement);
            });
        }

        // Initialize FAQ items
        function renderFaqs() {
            if (!faqContainer) return;
            faqContainer.innerHTML = '';

            if (filteredFaqs.length === 0) {
                if (noResultsElement) noResultsElement.style.display = 'block';
                if (loadMoreContainer) loadMoreContainer.style.display = 'none';
                return;
            }

            if (noResultsElement) noResultsElement.style.display = 'none';

            const faqs = filteredFaqs.slice(0, visibleFaqs);

            faqs.forEach((faq, index) => {
                const isInitiallyOpen = index === 0;
                const faqElement = document.createElement('div');
                faqElement.className = `faq-item ${isInitiallyOpen ? 'active' : ''}`;
                faqElement.style.animationDelay = `${index * 0.1}s`;

                faqElement.innerHTML = `
                    <div class="faq-question">
                        <h3>${faq.question}</h3>
                        <div class="faq-toggle">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M12 5v14M5 12h14"/>
                            </svg>
                        </div>
                    </div>
                    <div class="faq-answer" style="${isInitiallyOpen ? 'max-height: 1000px;' : ''}">
                        <div class="faq-answer-inner">
                            <p class="faq-answer-text">${faq.answer}</p>
                            <div class="faq-answer-meta">
                                <span class="faq-answer-category">${faq.category}</span>
                            </div>
                        </div>
                    </div>
                `;

                const questionElement = faqElement.querySelector('.faq-question');
                const answerElement = faqElement.querySelector('.faq-answer');
                const answerInnerElement = faqElement.querySelector('.faq-answer-inner');

                questionElement.addEventListener('click', () => {
                    const isActive = faqElement.classList.contains('active');

                    document.querySelectorAll('.faq-item.active').forEach(item => {
                        if (item !== faqElement) {
                            item.classList.remove('active');
                            item.querySelector('.faq-answer').style.maxHeight = '0';
                        }
                    });

                    if (isActive) {
                        faqElement.classList.remove('active');
                        answerElement.style.maxHeight = '0';
                    } else {
                        faqElement.classList.add('active');
                        answerElement.style.maxHeight = `${answerInnerElement.scrollHeight + 40}px`;
                    }
                });

                faqContainer.appendChild(faqElement);
            });

            if (loadMoreContainer) {
                if (filteredFaqs.length > visibleFaqs) {
                    loadMoreContainer.style.display = 'block';
                } else {
                    loadMoreContainer.style.display = 'none';
                }
            }
        }

        // Filter FAQs based on category and search term
        function filterFaqs() {
            let results = [...faqData];

            if (searchTerm) {
                const term = searchTerm.toLowerCase();
                results = results.filter(faq =>
                    faq.question.toLowerCase().includes(term) ||
                    faq.answer.toLowerCase().includes(term)
                );
            }

            if (activeCategory !== 'all') {
                results = results.filter(faq => faq.category === activeCategory);
            }

            filteredFaqs = results;
            visibleFaqs = 6;
            renderFaqs();
        }

        // Load more FAQs
        loadMoreButton?.addEventListener('click', () => {
            visibleFaqs += 6;
            renderFaqs();

            const newItems = document.querySelectorAll('.faq-item');
            if (newItems.length > 0) {
                const lastVisibleItem = newItems[Math.min(visibleFaqs - 7, newItems.length - 1)];
                if (lastVisibleItem) {
                    lastVisibleItem.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                }
            }
        });

        // Search form submit
        searchForm?.addEventListener('submit', (e) => {
            e.preventDefault();
            searchTerm = searchInput?.value.trim();
            filterFaqs();
        });

        // Reset filters
        resetFiltersButton?.addEventListener('click', () => {
            searchTerm = '';
            activeCategory = 'all';
            if (searchInput) searchInput.value = '';
            filterFaqs();
            renderCategories();
        });

        // Scroll animation
        function initScrollAnimation() {
            const faqItems = document.querySelectorAll('.faq-item');

            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                        observer.unobserve(entry.target);
                    }
                });
            }, {
                threshold: 0.2
            });

            faqItems.forEach(item => {
                observer.observe(item);
            });

            if (searchInput && searchForm) {
                searchInput.addEventListener('focus', () => {
                    searchForm.classList.add('searching');
                });

                searchInput.addEventListener('blur', () => {
                    searchForm.classList.remove('searching');
                });
            }

            const categoryCards = document.querySelectorAll('.category-card');
            categoryCards.forEach(card => {
                card.addEventListener('mouseenter', () => {
                    categoryCards.forEach(c => {
                        if (c !== card && !c.classList.contains('active')) {
                            c.style.opacity = '0.7';
                            c.style.transform = 'scale(0.98)';
                        }
                    });
                });

                card.addEventListener('mouseleave', () => {
                    categoryCards.forEach(c => {
                        if (!c.classList.contains('active')) {
                            c.style.opacity = '1';
                            c.style.transform = 'translateY(0)';
                        }
                    });
                });
            });
        }

        // Ripple effect for buttons
        function addRippleEffect() {
            const buttons = document.querySelectorAll('button, .category-card, .faq-question, .need-help-button');

            buttons.forEach(button => {
                button.addEventListener('click', function (e) {
                    const rect = this.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    const y = e.clientY - rect.top;

                    const ripple = document.createElement('span');
                    ripple.className = 'ripple-effect';
                    ripple.style.left = `${x}px`;
                    ripple.style.top = `${y}px`;

                    this.appendChild(ripple);

                    setTimeout(() => {
                        ripple.remove();
                    }, 600);
                });
            });
        }

        // Hero section scroll animation
        window.addEventListener('scroll', function () {
            const heroSection = document.querySelector('.hero-section');
            if (heroSection) {
                const scrollPosition = window.scrollY;
                if (scrollPosition < 500) {
                    heroSection.style.backgroundPosition = `center ${scrollPosition * 0.4}px`;

                    const heroContent = document.querySelector('.hero-content');
                    if (heroContent) {
                        heroContent.style.transform = `translateY(${scrollPosition * 0.2}px)`;
                        heroContent.style.opacity = 1 - (scrollPosition * 0.002);
                    }
                }
            }
        });

        // Initialize FAQ functionality
        renderCategories();
        filterFaqs();
        initScrollAnimation();
        addRippleEffect();

        // Load Google Translate script
        const translateScript = document.createElement('script');
        translateScript.type = 'text/javascript';
        translateScript.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
        translateScript.onerror = () => console.error("Google Translate script failed to load.");
        document.body.appendChild(translateScript);
    });
