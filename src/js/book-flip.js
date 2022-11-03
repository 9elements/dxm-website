(() => {
  const publicationItems = Array.from(
    document.querySelectorAll(".publikationen__item")
  );

  publicationItems.forEach((item) => {
    const openButton = item.querySelector(".publikationen__open-button");
    const closeButton = item.querySelector(".publikationen__close-button");

    openButton.addEventListener("click", (e) => {
      item.classList.add("publikationen__item--open");
    });

    closeButton.addEventListener("click", (e) => {
      item.classList.remove("publikationen__item--open");
    });
  });
})();
