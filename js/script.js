const boxes = Array.from(document.querySelectorAll('.box'));
let turn = 'X';
let history = [];

function mark(box) {
  if (box.textContent.trim() == '') {
    box.textContent = turn;
    switchTurn();
    history.push(boxes.indexOf(box));
  }
}

function clear(box) {
  box.textContent = '';
}

function switchTurn() {
  turn = turn == 'X' ? 'O' : 'X';
}

function startOver() {
  for (const box of boxes) {
    box.textContent = '';
  }
  history = [];
  turn = 'X';
}

function checkForTie() {
  if (history.length == 9) {
    alert('X and O Tied!');
    startOver();
  }
}

function checkIfSomebodyWon() {
  const possibleWins = [
    // horizontal
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    
    // vertical
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    
    // diagonal
    [0, 4, 8],
    [2, 4, 6],
  ];
  
  for (const combo of possibleWins) {
    const comboMarks = combo.map(idx => boxes[idx].textContent.trim()).join('');
    if (comboMarks == 'XXX') {
      alert('Player X won!');
      startOver();
    } else if (comboMarks == 'OOO') {
      alert('Player O won!');
      startOver();
    }
  }
}

for (const box of boxes) {
  box.addEventListener('click', evt => {
    mark(evt.target);
    requestAnimationFrame(() => {
      checkIfSomebodyWon();
      checkForTie();
    });
  });
}

document.querySelector('.startOverButton').addEventListener('click', evt => {
  startOver();
});
