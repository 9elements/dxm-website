(() => {
  const filterButtons = document.querySelectorAll(
    ".publication__filter-button"
  );
  const books = document.querySelectorAll(".publication__item");

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      button.classList.toggle("active");

      const selectedPublisher = button.dataset.publisher;

      books.forEach((book) => {
        if (button.classList.contains("active")) {
          book.hidden = book.dataset.publisher !== selectedPublisher;
        } else book.hidden = false;
      });

      const otherButtons = Array.from(filterButtons).filter(
        (filterButton) => filterButton !== button
      );
      otherButtons.forEach((button) => button.classList.remove("active"));
    });
  });
})();
