const domain = 'https://esepicmail.herokuapp.com/api/v1/';
const getMessageCookie = (cookieSearchName) => {
  const cookieName = `${cookieSearchName}=`;
  const cookieArray = document.cookie.split(';');
  let cookieValue = '';
  cookieArray.forEach((ele) => {
    while (ele.charAt(0) == ' ') {
      ele = ele.substring(1);
    }
    if (ele.indexOf(cookieName) == 0) {
      cookieValue = ele.substring(cookieName.length, ele.length);
    }
  });
  return cookieValue;
}

const messageToken = getMessageCookie('token');


const deleteMessage = (id) => {

  console.log(id);

  fetch(`${domain}messages/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': messageToken,
    },
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      window.location.href = './dashboard.html';
    })
    .catch((err) => {
      console.log(JSON.stringify(err));
    })
};


const retractMessage = (id) => {

  console.log(id);

  fetch(`${domain}messages/retract/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': messageToken,
    },
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      window.location.href = './sentmessages.html';
    })
    .catch((err) => {
      console.log(JSON.stringify(err));
    })
};



const getUnreadMessages = () => {

  // const redirectId = showMessagesLink[i].getAttribute("qsLinkId");
  // window.location.href = `./viewdraft.html?id=${redirectId}`;

  const contentMessagesUl = document.querySelector('.content-messages ul');
  fetch(`${domain}messages/unread`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': messageToken,
    },
  })
    .then((res) => res.json())
    .then((serverData) => {
      const { data } = serverData;
      const sortData = data.sort((a, b) => b.id - a.id);
      sortData.forEach((ele) => {
        console.log(ele);
        contentMessagesUl.innerHTML += `
        <div qsLinkId="${ele.id}" id="show-messages-id" class="show-messages-link">
        <span><img class='user-img' src='../img/User-1.jpg' alt='Users image' /></span>

        <span class="message-from">
          <h1> ${ele.senderid} </h1>
          <p><i> ${ele.subject}</i></p>
        </span>

        <span class="delete-draft-message"> &otimes; Delete </span>
      </div>`;

        const showMessagesLink = document.getElementsByClassName('show-messages-link');
        const showMessagesLinkArray = Array.from(showMessagesLink);
        const deleteInboxMessage = document.getElementsByClassName('delete-draft-message');

        showMessagesLinkArray.forEach((ele) => {
          ele.onclick = () => {
            const attrValue = ele.getAttribute("qsLinkId");
            console.log(attrValue);
            window.location.href = `./viewinbox.html?id=${attrValue}`;
          }
        });

        for (let i = 0; i < deleteInboxMessage.length; i++) {
          deleteInboxMessage[i].onclick = () => {
            console.log('Delete clicked');
            const attrValue = showMessagesLink[i].getAttribute("qsLinkId");
            console.log(attrValue);
            deleteMessage(attrValue);
            event.stopPropagation();
          }
        }
      });
    })
    .catch((err) => {
      console.log(JSON.stringify(err));
    })
};



const getMessages = () => {

  const contentMessagesUl = document.querySelector('.content-messages ul');

  const viewUnread = document.getElementById('view-unread');
  viewUnread.onclick = () => {
    // window.location.href = '../index.html';
    console.log('UNread');
    contentMessagesUl.innerHTML = '';
    getUnreadMessages();

  }

  fetch(`${domain}messages`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': messageToken,
    },
  })
    .then((res) => res.json())
    .then((serverData) => {
      const { data } = serverData;
      const sortData = data.sort((a, b) => b.id - a.id);
      sortData.forEach((ele) => {
        console.log(ele);
        contentMessagesUl.innerHTML += `
        <div qsLinkId="${ele.id}" id="show-messages-id" class="show-messages-link">
        <span><img class='user-img' src='../img/User-1.jpg' alt='Users image' /></span>

        <span class="message-from">
          <p><b>from : ${ele.senderid}</b> <br> <i> ${ele.subject}</i></p>
        </span>

        <span class="delete-draft-message"> &otimes; Delete </span>
      </div>`;

        const showMessagesLink = document.getElementsByClassName('show-messages-link');
        const showMessagesLinkArray = Array.from(showMessagesLink);
        const deleteInboxMessage = document.getElementsByClassName('delete-draft-message');

        showMessagesLinkArray.forEach((ele) => {
          ele.onclick = () => {
            const attrValue = ele.getAttribute("qsLinkId");
            console.log(attrValue);
            window.location.href = `./viewinbox.html?id=${attrValue}`;
          }
        });

        for (let i = 0; i < deleteInboxMessage.length; i++) {
          deleteInboxMessage[i].onclick = () => {
            console.log('Delete clicked');
            const attrValue = showMessagesLink[i].getAttribute("qsLinkId");
            console.log(attrValue);
            deleteMessage(attrValue);
            event.stopPropagation();
          }
        }
      });
    })
    .catch((err) => {
      console.log(JSON.stringify(err));
    })
};


