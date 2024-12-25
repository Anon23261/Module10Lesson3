// Array Management App
class ArrayManager {
    constructor() {
        this.fruits = [];
        this.numbers = [];
        this.operations = 0;
        this.startTime = Date.now();
        this.initializeEventListeners();
        this.updateStats();
        this.startSessionTimer();
    }

    // Initialize all event listeners
    initializeEventListeners() {
        // Navigation
        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.addEventListener('click', (e) => this.switchSection(e.currentTarget.dataset.section));
        });

        // Theme switcher
        const themeToggle = document.getElementById('themeToggle');
        themeToggle.addEventListener('change', () => this.toggleTheme());
        themeToggle.setAttribute('aria-checked', document.body.classList.contains('dark-theme'));

        // Array Management
        document.getElementById('addItemBtn').addEventListener('click', () => this.addItem());
        document.getElementById('addRandomBtn').addEventListener('click', () => this.addRandomItem());
        document.getElementById('clearArrayBtn').addEventListener('click', () => this.clearArray());
        document.getElementById('addItemInput').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.addItem();
        });

        // Array Modifications
        document.getElementById('sortAscBtn').addEventListener('click', () => this.sortArray('asc'));
        document.getElementById('sortDescBtn').addEventListener('click', () => this.sortArray('desc'));
        document.getElementById('reverseBtn').addEventListener('click', () => this.reverseArray());

        // Number Operations
        document.getElementById('addNumberBtn').addEventListener('click', () => this.addNumber());
        document.getElementById('addRandomNumberBtn').addEventListener('click', () => this.addRandomNumber());
        document.getElementById('clearNumbersBtn').addEventListener('click', () => this.clearNumbers());
        document.getElementById('addNumberInput').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.addNumber();
        });

        document.getElementById('sumBtn').addEventListener('click', () => this.calculateSum());
        document.getElementById('averageBtn').addEventListener('click', () => this.calculateAverage());
        document.getElementById('maxBtn').addEventListener('click', () => this.findMax());
        document.getElementById('minBtn').addEventListener('click', () => this.findMin());

        // Transformations
        document.getElementById('upperCaseBtn').addEventListener('click', () => this.transformText('upper'));
        document.getElementById('lowerCaseBtn').addEventListener('click', () => this.transformText('lower'));
        document.getElementById('capitalizeBtn').addEventListener('click', () => this.transformText('capitalize'));
    }

    // Navigation
    switchSection(sectionId) {
        document.querySelectorAll('.demo-section').forEach(section => {
            section.classList.remove('active');
        });
        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.getElementById(sectionId).classList.add('active');
        document.querySelector(`[data-section="${sectionId}"]`).classList.add('active');
    }

    // Theme Management
    toggleTheme() {
        document.body.classList.toggle('dark-theme');
        localStorage.setItem('theme', document.body.classList.contains('dark-theme') ? 'dark' : 'light');
        const themeToggle = document.getElementById('themeToggle');
        themeToggle.setAttribute('aria-checked', document.body.classList.contains('dark-theme'));
        this.showToast('Theme updated');
    }

    // Array Management Methods
    addItem() {
        const input = document.getElementById('addItemInput');
        const value = input.value.trim();
        
        if (!value) {
            this.showToast('Please enter a valid item', 'error');
            return;
        }

        this.fruits.push(value);
        input.value = '';
        this.updateArrayDisplay();
        this.operations++;
        this.updateStats();
        this.showToast(`Added "${value}" to array`);
    }

    addRandomItem() {
        const fruits = ['Apple', 'Banana', 'Orange', 'Mango', 'Pear', 'Grape', 'Kiwi', 'Peach'];
        const randomFruit = fruits[Math.floor(Math.random() * fruits.length)];
        this.fruits.push(randomFruit);
        this.updateArrayDisplay();
        this.operations++;
        this.updateStats();
        this.showToast(`Added random fruit "${randomFruit}"`);
    }

    clearArray() {
        if (this.fruits.length === 0) {
            this.showToast('Array is already empty', 'warning');
            return;
        }
        this.fruits = [];
        this.updateArrayDisplay();
        this.operations++;
        this.updateStats();
        this.showToast('Array cleared');
    }

    // Array Modifications
    sortArray(direction) {
        if (this.fruits.length < 2) {
            this.showToast('Need at least 2 items to sort', 'warning');
            return;
        }
        this.fruits.sort((a, b) => {
            return direction === 'asc' ? a.localeCompare(b) : b.localeCompare(a);
        });
        this.updateArrayDisplay();
        this.operations++;
        this.updateStats();
        this.showToast(`Array sorted ${direction === 'asc' ? 'A-Z' : 'Z-A'}`);
    }

    reverseArray() {
        if (this.fruits.length < 2) {
            this.showToast('Need at least 2 items to reverse', 'warning');
            return;
        }
        this.fruits.reverse();
        this.updateArrayDisplay();
        this.operations++;
        this.updateStats();
        this.showToast('Array reversed');
    }

    // Number Operations
    addNumber() {
        const input = document.getElementById('addNumberInput');
        const value = parseFloat(input.value);
        
        if (isNaN(value)) {
            this.showToast('Please enter a valid number', 'error');
            return;
        }

        this.numbers.push(value);
        input.value = '';
        this.updateNumberDisplay();
        this.updateNumberChart();
        this.operations++;
        this.updateStats();
        this.showToast(`Added number ${value}`);
    }

    addRandomNumber() {
        const number = Math.floor(Math.random() * 100);
        this.numbers.push(number);
        this.updateNumberDisplay();
        this.updateNumberChart();
        this.operations++;
        this.updateStats();
        this.showToast(`Added random number ${number}`);
    }

    clearNumbers() {
        if (this.numbers.length === 0) {
            this.showToast('Number array is already empty', 'warning');
            return;
        }
        this.numbers = [];
        this.updateNumberDisplay();
        this.updateNumberChart();
        this.operations++;
        this.updateStats();
        this.showToast('Number array cleared');
    }

    calculateSum() {
        if (this.numbers.length === 0) {
            this.showToast('No numbers to calculate sum', 'warning');
            return;
        }
        const sum = this.numbers.reduce((a, b) => a + b, 0);
        this.showToast(`Sum: ${sum}`);
        this.operations++;
        this.updateStats();
    }

    calculateAverage() {
        if (this.numbers.length === 0) {
            this.showToast('No numbers to calculate average', 'warning');
            return;
        }
        const avg = this.numbers.reduce((a, b) => a + b, 0) / this.numbers.length;
        this.showToast(`Average: ${avg.toFixed(2)}`);
        this.operations++;
        this.updateStats();
    }

    findMax() {
        if (this.numbers.length === 0) {
            this.showToast('No numbers to find maximum', 'warning');
            return;
        }
        const max = Math.max(...this.numbers);
        this.showToast(`Maximum: ${max}`);
        this.operations++;
        this.updateStats();
    }

    findMin() {
        if (this.numbers.length === 0) {
            this.showToast('No numbers to find minimum', 'warning');
            return;
        }
        const min = Math.min(...this.numbers);
        this.showToast(`Minimum: ${min}`);
        this.operations++;
        this.updateStats();
    }

    // Text Transformations
    transformText(type) {
        if (this.fruits.length === 0) {
            this.showToast('No items to transform', 'warning');
            return;
        }

        const originalArray = document.getElementById('originalArray');
        const transformedArray = document.getElementById('transformedArray');

        originalArray.innerHTML = this.fruits.map(item => 
            `<div class="array-item">${item}</div>`
        ).join('');

        const transformed = this.fruits.map(item => {
            switch(type) {
                case 'upper':
                    return item.toUpperCase();
                case 'lower':
                    return item.toLowerCase();
                case 'capitalize':
                    return item.charAt(0).toUpperCase() + item.slice(1).toLowerCase();
                default:
                    return item;
            }
        });

        transformedArray.innerHTML = transformed.map(item => 
            `<div class="array-item">${item}</div>`
        ).join('');

        this.operations++;
        this.updateStats();
        this.showToast('Text transformed');
    }

    // Display Updates
    updateArrayDisplay() {
        const display = document.querySelector('.array-display');
        if (this.fruits.length === 0) {
            display.innerHTML = '<div class="empty-state">Add items to get started</div>';
        } else {
            display.innerHTML = this.fruits.map(item => 
                `<div class="array-item">${item}</div>`
            ).join('');
        }
        document.querySelector('.array-info').textContent = `${this.fruits.length} items`;
    }

    updateNumberDisplay() {
        const display = document.querySelector('#task2 .array-display');
        if (this.numbers.length === 0) {
            display.innerHTML = '<div class="empty-state">Add numbers to get started</div>';
        } else {
            display.innerHTML = this.numbers.map(num => 
                `<div class="array-item">${num}</div>`
            ).join('');
        }
        document.querySelector('#task2 .array-info').textContent = `${this.numbers.length} items`;
    }

    updateNumberChart() {
        const chart = document.getElementById('numberChart');
        if (this.numbers.length === 0) {
            chart.innerHTML = '<div class="empty-state">Add numbers to see distribution</div>';
            return;
        }

        const max = Math.max(...this.numbers);
        const min = Math.min(...this.numbers);
        const range = max - min;
        
        chart.innerHTML = this.numbers.map(num => {
            const height = range === 0 ? 50 : ((num - min) / range) * 100;
            return `
                <div class="bar-wrapper">
                    <div class="bar" style="height: ${height}%"></div>
                    <span class="bar-label">${num}</span>
                </div>
            `;
        }).join('');
    }

    // Statistics and Analytics
    updateStats() {
        document.getElementById('totalOperations').textContent = this.operations;
        document.getElementById('arraySize').textContent = this.fruits.length + this.numbers.length;
        document.getElementById('lastOperation').textContent = new Date().toLocaleTimeString();

        // Update analytics
        if (document.getElementById('task4').classList.contains('active')) {
            this.updateAnalytics();
        }
    }

    updateAnalytics() {
        const allItems = [...this.fruits, ...this.numbers.map(String)];
        
        // Update statistics
        document.getElementById('totalItems').textContent = allItems.length;
        document.getElementById('uniqueItems').textContent = new Set(allItems).size;
        document.getElementById('avgLength').textContent = allItems.length > 0 
            ? (allItems.join('').length / allItems.length).toFixed(1)
            : '0';

        // Find most common item
        const frequency = {};
        let maxFreq = 0;
        let mostCommon = '-';
        
        allItems.forEach(item => {
            frequency[item] = (frequency[item] || 0) + 1;
            if (frequency[item] > maxFreq) {
                maxFreq = frequency[item];
                mostCommon = item;
            }
        });
        
        document.getElementById('mostCommon').textContent = maxFreq > 1 ? mostCommon : '-';

        // Update distribution chart
        this.updateDistributionChart(frequency);
    }

    updateDistributionChart(frequency) {
        const chart = document.getElementById('analyticsChart');
        const items = Object.entries(frequency);
        
        if (items.length === 0) {
            chart.innerHTML = '<div class="empty-state">Add items to see distribution</div>';
            return;
        }

        const maxFreq = Math.max(...Object.values(frequency));
        
        chart.innerHTML = items.map(([item, freq]) => {
            const height = (freq / maxFreq) * 100;
            return `
                <div class="bar-wrapper">
                    <div class="bar" style="height: ${height}%"></div>
                    <span class="bar-label">${item}</span>
                </div>
            `;
        }).join('');
    }

    // Session Management
    startSessionTimer() {
        setInterval(() => {
            const elapsed = Math.floor((Date.now() - this.startTime) / 1000);
            const minutes = Math.floor(elapsed / 60);
            const seconds = elapsed % 60;
            document.getElementById('sessionTime').textContent = 
                `${minutes}:${seconds.toString().padStart(2, '0')}`;
        }, 1000);
    }

    // UI Feedback
    showToast(message, type = 'success') {
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        
        const icon = document.createElement('i');
        icon.className = `fas fa-${type === 'error' ? 'exclamation-circle' : 
                              type === 'warning' ? 'exclamation-triangle' : 
                              'check-circle'}`;
        
        toast.appendChild(icon);
        toast.appendChild(document.createTextNode(message));
        document.body.appendChild(toast);

        setTimeout(() => {
            toast.remove();
        }, 3000);
    }
}

// Initialize the app
document.addEventListener('DOMContentLoaded', () => {
    const app = new ArrayManager();
    
    // Load saved theme
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
        document.getElementById('themeToggle').checked = true;
        document.getElementById('themeToggle').setAttribute('aria-checked', true);
    }
});
