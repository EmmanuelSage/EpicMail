import db from '../models/User';
import Helper from '../utilities/helper';

const User = {
  async create(req, res) {
    const hashPassword = Helper.hashPassword(req.body.password);

    const reqUser = {
      email: req.body.email,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      password: hashPassword,
    };

    const newUser = await db.create(reqUser);
    console.log(newUser);

    const token = Helper.generateToken(newUser.id);
    return res.status(201).send({
      status: 201,
      data: [{
        token,
        newUser,
        message: 'User sign up was succesfull',
      }],
    });
  },

  login(req, res) {
    const token = Helper.generateToken(req.user.id);
    return res.status(201).send({
      status: 201,
      data: [{
        token,
        message: 'User login was succesfull',
      }],
    });
  },
};

export default User;
