const getSetCookie = (cookieSearchName) => {
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

const setToken = getSetCookie('token');

const redirectIfTokenSet = () => {
  if (!setToken) {
    window.location.href = '../index.html';
  }
};

redirectIfTokenSet();
