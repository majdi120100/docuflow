/**
 * DocuFlow - Online Document Management HTML Template
 * Main JavaScript File
 * Version: 1.0.0
 */

(function() {
    'use strict';

    // ==========================================
    // THEME TOGGLE FUNCTIONALITY
    // ==========================================
    const themeToggle = document.getElementById('themeToggle');
    const htmlElement = document.documentElement;
    
    // Check for saved theme preference or default to 'light' mode
    const currentTheme = localStorage.getItem('theme') || 'light';
    htmlElement.setAttribute('data-theme', currentTheme);
    
    // Update theme toggle icon
    function updateThemeIcon() {
        if (!themeToggle) return;
        const icon = themeToggle.querySelector('i');
        if (htmlElement.getAttribute('data-theme') === 'dark') {
            icon.classList.remove('bi-moon-fill');
            icon.classList.add('bi-sun-fill');
        } else {
            icon.classList.remove('bi-sun-fill');
            icon.classList.add('bi-moon-fill');
        }
    }
    
    updateThemeIcon();
    
    // Theme toggle click handler
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            const currentTheme = htmlElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';
            
            htmlElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            updateThemeIcon();
        });
    }

    // ==========================================
    // DYNAMIC TOOL PAGE CONTENT
    // ==========================================
    
    // Tool data for all available tools
    const toolsData = {
        'compress-pdf': {
            icon: 'bi-file-pdf-fill',
            title: 'Compress PDF',
            description: 'Reduce PDF file size while maintaining quality. Perfect for email attachments and web uploads.',
            hasOptions: true,
            optionTitle: 'Compression Level',
            options: [
                { id: 'low', label: 'Low', desc: 'Better quality' },
                { id: 'medium', label: 'Medium', desc: 'Balanced' },
                { id: 'high', label: 'High', desc: 'Smaller size' }
            ]
        },
        'compress-image': {
            icon: 'bi-image',
            title: 'Compress Image',
            description: 'Reduce image file size without losing quality. Supports JPG, PNG, and more.',
            hasOptions: true,
            optionTitle: 'Quality Level',
            options: [
                { id: 'low', label: 'High Quality', desc: '90-100%' },
                { id: 'medium', label: 'Medium Quality', desc: '70-89%' },
                { id: 'high', label: 'Low Quality', desc: 'Below 70%' }
            ]
        },
        'merge-pdf': {
            icon: 'bi-file-earmark-arrow-down',
            title: 'Merge PDF',
            description: 'Combine multiple PDF files into one document. Upload and arrange files in your preferred order.',
            hasOptions: false,
            acceptMultiple: true
        },
        'split-pdf': {
            icon: 'bi-scissors',
            title: 'Split PDF',
            description: 'Extract specific pages from your PDF document. Choose pages to keep or remove.',
            hasOptions: true,
            optionTitle: 'Split Method',
            options: [
                { id: 'pages', label: 'By Pages', desc: 'Select specific pages' },
                { id: 'range', label: 'By Range', desc: 'Page ranges' },
                { id: 'all', label: 'Each Page', desc: 'Separate files' }
            ]
        },
        'rotate-pdf': {
            icon: 'bi-arrow-clockwise',
            title: 'Rotate PDF',
            description: 'Rotate PDF pages to correct orientation. Rotate individual pages or entire document.',
            hasOptions: true,
            optionTitle: 'Rotation Angle',
            options: [
                { id: '90', label: '90°', desc: 'Clockwise' },
                { id: '180', label: '180°', desc: 'Upside down' },
                { id: '270', label: '270°', desc: 'Counter-clockwise' }
            ]
        },
        'organize-pdf': {
            icon: 'bi-layout-three-columns',
            title: 'Organize PDF',
            description: 'Reorder, delete, or add pages to your PDF. Full control over your document structure.',
            hasOptions: false
        },
        'pdf-to-word': {
            icon: 'bi-arrow-left-right',
            title: 'PDF to Word',
            description: 'Convert PDF documents to editable Word files (.docx). Maintain formatting and layout.',
            hasOptions: true,
            optionTitle: 'Output Format',
            options: [
                { id: 'docx', label: 'DOCX', desc: 'Word 2007+' },
                { id: 'doc', label: 'DOC', desc: 'Word 97-2003' },
                { id: 'rtf', label: 'RTF', desc: 'Rich Text Format' }
            ]
        },
        'pdf-to-jpg': {
            icon: 'bi-image-fill',
            title: 'PDF to JPG',
            description: 'Convert PDF pages to high-quality JPG images. Perfect for sharing and presentations.',
            hasOptions: true,
            optionTitle: 'Image Quality',
            options: [
                { id: 'high', label: 'High', desc: '300 DPI' },
                { id: 'medium', label: 'Medium', desc: '150 DPI' },
                { id: 'low', label: 'Low', desc: '72 DPI' }
            ]
        },
        'word-to-pdf': {
            icon: 'bi-file-word',
            title: 'Word to PDF',
            description: 'Convert Word documents to PDF format. Preserve all formatting and fonts.',
            hasOptions: false
        },
        'excel-to-pdf': {
            icon: 'bi-file-excel',
            title: 'Excel to PDF',
            description: 'Convert Excel spreadsheets to PDF format. Keep all formatting and formulas.',
            hasOptions: false
        },
        'powerpoint-to-pdf': {
            icon: 'bi-file-ppt',
            title: 'PowerPoint to PDF',
            description: 'Convert presentations to PDF format. Perfect for sharing and printing.',
            hasOptions: false
        },
        'jpg-to-pdf': {
            icon: 'bi-card-image',
            title: 'JPG to PDF',
            description: 'Convert images to PDF documents. Combine multiple images into one PDF.',
            hasOptions: false,
            acceptMultiple: true
        },
        'protect-pdf': {
            icon: 'bi-lock-fill',
            title: 'Protect PDF',
            description: 'Add password protection to your PDF files. Set permissions and restrictions.',
            hasOptions: true,
            optionTitle: 'Protection Type',
            options: [
                { id: 'password', label: 'Password', desc: 'Require password to open' },
                { id: 'permissions', label: 'Permissions', desc: 'Restrict editing/printing' },
                { id: 'both', label: 'Both', desc: 'Password + Permissions' }
            ]
        },
        'unlock-pdf': {
            icon: 'bi-unlock-fill',
            title: 'Unlock PDF',
            description: 'Remove password protection from PDF files. You must know the password.',
            hasOptions: false
        },
        'sign-pdf': {
            icon: 'bi-pen-fill',
            title: 'Sign PDF',
            description: 'Add digital signature to your documents. Draw, type, or upload your signature.',
            hasOptions: true,
            optionTitle: 'Signature Type',
            options: [
                { id: 'draw', label: 'Draw', desc: 'Draw with mouse' },
                { id: 'type', label: 'Type', desc: 'Type your name' },
                { id: 'upload', label: 'Upload', desc: 'Upload signature image' }
            ]
        },
        'watermark-pdf': {
            icon: 'bi-droplet-fill',
            title: 'Watermark PDF',
            description: 'Add watermark to your PDF documents. Text or image watermarks supported.',
            hasOptions: true,
            optionTitle: 'Watermark Type',
            options: [
                { id: 'text', label: 'Text', desc: 'Text watermark' },
                { id: 'image', label: 'Image', desc: 'Image watermark' }
            ]
        }
    };

    // Load tool data based on URL parameter
    function loadToolData() {
        const urlParams = new URLSearchParams(window.location.search);
        const toolName = urlParams.get('tool');
        
        if (!toolName || !toolsData[toolName]) {
            return; // No tool specified or invalid tool
        }
        
        const tool = toolsData[toolName];
        
        // Update page title
        document.title = tool.title + ' - DocuFlow';
        
        // Update tool icon
        const toolIconLarge = document.querySelector('.tool-icon-large i');
        if (toolIconLarge) {
            toolIconLarge.className = 'bi ' + tool.icon;
        }
        
        // Update main title
        const mainTitle = document.querySelector('.tool-header h1');
        if (mainTitle) {
            mainTitle.textContent = tool.title;
        }
        
        // Update description
        const description = document.querySelector('.tool-header .lead');
        if (description) {
            description.textContent = tool.description;
        }
        
        // Update file input for multiple files if needed
        const fileInput = document.getElementById('fileInput');
        if (fileInput && tool.acceptMultiple) {
            fileInput.setAttribute('multiple', 'multiple');
        }
        
        // Handle options section
        const optionsSection = document.getElementById('compressionOptions');
        if (optionsSection) {
            if (!tool.hasOptions) {
                optionsSection.style.display = 'none';
            } else {
                // Update option title
                const optionLabel = optionsSection.querySelector('label');
                if (optionLabel && tool.optionTitle) {
                    optionLabel.textContent = tool.optionTitle;
                }
                
                // Update option buttons if custom options provided
                if (tool.options) {
                    const btnGroup = optionsSection.querySelector('.btn-group');
                    if (btnGroup) {
                        btnGroup.innerHTML = '';
                        tool.options.forEach((option, index) => {
                            const radioId = option.id + 'Option';
                            const checked = index === 1 ? 'checked' : ''; // Medium as default
                            
                            btnGroup.innerHTML += `
                                <input type="radio" class="btn-check" name="toolOption" id="${radioId}" value="${option.id}" ${checked}>
                                <label class="btn btn-outline-primary" for="${radioId}">
                                    <div class="fw-semibold">${option.label}</div>
                                    <small class="d-block text-muted">${option.desc}</small>
                                </label>
                            `;
                        });
                    }
                }
            }
        }
        
        // Update process button text
        const processBtn = document.getElementById('processBtn');
        if (processBtn) {
            processBtn.innerHTML = `<i class="bi bi-gear-fill me-2"></i>Process ${tool.title}`;
        }
    }
    
    // Initialize tool data on page load
    if (window.location.pathname.includes('tool-single.html')) {
        loadToolData();
    }

    // ==========================================
    // FILE UPLOAD & PROCESSING (TOOL SINGLE PAGE)
    // ==========================================
    const uploadArea = document.getElementById('uploadArea');
    const fileInput = document.getElementById('fileInput');
    const selectFileBtn = document.getElementById('selectFileBtn');
    const processingArea = document.getElementById('processingArea');
    const progressArea = document.getElementById('progressArea');
    const resultArea = document.getElementById('resultArea');
    const processBtn = document.getElementById('processBtn');
    const cancelBtn = document.getElementById('cancelBtn');
    const downloadBtn = document.getElementById('downloadBtn');
    const compressAnotherBtn = document.getElementById('compressAnotherBtn');

    if (uploadArea && fileInput) {
        // Click to select file
        if (selectFileBtn) {
            selectFileBtn.addEventListener('click', () => {
                fileInput.click();
            });
        }

        // Drag and drop functionality
        uploadArea.addEventListener('dragover', (e) => {
            e.preventDefault();
            uploadArea.classList.add('drag-over');
        });

        uploadArea.addEventListener('dragleave', () => {
            uploadArea.classList.remove('drag-over');
        });

        uploadArea.addEventListener('drop', (e) => {
            e.preventDefault();
            uploadArea.classList.remove('drag-over');
            
            const files = e.dataTransfer.files;
            if (files.length > 0) {
                handleFileSelect(files[0]);
            }
        });

        // File input change
        fileInput.addEventListener('change', (e) => {
            if (e.target.files.length > 0) {
                handleFileSelect(e.target.files[0]);
            }
        });

        // Handle file selection
        function handleFileSelect(file) {
            // Display file info
            const fileNameEl = document.getElementById('fileName');
            const fileSizeEl = document.getElementById('fileSize');
            
            if (fileNameEl) fileNameEl.textContent = file.name;
            if (fileSizeEl) fileSizeEl.textContent = formatFileSize(file.size);
            
            // Show processing area
            uploadArea.style.display = 'none';
            if (processingArea) processingArea.style.display = 'block';
        }

        // Cancel button
        if (cancelBtn) {
            cancelBtn.addEventListener('click', () => {
                resetUpload();
            });
        }

        // Process button
        if (processBtn) {
            processBtn.addEventListener('click', () => {
                startProcessing();
            });
        }

        // Download button
        if (downloadBtn) {
            downloadBtn.addEventListener('click', () => {
                alert('In a production environment, this would download your processed file.');
            });
        }

        // Process another button
        if (compressAnotherBtn) {
            compressAnotherBtn.addEventListener('click', () => {
                resetUpload();
            });
        }

        // Start processing simulation
        function startProcessing() {
            if (processingArea) processingArea.style.display = 'none';
            if (progressArea) progressArea.style.display = 'block';
            
            let progress = 0;
            const progressBar = document.getElementById('progressBar');
            const progressText = document.getElementById('progressText');
            
            const interval = setInterval(() => {
                progress += 10;
                if (progressBar) progressBar.style.width = progress + '%';
                if (progressText) progressText.textContent = progress + '%';
                
                if (progress >= 100) {
                    clearInterval(interval);
                    setTimeout(() => {
                        showResults();
                    }, 500);
                }
            }, 300);
        }

        // Show results
        function showResults() {
            if (progressArea) progressArea.style.display = 'none';
            if (resultArea) resultArea.style.display = 'block';
            
            // Simulate results
            const fileSizeEl = document.getElementById('fileSize');
            const originalSize = fileSizeEl ? fileSizeEl.textContent : '2.5 MB';
            const reduction = Math.floor(Math.random() * (60 - 40) + 40);
            
            const originalSizeDisplay = document.getElementById('originalSize');
            const reductionPercent = document.getElementById('reductionPercent');
            const newSizeDisplay = document.getElementById('newSize');
            
            if (originalSizeDisplay) originalSizeDisplay.textContent = originalSize;
            if (reductionPercent) reductionPercent.textContent = reduction + '%';
            
            // Calculate new size
            const originalBytes = parseSize(originalSize);
            const newBytes = originalBytes * (1 - reduction / 100);
            if (newSizeDisplay) newSizeDisplay.textContent = formatFileSize(newBytes);
        }

        // Reset upload
        function resetUpload() {
            uploadArea.style.display = 'block';
            if (processingArea) processingArea.style.display = 'none';
            if (progressArea) progressArea.style.display = 'none';
            if (resultArea) resultArea.style.display = 'none';
            fileInput.value = '';
        }
    }

    // ==========================================
    // TOOLS PAGE - SEARCH AND FILTER
    // ==========================================
    const toolSearch = document.getElementById('toolSearch');
    const categoryButtons = document.querySelectorAll('[data-category]');
    const toolItems = document.querySelectorAll('.tool-item');
    const noResults = document.getElementById('noResults');

    // Search functionality
    if (toolSearch) {
        toolSearch.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            filterTools(searchTerm, getCurrentCategory());
        });
    }

    // Category filter
    categoryButtons.forEach(button => {
        button.addEventListener('click', function() {
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            const category = this.getAttribute('data-category');
            const searchTerm = toolSearch ? toolSearch.value.toLowerCase() : '';
            filterTools(searchTerm, category);
        });
    });

    // Filter tools function
    function filterTools(searchTerm, category) {
        let visibleCount = 0;
        
        toolItems.forEach(item => {
            const itemCategory = item.getAttribute('data-category');
            const itemName = item.getAttribute('data-name').toLowerCase();
            
            const matchesSearch = itemName.includes(searchTerm);
            const matchesCategory = category === 'all' || itemCategory === category;
            
            if (matchesSearch && matchesCategory) {
                item.style.display = 'block';
                item.classList.remove('hidden');
                visibleCount++;
            } else {
                item.style.display = 'none';
                item.classList.add('hidden');
            }
        });
        
        if (noResults) {
            noResults.style.display = visibleCount === 0 ? 'block' : 'none';
        }
    }

    function getCurrentCategory() {
        const activeButton = document.querySelector('[data-category].active');
        return activeButton ? activeButton.getAttribute('data-category') : 'all';
    }

    // ==========================================
    // CONTACT FORM VALIDATION
    // ==========================================
    const contactForm = document.getElementById('contactForm');
    const formSuccessMessage = document.getElementById('formSuccessMessage');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (this.checkValidity()) {
                if (formSuccessMessage) {
                    formSuccessMessage.style.display = 'block';
                }
                
                this.reset();
                this.classList.remove('was-validated');
                
                setTimeout(() => {
                    if (formSuccessMessage) {
                        formSuccessMessage.style.display = 'none';
                    }
                }, 5000);
                
                if (formSuccessMessage) {
                    formSuccessMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
            } else {
                this.classList.add('was-validated');
            }
        });
    }

    // ==========================================
    // SCROLL ANIMATIONS
    // ==========================================
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.feature-card, .tool-card, .step-card, .value-card').forEach(el => {
        observer.observe(el);
    });

    // ==========================================
    // SMOOTH SCROLL FOR ANCHOR LINKS
    // ==========================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href !== '') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    // ==========================================
    // NAVBAR SCROLL EFFECT
    // ==========================================
    let lastScroll = 0;
    const navbar = document.querySelector('.navbar');

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (navbar) {
            if (currentScroll > 100) {
                navbar.classList.add('shadow-sm');
            } else {
                navbar.classList.remove('shadow-sm');
            }
        }
        
        lastScroll = currentScroll;
    });

    // ==========================================
    // UTILITY FUNCTIONS
    // ==========================================
    
    function formatFileSize(bytes) {
        if (bytes === 0) return '0 Bytes';
        
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        
        return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
    }

    function parseSize(sizeString) {
        const units = {
            'Bytes': 1,
            'KB': 1024,
            'MB': 1024 * 1024,
            'GB': 1024 * 1024 * 1024
        };
        
        const parts = sizeString.split(' ');
        const value = parseFloat(parts[0]);
        const unit = parts[1];
        
        return value * units[unit];
    }

    // ==========================================
    // INITIALIZE ON PAGE LOAD
    // ==========================================
    window.addEventListener('load', function() {
        document.body.classList.remove('loading');
        
        if (typeof bootstrap !== 'undefined' && bootstrap.Tooltip) {
            const tooltipTriggerList = [].slice.call(
                document.querySelectorAll('[data-bs-toggle="tooltip"]')
            );
            tooltipTriggerList.map(function(tooltipTriggerEl) {
                return new bootstrap.Tooltip(tooltipTriggerEl);
            });
        }
    });

    // ==========================================
    // ACCESSIBILITY ENHANCEMENTS
    // ==========================================
    
    document.querySelectorAll('.upload-area').forEach(area => {
        area.setAttribute('tabindex', '0');
        area.addEventListener('keypress', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                const input = this.querySelector('input[type="file"]');
                if (input) input.click();
            }
        });
    });

})();
