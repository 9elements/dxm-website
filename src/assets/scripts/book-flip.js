(() => {
  const publicationItems = Array.from(
    document.querySelectorAll(".publication__item")
  );

  publicationItems.forEach((item) => {
    const openButton = item.querySelector(".publication__open-button");
    const closeButton = item.querySelector(".publication__close-button");

    openButton.addEventListener("click", (e) => {
      item.classList.add("publication__item--open");
    });

    closeButton.addEventListener("click", (e) => {
      item.classList.remove("publication__item--open");
    });
  });
})();
