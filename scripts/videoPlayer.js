export const videoPlayerInit = () => {
  /* variables */
  const videoPlayer = document.querySelector('.video-player');
  const btnPlay = document.querySelector('.video-button__play');
  const btnStop = document.querySelector('.video-button__stop');
  const timePassed = document.querySelector('.video-time__passed');
  const progress = document.querySelector('.progress');
  const timeTotal = document.querySelector('.video-time__total');

  const toggleIcon = () => {
    if (videoPlayer.paused) {
      btnPlay.classList.remove('fa-pause');
      btnPlay.classList.add('fa-play');
    } else {
      btnPlay.classList.remove('fa-play');
      btnPlay.classList.add('fa-pause');
    }
  };

  const togglePlay = () => {
    videoPlayer.paused ? videoPlayer.play() : videoPlayer.pause();
  };

  const stopPlay = () => {
    videoPlayer.pause();
    videoPlayer.currentTime = 0;
  };

  videoPlayer.addEventListener('click', togglePlay);
  btnPlay.addEventListener('click', togglePlay);

  videoPlayer.addEventListener('play', toggleIcon);
  videoPlayer.addEventListener('pause', toggleIcon);

  btnStop.addEventListener('click', stopPlay);
};
