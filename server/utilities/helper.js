const Helper = {

  isValidEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
  },

  isValidName(name) {
    return /^[a-zA-Z]+$/.test(name);
  },

};

export default Helper;
