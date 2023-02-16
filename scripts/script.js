function init() {

  const cells = document.querySelectorAll('.cell')
  const status_msg = document.querySelector('#status_msg')
  const Restart_Btn = document.querySelector('#restart')
  const Game = document.querySelector('.Game')
  let x = "<img src='images/x.png'>"
  let o = "<img src='images/o.png'>"
  let options = ["", "", "", "", "", "", "", "", ""]
  let currentPlayer = x
  let player = "X"
  let Start_Game = false

  const win = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ]


  function IndexUpdate(cell, index) {
    options[index] = player
    cell.innerHTML = currentPlayer
  }

  function ChangePlayer() {
    player = (player == 'X') ? "O" : "X"
    currentPlayer = (currentPlayer == x) ? o : x
    status_msg.textContent = `${player} Your Turn`

    if (currentPlayer == x) {
      cells.classList.add('.cursor_X_img')
    }
    else if (currentPlayer == o) {
      cells.classList.add('.cursor_O_img')
    }
  }

  function CheckWinner() {
    let IsWon = false;
    for (let i = 0; i < win.length; i++) {
      const condition = win[i];
      const cell1 = options[condition[0]];
      const cell2 = options[condition[1]];
      const cell3 = options[condition[2]];
      if (cell1 == "" || cell2 == "" || cell3 == "") {
        continue;
      }
      if (cell1 == cell2 && cell2 == cell3) {
        IsWon = true;
        cells[condition[0]].classList.add('win_background');
        cells[condition[1]].classList.add('win_background');
        cells[condition[2]].classList.add('win_background');
      }
    }

    if (IsWon) {
      status_msg.textContent = `${player} is Won`
      Start_Game = false;
    } else if (!options.includes("")) {
      status_msg.textContent = `Play Again !`
      Start_Game = false
    } else {
      ChangePlayer()
    }

  }

  function IndexClick() {
    const index = this.dataset.index
    if (options[index] != "" || !Start_Game) {
      return;
    }
    IndexUpdate(this, index);
    CheckWinner();
  }

  function RestartGame() {
    options = ["", "", "", "", "", "", "", "", ""]
    currentPlayer = x
    player = "X"
    Start_Game = true
    status_msg.textContent = `${player} Your Turn`

    cells.forEach(cell => {
      cell.innerHTML = ""
      cell.classList.remove('win_background')
    })
  }

  status_msg.textContent = `${player} Your Turn`
  cells.forEach(cell => cell.addEventListener('click', IndexClick))
  Restart_Btn.addEventListener('click', RestartGame)
  Start_Game = true
}
window.addEventListener('DOMContentLoaded', init)