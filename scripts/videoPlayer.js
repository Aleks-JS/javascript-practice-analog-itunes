import { addZero } from './supportScript.js';

export const videoPlayerInit = () => {
  /* variables */
  const videoPlayer = document.querySelector('.video-player');
  const btnPlay = document.querySelector('.video-button__play');
  const btnStop = document.querySelector('.video-button__stop');
  const timePassed = document.querySelector('.video-time__passed');
  const progress = document.querySelector('.video-progress');
  const timeTotal = document.querySelector('.video-time__total');
  const volume = document.querySelector('.video-volume');
  const buttonFullscreen = document.querySelector('.fullscreen-button');
  const btnVolumeOff = document.querySelector('.volume-off');
  const btnVolumeUp = document.querySelector('.volume-up');

  videoPlayer.addEventListener('fullscreenchange', () => {
    document.fullscreen
      ? (videoPlayer.controls = true)
      : (videoPlayer.controls = false);
  });

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

  const changeCurrentPlayingTime = () => {
    const duration = videoPlayer.duration;
    const value = progress.value;
    videoPlayer.currentTime = (value * duration) / 100;
  };

  const volumeControl = () => (videoPlayer.volume = volume.value / 100);

  volumeControl();

  videoPlayer.addEventListener('click', togglePlay);
  btnPlay.addEventListener('click', togglePlay);

  videoPlayer.addEventListener('play', toggleIcon);
  videoPlayer.addEventListener('pause', toggleIcon);

  btnStop.addEventListener('click', stopPlay);

  btnVolumeOff.addEventListener('click', () => {
    volume.value = videoPlayer.volume = 0;
  });

  btnVolumeUp.addEventListener('click', () => {
    videoPlayer.volume = 1;
    volume.value = 100;
  });

  videoPlayer.addEventListener('timeupdate', () => {
    const currentTime = videoPlayer.currentTime;
    const duration = videoPlayer.duration;

    progress.value = (currentTime / duration) * 100;

    let minutePassed = Math.floor(currentTime / 60);
    let secondsPassed = Math.floor(currentTime % 60);

    let minuteTotal = Math.floor(duration / 60);
    let secondsTotal = Math.floor(duration % 60);

    timePassed.textContent = `${addZero(minutePassed)}:${addZero(
      secondsPassed
    )}`;

    timeTotal.textContent = `${addZero(minuteTotal)}:${addZero(secondsTotal)}`;
  });

  volume.addEventListener('input', () => volumeControl());

  progress.addEventListener('input', changeCurrentPlayingTime);

  // fullscreen mode
  buttonFullscreen.addEventListener('click', () => {
    if (videoPlayer.requestFullscreen) {
      videoPlayer.requestFullscreen();
    } else if (videoPlayer.mozRequestFullScreen) {
      videoPlayer.mozRequestFullScreen();
    } else if (videoPlayer.webkitRequestFullscreen) {
      videoPlayer.webkitRequestFullscreen();
    } else if (videoPlayer.msRequestFullscreen) {
      videoPlayer.msRequestFullscreen();
    }
  });
};
