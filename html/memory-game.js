const memoryBoard = document.getElementById('memory-board');
const memoryResult = document.getElementById('memory-result');
const cards = ['🍎', '🍎', '🍌', '🍌', '🍇', '🍇', '🍒', '🍒'];
let flippedCards = [];

function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
}

function setupMemoryGame() {
    memoryBoard.innerHTML = '';
    memoryResult.textContent = '';
    const shuffledCards = shuffle([...cards]);
    shuffledCards.forEach((card, index) => {
        const cardElement = document.createElement('div');
        cardElement.textContent = '?';
        cardElement.dataset.card = card;
        cardElement.dataset.index = index;
        cardElement.addEventListener('click', () => flipCard(cardElement));
        memoryBoard.appendChild(cardElement);
    });
}

function flipCard(cardElement) {
    if (flippedCards.length < 2 && !cardElement.classList.contains('flipped')) {
        cardElement.textContent = cardElement.dataset.card;
        cardElement.classList.add('flipped');
        flippedCards.push(cardElement);

        if (flippedCards.length === 2) {
            checkMatch();
        }
    }
}

function checkMatch() {
    const [first, second] = flippedCards;
    if (first.dataset.card === second.dataset.card) {
        memoryResult.textContent = 'Match Found!';
        flippedCards = [];
    } else {
        setTimeout(() => {
            first.textContent = '?';
            second.textContent = '?';
            first.classList.remove('flipped');
            second.classList.remove('flipped');
            flippedCards = [];
        }, 1000);
    }
}

function resetMemoryGame() {
    setupMemoryGame();
}

setupMemoryGame();
