document.addEventListener("DOMContentLoaded", () => {

  const dashMenu = document.getElementById("dash-menu-id");
  const closeMobileMenu = document.getElementById("close-mobile-menu");
  const hamburger = document.getElementById("hamburger-link");
  const createGroupForm = document.getElementById("create-group-id");

  if (hamburger) {
    hamburger.addEventListener("click", () => {
      let displayState = dashMenu.style.display;
      if (displayState === "none") {
        dashMenu.style.display = "block";
        if (createGroupForm) {
          createGroupForm.style.display = "none";
        }
      }
      else {
        dashMenu.style.display = "none";
        if (createGroupForm) {
          createGroupForm.style.display = "block";
        }
      }

    });
  }

  if (closeMobileMenu) {
    closeMobileMenu.addEventListener("click", () => {
      dashMenu.style.display = "none";
      if (createGroupForm) {
        createGroupForm.style.display = "block";
      }
    });
  }


});