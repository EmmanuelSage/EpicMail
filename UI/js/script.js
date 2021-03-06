document.addEventListener('DOMContentLoaded', () => {
  const dashMenu = document.getElementById('dash-menu-id');
  const closeMobileMenu = document.getElementById('close-mobile-menu');
  const hamburger = document.getElementById('hamburger-link');

  const composeButton = document.getElementById('compose-open-modal');
  const composeModal = document.getElementById('compose-modal-id');
  const modalClose = document.getElementById('modal-close-id');
  const mobileCancelButton = document.getElementById('mobile-cancel-button');
  const groupDisableInput = document.getElementById('group-disable-input');
  const thread = document.getElementsByClassName('thread');
  const saveAsDraft = document.getElementById('draft-save-button');
  const mainGrid = document.getElementById('mainGrid');

  if (hamburger) {
    hamburger.addEventListener('click', () => {
      const displayState = getComputedStyle(dashMenu, null).display;
      if (displayState !== 'block') {
        dashMenu.style.display = 'block';
        if (groupDisableInput) {
          groupDisableInput.style.display = 'none';
        }

      }
      else {
        dashMenu.style.display = 'none';
        if (groupDisableInput) {
          groupDisableInput.style.display = 'inline-block';
        }

      }

    });
  }

  if (closeMobileMenu) {
    closeMobileMenu.addEventListener('click', () => {
      dashMenu.style.display = 'none';
      if (groupDisableInput) {
        groupDisableInput.style.display = 'none';
      }

    });
  }

  if (composeButton) {
    composeButton.onclick = () => {
      composeModal.style.display = 'block';
    }
  }

  if (saveAsDraft) {
    saveAsDraft.onclick = () => {
      composeModal.style.display = 'none';
    }
  }

  if (modalClose) {
    modalClose.onclick = () => {
      composeModal.style.display = 'none';
    }
  }
  if (mobileCancelButton) {
    mobileCancelButton.onclick = () => {
      composeModal.style.display = 'none';
    }
  }


  for (let i = 0; i < thread.length; i++) {
    thread[i].addEventListener('click', function () {

      var panel = this.nextElementSibling;

      if (getComputedStyle(panel, null).display === 'block') {
        panel.style.display = 'none';
      } else {
        panel.style.display = 'block';
      }

    });
  }

  // media query event handler
  if (matchMedia) {
    const mq = window.matchMedia('(min-width: 768px)');
    mq.addListener(WidthChange);
    WidthChange(mq);
  }

  // media query change
  function WidthChange(mq) {
    if (mq.matches) {
      // window width is at least 768px desktop
      dashMenu.style.display = 'block';
      mainGrid.classList.add('main');
      dashMenu.classList.remove('dash-menu-overlay');
      dashMenu.classList.add('menu');
      hamburger.style.visibility = 'hidden';
    } else {
      // window width is less than 768px mobile
      dashMenu.classList.add('dash-menu-overlay');
      mainGrid.classList.remove('main');
      hamburger.style.visibility = 'visible';
    }

  }
});
