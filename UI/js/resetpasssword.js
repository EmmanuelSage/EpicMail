const domain = 'https://esepicmail.herokuapp.com/api/v1/';

const deleteCookie = (cookieName) => {
  document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
}

deleteCookie('token');

const sendEmail = () => {

  const email = document.getElementById('email').value;

  const errorMessage = document.getElementById('errorMessage');
  const errorMessageDiv = document.querySelector('.errorDiv');
  const resetButton = document.getElementById('login-button');
  resetButton.innerHTML = "<img width = '15px' height= '15px' src = '../img/loading.png'>";

  const userDetails = {
    email,
  };

  fetch(`${domain}auth/resetemail`, {
    method: 'POST',
    body: JSON.stringify(userDetails),
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      if (data.status === 200) {
        errorMessageDiv.style.display = 'block';
        errorMessage.innerHTML = data.data.message;
        resetButton.innerHTML = "Send";
      }
      else {
        errorMessageDiv.style.display = 'block';
        errorMessage.innerHTML = data.error;
        resetButton.innerHTML = "Send";
      }
    })
    .catch((err) => {
      console.log(JSON.stringify(err));
      errorMessage.innerHTML = 'An error occured';
    })
};



const resetPassword = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const token = urlParams.get('x-access-token');
  console.log(token);

  const password = document.getElementById('password').value;
  const confirmPassword = document.getElementById('confirmPassword').value;
  const errorMessageDiv = document.getElementById('errorDivId');
  const errorMessage = document.getElementById('errorMessage');
  const resetButton = document.getElementById('login-button');


  if (password !== confirmPassword) {
    errorMessageDiv.style.display = 'block';
    errorMessage.innerHTML = 'Password must equal Confirm Pasword <br>';
    return;
  }

  if (!token) {
    errorMessageDiv.style.display = 'block';
    errorMessage.innerHTML = 'You are not authorized';
    return;
  }

  const userDetails = {
    password,
  };

  resetButton.innerHTML = "<img width = '15px' height= '15px' src = '../img/loading.png'>";

  fetch(`${domain}auth/resetpassword`, {
    method: 'POST',
    body: JSON.stringify(userDetails),
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': token,
    },
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      if (data.status === 201) {
        errorMessageDiv.style.display = 'block';
        errorMessage.innerHTML = data.data.message;
        resetButton.innerHTML = "Reset";
        window.location.href = './signin.html';
      }
      else {
        errorMessageDiv.style.display = 'block';
        errorMessage.innerHTML = data.error;
        resetButton.innerHTML = "Reset";
      }
    })
    .catch((err) => {
      console.log(JSON.stringify(err));
      errorMessage.innerHTML = 'An error occured';
    })
};
