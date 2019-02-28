document.addEventListener("DOMContentLoaded", () => {

  const dashMenu = document.getElementById("dash-menu-id");
  const closeMobileMenu = document.getElementById("close-mobile-menu");
  const hamburger = document.getElementById("hamburger-link");

  if (hamburger) {
    hamburger.addEventListener("click", () => {
      dashMenu.style.display = "block";
    });
  }

  if (closeMobileMenu) {
    closeMobileMenu.addEventListener("click", () => {
      dashMenu.style.display = "none";
    });
  }


});