/**
 * Text Analyzer - Real-time text statistics calculator
 * Calculates words, characters, reading time, paragraphs, and sentences
 */

class TextAnalyzer {
    constructor() {
        this.textInput = document.getElementById('textInput');
        this.clearBtn = document.getElementById('clearBtn');
        this.initializeEventListeners();
        this.updateStatistics(); // Initial calculation
    }

    /**
     * Initialize all event listeners
     */
    initializeEventListeners() {
        // Real-time text analysis on input
        this.textInput.addEventListener('input', () => {
            this.updateStatistics();
        });

        // Clear button functionality
        this.clearBtn.addEventListener('click', () => {
            this.clearText();
        });

        // Keyboard shortcut for clearing (Ctrl+Shift+C)
        document.addEventListener('keydown', (e) => {
            if (e.ctrlKey && e.shiftKey && e.key === 'C') {
                e.preventDefault();
                this.clearText();
            }
        });
    }

    /**
     * Clear all text and reset statistics
     */
    clearText() {
        this.textInput.value = '';
        this.textInput.focus();
        this.updateStatistics();
        
        // Show visual feedback
        this.showNotification('Текст очищен');
    }

    /**
     * Update all text statistics
     */
    updateStatistics() {
        const text = this.textInput.value;
        
        // Calculate basic statistics
        const stats = {
            charsWithSpaces: this.countCharactersWithSpaces(text),
            charsWithoutSpaces: this.countCharactersWithoutSpaces(text),
            words: this.countWords(text),
            readingTime: this.calculateReadingTime(text),
            paragraphs: this.countParagraphs(text),
            sentences: this.countSentences(text)
        };

        // Update DOM elements
        this.updateDOM(stats);
    }

    /**
     * Count characters including spaces
     * @param {string} text - Input text
     * @returns {number} Character count with spaces
     */
    countCharactersWithSpaces(text) {
        return text.length;
    }

    /**
     * Count characters excluding spaces
     * @param {string} text - Input text
     * @returns {number} Character count without spaces
     */
    countCharactersWithoutSpaces(text) {
        return text.replace(/\s/g, '').length;
    }

    /**
     * Count words in text
     * @param {string} text - Input text
     * @returns {number} Word count
     */
    countWords(text) {
        // Remove extra whitespace and split by spaces
        const words = text.trim();
        if (words === '') return 0;
        
        // Split by whitespace and filter out empty strings
        return words.split(/\s+/).filter(word => word.length > 0).length;
    }

    /**
     * Calculate estimated reading time
     * @param {string} text - Input text
     * @returns {string} Formatted reading time
     */
    calculateReadingTime(text) {
        const wordsCount = this.countWords(text);
        const averageReadingSpeed = 200; // words per minute
        
        if (wordsCount === 0) return '0 мин';
        
        const minutes = Math.ceil(wordsCount / averageReadingSpeed);
        
        if (minutes === 1) {
            return '1 мин';
        } else if (minutes < 60) {
            return `${minutes} мин`;
        } else {
            const hours = Math.floor(minutes / 60);
            const remainingMinutes = minutes % 60;
            return `${hours}ч ${remainingMinutes}м`;
        }
    }

    /**
     * Count paragraphs in text
     * @param {string} text - Input text
     * @returns {number} Paragraph count
     */
    countParagraphs(text) {
        if (text.trim() === '') return 0;
        
        // Split by double newlines or more, filter out empty paragraphs
        const paragraphs = text.split(/\n\s*\n/).filter(para => para.trim().length > 0);
        return paragraphs.length > 0 ? paragraphs.length : (text.trim() ? 1 : 0);
    }

    /**
     * Count sentences in text
     * @param {string} text - Input text
     * @returns {number} Sentence count
     */
    countSentences(text) {
        if (text.trim() === '') return 0;
        
        // Split by sentence-ending punctuation, filter out empty sentences
        const sentences = text.split(/[.!?]+/).filter(sentence => sentence.trim().length > 0);
        return sentences.length;
    }

    /**
     * Update DOM elements with calculated statistics
     * @param {Object} stats - Statistics object
     */
    updateDOM(stats) {
        // Update main statistics
        document.getElementById('charsWithSpaces').textContent = stats.charsWithSpaces.toLocaleString();
        document.getElementById('charsWithoutSpaces').textContent = stats.charsWithoutSpaces.toLocaleString();
        document.getElementById('wordsCount').textContent = stats.words.toLocaleString();
        document.getElementById('readingTime').textContent = stats.readingTime;
        
        // Update additional details
        document.getElementById('paragraphs').textContent = stats.paragraphs;
        document.getElementById('sentences').textContent = stats.sentences;
        
        // Update clear button state
        const hasText = stats.charsWithSpaces > 0;
        this.clearBtn.disabled = !hasText;
        
        // Update page title with word count when there's text
        if (hasText) {
            document.title = `Анализатор текста - ${stats.words} слов`;
        } else {
            document.title = 'Анализатор текста - Подсчет слов и символов';
        }
    }

    /**
     * Show a temporary notification to user
     * @param {string} message - Notification message
     */
    showNotification(message) {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = 'toast align-items-center text-bg-success border-0 position-fixed';
        notification.style.cssText = 'top: 20px; right: 20px; z-index: 1050;';
        notification.setAttribute('role', 'alert');
        notification.innerHTML = `
            <div class="d-flex">
                <div class="toast-body">
                    <i class="fas fa-check-circle me-2"></i>
                    ${message}
                </div>
                <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button>
            </div>
        `;
        
        // Add to page
        document.body.appendChild(notification);
        
        // Initialize and show toast
        const bsToast = new bootstrap.Toast(notification);
        bsToast.show();
        
        // Remove element after hide
        notification.addEventListener('hidden.bs.toast', () => {
            notification.remove();
        });
    }
}

// Initialize the text analyzer when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new TextAnalyzer();
    
    // Add some helpful keyboard shortcuts info
    console.log('🔧 Горячие клавиши:');
    console.log('   Ctrl+Shift+C - Очистить текст');
    console.log('📊 Анализатор текста готов к работе!');
});

// Add service worker registration for offline functionality (optional)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // Service worker would be implemented separately if needed
        console.log('🌐 Приложение готово к работе');
    });
}
