class MarketingAI {
    constructor() {
        this.form = document.getElementById('marketing-ai-form');
        this.outputContent = document.querySelector('.ai-output-content');
        this.loadingSpinner = document.querySelector('.loading-spinner');
        this.enterpriseCTA = document.querySelector('.enterprise-cta');
        this.openaiKey = 'YOUR_OPENAI_API_KEY'; // Replace with actual API key
        
        this.setupEventListeners();
        this.setupBrandStyles();
    }

    setupBrandStyles() {
        // Add brand styles to the document
        const style = document.createElement('style');
        style.textContent = `
            .marketing-ai-container {
                font-family: 'Manrope', sans-serif;
                color: var(--text-color);
                max-width: 1200px;
                margin: 0 auto;
                padding: 2rem;
            }

            .marketing-ai-header {
                text-align: center;
                margin-bottom: 3rem;
            }

            .marketing-ai-header h1 {
                font-size: 2.5rem;
                color: var(--primary-color);
                margin-bottom: 1rem;
            }

            .marketing-ai-header p {
                font-size: 1.2rem;
                color: var(--text-color);
                max-width: 800px;
                margin: 0 auto;
            }

            .marketing-ai-form {
                background: var(--bg-color);
                padding: 2rem;
                border-radius: 12px;
                box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            }

            .form-group {
                margin-bottom: 1.5rem;
            }

            .form-group label {
                display: block;
                margin-bottom: 0.5rem;
                color: var(--text-color);
                font-weight: 500;
            }

            .form-group input[type="text"],
            .form-group select,
            .form-group textarea {
                width: 100%;
                padding: 0.75rem;
                border: 1px solid var(--border-color);
                border-radius: 6px;
                background: var(--bg-color);
                color: var(--text-color);
                font-family: 'Manrope', sans-serif;
            }

            .radio-group,
            .checkbox-group {
                display: flex;
                flex-direction: column;
                gap: 0.75rem;
            }

            .radio-label,
            .checkbox-label {
                display: flex;
                align-items: center;
                gap: 0.5rem;
                cursor: pointer;
            }

            .cta-button {
                background: var(--primary-color);
                color: white;
                padding: 1rem 2rem;
                border: none;
                border-radius: 6px;
                font-size: 1.1rem;
                font-weight: 600;
                cursor: pointer;
                transition: background-color 0.3s ease;
                width: 100%;
                margin-top: 1rem;
            }

            .cta-button:hover {
                background: var(--primary-dark);
            }

            .deliverable-card {
                background: var(--bg-color);
                padding: 1.5rem;
                border-radius: 8px;
                margin-bottom: 1.5rem;
                box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
            }

            .deliverable-card h4 {
                color: var(--primary-color);
                margin-bottom: 0.75rem;
            }

            .deliverable-card ul {
                list-style-type: none;
                padding: 0;
            }

            .deliverable-card li {
                margin-bottom: 0.5rem;
                padding-left: 1.5rem;
                position: relative;
            }

            .deliverable-card li:before {
                content: "•";
                color: var(--primary-color);
                position: absolute;
                left: 0;
            }

            .loading-spinner {
                display: none;
                text-align: center;
                margin: 2rem 0;
            }

            .loading-spinner.active {
                display: block;
            }

            .error-message {
                background: #fee2e2;
                color: #dc2626;
                padding: 1rem;
                border-radius: 6px;
                margin: 1rem 0;
                display: flex;
                align-items: center;
                gap: 0.5rem;
            }

            .enterprise-cta {
                background: var(--primary-color);
                color: white;
                padding: 1rem 2rem;
                border: none;
                border-radius: 6px;
                font-size: 1.1rem;
                font-weight: 600;
                cursor: pointer;
                transition: all 0.3s ease;
                text-decoration: none;
                display: inline-block;
                margin-top: 2rem;
            }

            .enterprise-cta:hover {
                background: var(--primary-dark);
                transform: translateY(-2px);
            }
        `;
        document.head.appendChild(style);
    }

