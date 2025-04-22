(() => {
  const slidesContainer = document.querySelector('.slides');
  const canvasStars = document.querySelector('#canvas');
  const canvasContainer = document.querySelector('#canvas-container');
  const url = location.href;
  const reducedMotion = url.includes('reducedMotion=on');
  console.log(slidesContainer);
  if (reducedMotion) {
    slidesContainer.classList.add('reduced-motion'), canvasStars.remove(), canvasContainer.classList.add('reduced-motion');
  }
})();
