const ticTacToe = (xName, oName) => {
  const X = "X"; //:snake
  const O = "O";
  let currentPlayer = "X";
  // console.log(xName);

  const players = {
    X: xName,
    O: oName,
  };

  // lookUp Table nextPlayer[currplayer] (Object hai yeh)
  const nextPlayer = {
    X: "O",
    O: "X",
  };

  const board = [
    // "Ongoing",
    // "", "", "",
    // "", "", "",
    // "", "", "",
  ];

  for (let i = 1; i <= 9; i++) {
    board[i] = "";
  }

  function isValidmove(move) {
    return 1 <= move && move <= 9 && board[move] === "";
  }

  function computeStatus() {
    let result = "ongoing"; // this represent the status of game : ongoing , win-x , win-O , draw

    //   console.log(winningCombos)

    /* let winningCombos =[
            [ 1, 2, 3 ],
            [ 4, 5, 6 ],
            [ 7, 8, 9 ],
            [ 1, 4, 7 ],
            [ 2, 5, 8 ],
            [ 3, 6, 9 ],
            [ 1, 5, 9 ],
            [ 3, 5, 7 ]
          ]; */

    const generateCombos = (n) => {
      let res = [];

      let grid = [];
      let v = 1;

      if (n == 1) {
        let arr = [1];
        res.push(arr);
        return res;
      }

      // Create a 2D grid and populate it with values from 1 to n^2
      for (let i = 0; i < n; i++) {
        grid[i] = [];
        for (let j = 0; j < n; j++) {
          grid[i][j] = v++;
        }
      }

      // Push each row to the result
      for (let i = 0; i < n; i++) {
        res.push(grid[i]);
      }

      // Push each column to the result
      for (let i = 0; i < n; i++) {
        let cols = [];
        for (let j = 0; j < n; j++) {
          cols.push(grid[j][i]);
        }
        res.push(cols);
      }

      // Push the main diagonal to the result
      let diagonal = [];
      for (let i = 0; i < n; i++) {
        diagonal.push(grid[i][i]);
        // console.log(diagonal);
      }

      res.push(diagonal);

      // Push the back diagonal to the result
      let backDiagonal = [];
      for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
          if (i + j === n - 1) {
            backDiagonal.push(grid[i][j]);
          }
        }
      }
      res.push(backDiagonal);

      //   console.log(res)

      return res;
    };
    // console.log(res)
    // Checking X or O wins
    let winningCombos = generateCombos(3);

    let x, flag;
    winningCombos.forEach(([i1, i2, i3]) => {
      if (
        board[i1] === board[i2] &&
        board[i2] === board[i3] &&
        board[i3] === currentPlayer
      ) {
        // console.log(`win -${currentPlayer}`);
        flag = 1;
        x = `win - ${currentPlayer}`;
      }
    });
    if (flag === 1) return x;

    // Checking for Draw ( MY OWN METHOD)
    //   let areAllPositionTaken = false;
    //   let m = 1;
    //   for(let i=1 ; i<=9 ; i++){
    //       if(board[i]!= ""){
    //            m = m + 1;
    //            if(m == 10){
    //          areAllPositionTaken =true
    //            }
    //         }
    //     }
    //     m=1;
    // if(areAllPositionTaken){
    //     return "Draw"
    // }

    // Checking for Draw  (OPTIMIZE SOLUTION)
    let areAllPositionsTaken = true;

    for (let i = 1; i <= 9; i++) {
      if (board[i] === "") {
        areAllPositionsTaken = false;
        break; // Exit the loop as soon as a vacant position is found
      }
    }

    if (areAllPositionsTaken) {
      return "Draw";
    }

    return result;
  }

  return (player, move) => {
    // validate right player n move
    console.log(`${player} plays at ${move}`);
    if (player !== currentPlayer) {
      return [false, `Not your turn ,  ${currentPlayer}'s turns now `];
    }

    if (!isValidmove(move)) {
      return [false, `Invalid move ,Try Again`];
    }

    board[move] = currentPlayer;
    board[0] = computeStatus();
    currentPlayer = nextPlayer[currentPlayer];

    return [true, board, currentPlayer];
  };
};

module.exports = { ticTacToe };