    setupEventListeners() {
        if (this.form) {
            this.form.addEventListener('submit', this.handleSubmit.bind(this));
        }

        if (this.enterpriseCTA) {
            this.enterpriseCTA.addEventListener('click', (e) => {
                e.preventDefault();
                this.showEnterpriseAI();
            });
        }
    }

    showEnterpriseAI() {
        // Create and show the Marketing AI interface
        const container = document.createElement('div');
        container.className = 'marketing-ai-container';
        container.innerHTML = `
            <div class="marketing-ai-header">
                <h1>VolarisAI Marketing Strategist</h1>
                <p>Your personal AI marketing strategist for scaling digital offers</p>
            </div>
            <div class="loading-spinner">
                <div class="spinner"></div>
                <p>Generating your personalized marketing strategy...</p>
            </div>
            <div class="ai-output-content"></div>
        `;

        // Insert the container after the enterprise CTA
        this.enterpriseCTA.parentNode.insertBefore(container, this.enterpriseCTA.nextSibling);

        // Initialize the form and loading spinner
        this.outputContent = container.querySelector('.ai-output-content');
        this.loadingSpinner = container.querySelector('.loading-spinner');
        this.displayInitialForm();
    }

    displayInitialForm() {
        this.outputContent.innerHTML = `
            <form id="marketing-ai-form" class="marketing-ai-form">
                <div class="form-group">
                    <label for="business-type">What kind of business or offer are you running?</label>
                    <input type="text" id="business-type" name="business-type" placeholder="e.g., coaching program, SaaS, eCom product, agency, course" required>
                </div>
                <div class="form-group">
                    <label for="ideal-customer">Who is your ideal customer?</label>
                    <textarea id="ideal-customer" name="ideal-customer" rows="3" placeholder="Demographics, pain points, goals" required></textarea>
                </div>
                <div class="form-group">
                    <label for="main-result">What is the main result or transformation you deliver?</label>
                    <textarea id="main-result" name="main-result" rows="2" required></textarea>
                </div>
                <div class="form-group">
                    <label>Where are you in your journey?</label>
                    <div class="radio-group">
                        <label class="radio-label">
                            <input type="radio" name="current-stage" value="idea" required>
                            Idea stage
                        </label>
                        <label class="radio-label">
                            <input type="radio" name="current-stage" value="early" required>
                            Early traction
                        </label>
                        <label class="radio-label">
                            <input type="radio" name="current-stage" value="scaling" required>
                            Scaling
                        </label>
                    </div>
                </div>
                <div class="form-group">
                    <label>What platforms are you using or planning to use?</label>
                    <div class="checkbox-group">
                        <label class="checkbox-label">
                            <input type="checkbox" name="platforms" value="tiktok">
                            TikTok
                        </label>
                        <label class="checkbox-label">
                            <input type="checkbox" name="platforms" value="facebook">
                            Facebook
                        </label>
                        <label class="checkbox-label">
                            <input type="checkbox" name="platforms" value="youtube">
                            YouTube
                        </label>
                        <label class="checkbox-label">
                            <input type="checkbox" name="platforms" value="email">
                            Email
                        </label>
                        <label class="checkbox-label">
                            <input type="checkbox" name="platforms" value="website">
                            Website
                        </label>
                        <label class="checkbox-label">
                            <input type="checkbox" name="platforms" value="seo">
                            SEO
                        </label>
                    </div>
                </div>
                <div class="form-group">
                    <label>What would you like help with first?</label>
                    <div class="radio-group">
                        <label class="radio-label">
                            <input type="radio" name="help-needed" value="offer" required>
                            Clarifying my offer
                        </label>
                        <label class="radio-label">
                            <input type="radio" name="help-needed" value="copy" required>
                            Writing copy
                        </label>
                        <label class="radio-label">
                            <input type="radio" name="help-needed" value="funnel" required>
                            Building a funnel
                        </label>
                        <label class="radio-label">
                            <input type="radio" name="help-needed" value="audience" required>
                            Understanding my audience
                        </label>
                        <label class="radio-label">
                            <input type="radio" name="help-needed" value="scaling" required>
                            Scaling something that's already working
                        </label>
                    </div>
                </div>
                <button type="submit" class="cta-button">Configure My Marketing Agent</button>
            </form>
        `;

        // Reinitialize the form event listener
        this.form = document.getElementById('marketing-ai-form');
        if (this.form) {
            this.form.addEventListener('submit', this.handleSubmit.bind(this));
        }
    }

