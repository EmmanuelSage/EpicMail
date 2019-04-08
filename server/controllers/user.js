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

    const token = Helper.generateToken(newUser.id);
    return res.status(201).send({
      status: 201,
      data: [{
        token,
        newUser: {
          id: newUser.id,
          firstName: newUser.firstname,
          lastName: newUser.lastname,
          email: newUser.email,

        },
        message: 'User sign up was succesfull',
      }],
    });
  },

  login(req, res) {
    const token = Helper.generateToken(req.user.id);
    return res.status(200).send({
      status: 200,
      data: [{
        token,
        message: 'User login was succesfull',
      }],
    });
  },

  async resetemail(req, res) {
    const { email } = req.body;
    const userDetails = await db.getUserByEmail(email);

    if (!userDetails) {
      return res.status(404).send({
        status: 404,
        error: 'User not found',
      });
    }
    const token = Helper.generateToken(userDetails.id);
    Helper.sendEmail(userDetails, token);
    return res.status(200).send({
      status: 200,
      data: {
        message: `Email has been sent to ${userDetails.email}`,
      },
    });
  },

  async resetpassword(req, res) {
    const email = req.user.id;
    const { password } = req.body;
    if (!password) {
      return res.status(400).send({
        status: 400,
        error: 'Password is required',
      });
    }
    const hashPassword = Helper.hashPassword(password);

    await db.resetPassword(email, hashPassword);
    return res.status(201).send({
      status: 201,
      data: {
        message: 'Password has been changed',
      },
    });
  },
};

export default User;
