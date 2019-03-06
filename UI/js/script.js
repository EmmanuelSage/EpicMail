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
  const groupDisableInput = document.getElementById("group-disable-input");
  const thread = document.getElementsByClassName("thread");
  const saveAsDraft = document.getElementById("draft-save-button");
  const mainGrid = document.getElementById("mainGrid");

  if (hamburger) {
    hamburger.addEventListener("click", () => {
      let displayState = dashMenu.style.display;
      if (displayState === "none") {
        dashMenu.style.display = "block";
        if (groupDisableInput) {
          groupDisableInput.style.display = "none";
        }

      }
      else {
        dashMenu.style.display = "none";
        if (groupDisableInput) {
          groupDisableInput.style.display = "inline-block";
        }

      }

      // switch (displayState) {
      //   case 'none':
      //     dashMenu.style.display = "block";
      //     if (groupDisableInput) {
      //       groupDisableInput.style.display = "none";
      //     }

      //     break;
      //   default:
      //     dashMenu.style.display = "none";
      //     if (groupDisableInput) {
      //       groupDisableInput.style.display = "inline-block";
      //     }
      // }


    });
  }

  if (closeMobileMenu) {
    closeMobileMenu.addEventListener("click", () => {
      dashMenu.style.display = "none";
      if (groupDisableInput) {
        groupDisableInput.style.display = "none";
      }

    });
  }

  if (composeButton) {
    composeButton.onclick = function () {
      composeModal.style.display = "block";
    }
  }

  if (saveAsDraft) {
    saveAsDraft.onclick = function () {
      composeModal.style.display = "none";
    }
  }

  if (modalClose) {
    modalClose.onclick = function () {
      composeModal.style.display = "none";
      // groupDisableInput.style.display = "none";
    }
  }
  if (mobileCancelButton) {
    mobileCancelButton.onclick = function () {
      composeModal.style.display = "none";
    }
  }

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




  // media query event handler
  if (matchMedia) {
    const mq = window.matchMedia("(min-width: 768px)");
    mq.addListener(WidthChange);
    WidthChange(mq);
  }

  // media query change
  function WidthChange(mq) {
    if (mq.matches) {
      // window width is at least 768px desktop
      dashMenu.style.display = "block";
      mainGrid.classList.add("main");
      dashMenu.classList.remove("dash-menu-overlay");
      dashMenu.classList.add("menu");
      hamburger.style.visibility = "hidden";
    } else {
      // window width is less than 768px mobile
      dashMenu.classList.add("dash-menu-overlay");
      mainGrid.classList.remove("main");
      hamburger.style.visibility = "visible";
    }

  }
});