    async handleSubmit(e) {
        e.preventDefault();
        
        // Show loading state
        if (this.loadingSpinner) {
            this.loadingSpinner.classList.add('active');
        }
        if (this.outputContent) {
            this.outputContent.classList.remove('active');
        }

        // Get form data
        const formData = {
            businessType: document.getElementById('business-type').value,
            idealCustomer: document.getElementById('ideal-customer').value,
            mainResult: document.getElementById('main-result').value,
            currentStage: document.querySelector('input[name="current-stage"]:checked').value,
            platforms: Array.from(document.querySelectorAll('input[name="platforms"]:checked')).map(cb => cb.value),
            helpNeeded: document.querySelector('input[name="help-needed"]:checked').value
        };

        try {
            // Generate initial strategy and show module-specific questions
            const strategy = await this.generateStrategy(formData);
            this.displayModuleQuestions(strategy, formData);
        } catch (error) {
            console.error('Error generating strategy:', error);
            this.displayError('There was an error generating your marketing strategy. Please try again.');
        } finally {
            if (this.loadingSpinner) {
                this.loadingSpinner.classList.remove('active');
            }
        }
    }

    displayModuleQuestions(strategy, formData) {
        const moduleQuestions = {
            offer: [
                {
                    id: 'problem',
                    text: 'What urgent problem do you solve?',
                    type: 'textarea'
                },
                {
                    id: 'dream-outcome',
                    text: 'What dream outcome do customers want?',
                    type: 'textarea'
                },
                {
                    id: 'offer-includes',
                    text: "What's included in your offer?",
                    type: 'textarea'
                },
                {
                    id: 'unique-value',
                    text: "What makes your offer unique or better?",
                    type: 'textarea'
                },
                {
                    id: 'bonuses',
                    text: 'Do you use bonuses, guarantees, or urgency?',
                    type: 'textarea'
                }
            ],
            copy: [
                {
                    id: 'copy-type',
                    text: 'What kind of copy do you need?',
                    type: 'select',
                    options: [
                        { value: 'ad', label: 'Ad Copy' },
                        { value: 'email', label: 'Email Copy' },
                        { value: 'landing', label: 'Landing Page Copy' },
                        { value: 'vsl', label: 'Video Sales Letter (VSL)' }
                    ]
                },
                {
                    id: 'tone',
                    text: 'What tone should we use?',
                    type: 'select',
                    options: [
                        { value: 'bold', label: 'Bold & Direct' },
                        { value: 'luxury', label: 'Luxury & Premium' },
                        { value: 'emotional', label: 'Emotional & Storytelling' },
                        { value: 'professional', label: 'Professional & Corporate' }
                    ]
                },
                {
                    id: 'cta',
                    text: 'What CTA should it include?',
                    type: 'textarea'
                }
            ],
            funnel: [
                {
                    id: 'funnel-goal',
                    text: "What's your campaign goal?",
                    type: 'select',
                    options: [
                        { value: 'leads', label: 'Leads' },
                        { value: 'calls', label: 'Booked Calls' },
                        { value: 'sales', label: 'Sales' }
                    ]
                },
                {
                    id: 'existing-assets',
                    text: 'What assets do you already have?',
                    type: 'multiselect',
                    options: [
                        { value: 'landing', label: 'Landing Page' },
                        { value: 'vsl', label: 'Video Sales Letter' },
                        { value: 'email', label: 'Email Sequence' },
                        { value: 'none', label: 'Starting from Scratch' }
                    ]
                },
                {
                    id: 'funnel-type',
                    text: 'High-ticket (call funnel) or low-ticket (checkout)?',
                    type: 'radio',
                    options: [
                        { value: 'high-ticket', label: 'High-ticket (Call Funnel)' },
                        { value: 'low-ticket', label: 'Low-ticket (Checkout)' }
                    ]
                },
                {
                    id: 'budget',
                    text: 'Budget for traffic?',
                    type: 'text',
                    placeholder: 'e.g., $1000/month'
                }
            ],
            audience: [
                {
                    id: 'audience-details',
                    text: 'Who are they? (Job title, age, values)',
                    type: 'textarea'
                },
                {
                    id: 'pain-points',
                    text: 'What pain are they in?',
                    type: 'textarea'
                },
                {
                    id: 'obstacles',
                    text: "What's holding them back from solving it?",
                    type: 'textarea'
                },
                {
                    id: 'transformation',
                    text: 'What transformation do they want?',
                    type: 'textarea'
                },
                {
                    id: 'online-hangouts',
                    text: 'Where do they hang out online?',
                    type: 'textarea'
                }
            ],
            scaling: [
                {
                    id: 'best-performing',
                    text: "What's currently working best?",
                    type: 'textarea'
                },
                {
                    id: 'metrics',
                    text: 'What is your ROAS/CPA/AOV?',
                    type: 'text',
                    placeholder: 'e.g., ROAS: 3.5x, CPA: $45, AOV: $150'
                },
                {
                    id: 'top-platforms',
                    text: 'What platforms are generating the most traction?',
                    type: 'multiselect',
                    options: [
                        { value: 'facebook', label: 'Facebook' },
                        { value: 'instagram', label: 'Instagram' },
                        { value: 'tiktok', label: 'TikTok' },
                        { value: 'youtube', label: 'YouTube' },
                        { value: 'email', label: 'Email Marketing' }
                    ]
                },
                {
                    id: 'upsells',
                    text: 'Do you run upsells or retargeting?',
                    type: 'radio',
                    options: [
                        { value: 'yes', label: 'Yes' },
                        { value: 'no', label: 'No' }
                    ]
                }
            ]
        };

        const questions = moduleQuestions[formData.helpNeeded];
        if (!questions) return;

        let html = `
            <div class="module-questions">
                <h3>${this.getModuleTitle(formData.helpNeeded)}</h3>
                <p>Let's dive deeper into your specific needs.</p>
                
                <form id="module-form" class="module-form">
                    ${questions.map(question => `
                        <div class="form-group">
                            <label for="${question.id}">${question.text}</label>
                            ${this.generateQuestionInput(question)}
                        </div>
                    `).join('')}
                    
                    <button type="submit" class="cta-button">Generate Strategy</button>
                </form>
            </div>
        `;

        this.outputContent.innerHTML = html;
        this.outputContent.classList.add('active');

        // Set up form handler
        const moduleForm = document.getElementById('module-form');
        if (moduleForm) {
            moduleForm.addEventListener('submit', async (e) => {
                e.preventDefault();
                this.loadingSpinner.classList.add('active');
                
                try {
                    const moduleData = new FormData(moduleForm);
                    const moduleAnswers = Object.fromEntries(moduleData.entries());
                    
                    // Generate final strategy
                    const finalStrategy = await this.generateFinalStrategy(formData, moduleAnswers);
                    this.displayFinalStrategy(finalStrategy);
                } catch (error) {
                    console.error('Error processing module form:', error);
                    this.displayError('There was an error processing your responses. Please try again.');
                } finally {
                    this.loadingSpinner.classList.remove('active');
                }
            });
        }
    }

