import { addZero } from './supportScript.js';

export const musicPlayerInit = () => {
  /* variables */
  const audio = document.querySelector('.audio');
  const audioImg = document.querySelector('.audio-img');
  const audioHeader = document.querySelector('.audio-header');
  const audioPlayer = document.querySelector('.audio-player');
  const audioNavigation = document.querySelector('.audio-navigation');
  const audioButtonPlay = document.querySelector('.audio-button__play');
  const audioTimePassed = document.querySelector('.audio-time__passed');
  const audioProgress = document.querySelector('.audio-progress');
  const audioProgressTiming = document.querySelector('.audio-progress__timing');
  const audioTimeTotal = document.querySelector('.audio-time__total');
  const audioMain = document.querySelector('.audio-container');

  const playlist = ['hello', 'flow', 'speed'];

  let trackIndex = 0;

  const loadTrack = () => {
    const isPlayed = audioPlayer.paused;
    const track = playlist[trackIndex];
    audioImg.src = `./audio/${track}.jpg`;
    audioHeader.textContent = track.toUpperCase();
    audioPlayer.src = `./audio/${track}.mp3`;

    // проверка воспроизведения музыки на момент переключения трэка
    isPlayed ? audioPlayer.pause() : audioPlayer.play();
  };

  const nextTrack = () => {
    const lastTrack = playlist.length - 1;
    trackIndex !== lastTrack ? trackIndex++ : (trackIndex = 0);
    loadTrack();
  };

  const prevTrack = () => {
    const lastTrack = playlist.length - 1;
    trackIndex !== 0 ? trackIndex-- : (trackIndex = lastTrack);
    loadTrack();
  };

  const renderControlButtons = () => {
    audio.classList.toggle('play');
    audioButtonPlay.classList.toggle('fa-play');
    audioButtonPlay.classList.toggle('fa-pause');

    audioPlayer.paused ? audioPlayer.play() : audioPlayer.pause();
  };

  audioNavigation.addEventListener('click', (e) => {
    const target = e.target;

    if (target.classList.contains('audio-button__play')) {
      renderControlButtons();
    }

    if (target.classList.contains('audio-button__next')) {
      nextTrack();
    }

    if (target.classList.contains('audio-button__prev')) {
      prevTrack();
    }

    // Обновление обложки и названия трэка при переключении
    const track = playlist[trackIndex];
    audioImg.src = `./audio/${track}.jpg`;
    audioHeader.textContent = track.toUpperCase();
  });

  // переключение трэка на следующий при окончании текущего
  audioPlayer.addEventListener('ended', () => {
    nextTrack();
    audioPlayer.play();
  });

  audioPlayer.addEventListener('timeupdate', () => {
    const currentTime = audioPlayer.currentTime;
    const duration = audioPlayer.duration;

    const progress = (currentTime / duration) * 100;

    audioProgressTiming.style.width = `${progress}%`;

    const minutePassed = Math.floor(currentTime / 60) || '0';
    const secondsPassed = Math.floor(currentTime % 60) || '0';

    const minuteTotal = Math.floor(duration / 60) || '0';
    const secondsTotal = Math.floor(duration % 60) || '0';

    audioTimePassed.textContent = `${addZero(minutePassed)}:${addZero(
      secondsPassed
    )}`;

    audioTimeTotal.textContent = `${addZero(minuteTotal)}:${addZero(
      secondsTotal
    )}`;
  });

  // перемотка трэка по клику на прогресс-бар
  audioProgress.addEventListener('click', (e) => {
    const x = e.offsetX;
    const allWidth = audioProgress.clientWidth;
    const progress = (x / allWidth) * audioPlayer.duration;

    audioPlayer.currentTime = progress;
  });

  // старт/стоп воспроизведения трека по нажатию на название или ковер трека
  audioMain.addEventListener('click', () => {
    renderControlButtons();
  });
};
