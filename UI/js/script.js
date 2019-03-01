document.addEventListener("DOMContentLoaded", () => {

  const dashMenu = document.getElementById("dash-menu-id");
  const closeMobileMenu = document.getElementById("close-mobile-menu");
  const hamburger = document.getElementById("hamburger-link");
  const createGroupForm = document.getElementById("create-group-id");
  const addUser = document.getElementById("add-user-id");

  const composeButton = document.getElementById("compose-open-modal");
  const composeModal = document.getElementById("compose-modal-id");
  const modalClose = document.getElementById("modal-close-id");
  const mobileCancelButton = document.getElementById("mobile-cancel-button");


  if (hamburger) {
    hamburger.addEventListener("click", () => {
      let displayState = dashMenu.style.display;
      if (displayState === "none") {
        dashMenu.style.display = "block";
      }
      else {
        dashMenu.style.display = "none";
      }
    });
  }

  if (closeMobileMenu) {
    closeMobileMenu.addEventListener("click", () => {
      dashMenu.style.display = "none";
    });
  }


  if (composeButton) {
    composeButton.onclick = function () {
      composeModal.style.display = "block";
    }
  }

  if (modalClose) {
    modalClose.onclick = function () {
      composeModal.style.display = "none";
    }
  }
  if (mobileCancelButton) {
    mobileCancelButton.onclick = function () {
      composeModal.style.display = "none";
    }
  }


  const thread = document.getElementsByClassName("thread");

  for (let i = 0; i < thread.length; i++) {
    thread[i].addEventListener("click", function () {
      this.classList.toggle("active");

      var panel = this.nextElementSibling;

      if (panel.style.display === "block") {
        panel.style.display = "none";
      } else {
        panel.style.display = "block";
      }

    });
  }

});