    getModuleTitle(module) {
        const titles = {
            offer: 'Clarify Your Offer',
            copy: 'Write Your Copy',
            funnel: 'Build Your Funnel',
            audience: 'Understand Your Audience',
            scaling: 'Scale Your Offer'
        };
        return titles[module] || 'Marketing Strategy';
    }

    generateQuestionInput(question) {
        switch (question.type) {
            case 'select':
                return `
                    <select id="${question.id}" name="${question.id}" required>
                        <option value="">Select an option</option>
                        ${question.options.map(opt => `
                            <option value="${opt.value}">${opt.label}</option>
                        `).join('')}
                    </select>
                `;
            case 'radio':
                return `
                    <div class="radio-group">
                        ${question.options.map(opt => `
                            <label class="radio-label">
                                <input type="radio" name="${question.id}" value="${opt.value}" required>
                                ${opt.label}
                            </label>
                        `).join('')}
                    </div>
                `;
            case 'multiselect':
                return `
                    <div class="checkbox-group">
                        ${question.options.map(opt => `
                            <label class="checkbox-label">
                                <input type="checkbox" name="${question.id}" value="${opt.value}">
                                ${opt.label}
                            </label>
                        `).join('')}
                    </div>
                `;
            case 'textarea':
                return `<textarea id="${question.id}" name="${question.id}" rows="3" required></textarea>`;
            default:
                return `<input type="text" id="${question.id}" name="${question.id}" placeholder="${question.placeholder || ''}" required>`;
        }
    }

