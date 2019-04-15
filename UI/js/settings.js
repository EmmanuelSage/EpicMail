const uploadDomain = 'https://esepicmail.herokuapp.com/api/v1/';

const getUploadCookie = (cookieSearchName) => {
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

const uploadToken = getUploadCookie('token');
const uploadImage = () => {
  const uploadSubmit = document.getElementById('upload-submit');
  uploadSubmit.innerHTML = "<img width = '15px' height= '15px' src = '../img/loading.png'>";
  const fileField = document.querySelector("input[type='file']");
  const uploadLabel = document.querySelector("label[for='image']");

  console.log(fileField.files);
  const file = fileField.files[0];
  const formData = new FormData();
  formData.append('image', file, file.name);
  console.log(formData);
  console.log('just before fetch');
  fetch(`${uploadDomain}auth/upload`, {
    method: 'PATCH',
    headers: {
      'x-access-token': uploadToken,
    },
    body: formData,
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      uploadSubmit.innerHTML = 'Submit';
      if (data.status === 201) {
        window.location.href = './settings.html';
        uploadLabel.innerHTML = data.data.message;
      }
      else {
        uploadLabel.innerHTML = data.error
      }

    })
    .catch((err) => {
      console.log(JSON.stringify(err));
    })
}
