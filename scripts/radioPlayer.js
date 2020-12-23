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

  radioNavigation.addEventListener('change', (e) => {
    const target = e.target;

    audio.src = target.dataset.radioStation;

    audio.play();
  });
};
