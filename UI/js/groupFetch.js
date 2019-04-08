
const Gdomain = 'https://esepicmail.herokuapp.com/api/v1/';

const getGMessageCookie = (cookieSearchName) => {
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

const messageTokenG = getGMessageCookie('token');


const groupOptionForm = document.getElementById('group-option-form');

const createGroupForm = document.getElementById('create-group-form');
const createGroupName = document.getElementById('create-group-name-id');
const fetchCreateGroup = document.getElementById('fetch-create-group-id');

// rename group elements
const renameGroupForm = document.getElementById('rename-group-form');
const renameGroupName = document.getElementById('rename-group-name-id');
const fetchRenameGroup = document.getElementById('fetch-rename-group-id');
let renameGroupId;


// delete group elements
const deleteGroupForm = document.getElementById('delete-group-form');
const deleteGroupNameId = document.getElementById('delete-group-name-id');
const fetchDeleteGroup = document.getElementById('fetch-delete-group-id');
let deleteGroupId;
let deleteGroupName;


// group-details group elements
const groupDetailsGroupForm = document.getElementById('group-details-group-form');
const groupDetailsGroupSpan = document.getElementById('group-details-group-span');
let groupDetailsGroupId;


// add Users group elements
const addUsersGroupForm = document.getElementById('add-users-group-form');
const addUsersGroupName = document.getElementById('add-users-group-name-id');
const fetchAddUsersGroup = document.getElementById('fetch-add-users-group-id');
const addEmailGroup = document.getElementById('add-email-group');
const addNameGroupSpan = document.getElementById('add-name-group-span');
let addUsersGroupArray = [];
let addUsersGroupId;


// delete Users group elements
const deleteUsersGroupForm = document.getElementById('delete-users-group-form');
const deleteUsersSelect = document.getElementById('delete-users-select');
const fetchDeleteUsersButton = document.getElementById('fetch-delete-users-button');
const deleteUsersSpan = document.getElementById('delete-users-span');
let deleteUsersGroupId;
let deleteUsersGroupName;

// 
const createGroup = document.getElementById('create-group-button-id');
const renameGroup = document.getElementById('rename-group-id');
const deleteGroup = document.getElementById('delete-group-id');
const addUsersGroup = document.getElementById('add-users-group-id');
const deleteUsersGroup = document.getElementById('delete-users-group-id');
const groupDetailsButton = document.getElementById('group-details-button-id');

const errorMessage = document.getElementById('group-error-message-id');
const groupSelect = document.getElementById("select-group-id");

const getSelectValue = () => {
  let selectId = groupSelect.options[groupSelect.selectedIndex].value;
  console.log(selectId);
  return selectId;
}


createGroup.onclick = () => {
  event.preventDefault();
  errorMessage.style.display = 'none';
  groupOptionForm.style.display = 'none';
  createGroupForm.style.display = 'block';
  console.log('ckicked');
}

renameGroup.onclick = () => {
  event.preventDefault();
  renameGroupId = getSelectValue();
  if (!renameGroupId) {
    console.log(errorMessage);
    errorMessage.style.display = 'block';
    errorMessage.innerHTML = 'Select a group to rename';
  }
  else {
    errorMessage.style.display = 'none';
    groupOptionForm.style.display = 'none';
    renameGroupForm.style.display = 'block';
  }
}

deleteGroup.onclick = () => {
  event.preventDefault();
  deleteGroupId = getSelectValue();
  deleteGroupName = groupSelect.options[groupSelect.selectedIndex].text;
  if (!deleteGroupId) {
    console.log(errorMessage);
    errorMessage.style.display = 'block';
    errorMessage.innerHTML = 'Select a group to Delete';
  }
  else {
    errorMessage.style.display = 'none';
    groupOptionForm.style.display = 'none';
    deleteGroupNameId.innerHTML = `Deleteing group ${deleteGroupName} is not reversable`
    deleteGroupForm.style.display = 'block';
  }
}


addUsersGroup.onclick = () => {
  event.preventDefault();
  addUsersGroupId = getSelectValue();
  if (!addUsersGroupId) {
    console.log(errorMessage);
    errorMessage.style.display = 'block';
    errorMessage.innerHTML = 'Select a group to add users to';
  }
  else {
    errorMessage.style.display = 'none';
    groupOptionForm.style.display = 'none';
    addUsersGroupForm.style.display = 'block';
  }
}

groupDetailsButton.onclick = () => {
  event.preventDefault();
  groupDetailsGroupId = getSelectValue();
  if (!groupDetailsGroupId) {
    console.log(errorMessage);
    errorMessage.style.display = 'block';
    errorMessage.innerHTML = 'Select a group to view details';
  }
  else {
    errorMessage.style.display = 'none';
    groupOptionForm.style.display = 'none';
    groupDetailsGroupForm.style.display = 'block';
    // groupDetailsGroupSpan.innerHTML
    fetchGetSpecificGroup(groupDetailsGroupId);
  }

  console.log('ckicked');
}

deleteUsersGroup.onclick = () => {
  event.preventDefault();
  deleteUsersGroupId = getSelectValue();
  if (!deleteUsersGroupId) {
    errorMessage.style.display = 'block';
    errorMessage.innerHTML = 'Select a group to delete users from';
  }
  else {
    errorMessage.style.display = 'none';
    groupOptionForm.style.display = 'none';
    deleteUsersGroupForm.style.display = 'block';
    deleteUsersGroupName = groupSelect.options[groupSelect.selectedIndex].text;
    deleteUsersSpan.innerHTML = `Select a user to delete from ${deleteUsersGroupName}`;
    fetchDeleteUsersSelect(deleteUsersGroupId);
  }
  console.log('ckicked');
}


fetchCreateGroup.onclick = () => {
  event.preventDefault();
  const groupName = createGroupName.value;
  if (!groupName) {
    errorMessage.style.display = 'block';
    errorMessage.innerHTML = 'Enter a group name';
  } else {
    errorMessage.style.display = 'none';
    fetchCreateGroupReq(groupName);
  }
  console.log('create ckicked');
  console.log(groupName);
}

fetchRenameGroup.onclick = () => {
  event.preventDefault();
  const groupName = renameGroupName.value;
  if (!groupName) {
    errorMessage.style.display = 'block';
    errorMessage.innerHTML = 'Enter a group name';
  } else {
    errorMessage.style.display = 'none';
    console.log("ready");
    console.log(groupName);
    console.log(renameGroupId);
    fetchRenameGroupReq(groupName, renameGroupId);
  }
  console.log('create ckicked');
}


fetchDeleteGroup.onclick = () => {
  event.preventDefault();
  console.log('delete now ckicked');
  console.log(deleteGroupName);
  console.log(deleteGroupId);
  fetchDeleteGroupReq(deleteGroupId);
}


addEmailGroup.onclick = () => {
  event.preventDefault();
  let userEmail = addUsersGroupName.value;
  console.log(userEmail);
  if (userEmail === '') {
    errorMessage.style.display = 'block';
    errorMessage.innerHTML = 'Please enter an email';
  }
  else if (!isValidEmail(userEmail)) {
    errorMessage.style.display = 'block';
    errorMessage.innerHTML = 'Please enter a valid email';
  }
  else if (addUsersGroupArray.indexOf(userEmail) !== -1) {
    errorMessage.style.display = 'block';
    errorMessage.innerHTML = 'User is already set';
  } else if (addUsersGroupArray.indexOf(userEmail) === -1) {
    addUsersGroupArray.push(userEmail)
    addNameGroupSpan.innerHTML += `${userEmail} <br>`;
    console.log(addUsersGroupArray);
  }

}



fetchAddUsersGroup.onclick = () => {
  event.preventDefault();
  if (addUsersGroupArray.length < 1) {
    errorMessage.style.display = 'block';
    errorMessage.innerHTML = 'Enter at least one email to add';
  } else {
    fetchAddUsersGroupReq(addUsersGroupArray, addUsersGroupId);
  }
  console.log(addUsersGroupId);
  console.log(addUsersGroupArray);

}



fetchDeleteUsersButton.onclick = () => {
  event.preventDefault();
  let selectId = deleteUsersSelect.options[deleteUsersSelect.selectedIndex].value;

  if (!selectId) {
    errorMessage.style.display = 'block';
    errorMessage.innerHTML = 'User to delete is not selected';
  }
  else {
    let selectText = deleteUsersSelect.options[deleteUsersSelect.selectedIndex].text;
    console.log(selectText);
    errorMessage.style.display = 'none';
    fetchDeleteUsersReq(deleteUsersGroupId, selectText);
  }
  console.log('create xxxxxckicked');
  console.log(selectId);

}




// Fetch api's

const fetchCreateGroupReq = (groupName) => {
  const userDetails = {
    name: groupName
  };

  fetch(`${Gdomain}groups`, {
    method: 'POST',
    body: JSON.stringify(userDetails),
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': messageTokenG,
    },
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      if (data.status === 201) {
        errorMessage.style.display = 'block';
        errorMessage.innerHTML = data.message;
      } else {
        errorMessage.style.display = 'block';
        errorMessage.innerHTML = data.error;
      }

    })
    .catch((err) => {
      console.log(JSON.stringify(err));
    })
}


