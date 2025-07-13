const board = document.getElementById('game-board');
const restartBtn = document.getElementById('restart');

let icons = ['🍎', '🍌', '🍇', '🍒', '🍉', '🍋', '🍑', '🍍'];
let cards = [];
let flippedCards = [];
let lockBoard = false;

function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

function createBoard() {
  board.innerHTML = '';
  const gameIcons = shuffle([...icons, ...icons]);
  cards = [];

  for (let i = 0; i < 16; i++) {
    const card = document.createElement('div');
    card.className = 'card';
    card.dataset.icon = gameIcons[i];
    card.textContent = '';
    card.addEventListener('click', flipCard);
    board.appendChild(card);
    cards.push(card);
  }
}

function flipCard(e) {
  const card = e.currentTarget;
  if (lockBoard || card.classList.contains('flipped') || card.classList.contains('matched')) return;

  card.classList.add('flipped');
  card.textContent = card.dataset.icon;
  flippedCards.push(card);

  if (flippedCards.length === 2) {
    lockBoard = true;
    setTimeout(checkMatch, 700);
  }
}

function checkMatch() {
  const [card1, card2] = flippedCards;
  if (card1.dataset.icon === card2.dataset.icon) {
    card1.classList.add('matched');
    card2.classList.add('matched');
  } else {
    card1.classList.remove('flipped');
    card2.classList.remove('flipped');
    card1.textContent = '';
    card2.textContent = '';
  }
  flippedCards = [];
  lockBoard = false;

  if (cards.every(card => card.classList.contains('matched'))) {
    setTimeout(() => alert('축하합니다! 모두 맞췄어요!'), 300);
  }
}

restartBtn.addEventListener('click', createBoard);

createBoard();