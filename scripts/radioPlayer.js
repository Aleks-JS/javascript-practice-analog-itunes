export const radioPlayerInit = () => {
  /* variables */
  const radio = document.querySelector('.radio');
  const radioCoverImg = document.querySelector('.radio-cover__img');
  const radioNavigation = document.querySelector('.radio-navigation');
  const radioHeaderBig = document.querySelector('.radio-header__big');
  const radioItem = document.querySelectorAll('.radio-item');
  const radioStop = document.querySelector('.radio-stop');

  const audio = new Audio();
  audio.type = 'audio/aac';

  radioStop.disabled = true;

  const changeIconPlay = () => {
    if (audio.paused) {
      radio.classList.remove('play');
      radioStop.classList.add('fa-play');
      radioStop.classList.remove('fa-stop');
    } else {
      radio.classList.add('play');
      radioStop.classList.add('fa-stop');
      radioStop.classList.remove('fa-play');
    }
  };

  const selectItem = (parent) => {
    radioItem.forEach((item) => item.classList.remove('select'));
    parent.classList.add('select');
  };

  radioNavigation.addEventListener('change', (e) => {
    const target = e.target;
    const parent = target.closest('.radio-item');
    const title = parent.querySelector('.radio-name').textContent;
    const urlImg = parent.querySelector('.radio-img').src;

    radioHeaderBig.textContent = title;
    selectItem(parent);

    radioCoverImg.src = urlImg;

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
