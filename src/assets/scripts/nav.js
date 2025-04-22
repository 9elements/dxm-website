const nav = document.querySelector("#mainnav");
const list = nav.querySelector("ul");
const burgerClone = document
  .querySelector("#burger-template")
  .content.cloneNode(true);
const button = burgerClone.querySelector("button");
const navLogo = document.querySelector(".site-head__brand");
const menuLabel = document.querySelector(".site-head__menu-label");
const navListItem = Array.from(
  document.querySelectorAll("#mainnav ul.first-level > li")
);

// Toggle aria-expanded attribute
button.addEventListener("click", (e) => {
  // Get the aria-expanded attribute and check if the value is "false"
  // If it's "false", isOpen is true
  // If it's "true", isOpen is false
  const isOpen = button.getAttribute("aria-expanded") === "false";
  // Change the aria-expanded value accordingly
  button.setAttribute("aria-expanded", isOpen);
  // if menu is open, hide logo & show menu label
  navLogo.classList.toggle("hide");
  menuLabel.classList.toggle("show");
});

// Hide list on keydown Escape
nav.addEventListener("keyup", (e) => {
  if (e.code === "Escape") {
    button.setAttribute("aria-expanded", false);
  }
});

// Add the button to the page
nav.insertBefore(burgerClone, list);

// while hovering a list item, change the background of navigation
navListItem.forEach((item) => {
  item.addEventListener("mouseover", (e) => {
    list.classList.add("item-hovered");
  });

  item.addEventListener("mouseleave", (e) => {
    list.classList.remove("item-hovered");
  });
});
