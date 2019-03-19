import Helper from '../utilities/helper';
import db from '../models/User';

const userValidator = {
  async verifyUser(req, res, next) {
    if (!Helper.isValidEmail(req.body.email)) {
      return res.status(400).send({ status: 400, error: 'Please enter a valid email address' });
    }
    if (!Helper.isValidName(req.body.firstName)) {
      return res.status(400).send({ status: 400, error: 'Please enter a valid firstName' });
    }
    if (!Helper.isValidName(req.body.lastName)) {
      return res.status(400).send({ status: 400, error: 'Please enter a valid lastName' });
    }
    if (req.body.password.length < 6) {
      return res.status(400)
        .send({ status: 400, error: 'Please enter a password of at least six characters' });
    }
    const receiverEmail = await db.getEmail(req.body.email);
    if (receiverEmail) {
      return res.status(409).send({ status: 409, error: 'Email has already been registered' });
    }

    return next();
  },

  async verifyLogin(req, res, next) {
    if (!req.body.password) {
      return res.status(400).send({
        status: 400,
        error: 'Password is required',
      });
    }

    if (!req.body.email) {
      return res.status(400).send({
        status: 400,
        error: 'Email is empty',
      });
    }

    const userEmail = await db.getEmail(req.body.email);

    if (!userEmail) {
      return res.status(404).send({
        status: 404,
        error: 'Email not found',
      });
    }
    const user = await db.getUserByEmail(req.body.email);
    if (!Helper.comparePassword(user.password, req.body.password)) {
      return res.status(400).send({
        status: 400,
        error: 'email or pasword is incorrect',
      });
    }
    req.user = user;
    return next();
  },
};


export default userValidator;