const fetchRenameGroupReq = (newName, groupId) => {
  const userDetails = {
    name: newName
  };

  fetch(`${Gdomain}groups/${groupId}/name`, {
    method: 'PATCH',
    body: JSON.stringify(userDetails),
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': messageTokenG,
    },
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      if (data.status === 201) {
        console.log("lalalalal");
        errorMessage.style.display = 'block';
        errorMessage.innerHTML = `Group has been renamed to ${newName}`;

      } else {
        errorMessage.style.display = 'block';
        errorMessage.innerHTML = data.error;
      }
    })
    .catch((err) => {
      console.log(JSON.stringify(err));
    })
}




const fetchDeleteGroupReq = (id) => {

  console.log('sending request to : ');
  console.log(id);

  fetch(`${Gdomain}groups/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': messageTokenG,
    },
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      if (data.status === 200) {
        deleteGroupNameId.innerHTML = `Group ${deleteGroupName} has been deleted`;
      } else {
        errorMessage.style.display = 'block';
        errorMessage.innerHTML = data.error;
        deleteGroupNameId.innerHTML = 'There was an error';
      }
    })
    .catch((err) => {
      console.log(JSON.stringify(err));
    })
};



const fetchAddUsersGroupReq = (userArray, groupId) => {
  const userDetails = {
    users: userArray
  };
  fetchAddUsersGroup.innerHTML = "<img width = '15px' height= '15px' src = '../img/loading.png'>";

  fetch(`${Gdomain}groups/${groupId}/users`, {
    method: 'POST',
    body: JSON.stringify(userDetails),
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': messageTokenG,
    },
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      fetchAddUsersGroup.innerHTML = 'Add Users to Group';
      if (data.status === 201) {
        errorMessage.style.display = 'block';
        console.log(data.data[0].message);
        errorMessage.innerHTML = data.data[0].message;
      } else {
        let errors = '';
        data.errors.forEach((ele) => {
          console.log(ele);
          errors += `${ele} <br>`;
        });
        errorMessage.style.display = 'block';
        errorMessage.innerHTML = errors;
      }

    })
    .catch((err) => {
      console.log(JSON.stringify(err));
    })
}


const fetchGetSpecificGroup = (id) => {

  groupDetailsGroupSpan.innerHTML = "<img width = '15px' height= '15px' src = '../img/loading.png'>";

  fetch(`${Gdomain}groups/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': messageTokenG,
    },
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      if (data.status === 200) {
        console.log(data.data);
        const groupArray = data.data;
        groupDetailsGroupSpan.innerHTML = `<tr>
        <th>Email</th>
        <th>Role</th>
      </tr>`;
        groupArray.forEach((ele) => {
          groupDetailsGroupSpan.innerHTML += `<tr>
          <td> ${ele.groupusers}</td>
          <td>${ele.role}</td>
        </tr>`;
        });
      }
    })
    .catch((err) => {
      console.log(JSON.stringify(err));
    })
};




