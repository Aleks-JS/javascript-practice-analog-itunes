import { radioPlayerInit } from './radioPlayer.js';
import { videoPlayerInit } from './videoPlayer.js';
import { musicPlayerInit } from './musicPlayer.js';

/* variables */
const playerButtons = document.querySelectorAll('.player-btn');
const playerBlocks = document.querySelectorAll('.player-block');
const temp = document.querySelector('.temp');

const deactivationPlayer = () => {
  temp.style.display = 'none';
  playerButtons.forEach((item) => item.classList.remove('active'));
  playerBlocks.forEach((item) => item.classList.remove('active'));
};

playerButtons.forEach((btn, index) =>
  btn.addEventListener('click', () => {
    deactivationPlayer();
    btn.classList.add('active');
    playerBlocks[index].classList.add('active');
  })
);

videoPlayerInit();
radioPlayerInit();
musicPlayerInit();
