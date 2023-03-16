const gameState = {
  playerNames: [],
  playerMarks: ["X", "O"],
  board: [
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ],
  currentPlayerIndex: 0,
  singlePlayerMode: "off",
};

const board = document.querySelector(".board");
const playersDiv = document.querySelector("#players");
const playerX = document.querySelector("#player-x");
const playerO = document.querySelector("#player-o");
const form = document.querySelector("form");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const playerName = event.target[0].value;
  gameState.playerNames.push(playerName);
  console.log(gameState);
  renderPlayers();
  event.target[0].value = "";
});

function renderPlayers() {
  playerX.innerText = `Player X: ${gameState.playerNames[0]}`;
  if (gameState.playerNames[1]) {
    playerO.innerText = `Player O: ${gameState.playerNames[1]}`;
  }
}

function addPlayerMark(event) {
  const row = event.target.id[0];
  const column = event.target.id[2];
  if (gameState.board[row][column] !== null) {
    return;
  }
  gameState.board[row][column] =
    gameState.playerMarks[gameState.currentPlayerIndex];
  //console.log(event.target.id);
  const selectedSpace = event.target;
  selectedSpace.classList.add("taken");
  const playerMark = document.createElement("p");
  playerMark.classList.add("player-mark");
  if (gameState.currentPlayerIndex === 0) {
    playerMark.classList.add("green");
  } else {
    playerMark.classList.add("orange");
  }
  playerMark.innerText = gameState.playerMarks[gameState.currentPlayerIndex];
  //console.log(gameState.board);
  //console.log(playerMark);
  selectedSpace.appendChild(playerMark);
  switchPlayers();
  checksWin(gameState.board);
  checksTie();
}

function switchPlayers() {
  if (gameState.currentPlayerIndex === 0) {
    gameState.currentPlayerIndex = 1;
  } else {
    gameState.currentPlayerIndex = 0;
  }
}

board.addEventListener("click", addPlayerMark);

const gameBoard = gameState.board;

function getRow(gameBoard, row) {
  return gameBoard[row];
}

function getColumn(gameBoard, column) {
  let columnArray = [];
  for (let i = 0; i < gameBoard.length; i++) {
    columnArray.push(gameBoard[i][column]);
  }
  return columnArray;
}

function getDiagonals(gameBoard) {
  let diagonals = [];
  const firstDiagonal = [gameBoard[0][0], gameBoard[1][1], gameBoard[2][2]];
  diagonals.push(firstDiagonal);
  const secondDiagonal = [gameBoard[2][0], gameBoard[1][1], gameBoard[0][2]];
  diagonals.push(secondDiagonal);
  return diagonals;
}

function checksWin(gameBoard) {
  let checks = [];
  for (let i = 0; i < 3; i++) {
    checks.push(getRow(gameBoard, i));
    checks.push(getColumn(gameBoard, i));
  }
  checks.push(getDiagonals(gameBoard)[0]);
  checks.push(getDiagonals(gameBoard)[1]);
  //console.log(checks);
  for (let i = 0; i < checks.length; i++) {
    findsWinner(checks[i]);
  }
}

const gameEndMessageDiv = document.querySelector("#game-end-message");
const gameEndMessage = document.querySelector(".game-end-message");
const button = document.createElement("button");
button.innerText = "Play again?";
button.classList.add("button");

function findsWinner(array) {
  if (array[0] === "X" && array[1] === "X" && array[2] === "X") {
    const xWinMessage = document.createElement("p");
    xWinMessage.innerText = "X wins!";
    xWinMessage.classList.add("game-end-message");
    gameEndMessageDiv.appendChild(xWinMessage);
    xWinMessage.appendChild(button);
    board.removeEventListener("click", addPlayerMark)
  }
  if (array[0] === "O" && array[1] === "O" && array[2] === "O") {
    const oWinMessage = document.createElement("p");
    oWinMessage.innerText = "O wins!";
    oWinMessage.classList.add("game-end-message");
    gameEndMessageDiv.appendChild(oWinMessage);
    oWinMessage.appendChild(button);
    board.removeEventListener("click", addPlayerMark)
  } else {
    return;
  }
}

function checksTie() {
  console.log(gameState.board);
  for (let i = 0; i < gameState.board.length; i++) {
    for (let j = 0; j < gameState.board[i].length; j++) {
      const cell = gameState.board[i][j];
      if (cell === null) {
        return;
      }
    }
  }
  const tieMessage = document.createElement("p");
  tieMessage.innerText = "It's a tie!";
  tieMessage.classList.add("game-end-message");
  gameEndMessageDiv.appendChild(tieMessage);
  tieMessage.appendChild(button);
  board.removeEventListener("click", addPlayerMark)
}

function resetBoard(event) {
  gameState.board = [
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ]; 
  const cells = document.querySelectorAll(".cell");
  for(let cell of cells) {
    if(cell.hasChildNodes()) {
    cell.removeChild(cell.firstChild);
    cell.classList.remove("taken");
    }
  }
  const endMessage = document.querySelector(".game-end-message");
    endMessage.remove()
    board.addEventListener("click", addPlayerMark);
    gameState.currentPlayerIndex = 0;
}

button.addEventListener("click", resetBoard);

if(gameState.singlePlayerMode === "on") {
  singlePlayerMode()
}

function singlePlayerMode() {
  const computerName = "Computer"
  playerO.innerText = "Player O: Computer"
  if(gameState.playerNames[0]) {
    gameState.playerNames.push(computerName)} 
    if(gameState.currentPlayerIndex === 1) {
      
    }
}
const singlePlayerModeButton = document.querySelector("single-player-mode-button");
singlePlayerModeButton.addEventListener("click", (event) => {
  gameState.singlePlayerMode === "on"
})