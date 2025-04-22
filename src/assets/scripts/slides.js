// Funktion zum Auslesen von URL-Parametern
function getQueryParam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  let value = urlParams.get(param);
  return value ? value.replace(/\+/g, " ") : null;
}

document.addEventListener("DOMContentLoaded", function () {
  const headline = document.getElementById("headline");
  const text = getQueryParam("eventText"); // Holt 'eventText' aus der URL
  if (text) {
    headline.textContent = text;
  }
});
