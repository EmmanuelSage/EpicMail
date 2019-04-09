const setCookie = (cookieName, cookieValue, cookieExpire) => {
  const date = new Date();
  date.setTime(date.getTime() + (cookieExpire * 24 * 60 * 60 * 1000));
  const expiryDate = 'expires=' + date.toUTCString();
  document.cookie = `${cookieName}=${cookieValue};${expiryDate};path=/;`
}

const getCookie = (cookieSearchName) => {
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
const token = getCookie('token');

const signupUrl = 'https://esepicmail.herokuapp.com/api/v1/auth/signup';
const signinUrl = 'https://esepicmail.herokuapp.com/api/v1/auth/login';

const redirectIfAuth = () => {
  if (token) {
    window.location.href = './dashboard.html';
  }
};

redirectIfAuth();
const signUp = () => {

  const firstName = document.getElementById('firstName').value;
  const lastName = document.getElementById('lastName').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const confirmPassword = document.getElementById('confirmPassword').value;
  const errorMessageDiv = document.getElementById('errorDivId');
  const errorMessage = document.getElementById('errorMessage');
  const loginButton = document.getElementById('login-button');
  // const loginButton = document.getElementById('signin-button');

  if (password !== confirmPassword) {
    errorMessageDiv.style.display = 'block';
    errorMessage.innerHTML = 'Password must equal Confirm Pasword <br>';
    return;
  }

  loginButton.innerHTML = "<img width = '15px' height= '15px' src = '../img/loading.png'>";
  const userDetails = {
    firstName,
    lastName,
    email,
    password,
  };
  fetch(signupUrl, {
    method: 'POST',
    body: JSON.stringify(userDetails),
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      console.log(data.error);
      if (data.status === 201) {
        console.log(data.data[0].token)
        setCookie('token', data.data[0].token, 1);
        errorMessage.innerHTML = '';
        window.location.href = './dashboard.html';
      }
      else if (data.status === 400) {
        console.log('all errors');
        let errors = '';
        data.errors.forEach((ele) => {
          console.log(ele.error);
          errors += `${ele.error} <br>`;
        });
        errorMessageDiv.style.display = 'block';
        errorMessage.innerHTML = errors;
        loginButton.innerHTML = "Sign Up";
      }
      else if (data.status === 409) {
        console.log('all sdserrors');
        loginButton.innerHTML = "Sign Up";
        console.log('after login');
        console.log(errorMessageDiv);
        errorMessageDiv.style.display = 'block';
        console.log('after errror div');

        errorMessage.innerHTML = data.error;
        console.log('after errror message');
        // console.log(data.error);
      }
    })
    .catch((err) => {
      console.log(JSON.stringify(err));
      errorMessage.innerHTML = 'An error occured';
    })
};

const signIn = () => {

  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const errorMessage = document.getElementById('errorMessage');
  const errorMessageDiv = document.querySelector('.errorDiv');
  const signinButton = document.getElementById('signin-button');
  signinButton.innerHTML = "<img width = '15px' height= '15px' src = '../img/loading.png'>";
  const userDetails = {
    email,
    password,
  };
  fetch(signinUrl, {
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
        console.log(data.data[0].token)
        setCookie('token', data.data[0].token, 1);
        errorMessage.innerHTML = '';
        window.location.href = './dashboard.html';
      }
      else if (data.status === 400) {
        errorMessageDiv.style.display = 'block';
        errorMessage.innerHTML = data.error;
        signinButton.innerHTML = "Sign in";
      }
    })
    .catch((err) => {
      console.log(JSON.stringify(err));
      errorMessage.innerHTML = 'An error occured';
    })
};
