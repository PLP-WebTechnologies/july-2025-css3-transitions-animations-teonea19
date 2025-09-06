// ========== GLOBAL VARIABLES ==========
        const hamburger = document.getElementById('hamburger');
        const navContainer = document.getElementById('navContainer');
        const navLinks = document.querySelectorAll('.nav-container a');
        const contactForm = document.getElementById('contactForm');
        const galleryItems = document.querySelectorAll('.gallery-item');
        const testimonials = document.querySelectorAll('.testimonial');
        const loader = document.getElementById('loader');
        const scrollToTop = document.getElementById('scrollToTop');
        const imageModal = document.getElementById('imageModal');
        const modalImage = document.getElementById('modalImage');
        const modalClose = document.getElementById('modalClose');

        // Check if device is mobile and adjust behavior accordingly
        const isMobileDevice = window.innerWidth <= 768;

        // ========== ANIMATION FUNCTIONS ==========
        
        /**
         * Function to check if an element is in the viewport
         * @param {HTMLElement} el - The element to check
         * @returns {boolean} - True if element is in viewport
         */
        function isInViewport(el) {
            const rect = el.getBoundingClientRect();
            return (
                rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8 &&
                rect.bottom >= 0
            );
        }

        /**
         * Function to animate elements when they enter the viewport
         * @param {string} selector - CSS selector for elements to animate
         * @param {string} animationClass - CSS class to add for animation
         */
        function animateOnScroll(selector, animationClass) {
            const elements = document.querySelectorAll(selector);
            
            elements.forEach(element => {
                if (isInViewport(element) && !element.classList.contains('animated')) {
                    element.classList.add(animationClass, 'animated');
                }
            });
        }

        /**
         * Function to add shake animation to form inputs with errors
         * @param {HTMLElement} input - The input element to shake
         */
        function shakeElement(input) {
            input.classList.add('shake');
            setTimeout(() => {
                input.classList.remove('shake');
            }, 500);
        }

        /**
         * Function to toggle modal visibility
         * @param {boolean} show - Whether to show or hide the modal
         * @param {string} imageSrc - The image source for the modal
         */
        function toggleModal(show, imageSrc = '') {
            if (show) {
                modalImage.src = imageSrc;
                imageModal.classList.add('open');
                document.body.style.overflow = 'hidden'; // Prevent scrolling
            } else {
                imageModal.classList.remove('open');
                document.body.style.overflow = ''; // Re-enable scrolling
            }
        }

        // ========== EVENT HANDLERS ==========
        
        // Toggle mobile navigation
        function toggleNavigation() {
            navContainer.classList.toggle('active');
            
            // Change hamburger icon based on menu state
            const menuIcon = hamburger.querySelector('i');
            if (navContainer.classList.contains('active')) {
                menuIcon.classList.remove('fa-bars');
                menuIcon.classList.add('fa-times');
            } else {
                menuIcon.classList.remove('fa-times');
                menuIcon.classList.add('fa-bars');
            }
        }

        // Validate contact form
        function validateForm(event) {
            event.preventDefault();
            let isValid = true;
            const nameInput = document.getElementById('name');
            const emailInput = document.getElementById('email');
            const messageInput = document.getElementById('message');
            
            // Reset error states
            document.querySelectorAll('.error-message').forEach(el => el.remove());
            document.querySelectorAll('.form-group').forEach(el => el.classList.remove('error'));
            
            // Validate name
            if (nameInput.value.trim() === '') {
                showError(nameInput, 'Please enter your name');
                shakeElement(nameInput);
                isValid = false;
            }
            
            // Validate email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(emailInput.value.trim())) {
                showError(emailInput, 'Please enter a valid email address');
                shakeElement(emailInput);
                isValid = false;
            }
            
            // Validate message
            if (messageInput.value.trim() === '') {
                showError(messageInput, 'Please enter your message');
                shakeElement(messageInput);
                isValid = false;
            }
            
            if (isValid) {
                // Show success animation
                const submitBtn = contactForm.querySelector('button[type="submit"]');
                submitBtn.innerHTML = '<i class="fas fa-check"></i> Sent Successfully!';
                submitBtn.style.background = 'var(--success)';
                submitBtn.style.borderColor = 'var(--success)';
                
                setTimeout(() => {
                    alert('Thank you for your message! We will get back to you soon.');
                    contactForm.reset();
                    submitBtn.innerHTML = 'Send Message';
                    submitBtn.style.background = '';
                    submitBtn.style.borderColor = '';
                }, 1500);
            }
        }

        // Helper function for form validation errors
        function showError(input, message) {
            const formGroup = input.parentElement;
            formGroup.classList.add('error');
            
            const errorElement = document.createElement('span');
            errorElement.className = 'error-message';
            errorElement.style.color = 'var(--accent)';
            errorElement.style.fontSize = '0.9rem';
            errorElement.style.marginTop = '5px';
            errorElement.style.display = 'block';
            errorElement.textContent = message;
            
            formGroup.appendChild(errorElement);
        }

        // ========== INITIALIZATION FUNCTIONS ==========
        
        /**
         * Initialize gallery modal functionality
         */
        function initGalleryModal() {
            galleryItems.forEach(item => {
                item.addEventListener('click', function() {
                    const imgSrc = this.querySelector('img').src;
                    toggleModal(true, imgSrc);
                });
            });
            
            // Close modal when clicking close button
            modalClose.addEventListener('click', () => toggleModal(false));
            
            // Close modal when clicking outside content
            imageModal.addEventListener('click', (e) => {
                if (e.target === imageModal) {
                    toggleModal(false);
                }
            });
        }

        /**
         * Initialize scroll animations
         */
        function initScrollAnimations() {
            // Animate testimonials on scroll
            window.addEventListener('scroll', () => {
                animateOnScroll('.testimonial', 'animate');
                animateOnScroll('.service-card', 'fade-in');
            });
            
            // Trigger once on load
            setTimeout(() => {
                animateOnScroll('.testimonial', 'animate');
                animateOnScroll('.service-card', 'fade-in');
            }, 500);
        }

        /**
         * Initialize scroll to top button
         */
        function initScrollToTop() {
            window.addEventListener('scroll', () => {
                if (window.pageYOffset > 300) {
                    scrollToTop.classList.add('visible');
                } else {
                    scrollToTop.classList.remove('visible');
                }
            });
            
            scrollToTop.addEventListener('click', () => {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });
        }

        /**
         * Initialize page loader
         */
        function initLoader() {
            // Simulate loading delay
            setTimeout(() => {
                loader.style.display = 'none';
            }, 1500);
        }

        // ========== EVENT LISTENERS ==========
        
        // Add click event listeners to all navigation links
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                // Close mobile menu when a link is clicked
                if (isMobileDevice) {
                    toggleNavigation();
                }
                
                // Smooth scrolling
                const targetId = this.getAttribute('href');
                if (targetId.startsWith('#')) {
                    e.preventDefault();
                    const targetSection = document.querySelector(targetId);
                    if (targetSection) {
                        window.scrollTo({
                            top: targetSection.offsetTop - 80,
                            behavior: 'smooth'
                        });
                    }
                }
            });
        });

        // Toggle mobile navigation
        hamburger.addEventListener('click', toggleNavigation);

        // Form submission handling
        contactForm.addEventListener('submit', validateForm);

        // Additional functionality: Change header background on scroll
        window.addEventListener('scroll', function() {
            const header = document.querySelector('header');
            if (window.scrollY > 100) {
                header.style.background = 'rgba(26, 35, 126, 0.95)';
                header.style.backdropFilter = 'blur(10px)';
            } else {
                header.style.background = 'var(--primary)';
                header.style.backdropFilter = 'none';
            }
        });

        // Additional functionality: Current year in footer
        document.addEventListener('DOMContentLoaded', function() {
            const yearElement = document.querySelector('.copyright p');
            if (yearElement) {
                const currentYear = new Date().getFullYear();
                yearElement.innerHTML = yearElement.innerHTML.replace('2025', currentYear);
            }
        });

        // ========== INITIALIZE EVERYTHING ==========
        function init() {
            initLoader();
            initScrollAnimations();
            initScrollToTop();
            initGalleryModal();
            
            // Add initial animations to hero buttons
            setTimeout(() => {
                document.querySelectorAll('.btn-pulse').forEach(btn => {
                    btn.style.animation = 'pulse 2s infinite';
                });
            }, 2000);
        }

        // Run initialization when DOM is fully loaded
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', init);
        } else {
            init();
        }
    