
const selectOptGroupModalId = document.getElementById('select-optgroup-modal-id');
const composeModalSelectOption = document.getElementById('compose-modal-select-option');
const sendToUserButton = document.getElementById('compose-send-button');

const receiverId = document.getElementById('receiverIdInput');
const subject = document.getElementById('subjectId');
const message = document.getElementById('messageId');
const composeModal = document.getElementById('compose-modal-id');
const composeError = document.getElementById('compose-error');

let groupId;


const setUserImage = () => {

  const profilePix = document.getElementById("user-profile-pix");
  fetch(`${domain}auth/user`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': messageToken,
    },
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      if (data.status === 200) {
        console.log(data.data);
        console.log('image:');
        console.log(data.data.image);
        profilePix.src = data.data.image;

      }
    })
    .catch((err) => {
      console.log(JSON.stringify(err));
    })
}
const fetchGetGroups = () => {
  setUserImage();
  const groupSelect = document.getElementById("select-group-id");
  fetch(`${domain}groups`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': messageToken,
    },
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      if (data.status === 200) {
        console.log(data.data);
        if (groupSelect) {
          groupSelect.innerHTML = '<option hidden disabled selected value> -- select a group -- </option>';
        }
        const groupArray = data.data;
        groupArray.forEach((ele) => {
          if (groupSelect) {
            groupSelect.innerHTML += `<option value="${ele.id}">${ele.name}</option>`;
          }
          selectOptGroupModalId.innerHTML += `<option value="${ele.id}">${ele.name}</option>`;
        });
      }
    })
    .catch((err) => {
      console.log(JSON.stringify(err));
    })
};

const isValidEmail = (email) => {
  return /^[\w-]+(\.[\w-]+)*@([a-z0-9-]+(\.[a-z0-9-]+)*?\.[a-z]{2,6}|(\d{1,3}\.){3}\d{1,3})(:\d{4})?$/.test(email);
}


const postGroupMessage = () => {
  event.preventDefault();
  console.log('message for group sending.....');

  if (!subject.value) {
    subject.required = true;
    subject.focus();
    return;
  }
  if (!message.value) {
    message.required = true;
    message.focus();
    return;
  }
  const userDetails = {
    subject: subject.value,
    message: message.value,
  };

  sendToUserButton.innerHTML = "<img width = '15px' height= '15px' src = '../img/loading.png'>";

  fetch(`${domain}groups/${groupId}/messages`, {
    method: 'POST',
    body: JSON.stringify(userDetails),
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': messageToken,
    },
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      if (data.status === 201) {
        composeModal.style.display = 'none';
        window.location.href = './sentmessages.html';
      }
      else if (data.status === 400) {
        console.log('all errors');
        let errors = '';
        data.errors.forEach((ele) => {
          console.log(ele.error);
          errors += `${ele.error} <br>`;
        });
        composeError.style.display = 'block';
        composeError.innerHTML = errors;
      }

    })
    .catch((err) => {
      console.log(JSON.stringify(err));
    })

  console.log(subject.value);
  console.log(message.value);
}



const postMessages = () => {
  event.preventDefault();
  console.log('message for individual sending.....');
  if (!receiverId.value) {
    receiverId.required = true;
    receiverId.focus();
    return;
  }
  if (!subject.value) {
    subject.required = true;
    subject.focus();
    return;
  }
  if (!message.value) {
    message.required = true;
    message.focus();
    return;
  }
  const userDetails = {
    subject: subject.value,
    message: message.value,
    receiverId: receiverId.value,
  };

  fetch(`${domain}messages`, {
    method: 'POST',
    body: JSON.stringify(userDetails),
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': messageToken,
    },
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      if (data.status === 201) {
        composeModal.style.display = 'none';
        window.location.href = './sentmessages.html';
      }
      else if (data.status === 400) {
        console.log('all errors');
        let errors = '';
        data.errors.forEach((ele) => {
          console.log(ele.error);
          errors += `${ele.error} <br>`;
        });
        composeError.style.display = 'block';
        composeError.innerHTML = errors;
      }

    })
    .catch((err) => {
      console.log(JSON.stringify(err));
    })

  console.log(receiverId.value);
  console.log(subject.value);
  console.log(message.value);
}


composeModalSelectOption.addEventListener("change", () => {
  let selectText = composeModalSelectOption.options[composeModalSelectOption.selectedIndex].text;
  groupId = composeModalSelectOption.options[composeModalSelectOption.selectedIndex].value;
  console.log(selectText);
  console.log(groupId);
  if (selectText === 'User') {
    receiverId.disabled = false;
    receiverId.placeholder = 'To:';
    sendToUserButton.innerHTML = 'Send'
    // sendToGroupButton.removeEventListener("click", postGroupMessage);
    sendToUserButton.onclick = () => {
      postMessages();
    }


  } else {
    receiverId.disabled = true;
    receiverId.placeholder = `To: ${selectText}`;
    sendToUserButton.innerHTML = 'Send to Group'
    // sendToUserButton.addEventListener("click", postGroupMessage);
    sendToUserButton.onclick = () => {
      postGroupMessage();
    }
  }
});