const getSentMessages = () => {

  // const redirectId = showMessagesLink[i].getAttribute("qsLinkId");
  // window.location.href = `./viewdraft.html?id=${redirectId}`;

  const contentMessagesUl = document.querySelector('.content-messages ul');
  fetch(`${domain}messages/sent`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': messageToken,
    },
  })
    .then((res) => res.json())
    .then((serverData) => {
      const { data } = serverData;
      const sortData = data.sort((a, b) => b.id - a.id);
      sortData.forEach((ele) => {
        console.log(ele);
        contentMessagesUl.innerHTML += `
        <div qsLinkId="${ele.id}" id="show-messages-id" class="show-messages-link">
        <span><img class='user-img' src='../img/User-1.jpg' alt='Users image' /></span>

        <span class="message-from">
          <h4> ${ele.subject} </h4>
        </span>
        <span id="hashlinkId" class="retract-message hashlink"> &#8709; Retract
            message
          </span>
          <span class="delete-draft-message"> &otimes; Delete </span>          
      </div>
      `;
        const retractMessageLink = document.getElementsByClassName('retract-message');
        const showMessagesLink = document.getElementsByClassName('show-messages-link');
        const showMessagesLinkArray = Array.from(showMessagesLink);
        const deleteInboxMessage = document.getElementsByClassName('delete-draft-message');

        showMessagesLinkArray.forEach((ele) => {
          ele.onclick = () => {
            const attrValue = ele.getAttribute("qsLinkId");
            console.log(attrValue);
            window.location.href = `./viewsent.html?id=${attrValue}`;
          }
        });

        for (let i = 0; i < retractMessageLink.length; i++) {
          retractMessageLink[i].onclick = () => {
            event.stopPropagation();
            console.log('Retract clicked');
            const attrValue = showMessagesLink[i].getAttribute("qsLinkId");
            console.log(attrValue);
            retractMessage(attrValue);
            event.stopPropagation();
          }
        }

        for (let i = 0; i < deleteInboxMessage.length; i++) {
          deleteInboxMessage[i].onclick = () => {
            console.log('Delete clicked');
            const attrValue = showMessagesLink[i].getAttribute("qsLinkId");
            console.log(attrValue);
            deleteMessage(attrValue);
            event.stopPropagation();
          }
        }
      });
    })
    .catch((err) => {
      console.log(JSON.stringify(err));
    })
};


