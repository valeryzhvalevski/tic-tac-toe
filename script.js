const board = document.querySelector('.board');
const cells = document.querySelectorAll('.cell');
const playerTurn = document.querySelector('.player-turn');
const gameOver = document.querySelector('.game-over');
const restartButton = document.querySelector('.restart');

let currentPlayer = 'X';
let gameActive = true;
let gameState = ['', '', '', '', '', '', '', '', ''];

// функция для обновления статуса игры
function handleResultValidation() {
    const winningConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    let roundWon = false;
    for (let i = 0; i < winningConditions.length; i++) {
        const winCondition = winningConditions[i];
        const a = gameState[winCondition[0]];
        const b = gameState[winCondition[1]];
        const c = gameState[winCondition[2]];
        if (a === '' || b === '' || c === '') {
            continue;
        }
        if (a === b && b === c) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        gameOver.textContent = `Игра окончена. Победил игрок ${currentPlayer}!`;
        gameActive = false;
        return;
    }

    let roundDraw = !gameState.includes('');
    if (roundDraw) {
        gameOver.textContent = 'Игра окончена. Ничья!';
        gameActive = false;
        return;
    }

    // обновление статуса игрока
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    playerTurn.textContent = `Ход игрока ${currentPlayer}`;
}

// функция для обработки хода игрока
function handleCellClick(e) {
    const cell = e.target;
    const cellIndex = [...cells].indexOf(cell);

    // проверка на возможность хода
    if (gameState[cellIndex] !== '' || !gameActive) {
        return;
    }

    // обновление состояния игры
    gameState[cellIndex] = currentPlayer;
    cell.textContent = currentPlayer;
    cell.classList.add(`player-${currentPlayer}`);

    // обновление статуса игры
    handleResultValidation();
}

// функция для перезапуска игры
function handleRestartClick() {
    currentPlayer = 'X';
    gameActive = true;
    gameState = ['', '', '', '', '', '', '', '', ''];
    playerTurn.textContent = `Ход игрока ${currentPlayer}`;
    gameOver.textContent = '';
    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('player-X');
        cell.classList.remove('player-O');
    });
}

// добавление слушателей событий
cells.forEach(cell => {
    cell.addEventListener('click', handleCellClick);
});

restartButton.addEventListener('click', handleRestartClick);
playerTurn.textContent = `Ход игрока ${currentPlayer}`;
