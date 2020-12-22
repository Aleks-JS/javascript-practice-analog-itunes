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

  const addZero = (n) => (n < 10 ? '0' + n : n);

  videoPlayer.addEventListener('click', togglePlay);
  btnPlay.addEventListener('click', togglePlay);

  videoPlayer.addEventListener('play', toggleIcon);
  videoPlayer.addEventListener('pause', toggleIcon);

  btnStop.addEventListener('click', stopPlay);

  videoPlayer.addEventListener('timeupdate', () => {
    const currentTime = videoPlayer.currentTime;
    const duration = videoPlayer.duration;

    let minutePassed = Math.floor(currentTime / 60);
    let secondsPassed = Math.floor(currentTime % 60);

    let minuteTotal = Math.floor(duration / 60);
    let secondsTotal = Math.floor(duration % 60);

    timePassed.textContent = `${addZero(minutePassed)}:${addZero(
      secondsPassed
    )}`;
  });
};