const postDraft = () => {
  console.log('Draft INit')
  const receiverId = document.getElementById('receiverIdInput');
  const subject = document.getElementById('subjectId');
  const message = document.getElementById('messageId');
  const composeModal = document.getElementById('compose-modal-id');
  const composeError = document.getElementById('compose-error');
  const draftSaveButton = document.getElementById('draft-save-button');

  if (!receiverId.value && !subject.value && !message.value) {
    message.required = true;
    message.focus();
    composeError.style.display = 'block';
    composeError.innerHTML = 'Please Enter Your message';
    console.log('Kicked out')
    return;
  }
  const userDetails = {
    subject: subject.value,
    message: message.value,
    receiverId: receiverId.value,
  };

  draftSaveButton.innerHTML = "<img width = '15px' height= '15px' src = '../img/loading.png'>";

  fetch(`${domain}messages/drafts`, {
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
        window.location.href = './drafts.html';
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


const sendDraftModal = (sub, msg) => {

  const subject = document.getElementById('subjectId');
  const message = document.getElementById('messageId');
  const composeModal = document.getElementById('compose-modal-id');


  subject.value = sub;
  message.value = msg;

  composeModal.style.display = 'block';
}



const deleteDraft = (id) => {

  console.log(id);

  fetch(`${domain}messages/drafts/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': messageToken,
    },
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      window.location.href = './drafts.html';
    })
    .catch((err) => {
      console.log(JSON.stringify(err));
    })
};




const getDraftMessages = () => {

  const contentMessages = document.querySelector('#content-messages-id');

  fetch(`${domain}messages/drafts`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': messageToken,
    },
  })
    .then((res) => res.json())
    .then((serverData) => {
      const { data } = serverData;
      const sortData = data.sort((a, b) => b.id - a.id);
      sortData.forEach((ele) => {
        console.log(ele);
        let shortMessage = '';
        let longMessage = '';
        let tempSub = '';

        if (ele.message) {
          shortMessage = ele.message;
          longMessage = ele.message;
          if (shortMessage.length > 18) {
            let subMessage = shortMessage.substring(0, 15);
            shortMessage = `${subMessage}...`;
          }
        }

        if (ele.subject) {
          tempSub = `Sub: ${ele.subject}`;
        }
        console.log(shortMessage);
        contentMessages.innerHTML += `
        <div qsLinkId="${ele.id}" id="show-messages-id" class="show-messages-link">
        <span><img class='user-img' src='../img/User-1.jpg' alt='Users image' /></span>

        <span class="message-from">
          <p><b class="draft${ele.id}">${tempSub}</b><br>
          <b class="draft${ele.id}" data-long-message="${longMessage}">${shortMessage}</b><p>
        </span>
        
          <span id="send-draft-id"class="send-draft-message"> &#8883; Send </span>
          <span class="delete-draft-message"> &otimes; Delete </span>
        

      </div>`;

        const showMessagesLink = document.getElementsByClassName('show-messages-link');
        const sendDraftMessage = document.getElementsByClassName('send-draft-message');
        const deleteDraftMessage = document.getElementsByClassName('delete-draft-message');

        let sendDiv = true;
        console.log(showMessagesLink);
        // document.getElementById("the_id").getAttribute("original-title");
        // a[target="_blank"]
        for (let i = 0; i < showMessagesLink.length; i++) {
          showMessagesLink[i].onclick = () => {
            if (sendDiv) {
              console.log('Div clicked');
              const attrValue = showMessagesLink[i].getAttribute("qsLinkId");
              console.log(attrValue);
              const draftMgs = document.querySelectorAll(`#show-messages-id b.draft${attrValue}`);
              console.log(draftMgs);

              const messageAttrValue = draftMgs[1].getAttribute("data-long-message");
              console.log(messageAttrValue);

              sendDraftModal(draftMgs[0].innerHTML, messageAttrValue)
              // showMessagesLink[i].
            }
            sendDiv = true;
          }
        }

        for (let i = 0; i < sendDraftMessage.length; i++) {
          sendDraftMessage[i].onclick = () => {
            if (sendDiv) {
              console.log('Send clicked');
              const attrValue = showMessagesLink[i].getAttribute("qsLinkId");
              console.log(attrValue);
              const draftMgs = document.querySelectorAll(`#show-messages-id b.draft${attrValue}`);
              console.log(draftMgs);

              const messageAttrValue = draftMgs[1].getAttribute("data-long-message");
              console.log(messageAttrValue);

              sendDraftModal(draftMgs[0].innerHTML, messageAttrValue)
              sendDiv = false;
            }

          }
        }

        for (let i = 0; i < deleteDraftMessage.length; i++) {
          deleteDraftMessage[i].onclick = () => {
            if (sendDiv) {
              console.log('Delete clicked');
              const attrValue = showMessagesLink[i].getAttribute("qsLinkId");
              console.log(attrValue);
              deleteDraft(attrValue);
              sendDiv = false;
            }

          }
        }


      });
    })
    .catch((err) => {
      console.log(JSON.stringify(err));
    })
};

const viewSpecificInbox = () => {


  const viewInboxMessage = document.getElementById('view-inbox-message');

  const query = parent.document.URL.substring(parent.document.URL.indexOf('?'), parent.document.URL.length);
  const id = query.substring(query.indexOf('=') + 1, query.length);
  console.log('we are in inbox');
  console.log(id);

  fetch(`${domain}messages/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': messageToken,
    },
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data.data);
      viewInboxMessage.innerHTML += `<button class="thread">${data.data.subject}</button>
      <div class="panel">
        <p>${data.data.message}</p>
      </div>`;


      const thread = document.getElementsByClassName('thread');
      const threadArray = Array.from(thread);

      threadArray.forEach((ele) => {
        ele.addEventListener('click', function () {
          var panel = this.nextElementSibling;
          if (getComputedStyle(panel, null).display === 'block') {
            panel.style.display = 'none';
          } else {
            panel.style.display = 'block';
          }
        });
      });
    })
    .catch((err) => {
      console.log(JSON.stringify(err));
    })
};
