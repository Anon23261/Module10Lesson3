// Array Manipulation Demo
class ArrayManipulator {
    constructor() {
        this.fruits = [];
        this.numbers = [];
        this.maxArraySize = 10;
        this.operationsCount = 0;
        this.sessionStartTime = Date.now();
        this.settings = {
            animations: true,
            sound: true,
            arrayLimit: 10
        };
        
        this.initializeEventListeners();
        this.initializeSettings();
        this.startSessionTimer();
        this.updateArrayDisplays();
        this.updateStatistics();
    }

    initializeEventListeners() {
        // Fruit Array Controls
        document.getElementById('addFruit').addEventListener('click', () => this.addFruit());
        document.getElementById('removeFruit').addEventListener('click', () => this.removeFruit());
        document.getElementById('clearFruits').addEventListener('click', () => this.clearFruits());
        document.getElementById('sortFruits').addEventListener('click', () => this.sortFruits());
        
        // Number Array Controls
        document.getElementById('addNumber').addEventListener('click', () => this.addNumber());
        document.getElementById('removeNumber').addEventListener('click', () => this.removeNumber());
        document.getElementById('clearNumbers').addEventListener('click', () => this.clearNumbers());
        document.getElementById('sortNumbers').addEventListener('click', () => this.sortNumbers());
        document.getElementById('shuffleNumbers').addEventListener('click', () => this.shuffleNumbers());
        
        // Input Event Listeners
        document.getElementById('fruitInput').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.addFruit();
        });
        document.getElementById('numberInput').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.addNumber();
        });

        // Tab Navigation
        const tabs = document.querySelectorAll('.nav-btn');
        tabs.forEach(tab => {
            tab.addEventListener('click', (e) => this.switchTab(e));
        });

        // Info Panel Toggles
        const infoPanelToggles = document.querySelectorAll('.toggle-info');
        infoPanelToggles.forEach(toggle => {
            toggle.addEventListener('click', (e) => this.toggleInfoPanel(e));
        });
    }

    initializeSettings() {
        const savedSettings = localStorage.getItem('arrayManipulatorSettings');
        if (savedSettings) {
            this.settings = { ...this.settings, ...JSON.parse(savedSettings) };
            document.getElementById('animations').checked = this.settings.animations;
            document.getElementById('sound').checked = this.settings.sound;
            document.getElementById('arrayLimit').value = this.settings.arrayLimit;
        }
    }

    startSessionTimer() {
        const timerElement = document.getElementById('sessionTimer');
        if (!timerElement) return;

        setInterval(() => {
            const elapsed = Math.floor((Date.now() - this.sessionStartTime) / 1000);
            const minutes = Math.floor(elapsed / 60);
            const seconds = elapsed % 60;
            timerElement.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
        }, 1000);
    }

    // Array Manipulation Methods
    addFruit() {
        const input = document.getElementById('fruitInput');
        const fruit = input.value.trim();
        
        if (!fruit) {
            this.showToast('Please enter a fruit name', 'error');
            return;
        }

        if (this.fruits.length >= this.maxArraySize) {
            this.showToast('Maximum array size reached', 'warning');
            return;
        }

        if (this.fruits.includes(fruit)) {
            this.showToast('This fruit is already in the array', 'warning');
            return;
        }

        this.fruits.push(fruit);
        input.value = '';
        this.updateArrayDisplays();
        this.updateStatistics();
        this.showToast(`Added ${fruit} to the array`, 'success');
        this.operationsCount++;
    }

    removeFruit() {
        if (this.fruits.length === 0) {
            this.showToast('Array is already empty', 'warning');
            return;
        }

        const removed = this.fruits.pop();
        this.updateArrayDisplays();
        this.updateStatistics();
        this.showToast(`Removed ${removed} from the array`, 'info');
        this.operationsCount++;
    }

    clearFruits() {
        if (this.fruits.length === 0) {
            this.showToast('Array is already empty', 'info');
            return;
        }

        this.fruits = [];
        this.updateArrayDisplays();
        this.updateStatistics();
        this.showToast('Cleared fruits array', 'info');
        this.operationsCount++;
    }

    sortFruits() {
        if (this.fruits.length <= 1) {
            this.showToast('Array needs more items to sort', 'warning');
            return;
        }

        this.fruits.sort();
        this.updateArrayDisplays();
        this.updateStatistics();
        this.showToast('Sorted fruits array', 'success');
        this.operationsCount++;
    }

    addNumber() {
        const input = document.getElementById('numberInput');
        const number = parseInt(input.value);
        
        if (isNaN(number)) {
            this.showToast('Please enter a valid number', 'error');
            return;
        }

        if (this.numbers.length >= this.maxArraySize) {
            this.showToast('Maximum array size reached', 'warning');
            return;
        }

        this.numbers.push(number);
        input.value = '';
        this.updateArrayDisplays();
        this.updateStatistics();
        this.showToast(`Added ${number} to the array`, 'success');
        this.operationsCount++;
    }

    removeNumber() {
        if (this.numbers.length === 0) {
            this.showToast('Array is already empty', 'warning');
            return;
        }

        const removed = this.numbers.pop();
        this.updateArrayDisplays();
        this.updateStatistics();
        this.showToast(`Removed ${removed} from the array`, 'info');
        this.operationsCount++;
    }

    clearNumbers() {
        if (this.numbers.length === 0) {
            this.showToast('Array is already empty', 'info');
            return;
        }

        this.numbers = [];
        this.updateArrayDisplays();
        this.updateStatistics();
        this.showToast('Cleared numbers array', 'info');
        this.operationsCount++;
    }

    sortNumbers() {
        if (this.numbers.length <= 1) {
            this.showToast('Array needs more items to sort', 'warning');
            return;
        }

        this.numbers.sort((a, b) => a - b);
        this.updateArrayDisplays();
        this.updateStatistics();
        this.showToast('Sorted numbers array', 'success');
        this.operationsCount++;
    }

    shuffleNumbers() {
        if (this.numbers.length <= 1) {
            this.showToast('Array needs more items to shuffle', 'warning');
            return;
        }

        for (let i = this.numbers.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.numbers[i], this.numbers[j]] = [this.numbers[j], this.numbers[i]];
        }
        
        this.updateArrayDisplays();
        this.updateStatistics();
        this.showToast('Shuffled numbers array', 'success');
        this.operationsCount++;
    }

    // UI Update Methods
    updateArrayDisplays() {
        this.updateFruitDisplay();
        this.updateNumberDisplay();
    }

    updateFruitDisplay() {
        const display = document.getElementById('fruitArray');
        if (!display) return;

        display.innerHTML = this.fruits.length > 0 
            ? this.fruits.map(fruit => `<span class="array-item">${fruit}</span>`).join('')
            : '<span class="empty-state">Array is empty</span>';
    }

    updateNumberDisplay() {
        const display = document.getElementById('numberArray');
        if (!display) return;

        display.innerHTML = this.numbers.length > 0
            ? this.numbers.map(num => `<span class="array-item">${num}</span>`).join('')
            : '<span class="empty-state">Array is empty</span>';

        this.updateBarChart();
    }

    updateBarChart() {
        const chart = document.getElementById('barChart');
        if (!chart) return;

        const maxNumber = Math.max(...this.numbers, 1);
        chart.innerHTML = this.numbers.map(num => {
            const height = (num / maxNumber) * 100;
            return `
                <div class="bar-wrapper">
                    <div class="bar" style="height: ${height}%">
                        <span class="bar-label">${num}</span>
                    </div>
                </div>`;
        }).join('');
    }

    updateStatistics() {
        const stats = {
            fruitsCount: document.getElementById('fruitsCount'),
            numbersCount: document.getElementById('numbersCount'),
            totalOperations: document.getElementById('totalOperations')
        };

        if (stats.fruitsCount) stats.fruitsCount.textContent = this.fruits.length;
        if (stats.numbersCount) stats.numbersCount.textContent = this.numbers.length;
        if (stats.totalOperations) stats.totalOperations.textContent = this.operationsCount;
    }

    // UI Navigation Methods
    switchTab(event) {
        const targetId = event.target.dataset.target;
        if (!targetId) return;

        // Update active tab
        document.querySelectorAll('.nav-btn').forEach(tab => {
            tab.classList.remove('active');
        });
        event.target.classList.add('active');

        // Show target section
        document.querySelectorAll('.demo-section').forEach(section => {
            section.classList.remove('active');
        });
        document.getElementById(targetId).classList.add('active');
    }

    toggleInfoPanel(event) {
        const targetId = event.target.dataset.target;
        if (!targetId) return;

        const panel = document.getElementById(targetId);
        if (panel) {
            panel.classList.toggle('active');
        }
    }

    // Utility Methods
    showToast(message, type = 'info') {
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.innerHTML = `
            <i class="fas fa-${this.getToastIcon(type)}"></i>
            <span>${message}</span>
        `;

        document.body.appendChild(toast);
        setTimeout(() => toast.classList.add('show'), 100);
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    }

    getToastIcon(type) {
        const icons = {
            success: 'check-circle',
            error: 'exclamation-circle',
            warning: 'exclamation-triangle',
            info: 'info-circle'
        };
        return icons[type] || icons.info;
    }
}

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    window.arrayManipulator = new ArrayManipulator();
});
