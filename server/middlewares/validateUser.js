import Helper from '../utilities/helper';

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
};


export default userValidator;
