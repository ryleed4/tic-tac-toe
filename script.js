const gameState = {
    playerNames: [],
    playerMarks: ['X', 'O'],
    board: [
      [null, null, null],
      [null, null, null],
      [null, null, null]
    ],
    currentPlayerIndex: 0,
    gameStatus: "playing"
}  

const board = document.querySelector(".board")
const playersDiv = document.querySelector("#players")
const playerX = document.querySelector("#player-x")
const playerO = document.querySelector("#player-o")
const form = document.querySelector("form")

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const playerName = event.target[0].value;
  gameState.playerNames.push(playerName)
  console.log(gameState);
  renderPlayers()
  event.target[0].value = ''
})

function renderPlayers() {
  playerX.innerText =`Player X: ${gameState.playerNames[0]}`
  if(gameState.playerNames[1]) {
  playerO.innerText =`Player O: ${gameState.playerNames[1]}` } 
  }

  function addPlayerMark (event) {
   // console.log(event.target)
   const row = event.target.id[0]
   const column = event.target.id[2]
   if(gameState.board[row][column] !== null){
    return
   }
   gameState.board[row][column] = gameState.playerMarks[gameState.currentPlayerIndex];
    console.log(event.target.id)
    const selectedSpace = event.target
    selectedSpace.classList.add("taken")
    const playerMark = document.createElement('p')
    playerMark.classList.add("player-mark")
    if(gameState.currentPlayerIndex === 0) {
      playerMark.classList.add('green')
    } else {
      playerMark.classList.add('orange')
    }
    playerMark.innerText = gameState.playerMarks[gameState.currentPlayerIndex];
    //console.log(gameState.board);
    //console.log(playerMark);
    selectedSpace.appendChild(playerMark);
    switchPlayers();
    checksWin(gameState.board);
    //checksTie(gameState.board);
  }

  function switchPlayers () {
    if(gameState.currentPlayerIndex === 0) {
      gameState.currentPlayerIndex = 1
    }
    else {
      gameState.currentPlayerIndex = 0
    }
  }

board.addEventListener("click", addPlayerMark)

const gameBoard = gameState.board;

function getRow (gameBoard, row) {
  return gameBoard[row];
}

function getColumn (gameBoard, column) {
  let columnArray = [];
  for(let i = 0; i < gameBoard.length; i++) {
    columnArray.push(gameBoard[i][column]);
  }
  return columnArray;
}

function getDiagonals (gameBoard) {
  let diagonals = [];
  const firstDiagonal = [gameBoard[0][0], gameBoard[1][1], gameBoard[2][2]];
  diagonals.push(firstDiagonal);
  const secondDiagonal = [gameBoard[2][0], gameBoard[1][1], gameBoard[0][2]];
  diagonals.push(secondDiagonal);
  return diagonals;
}

function checksWin (gameBoard) {
  let checks = []
  for(let i = 0; i < 3; i++) {
    checks.push(getRow(gameBoard, i))
    checks.push(getColumn(gameBoard, i))
  } 
  checks.push(getDiagonals(gameBoard)[0])
  checks.push(getDiagonals(gameBoard)[1])
  console.log(checks);
  for(let i = 0; i < checks.length; i++) {
    findsWinner(checks[i]);
 }
}

const gameEndMessageDiv = document.querySelector("#game-end-message")
const gameEndMessage = document.querySelector(".game-end-message");
const button = document.createElement('button')
button.innerText = "Play again?";
button.classList.add("button")

function findsWinner (array) {
  if (array[0] === "X" && array[1] === "X" && array[2] === "X") {
    console.log("X wins!")
    const xWinMessage = document.createElement('p');
    xWinMessage.innerText = "X wins!";
    xWinMessage.classList.add("game-end-message");
    gameEndMessageDiv.appendChild(xWinMessage);
    xWinMessage.appendChild(button);
  }
  if (array[0] === "O" && array[1] === "O" && array[2] === "O") {
    console.log("O wins!")
    const oWinMessage = document.createElement('p');
    oWinMessage.innerText = "O wins!";
    oWinMessage.classList.add("game-end-message");
    gameEndMessageDiv.appendChild(oWinMessage);
    oWinMessage.appendChild(button);
  } else {
    return
  }
}
// for let check of checks 
function checksTie (gameBoard) {
  // let rows = []
  // for(let i = 0; i < gameBoard.length; i++) {
  //   rows.push(getRow(gameBoard, i)) 
  //   for(let row of rows) {
  //  if( row[0] !== null && row[1] !== null && row[2] !== null) {
  //       console.log("It's a tie") }
        // const tieMessage = document.createElement('p')
        // tieMessage.innerText = "It's a tie"
        // tieMessage.classList.add("game-end-message");
   }
     // }
     // }

function resetBoard (event) {
  gameState.board = [
    [null, null, null]
    [null, null, null]
    [null, null, null]]
}

button.addEventListener("click", resetBoard )