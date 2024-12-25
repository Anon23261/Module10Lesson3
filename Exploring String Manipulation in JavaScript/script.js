// Task 1: String Length
function demonstrateLength() {
    const input = document.getElementById('lengthInput').value;
    const result = input.length;
    
    // Update the visual counter with animation
    const counterElement = document.getElementById('lengthCounter');
    counterElement.textContent = result;
    counterElement.className = 'counter ' + (result > 20 ? 'long' : result > 10 ? 'medium' : 'short');
    
    // Create animated character breakdown
    const breakdown = document.getElementById('characterBreakdown');
    const chars = input.split('').map((char, index) => 
        `<span class="char" style="animation-delay: ${index * 50}ms">${char === ' ' ? '␣' : char}</span>`
    ).join('');
    breakdown.innerHTML = chars;

    // Update explanation text
    document.getElementById('lengthExplanation').textContent = 
        `The string "${input}" has ${result} characters${input.includes(' ') ? ' (including spaces)' : ''}.`;
}

// Task 2: Case Conversion
function demonstrateCases() {
    const input = document.getElementById('caseInput').value;
    const upperCase = input.toUpperCase();
    const lowerCase = input.toLowerCase();
    
    // Show transformations with animations
    const outputDiv = document.getElementById('caseOutput');
    outputDiv.innerHTML = `
        <div class="case-result">
            <div class="case-label">Original Text:</div>
            <div class="case-text">${input}</div>
        </div>
        <div class="case-result">
            <div class="case-label">Uppercase (using toUpperCase()):</div>
            <div class="case-text uppercase">${upperCase}</div>
        </div>
        <div class="case-result">
            <div class="case-label">Lowercase (using toLowerCase()):</div>
            <div class="case-text lowercase">${lowerCase}</div>
        </div>
    `;
}

// Task 3: Substring Extraction
function demonstrateSubstring() {
    const input = document.getElementById('substringInput').value;
    const start = parseInt(document.getElementById('startIndex').value) || 0;
    const end = parseInt(document.getElementById('endIndex').value) || input.length;
    
    // Validate indices
    const validStart = Math.max(0, Math.min(start, input.length));
    const validEnd = Math.max(validStart, Math.min(end, input.length));
    
    // Update input fields with validated values
    document.getElementById('startIndex').value = validStart;
    document.getElementById('endIndex').value = validEnd;
    
    const substring = input.substring(validStart, validEnd);
    
    // Create visual representation
    const chars = input.split('').map((char, index) => {
        const isInSubstring = index >= validStart && index < validEnd;
        return `<span class="char ${isInSubstring ? 'highlighted' : ''}" title="Index: ${index}">${char === ' ' ? '␣' : char}</span>`;
    }).join('');
    
    document.getElementById('substringVisual').innerHTML = chars;
    document.getElementById('substringResult').textContent = substring;
    
    // Update explanation
    document.getElementById('substringExplanation').innerHTML = `
        Extracting from index ${validStart} to ${validEnd}<br>
        Result length: ${substring.length} characters
    `;
}

// Task 4: String Splitting
function demonstrateSplit() {
    const input = document.getElementById('splitInput').value;
    const delimiter = document.getElementById('delimiterInput').value || ' ';
    const words = input.split(delimiter);
    
    // Create animated word cards with additional information
    const wordCards = words.map((word, index) => `
        <div class="word-card" style="animation-delay: ${index * 100}ms">
            <div class="word-text">${word || '<empty>'}</div>
            <div class="word-info">
                <div class="word-index">Index: ${index}</div>
                <div class="word-length">Length: ${word.length}</div>
            </div>
        </div>
    `).join('');
    
    // Update the output with detailed information
    document.getElementById('splitOutput').innerHTML = `
        <div class="split-info">
            <div>Delimiter: "${delimiter === ' ' ? 'space' : delimiter}"</div>
            <div>Total pieces: ${words.length}</div>
        </div>
        <div class="word-cards-container">
            ${wordCards}
        </div>
    `;
}

// Initialize with empty values
window.onload = function() {
    // Set initial empty values
    document.getElementById('lengthInput').value = "";
    document.getElementById('caseInput').value = "";
    document.getElementById('substringInput').value = "";
    document.getElementById('startIndex').value = "0";
    document.getElementById('endIndex').value = "5";
    document.getElementById('splitInput').value = "";
    document.getElementById('delimiterInput').value = "";
    
    // Clear all output areas
    document.getElementById('lengthCounter').textContent = "0";
    document.getElementById('characterBreakdown').innerHTML = "";
    document.getElementById('lengthExplanation').textContent = "";
    document.getElementById('caseOutput').innerHTML = "";
    document.getElementById('substringVisual').innerHTML = "";
    document.getElementById('substringResult').textContent = "";
    document.getElementById('substringExplanation').innerHTML = "";
    document.getElementById('splitOutput').innerHTML = "";
};
