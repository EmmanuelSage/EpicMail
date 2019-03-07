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
}

export default new User();
