const User = {
  create(req, res) {
    return res.status(201).send({
      status: 201,
      data: [{
        message: 'User sign up was succesfull',
      }],
    });
  },
};

export default User;
