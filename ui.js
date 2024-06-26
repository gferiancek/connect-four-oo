import { Game, Player } from "./connect4.js";

/** makeHtmlBoard: make HTML table and row of column tops. */

function makeHtmlBoard() {
  const $htmlBoard = document.querySelector("#board");

  clearBoard($htmlBoard);

  // create top row of game to hold clickable cells
  const $top = document.createElement("tr");
  $top.setAttribute("id", "column-top");

  // fill top row with clickable cells
  for (let x = 0; x < currGame.width; x++) {
    const $headCell = document.createElement("td");
    $headCell.setAttribute("id", `top-${x}`);
    $headCell.addEventListener("click", handleClick);
    $top.append($headCell);
  }
  $htmlBoard.append($top);

  // dynamically creates the main part of html board
  // uses HEIGHT to create table rows
  // uses WIDTH to create table cells for each row
  for (let y = 0; y < currGame.height; y++) {
    const $row = document.createElement('tr');

    for (let x = 0; x < currGame.width; x++) {
      const $cell = document.createElement('td');
      $cell.setAttribute('id', `c-${y}-${x}`);
      $row.append($cell);
    }

    $htmlBoard.append($row);
  }
}

/** Takes HTML board and removes all elements inside of it. */

function clearBoard(board) {
  while (board.firstChild) {
    board.firstChild.remove();
  }
}


/** placeInTable: update DOM to place piece into HTML table of board */

function placeInTable(y, x) {
  const $piece = document.createElement('div');
  $piece.classList.add('piece');
  const currPlayerColor = currGame.currPlayer.playerColor;
  $piece.style.backgroundColor = currPlayerColor;

  const $spot = document.querySelector(`#c-${y}-${x}`);
  $spot.append($piece);
}


/** endGame: announce game end */

function endGame(msg) {
  alert(msg);
}


/** handleClick: handle click of column top to play piece */

function handleClick(evt) {
  if (currGame.isGameOver) return;

  // get x from ID of clicked cell
  const x = Number(evt.target.id.slice("top-".length));

  // get next spot in column (if none, ignore click)
  const y = currGame.findSpotInCol(x);
  if (y === null) {
    return;
  }

  // place piece in board and add to HTML table
  currGame.board[y][x] = currGame.currPlayer;
  placeInTable(y, x);

  // check for win
  if (currGame.checkForWin()) {
    currGame.isGameOver = true;
    return endGame(`Player ${currGame.currPlayer.playerName} won!`);
  }

  // check for tie: if top row is filled, board is filled
  if (currGame.board[0].every(cell => cell !== null)) {
    currGame.isGameOver = true;
    return endGame('Tie!');
  }

  currGame.switchCurrPlayer();
}


/** Start game. */
const $gameForm = document.getElementById("game-form");
$gameForm.addEventListener("submit", start);

let currGame;

function start(evt) {
  evt.preventDefault();

  const player1Color = document.getElementById("player-1-color").value;
  const player2Color = document.getElementById("player-2-color").value;

  const player1 = new Player(player1Color, "1");
  const player2 = new Player(player2Color, "2");

  currGame = new Game(player1, player2);

  makeHtmlBoard();
}


export { start };
