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

  const playlist = ['hello', 'flow', 'speed'];

  let trackIndex = 0;

  const loadTrack = () => {
    const isPlayed = audioPlayer.paused;
    const track = playlist[trackIndex];
    audioImg.src = `./audio/${track}.jpg`;
    audioHeader.textContent = track.toUpperCase();
    audioPlayer.src = `./audio/${track}.mp3`;

    isPlayed ? audioPlayer.pause() : audioPlayer.play();
  };

  audioNavigation.addEventListener('click', (e) => {
    const target = e.target;
    const lastTrack = playlist.length - 1;

    if (target.classList.contains('audio-button__play')) {
      audio.classList.toggle('play');
      audioButtonPlay.classList.toggle('fa-play');
      audioButtonPlay.classList.toggle('fa-pause');

      audioPlayer.paused ? audioPlayer.play() : audioPlayer.pause();
    }

    if (target.classList.contains('audio-button__next')) {
      trackIndex !== lastTrack ? trackIndex++ : (trackIndex = 0);
      loadTrack();
    }

    if (target.classList.contains('audio-button__prev')) {
      trackIndex !== 0 ? trackIndex-- : (trackIndex = lastTrack);
      loadTrack();
    }

    const track = playlist[trackIndex];
    audioImg.src = `./audio/${track}.jpg`;
    audioHeader.textContent = track.toUpperCase();
  });
};
