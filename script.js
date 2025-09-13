        // PART 2: JavaScript Functions - Scope, Parameters & Return Values

        // Global scope variables
        let currentSection = 'home';
        let isAnimating = false;
        let isDarkMode = false;
        let skillsAnimated = false;
        const animationQueue = [];

        /**
         * Utility function for calculating staggered delays
         * @param {number} index - Element index
         * @param {number} baseDelay - Base delay in milliseconds  
         * @param {number} increment - Delay increment per item
         * @returns {number} Calculated delay
         */
        function calculateStaggerDelay(index, baseDelay = 100, increment = 50) {
            // Local calculation using parameters
            return baseDelay + (index * increment);
        }

        /**
         * Function demonstrating scope with nested calculations
         * @param {string} projectType - Type of project demo
         * @returns {object} Demo configuration object
         */
        function createDemoConfig(projectType) {
            // Local scope variables
            const timestamp = Date.now();
            const demoId = `demo_${timestamp}`;
            
            // Nested function with access to parent scope
            function generateDemoContent() {
                const configs = {
                    'capstone': {
                        title: 'Data Science Capstone Project',
                        description: 'End-to-end machine learning pipeline with data preprocessing, model training, and deployment.',
                        visual: createMLVisualization(),
                        duration: 3000
                    },
                    'analytics': {
                        title: 'Business Analytics Dashboard',
                        description: 'Interactive Power BI dashboard with real-time KPI monitoring and automated reporting.',
                        visual: createChartVisualization(),
                        duration: 2500
                    },
                    'ml': {
                        title: 'Predictive Analytics Model',
                        description: 'Advanced machine learning model with statistical validation and API integration.',
                        visual: createPredictionVisualization(),
                        duration: 3500
                    }
                };
                
                return {
                    id: demoId,
                    timestamp: timestamp,
                    config: configs[projectType] || configs['capstone']
                };
            }
            
            return generateDemoContent();
        }

        /**
         * Higher-order function for creating animation functions
         * @param {string} animationType - Type of animation to create
         * @returns {function} Animation function
         */
        function createAnimationFunction(animationType) {
            // Closure maintaining access to animationType
            return function(element, options = {}) {
                const duration = options.duration || 1000;
                const delay = options.delay || 0;
                
                // Return promise for chaining animations
                return new Promise(resolve => {
                    setTimeout(() => {
                        element.classList.add(`animate-${animationType}`);
                        
                        setTimeout(() => {
                            element.classList.remove(`animate-${animationType}`);
                            resolve(element);
                        }, duration);
                    }, delay);
                });
            };
        }

        /**
         * Statistical calculation function with multiple parameters
         * @param {Array} data - Array of numerical data
         * @param {string} metric - Statistical metric to calculate
         * @param {number} precision - Decimal precision for result
         * @returns {number} Calculated statistical value
         */
        function calculateStatistic(data, metric = 'mean', precision = 2) {
            // Local scope validation
            if (!Array.isArray(data) || data.length === 0) {
                return 0;
            }
            
            // Local calculation functions
            const calculations = {
                mean: (arr) => arr.reduce((sum, val) => sum + val, 0) / arr.length,
                median: (arr) => {
                    const sorted = [...arr].sort((a, b) => a - b);
                    const mid = Math.floor(sorted.length / 2);
                    return sorted.length % 2 !== 0 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;
                },
                std: (arr) => {
                    const mean = calculations.mean(arr);
                    const variance = arr.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / arr.length;
                    return Math.sqrt(variance);
                }
            };
            
            const result = calculations[metric] ? calculations[metric](data) : 0;
            return Number(result.toFixed(precision));
        }

        /**
         * Form data processing function demonstrating parameter handling
         * @param {FormData} formData - Form data object
         * @param {string} projectType - Type of project
         * @returns {object} Processed form data
         */
        function processFormData(formData, projectType = 'general') {
            // Local scope processing
            const processedData = {
                name: formData.get('name')?.trim() || '',
                email: formData.get('email')?.trim() || '',
                projectType: projectType,
                message: formData.get('message')?.trim() || '',
                timestamp: new Date().toISOString(),
                processed: true
            };
            
            // Validation function using closure
            function validateData() {
                const errors = [];
                if (!processedData.name) errors.push('Name is required');
                if (!processedData.email) errors.push('Email is required');
                if (!processedData.message) errors.push('Message is required');
                return errors;
            }
            
            processedData.validation = {
                isValid: validateData().length === 0,
                errors: validateData()
            };
            
            return processedData;
        }

        // PART 3: Combining CSS Animations with JavaScript
    

        /**
         * Navigation function with smooth transitions
         * @param {string} targetSection - Section to navigate to
         */
        function navigateToSection(targetSection) {
            if (isAnimating || targetSection === currentSection) return;
            
            isAnimating = true;
            
            // Get current and target sections
            const currentEl = document.getElementById(currentSection);
            const targetEl = document.getElementById(targetSection);
            
            // Trigger exit animation
            currentEl.classList.add('section-exit');
            
            setTimeout(() => {
                // Switch visibility
                currentEl.classList.remove('active', 'section-exit');
                targetEl.classList.add('active');
                currentSection = targetSection;
                
                // Trigger entrance animation
                targetEl.classList.add('section-enter');
                
                // Update navigation
                updateActiveNavigation(targetSection);
                
                setTimeout(() => {
                    targetEl.classList.remove('section-enter');
                    isAnimating = false;
                }, 500);
            }, 300);
        }

        /**
         * Update active navigation button
         * @param {string} activeSection - Currently active section
         */
        function updateActiveNavigation(activeSection) {
            const navButtons = document.querySelectorAll('.nav-btn');
            navButtons.forEach(btn => {
                if (btn.dataset.section === activeSection) {
                    btn.classList.add('active');
                } else {
                    btn.classList.remove('active');
                }
            });
        }

        /**
         * Hero data visualization trigger
         */
        function triggerDataVisualization() {
            const chart = document.getElementById('animated-chart');
            const stats = document.getElementById('hero-stats');
            const particles = document.querySelectorAll('.particle');
            
            // Animate chart bars
            const bars = chart.querySelectorAll('.bar');
            bars.forEach((bar, index) => {
                const delay = calculateStaggerDelay(index, 200, 100);
                const height = bar.dataset.height;
                
                setTimeout(() => {
                    bar.style.height = height + '%';
                    bar.classList.add('bar-animate');
                }, delay);
            });
            
            // Trigger pulse animation
            chart.classList.add('chart-pulse-active');
            
            // Animate statistics with counting effect
            animateStatistics();
            
            // Enhance particle animation
            particles.forEach((particle, index) => {
                setTimeout(() => {
                    particle.classList.add('particle-enhanced');
                }, calculateStaggerDelay(index, 500, 200));
            });
            
            // Show success notification
            setTimeout(() => {
                showNotification('Data Visualization Activated!', 'Interactive charts and statistics are now animated.');
            }, 2000);
        }

        /**
         * Animate statistics counter with parameters
         * @param {number} duration - Animation duration in milliseconds
         */
        function animateStatistics(duration = 2000) {
            const statNumbers = document.querySelectorAll('.stat-number');
            
            statNumbers.forEach((stat, index) => {
                const target = parseInt(stat.dataset.target);
                const delay = calculateStaggerDelay(index, 300, 150);
                
                setTimeout(() => {
                    animateCountUp(stat, 0, target, duration);
                }, delay);
            });
        }

        /**
         * Count up animation function
         * @param {Element} element - Target element
         * @param {number} start - Start value
         * @param {number} end - End value  
         * @param {number} duration - Animation duration
         */
        function animateCountUp(element, start, end, duration) {
            const startTime = performance.now();
            const range = end - start;
            
            function updateCount(currentTime) {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                
                // Use easing function for smooth animation
                const easedProgress = easeOutCubic(progress);
                const currentValue = Math.floor(start + (range * easedProgress));
                
                element.textContent = currentValue;
                element.classList.add('counting');
                
                if (progress < 1) {
                    requestAnimationFrame(updateCount);
                } else {
                    element.classList.remove('counting');
                    element.classList.add('count-complete');
                }
            }
            
            requestAnimationFrame(updateCount);
        }

        /**
         * Easing function for smooth animations
         * @param {number} t - Time parameter (0-1)
         * @returns {number} Eased value
         */
        function easeOutCubic(t) {
            return 1 - Math.pow(1 - t, 3);
        }

        /**
         * Expertise highlighting with animation
         * @param {Element} element - Clicked expertise item
         * @param {string} expertiseType - Type of expertise
         */
        function highlightExpertise(element, expertiseType) {
            // Remove any existing highlights
            document.querySelectorAll('.expertise-item').forEach(item => {
                item.classList.remove('expertise-active');
            });
            
            // Add highlight to clicked item
            element.classList.add('expertise-active');
            
            // Create floating effect based on expertise type
            const effects = {
                'statistical': () => createStatisticalEffect(element),
                'visualization': () => createVisualizationEffect(element),
                'ml': () => createMLEffect(element)
            };
            
            if (effects[expertiseType]) {
                effects[expertiseType]();
            }
            
            // Auto-remove highlight after delay
            setTimeout(() => {
                element.classList.remove('expertise-active');
            }, 3000);
        }

        /**
         * Create statistical effect animation
         * @param {Element} element - Target element
         */
        function createStatisticalEffect(element) {
            const numbers = ['μ', 'σ', 'χ²', 'β', 'α'];
            numbers.forEach((symbol, index) => {
                const floatingSymbol = document.createElement('div');
                floatingSymbol.className = 'floating-symbol';
                floatingSymbol.textContent = symbol;
                floatingSymbol.style.setProperty('--delay', index * 0.2 + 's');
                element.appendChild(floatingSymbol);
                
                setTimeout(() => floatingSymbol.remove(), 2500);
            });
        }

        /**
         * Create visualization effect
         * @param {Element} element - Target element
         */
        function createVisualizationEffect(element) {
            element.classList.add('viz-pulse');
            setTimeout(() => element.classList.remove('viz-pulse'), 1500);
        }

        /**
         * Create ML effect
         * @param {Element} element - Target element
         */
        function createMLEffect(element) {
            element.classList.add('ml-neural');
            setTimeout(() => element.classList.remove('ml-neural'), 2000);
        }

        /**
         * Animate all skills with staggered timing
         */
        function animateAllSkills() {
            const categories = document.querySelectorAll('.skill-category');
            
            // Reset all skills first
            resetSkills();
            
            categories.forEach((category, categoryIndex) => {
                const categoryDelay = calculateStaggerDelay(categoryIndex, 200, 300);
                
                setTimeout(() => {
                    category.classList.add('category-animating');
                    
                    const skillItems = category.querySelectorAll('.skill-item');
                    skillItems.forEach((skill, skillIndex) => {
                        const skillDelay = calculateStaggerDelay(skillIndex, 100, 150);
                        
                        setTimeout(() => {
                            animateSkillBar(skill);
                        }, skillDelay);
                    });
                }, categoryDelay);
            });
            
            skillsAnimated = true;
        }

        /**
         * Animate individual skill bar
         * @param {Element} skillElement - Skill item element
         */
        function animateSkillBar(skillElement) {
            const progressBar = skillElement.querySelector('.skill-progress');
            const percentage = skillElement.querySelector('.skill-percentage');
            const targetWidth = parseInt(progressBar.dataset.width);
            
            // Add animation class
            skillElement.classList.add('skill-animating');
            
            // Animate progress bar width
            progressBar.style.width = targetWidth + '%';
            
            // Animate percentage counter
            animateCountUp(percentage, 0, targetWidth, 1500);
            
            // Add completion class after animation
            setTimeout(() => {
                skillElement.classList.add('skill-complete');
                skillElement.classList.remove('skill-animating');
            }, 1500);
        }

        /**
         * Reset all skill animations
         */
        function resetSkills() {
            const skillItems = document.querySelectorAll('.skill-item');
            const categories = document.querySelectorAll('.skill-category');
            
            skillItems.forEach(skill => {
                const progressBar = skill.querySelector('.skill-progress');
                const percentage = skill.querySelector('.skill-percentage');
                
                // Reset classes
                skill.classList.remove('skill-animating', 'skill-complete');
                
                // Reset progress bar
                progressBar.style.width = '0%';
                
                // Reset percentage
                percentage.textContent = '0%';
            });
            
            categories.forEach(category => {
                category.classList.remove('category-animating');
            });
            
            skillsAnimated = false;
        }

        /**
         * Project demonstration with dynamic content
         * @param {string} projectType - Type of project to demo
         */
        function demoProject(projectType) {
            const demoConfig = createDemoConfig(projectType);
            const showcase = document.getElementById('demo-showcase');
            
            // Update showcase content
            document.getElementById('showcase-title').textContent = demoConfig.config.title;
            document.getElementById('showcase-description').textContent = demoConfig.config.description;
            document.getElementById('showcase-visual').innerHTML = demoConfig.config.visual;
            
            // Show showcase with animation
            showcase.classList.add('showcase-active');
            
            // Auto-close after demo duration
            setTimeout(() => {
                closeShowcase();
            }, demoConfig.config.duration);
            
            // Show completion notification
            setTimeout(() => {
                showNotification('Demo Complete', `${demoConfig.config.title} demonstration finished successfully.`);
            }, demoConfig.config.duration + 500);
        }

        /**
         * Create ML visualization HTML
         * @returns {string} HTML string for visualization
         */
        function createMLVisualization() {
            return `
                <div class="ml-demo">
                    <div class="neural-network">
                        <div class="network-layer">
                            <div class="neuron"></div>
                            <div class="neuron"></div>
                            <div class="neuron"></div>
                        </div>
                        <div class="network-layer">
                            <div class="neuron"></div>
                            <div class="neuron"></div>
                        </div>
                        <div class="network-layer">
                            <div class="neuron"></div>
                        </div>
                    </div>
                    <div class="demo-metrics">
                        <div class="metric">Accuracy: <span class="metric-value">94.5%</span></div>
                        <div class="metric">Precision: <span class="metric-value">92.8%</span></div>
                        <div class="metric">Recall: <span class="metric-value">96.2%</span></div>
                    </div>
                </div>
            `;
        }

        /**
         * Create chart visualization HTML
         * @returns {string} HTML string for chart
         */
        function createChartVisualization() {
            return `
                <div class="dashboard-demo">
                    <div class="demo-charts">
                        <div class="mini-chart">
                            <div class="chart-bar" style="--height: 60%; --delay: 0.1s;"></div>
                            <div class="chart-bar" style="--height: 80%; --delay: 0.2s;"></div>
                            <div class="chart-bar" style="--height: 45%; --delay: 0.3s;"></div>
                            <div class="chart-bar" style="--height: 90%; --delay: 0.4s;"></div>
                            <div class="chart-bar" style="--height: 70%; --delay: 0.5s;"></div>
                        </div>
                    </div>
                    <div class="demo-kpis">
                        <div class="kpi">Revenue: <span class="kpi-value">$2.4M</span></div>
                        <div class="kpi">Growth: <span class="kpi-value">+15.3%</span></div>
                    </div>
                </div>
            `;
        }

        /**
         * Create prediction visualization HTML
         * @returns {string} HTML string for predictions
         */
        function createPredictionVisualization() {
            return `
                <div class="prediction-demo">
                    <div class="prediction-line">
                        <div class="line-segment"></div>
                        <div class="line-segment"></div>
                        <div class="line-segment"></div>
                        <div class="line-segment"></div>
                    </div>
                    <div class="prediction-points">
                        <div class="prediction-point"></div>
                        <div class="prediction-point"></div>
                        <div class="prediction-point"></div>
                    </div>
                    <div class="prediction-stats">
                        <div class="stat">R²: <span class="stat-value">0.892</span></div>
                        <div class="stat">RMSE: <span class="stat-value">0.124</span></div>
                    </div>
                </div>
            `;
        }

        /**
         * Close project showcase
         */
        function closeShowcase() {
            const showcase = document.getElementById('demo-showcase');
            showcase.classList.remove('showcase-active');
        }

        /**
         * Contact method animation
         * @param {Element} element - Contact method element
         * @param {string} methodType - Type of contact method
         */
        function animateContactMethod(element, methodType) {
            element.classList.add('method-active');
            
            // Create ripple effect
            const ripple = document.createElement('div');
            ripple.className = 'contact-ripple';
            element.appendChild(ripple);
            
            // Simulate action based on method type
            const actions = {
                'email': () => showNotification('Email Ready', 'Email client would open here'),
                'linkedin': () => showNotification('LinkedIn', 'LinkedIn profile would open here'),
                'github': () => showNotification('GitHub', 'GitHub profile would open here')
            };
            
            setTimeout(() => {
                if (actions[methodType]) {
                    actions[methodType]();
                }
            }, 300);
            
            // Cleanup
            setTimeout(() => {
                element.classList.remove('method-active');
                ripple.remove();
            }, 1000);
        }

        /**
         * Form submission handler with loading states
         * @param {Event} event - Form submit event
         */
        function handleFormSubmit(event) {
            event.preventDefault();
            
            const formData = new FormData(event.target);
            const projectType = formData.get('project-type');
            const processedData = processFormData(formData, projectType);
            
            if (!processedData.validation.isValid) {
                showNotification('Form Error', processedData.validation.errors.join(', '));
                return;
            }
            
            // Show loading state
            const submitBtn = event.target.querySelector('.submit-btn');
            const loadingOverlay = document.getElementById('loading-overlay');
            
            submitBtn.classList.add('loading');
            loadingOverlay.classList.add('active');
            
            // Simulate processing with realistic delay
            setTimeout(() => {
                // Hide loading
                loadingOverlay.classList.remove('active');
                submitBtn.classList.remove('loading');
                submitBtn.classList.add('success');
                
                // Show success message
                showNotification('Message Sent!', `Thank you ${processedData.name}! Your ${processedData.projectType} inquiry has been received.`);
                
                // Reset form with animation
                animateFormReset(event.target);
                
                // Reset submit button after delay
                setTimeout(() => {
                    submitBtn.classList.remove('success');
                }, 3000);
                
            }, 2500);
        }

        /**
         * Animate form reset
         * @param {Element} form - Form element to reset
         */
        function animateFormReset(form) {
            const formGroups = form.querySelectorAll('.form-group');
            
            formGroups.forEach((group, index) => {
                setTimeout(() => {
                    group.classList.add('form-reset');
                    
                    setTimeout(() => {
                        group.classList.remove('form-reset');
                    }, 500);
                }, calculateStaggerDelay(index, 100, 50));
            });
            
            // Reset form data after animation
            setTimeout(() => {
                form.reset();
            }, 800);
        }

        /**
         * Theme toggle function
         */
        function toggleTheme() {
            isDarkMode = !isDarkMode;
            document.body.classList.toggle('dark-theme', isDarkMode);
            
            const themeIcon = document.querySelector('.theme-icon');
            themeIcon.textContent = isDarkMode ? '☀️' : '🌙';
            
            // Animate theme change
            document.body.classList.add('theme-transitioning');
            setTimeout(() => {
                document.body.classList.remove('theme-transitioning');
            }, 300);
        }

        /**
         * Show notification modal
         * @param {string} title - Notification title
         * @param {string} message - Notification message
         * @param {number} duration - Display duration in milliseconds
         */
        function showNotification(title, message, duration = 4000) {
            const modal = document.getElementById('notification-modal');
            const modalTitle = document.getElementById('modal-title');
            const modalMessage = document.getElementById('modal-message');
            
            modalTitle.textContent = title;
            modalMessage.textContent = message;
            
            modal.classList.add('modal-active');
            
            // Auto-close notification
            setTimeout(() => {
                closeModal();
            }, duration);
        }

        /**
         * Close notification modal
         */
        function closeModal() {
            const modal = document.getElementById('notification-modal');
            modal.classList.remove('modal-active');
        }

        /**
         * Initialize application
         */
        function initializeApp() {
            console.log('Initializing Brian Kirop Portfolio...');
            
            // Set up navigation event listeners
            const navButtons = document.querySelectorAll('.nav-btn');
            navButtons.forEach(button => {
                button.addEventListener('click', () => {
                    navigateToSection(button.dataset.section);
                });
            });
            
            // Set up project card hover effects
            const projectCards = document.querySelectorAll('.project-card');
            projectCards.forEach(card => {
                card.addEventListener('mouseenter', () => {
                    card.classList.add('card-hover');
                });
                
                card.addEventListener('mouseleave', () => {
                    card.classList.remove('card-hover');
                });
            });
            
            // Set up form field animations
            const formInputs = document.querySelectorAll('.contact-form input, .contact-form textarea, .contact-form select');
            formInputs.forEach(input => {
                input.addEventListener('focus', () => {
                    input.parentElement.classList.add('focused');
                });
                
                input.addEventListener('blur', () => {
                    if (!input.value) {
                        input.parentElement.classList.remove('focused');
                    }
                });
                
                // Check for pre-filled values
                if (input.value) {
                    input.parentElement.classList.add('focused');
                }
            });
            
            // Initialize hero animations on page load
            setTimeout(() => {
                triggerDataVisualization();
            }, 1000);
            
            // Set up intersection observer for scroll animations
            setupScrollAnimations();
            
            console.log('Portfolio initialization complete!');
        }

        /**
         * Set up scroll-triggered animations
         */
        function setupScrollAnimations() {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('in-view');
                    }
                });
            }, {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            });
            
            // Observe sections for scroll animations
            const sections = document.querySelectorAll('.section');
            sections.forEach(section => observer.observe(section));
        }

        // Initialize when DOM is loaded
        document.addEventListener('DOMContentLoaded', initializeApp);

        // Close modal when clicking outside
        window.addEventListener('click', (event) => {
            const modal = document.getElementById('notification-modal');
            const showcase = document.getElementById('demo-showcase');
            
            if (event.target === modal) {
                closeModal();
            }
            if (event.target === showcase) {
                closeShowcase();
            }
        });

        // Keyboard navigation support
        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape') {
                closeModal();
                closeShowcase();
            }
        });

