import { MediaSetting } from './supportScript.js';

export const musicPlayerInit = () => {
  /* variables */
  const playerButtons = document.querySelectorAll('.player-btn');
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
  const audioVolume = document.querySelector('.audio-volume');
  const visualization = document.querySelector('.visualization');
  const CURRENT_TAB = 'audio-video';
  const mediaSetting = new MediaSetting();

  const playlist = ['hello', 'flow', 'speed'];

  /************************************************************************** */
  /* canvas */
  const canvas = document.querySelector('.visualization canvas');
  // set size canvas
  // canvas.setAttribute('width', visualization.offsetWidth);
  // canvas.setAttribute('height', visualization.offsetHeight);

  const ctx = canvas.getContext('2d');
  const audioCtx = window.AudioContext || window.webkitAudioContext;
  const audioContext = new audioCtx();

  const draw = () => {
    ctx.canvas.width = visualization.clientWidth;
    ctx.canvas.height = visualization.clientHeight;
    console.log('draw', visualization.offsetWidth, visualization.offsetHeight);
  };

  window.addEventListener('resize', draw);

  const buildAudioGraph = () => {
    audioPlayer.onplay = (e) => audioContext.resume();
  };

  // исправлено для политики автозапуска
  audioPlayer.addEventListener('play', () => audioContext.resume());

  const sourceNode = audioContext.createMediaElementSource(audioPlayer);

  // Создать узел анализатора
  const analyser = audioContext.createAnalyser();
  analyser.fftSize = 512;
  const bufferLength = analyser.frequencyBinCount;
  const dataArray = new Uint8Array(bufferLength);
  sourceNode.connect(analyser);
  // после этой строки звук снова появляется
  analyser.connect(audioContext.destination);

  const visualize = () => {
    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;
    // очистить canvas
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    // Или используйте заливку RGBA, чтобы получить небольшой эффект размытия
    // ctx.fillStyle = 'rgba (0, 0, 0, 0.5)';
    // ctx.fillRect(0, 0, canvasWidth, canvasHeight);

    // Получить данные анализатора
    analyser.getByteFrequencyData(dataArray);

    const barWidth = canvasWidth / bufferLength;
    let x = 0;

    // значения изменяются от 0 до 256, а высота холста равна 100. Давайте изменим масштаб
    // перед отрисовкой. Это масштабный коэффициент
    const heightScale = canvasHeight / 128;

    for (var i = 0; i < bufferLength; i++) {
      let barHeight = dataArray[i];

      ctx.fillStyle = 'rgb(' + (barHeight + 0) + ',4,160)';
      barHeight *= heightScale;
      ctx.fillRect(x, canvasHeight - barHeight / 2, barWidth, barHeight / 2);

      // 2 - количество пикселей между столбцами
      x += barWidth + 2;
    }
    // вызовите снова функцию визуализации со скоростью 60 кадров / с
    requestAnimationFrame(visualize);
  };
  requestAnimationFrame(visualize);
  buildAudioGraph();
  /************************************************************************** */
  let trackIndex = 0;

  mediaSetting.volumeControl(audioPlayer, audioVolume);

  playerButtons.forEach((btn) =>
    btn.addEventListener('click', (e) => {
      if (audio.classList.contains('play')) {
        e.target.className !== CURRENT_TAB && audioPlayer.pause();
        audio.classList.toggle('play');
        audioButtonPlay.classList.toggle('fa-play');
        audioButtonPlay.classList.toggle('fa-pause');
      }
    })
  );

  const loadTrack = () => {
    const isPlayed = audioPlayer.paused;
    const track = playlist[trackIndex];
    audioImg.src = `./audio/${track}.jpg`;
    audioHeader.textContent = track.toUpperCase();
    audioPlayer.src = `./audio/${track}.mp3`;

    // проверка воспроизведения музыки на момент переключения трека
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

  const timeUpdate = () => {
    const currentTime = audioPlayer.currentTime;
    const duration = audioPlayer.duration;
    const progress = (currentTime / duration) * 100;

    // для firefox ставим проверку для того, чтоб обнулялся прогресс-бар при переключение трека на паузе
    audioProgressTiming.style.width = (currentTime && `${progress}%`) || '0';

    const minutePassed = Math.floor(currentTime / 60) || '0';
    const secondsPassed = Math.floor(currentTime % 60) || '0';

    const minuteTotal = Math.floor(duration / 60) || '0';
    const secondsTotal = Math.floor(duration % 60) || '0';

    audioTimePassed.textContent = `${mediaSetting.addZero(
      minutePassed
    )}:${mediaSetting.addZero(secondsPassed)}`;

    audioTimeTotal.textContent = `${mediaSetting.addZero(
      minuteTotal
    )}:${mediaSetting.addZero(secondsTotal)}`;
  };

  audioVolume.addEventListener('input', () => {
    mediaSetting.volumeControl(audioPlayer, audioVolume);
  });

  audioNavigation.addEventListener('click', (e) => {
    const target = e.target;
    console.log('click');
    draw();

    if (target.classList.contains('audio-button__play')) {
      renderControlButtons();
    }

    if (target.classList.contains('audio-button__next')) {
      nextTrack();
    }

    if (target.classList.contains('audio-button__prev')) {
      prevTrack();
    }

    // Обновление обложки и названия трека при переключении
    const track = playlist[trackIndex];
    audioImg.src = `./audio/${track}.jpg`;
    audioHeader.textContent = track.toUpperCase();
  });

  // переключение трека на следующий при окончании текущего
  audioPlayer.addEventListener('ended', () => {
    nextTrack();
    audioPlayer.play();
  });

  audioPlayer.addEventListener('timeupdate', timeUpdate);

  // перемотка трека по клику на прогресс-бар
  audioProgress.addEventListener('click', (e) => {
    const x = e.offsetX;
    const allWidth = audioProgress.clientWidth;
    const progress = (x / allWidth) * audioPlayer.duration;

    audioPlayer.currentTime = progress;
  });

  // старт/стоп воспроизведения трека по нажатию на название или ковер трека
  audioMain.addEventListener('click', () => {
    draw();
    renderControlButtons();
  });
};
