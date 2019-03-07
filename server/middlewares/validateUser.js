import Helper from '../utilities/helper';
import db from '../models/User';

const userValidator = {
  verifyUser(req, res, next) {
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
      return res.status(400).send({ status: 400, error: 'Please enter a password of at least six characters' });
    }
    if (Helper.isRegisteredEmail(req.body.email)) {
      return res.status(409).send({ status: 409, error: 'Email has already been registered' });
    }
    return next();
  },

  verifyLogin(req, res, next) {
    if (req.body.password.length < 6) {
      return res.status(400).send({
        status: 400,
        error: 'Please enter a password of at least six characters',
      });
    }

    if (!Helper.isValidEmail(req.body.email)) {
      return res.status(400).send({
        status: 400,
        error: 'Please enter a valid email address',
      });
    }

    const newLogin = db.findUser(req.body.email);

    if (!newLogin) {
      return res.status(400).send({
        status: 400,
        error: 'User with the email could not be found',
      });
    }
    if (!Helper.comparePassword(newLogin.password, req.body.password)) {
      return res.status(400).send({
        status: 400,
        error: 'The pasword you provided is incorrect',
      });
    }
    req.newLogin = newLogin;
    return next();
  },
};


export default userValidator;
