var clubMemberButton = document.getElementById("club");

function checkPassword() {
  var isAuthenticated = localStorage.getItem("clubMember");

  if (isAuthenticated === "true") {
    window.location.href = "/vision-h";
  } else {
    var enteredPassword = prompt("Club Member Code eingeben:");

    if (enteredPassword === "Zukunftsritter") {
      localStorage.setItem("clubMember", "true");
      window.location.href = "/vision-h";
    } else {
      alert("Falscher Code – erneut eingeben oder Membership beantragen.");
    }
  }
}

if (clubMemberButton) {
  clubMemberButton.addEventListener("click", checkPassword);
}
