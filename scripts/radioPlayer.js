export const radioPlayerInit = () => {
  /* variables */
  const radio = document.querySelector('.radio');
  const radioCoverImg = document.querySelector('.radio-cover__img');
  const radioNavigation = document.querySelector('.radio-navigation');
  const radioHeader = document.querySelector('.radio-header');
  const radioItem = document.querySelectorAll('.radio-item');
  const radioStop = document.querySelector('.radio-stop');

  const audio = new Audio();
  audio.type = 'audio/aac';

  radioStop.disabled = true;

  const changeIconPlay = () => {
    if (audio.paused) {
      radioStop.classList.add('fa-play');
      radioStop.classList.remove('fa-stop');
    } else {
      radioStop.classList.add('fa-stop');
      radioStop.classList.remove('fa-play');
    }
  };

  radioNavigation.addEventListener('change', (e) => {
    const target = e.target;
    radioStop.disabled = false;

    audio.src = target.dataset.radioStation;

    audio.play();
    changeIconPlay();
  });

  radioStop.addEventListener('click', () => {
    audio.paused ? audio.play() : audio.pause();
    changeIconPlay();
  });
};
