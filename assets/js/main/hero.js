const gameButtons = document.querySelectorAll('.btn-game');
const nextBtn = document.getElementById('next-btn');
const prevBtn = document.getElementById('prev-btn');

let currentIndex = 0;
let previndex = 0;

nextBtn.addEventListener('click', () => {
  if (currentIndex < gameButtons.length - 1) {
    currentIndex++;
    gameButtons[currentIndex - 1].style.display = 'none';
    gameButtons[currentIndex].style.display = 'flex';
  }
  else if(currentIndex = 2){
    currentIndex = 0;
    gameButtons[currentIndex].style.display = 'flex';
    gameButtons[currentIndex + 2].style.display = 'none';
  }
});

prevBtn.addEventListener('click', () => {
  if (currentIndex > 0) {
    currentIndex--;
    gameButtons[currentIndex + 1].style.display = 'none';
    gameButtons[currentIndex].style.display = 'flex';
  }
  else if(currentIndex = 1){
    currentIndex = 2;
    gameButtons[currentIndex].style.display = 'flex';
    gameButtons[currentIndex - 2].style.display = 'none';
  }
});

for (let i = 1; i < gameButtons.length; i++) {
    gameButtons[i].style.display = 'none';
}


const mediaQuery = window.matchMedia('(max-width: 768px)');

function handleMediaQueryChange() {
  if (mediaQuery.matches) {
    // Hide game tables
    gameButtons.forEach(cell => {
      //cell.style.display = 'none';
      gameButtons[0].style.display = 'flex';
      gameButtons[1].style.display = 'none';
      gameButtons[2].style.display = 'none';
    });
  } else {
    // Show first game table
    gameButtons[0].style.display = 'flex';
    gameButtons[1].style.display = 'flex';
    gameButtons[2].style.display = 'flex';
  }
}

// Call once to handle initial state
handleMediaQueryChange();

// Add listener to handle changes
mediaQuery.addListener(handleMediaQueryChange);