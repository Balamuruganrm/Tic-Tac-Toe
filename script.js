const cells = document.querySelectorAll('.cell');
const statusTxt = document.getElementById('status');
const restartBtn = document.getElementById('restart');

let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

cells.forEach(cell => {
    cell.addEventListener('click', handleCellClick);
});

function handleCellClick() {
    const index = parseInt(this.getAttribute('data-index'));

    if (gameBoard[index] !== '' || !gameActive) return;

    updateBoard(index, currentPlayer);

    if (checkWin() || checkDraw()) {
        gameActive = false;
        statusTxt.textContent = checkWin() ? `Player ${currentPlayer} wins!` : 'It\'s a draw!';
        return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    statusTxt.textContent = currentPlayer === 'X' ? `Player X's Turn` : 'Computer is thinking...';
    
    if (currentPlayer === 'O') {
        setTimeout(makeComputerMove, 500);
    }
}

function updateBoard(index, player) {
    gameBoard[index] = player;
    cells[index].textContent = player;
}

function makeComputerMove() {
    let index;
    do {
        index = Math.floor(Math.random() * 9);
    } while (gameBoard[index] !== '');
    
    updateBoard(index, 'O');

    if (checkWin() || checkDraw()) {
        gameActive = false;
        statusTxt.textContent = checkWin() ? 'Computer wins!' : 'It\'s a draw!';
        return;
    }

    currentPlayer = 'X';
    statusTxt.textContent = `Player ${currentPlayer}'s Turn`;
}

function checkWin() {
    const winPatterns = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    return winPatterns.some(pattern => {
        const [a, b, c] = pattern;
        return gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c];
    });
}

function checkDraw() {
    return gameBoard.every(cell => cell !== '');
}

function restartGame() {
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    gameActive = true;
    statusTxt.textContent = `Player ${currentPlayer}'s Turn`;
    cells.forEach(cell => {
        cell.textContent = '';
    });
}

restartBtn.addEventListener('click', restartGame);