const fetchDeleteUsersReq = (id, name) => {

  console.log('sending request to : ');
  console.log(id);

  fetchDeleteUsersButton.innerHTML = "<img width = '15px' height= '15px' src = '../img/loading.png'>";

  fetch(`${Gdomain}groups/${id}/users/${name}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': messageTokenG,
    },
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      if (data.status === 200) {
        errorMessage.style.display = 'block';
        errorMessage.innerHTML = data.data[0].message;
        console.log(data.data[0].message);
        fetchDeleteUsersSelect(deleteUsersGroupId);
        fetchDeleteUsersButton.innerHTML = 'Delete User';
      } else {
        errorMessage.style.display = 'block';
        errorMessage.innerHTML = data.error;
        deleteGroupNameId.innerHTML = 'There was an error';
      }
    })
    .catch((err) => {
      console.log(JSON.stringify(err));
    })
};


const fetchDeleteUsersSelect = (id) => {

  fetch(`${Gdomain}groups/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': messageTokenG,
    },
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      if (data.status === 200) {
        console.log(data.data);
        const groupArray = data.data;
        deleteUsersSelect.innerHTML = `<option hidden disabled selected value> -- select a user -- </option>`;
        groupArray.forEach((ele, idx) => {
          if (ele.role !== 'Admin') {
            deleteUsersSelect.innerHTML += `<option value="${idx}">${ele.groupusers}</option>`;
          }
        });
      }
    })
    .catch((err) => {
      console.log(JSON.stringify(err));
    })
};



