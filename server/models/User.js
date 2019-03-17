class User {
  constructor() {
    this.users = [];
  }

  create(data) {
    const numOfUsers = (this.users.length);
    const countId = (numOfUsers === 0) ? 1 : (this.users[numOfUsers - 1].id + 1);
    const newUser = {
      id: countId,
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
      password: data.password,
    };
    this.users.push(newUser);
    return newUser;
  }

  findUser(email) {
    return this.users.find(user => user.email === email);
  }

  findUserId(id) {
    return this.users.find(user => parseInt(user.id, 10) === parseInt(id, 10));
  }
}

export default new User();
