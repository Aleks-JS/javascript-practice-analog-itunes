import { radioPlayerInit } from './radioPlayer.js';
import { videoPlayerInit } from './videoPlayer.js';
import { musicPlayerInit } from './musicPlayer.js';

/* variables */
const playerButtons = document.querySelectorAll('.player-btn');
const playerBlocks = document.querySelectorAll('.player-block');

const deactivationPlayer = () => {
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

radioPlayerInit();
videoPlayerInit();
musicPlayerInit();
