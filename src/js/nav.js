const nav = document.querySelector("#mainnav");
const list = nav.querySelector("ul");
const burgerClone = document
  .querySelector("#burger-template")
  .content.cloneNode(true);
const button = burgerClone.querySelector("button");

// Toggle aria-expanded attribute
button.addEventListener("click", (e) => {
  // Get the aria-expanded attribute and check if the value is "false"
  // If it's "false", isOpen is true
  // If it's "true", isOpen is false
  const isOpen = button.getAttribute("aria-expanded") === "false";
  // Change the aria-expanded value accordingly
  button.setAttribute("aria-expanded", isOpen);
});

// Hide list on keydown Escape
nav.addEventListener("keyup", (e) => {
  if (e.code === "Escape") {
    button.setAttribute("aria-expanded", false);
  }
});

// Add the button to the page
nav.insertBefore(burgerClone, list);
