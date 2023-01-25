const sliders = document.querySelectorAll('[data-slides]');

sliders.forEach((slider) => {
  var buttons = document.createElement('div');

  console.log(slider);
  buttons.classList.add('shop__slider-btn-wrapper');
  buttons.innerHTML = `
    <button class="shop__slider-btn" disabled data-prev>
      <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24">
        <path fill="none" d="M0 0h24v24H0z"/>
        <path d="M15.4 7.4 14 6l-6 6 6 6 1.4-1.4-4.6-4.6z"/>
      </svg>
    </button>
    <button class="shop__slider-btn" data-next>
      <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24">
        <path fill="none" d="M0 0h24v24H0z"/>
        <path d="M10 6 8.6 7.4l4.6 4.6-4.6 4.6L10 18l6-6z"/>
      </svg>
    </button>`;

  const { parentNode } = slider;

  parentNode.insertBefore(buttons, slider.nextElementSibling);
  const prevButton = parentNode.querySelector('[data-prev]');
  const nextButton = parentNode.querySelector('[data-next]');

  function slide(direction) {
    const { scrollLeft, clientWidth } = slider;

    const left =
      direction === 'prev'
        ? scrollLeft - clientWidth
        : scrollLeft + clientWidth;

    console.log(left);

    slider.scroll({
      left,
      behavior: 'smooth',
    });

    if (left <= 1) {
      prevButton.disabled = true;
      nextButton.disabled = false;
    } else {
      prevButton.disabled = false;
      nextButton.disabled = true;
    }
  }

  if (slider && prevButton && nextButton) {
    prevButton.addEventListener('click', () => slide('prev'));
    nextButton.addEventListener('click', () => slide('next'));
  }
});
