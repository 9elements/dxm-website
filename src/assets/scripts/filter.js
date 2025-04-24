(() => {
  const filterButtons = document.querySelectorAll(".filter-button");
  const filterItem = document.querySelectorAll(".filter-item");

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      button.classList.toggle("active");

      const selectedFilter = button.dataset.filter;

      filterItem.forEach((item) => {
        if (button.classList.contains("active")) {
          item.hidden = item.dataset.filter !== selectedFilter;
        } else item.hidden = false;
      });

      const otherButtons = Array.from(filterButtons).filter(
        (filterButton) => filterButton !== button
      );
      otherButtons.forEach((button) => button.classList.remove("active"));
    });
  });
})();