    async generateFinalStrategy(formData, moduleAnswers) {
        // This would be replaced with actual AI-generated content
        const strategy = {
            businessType: formData.businessType,
            idealCustomer: formData.idealCustomer,
            mainResult: formData.mainResult,
            currentStage: formData.currentStage,
            platforms: formData.platforms,
            helpNeeded: formData.helpNeeded,
            moduleAnswers: moduleAnswers
        };

        return strategy;
    }

    async handleAssetGeneration(strategy) {
        // Show loading state
        if (this.loadingSpinner) {
            this.loadingSpinner.classList.add('active');
        }

        try {
            const assets = await this.generateAssets(strategy);
            this.displayGeneratedAssets(assets);
        } catch (error) {
            console.error('Error generating assets:', error);
            this.displayError('There was an error generating your assets. Please try again.');
        } finally {
            if (this.loadingSpinner) {
                this.loadingSpinner.classList.remove('active');
            }
        }
    }

    async generateAssets(strategy) {
        try {
            const prompt = this.createAssetPrompt(strategy);
            const response = await this.callOpenAI(prompt);
            
            return this.parseAssetResponse(response, strategy.helpNeeded);
        } catch (error) {
            console.error('Error generating assets:', error);
            throw error;
        }
    }

    async callOpenAI(prompt) {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.openaiKey}`
            },
            body: JSON.stringify({
                model: 'gpt-4',
                messages: [
                    {
                        role: 'system',
                        content: 'You are an expert marketing strategist and copywriter. Provide detailed, actionable advice based on the user\'s input.'
                    },
                    {
                        role: 'user',
                        content: prompt
                    }
                ],
                temperature: 0.7,
                max_tokens: 2000
            })
        });

        if (!response.ok) {
            throw new Error('Failed to generate response');
        }

        const data = await response.json();
        return data.choices[0].message.content;
    }

    createAssetPrompt(strategy) {
        return `Generate marketing assets for a ${strategy.businessType} business focusing on ${strategy.helpNeeded}.

Business Details:
- Type: ${strategy.businessType}
- Stage: ${strategy.currentStage}
- Main Result: ${strategy.mainResult}
- Platforms: ${strategy.platforms.join(', ')}
- Help Needed: ${strategy.helpNeeded}

Ideal Customer:
${strategy.idealCustomer}

Please generate appropriate assets based on the help needed (${strategy.helpNeeded}).
Format the response in JSON structure for easy parsing.`;
    }

    parseAssetResponse(response, helpNeeded) {
        try {
            const data = JSON.parse(response);
            return {
                title: data.title,
                sections: data.sections
            };
        } catch (error) {
            console.error('Error parsing asset response:', error);
            // Fallback to default asset generation based on help needed
            switch (helpNeeded) {
                case 'offer':
                    return this.generateOfferAssets(strategy);
                case 'copy':
                    return this.generateCopyAssets(strategy);
                case 'funnel':
                    return this.generateFunnelAssets(strategy);
                case 'audience':
                    return this.generateAudienceAssets(strategy);
                case 'scaling':
                    return this.generateScalingAssets(strategy);
                default:
                    throw new Error('Invalid module type');
            }
        }
    }

    displayGeneratedAssets(assets) {
        let html = `
            <div class="generated-assets">
                <h3>${assets.title}</h3>
                <p>Here are your generated assets based on your strategy:</p>
        `;

        assets.sections.forEach(section => {
            html += `
                <div class="asset-section">
                    <h4>${section.title}</h4>
                    ${this.formatAssetContent(section)}
                </div>
            `;
        });

        html += `
                <div class="asset-actions">
                    <button class="cta-button" onclick="window.print()">Download PDF</button>
                    <button class="cta-button secondary" onclick="this.closest('.generated-assets').remove()">Close</button>
                </div>
            </div>
        `;

        // Insert the generated assets after the current content
        const currentContent = this.outputContent.innerHTML;
        this.outputContent.innerHTML = currentContent + html;
    }

    formatAssetContent(section) {
        switch (section.type) {
            case 'text':
                return `<div class="asset-text">${section.content}</div>`;
            case 'list':
                return `
                    <ul class="asset-list">
                        ${section.content.map(item => `<li>${item}</li>`).join('')}
                    </ul>
                `;
            case 'table':
                return `
                    <table class="asset-table">
                        ${section.content.map(row => `
                            <tr>
                                ${row.map(cell => `<td>${cell}</td>`).join('')}
                            </tr>
                        `).join('')}
                    </table>
                `;
            case 'diagram':
                return `
                    <div class="asset-diagram">
                        <pre>${section.content}</pre>
                    </div>
                `;
            case 'timeline':
                return `
                    <div class="asset-timeline">
                        ${section.content.map(item => `
                            <div class="timeline-item">
                                <div class="timeline-date">${item.date}</div>
                                <div class="timeline-content">${item.content}</div>
                            </div>
                        `).join('')}
                    </div>
                `;
            default:
                return `<div class="asset-content">${section.content}</div>`;
        }
    }

    // Helper methods for generating specific asset content
    generateValueProposition(strategy) {
        return `Transform your ${strategy.businessType} with our unique solution that ${strategy.mainResult}.`;
    }

    generateOfferStructure(strategy) {
        return [
            'Core product/service',
            'Implementation guide',
            'Support system',
            'Bonus resources'
        ];
    }

    generatePricingTiers(strategy) {
        return [
            ['Basic', '$97', 'Core features', 'Email support'],
            ['Pro', '$197', 'All features', 'Priority support'],
            ['Enterprise', '$497', 'Custom features', 'Dedicated support']
        ];
    }

    generateHeadlines(strategy) {
        return [
            `Transform Your ${strategy.businessType} Today`,
            `The Ultimate Solution for ${strategy.mainResult}`,
            `Stop Struggling, Start Succeeding with ${strategy.businessType}`
        ];
    }

    generateAdCopy(strategy) {
        return `Are you tired of struggling with ${strategy.mainResult}? Our proven solution helps you achieve your goals faster and more effectively than ever before.`;
    }

    generateEmailSequence(strategy) {
        return `Welcome to our exclusive ${strategy.businessType} program! We're excited to help you achieve ${strategy.mainResult} and transform your business.`;
    }

    generateFunnelMap(strategy) {
        return `
            Awareness → Interest → Desire → Action
            ↓
            Lead Magnet → Email Sequence → Sales Page → Checkout
        `;
    }

    generateLandingPageStructure(strategy) {
        return [
            'Attention-grabbing headline',
            'Problem statement',
            'Solution overview',
            'Benefits list',
            'Social proof',
            'Call to action'
        ];
    }

    generateEmailFlow(strategy) {
        return `
            Welcome Email → Value Email → Case Study → Offer Email → Follow-up
        `;
    }

    generateCustomerPersona(strategy) {
        return `Our ideal customer is ${strategy.idealCustomer}. They are looking for ${strategy.mainResult} and value quality, efficiency, and results.`;
    }

    generateMessagingFramework(strategy) {
        return [
            'Problem statement',
            'Solution benefits',
            'Social proof',
            'Call to action'
        ];
    }

    generateChannelStrategy(strategy) {
        return strategy.platforms.map(platform => 
            `${platform.charAt(0).toUpperCase() + platform.slice(1)}: Content strategy and engagement plan`
        );
    }

    generateScalingRoadmap(strategy) {
        return [
            { date: 'Month 1', content: 'Optimize current channels' },
            { date: 'Month 2', content: 'Expand to new platforms' },
            { date: 'Month 3', content: 'Scale successful campaigns' }
        ];
    }

    generateTestingFramework(strategy) {
        return [
            'A/B test headlines',
            'Test different CTAs',
            'Optimize landing pages',
            'Test ad creatives'
        ];
    }

    generateResourceAllocation(strategy) {
        return [
            ['Channel', 'Budget', 'Expected ROI'],
            ['Facebook Ads', '$1000', '3.5x'],
            ['Email Marketing', '$500', '5x'],
            ['Content Creation', '$800', '4x']
        ];
    }

    async generateStrategy(formData) {
        try {
            const prompt = this.createStrategyPrompt(formData);
            const response = await this.callOpenAI(prompt);
            
            return {
                businessAnalysis: this.parseBusinessAnalysis(response),
                audienceInsights: this.parseAudienceInsights(response),
                platformStrategy: this.parsePlatformStrategy(response),
                actionPlan: this.parseActionPlan(response)
            };
        } catch (error) {
            console.error('Error generating strategy:', error);
            throw error;
        }
    }

    createStrategyPrompt(formData) {
        return `Generate a comprehensive marketing strategy for a ${formData.businessType} business in the ${formData.currentStage} stage.

Business Details:
- Type: ${formData.businessType}
- Stage: ${formData.currentStage}
- Main Result: ${formData.mainResult}
- Platforms: ${formData.platforms.join(', ')}
- Help Needed: ${formData.helpNeeded}

Ideal Customer:
${formData.idealCustomer}

Please provide a detailed strategy including:
1. Business Analysis
2. Audience Insights
3. Platform Strategy
4. Action Plan

Format the response in JSON structure for easy parsing.`;
    }

    parseBusinessAnalysis(response) {
        try {
            const data = JSON.parse(response);
            return {
                businessType: data.businessType,
                currentStage: data.currentStage,
                focus: data.focus,
                priorities: data.priorities,
                recommendations: data.recommendations
            };
        } catch (error) {
            console.error('Error parsing business analysis:', error);
            return this.generateBusinessAnalysis(formData); // Fallback to default
        }
    }

    parseAudienceInsights(response) {
        try {
            const data = JSON.parse(response);
            return {
                idealCustomer: data.idealCustomer,
                painPoints: data.painPoints,
                desires: data.desires,
                recommendations: data.recommendations
            };
        } catch (error) {
            console.error('Error parsing audience insights:', error);
            return this.generateAudienceInsights(formData); // Fallback to default
        }
    }

    parsePlatformStrategy(response) {
        try {
            const data = JSON.parse(response);
            return {
                selectedPlatforms: data.selectedPlatforms,
                strategies: data.strategies,
                recommendations: data.recommendations
            };
        } catch (error) {
            console.error('Error parsing platform strategy:', error);
            return this.generatePlatformStrategy(formData); // Fallback to default
        }
    }

    parseActionPlan(response) {
        try {
            const data = JSON.parse(response);
            return {
                primaryFocus: data.primaryFocus,
                actions: data.actions,
                timeline: data.timeline
            };
        } catch (error) {
            console.error('Error parsing action plan:', error);
            return this.generateActionPlan(formData); // Fallback to default
        }
    }

    displayError(message) {
        this.outputContent.innerHTML = `
            <div class="error-message">
                <i class="fas fa-exclamation-circle"></i>
                <p>${message}</p>
            </div>
        `;
        this.outputContent.classList.add('active');
    }
}

// Initialize the Marketing AI when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new MarketingAI();
}); 