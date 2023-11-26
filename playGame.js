const { ticTacToe } = require("./game");

let play = ticTacToe("Fedora", "Dishant");

const printBoard = (board) => {
  console.log(`------${board[0]}------`);
  for (let i = 1; i <= 7; i += 3) {
    console.log(
      `${board[i] || i} | ${board[i + 1] || i + 1} | ${board[i + 2] || i + 2}`
    );
    if (i < 7) {
      console.log("-----------");
    }
  }
};

function ticBot(empty) {
  let move = Math.floor(Math.random() * empty.length);
  // console.log(move);
  return empty[move];
}

function findEmpty(board) {
  let arr = [];
  for (let i = 1; i <= 9; i++) {
    if (board[i] == "") {
      arr.push(i);
    }
  }
  return arr;
}

let boardorMessage, result, currentPlayer;

[result, boardorMessage, currentPlayer] = play("X", 1);

//
while (true) {
  let empty = [];
  if (result) {
    empty = findEmpty(boardorMessage);
    // console.log(boardorMessage[0]);
    if (!(boardorMessage[0] == "ongoing")) {
      break;
    }
    [result, boardorMessage, currentPlayer] = play(
      currentPlayer,
      ticBot(empty)
    );
  } else {
    console.log(boardorMessage);
    break;
  }
}
printBoard(boardorMessage);
// if (result) {
//   printBoard(boardorMessage);
// } else {
//   console.log(boardorMessage);
// }
