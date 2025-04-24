(function () {
  var isAuthenticated = localStorage.getItem("clubMember");

  if (!isAuthenticated) {
    var enteredPassword = prompt("Club Member Code eingeben:");

    if (enteredPassword === "Zukunftsritter") {
      localStorage.setItem("clubMember", "true");
    } else {
      alert("Falscher Code – erneut eingeben oder Membership beantragen.");
      window.location.href = "/club";
    }
  }
})();
