import db from '../models/User';
import helper from '../utilities/helper';

const messagesValidator = {
  async verifyMessage(req, res, next) {
    const errors = [];
    if (!req.body.subject) {
      errors.push({ status: 400, error: 'Please enter a subject' });
    }
    if (!req.body.message) {
      errors.push({ status: 400, error: 'Please enter a message' });
    }
    if (!req.body.receiverId || !helper.isValidEmail(req.body.receiverId)) {
      errors.push({ status: 400, error: 'Please enter a valid receiver Id' });
    }
    if (!errors.length >= 1) {
      const receiverEmail = await db.findUserEmail(req.body.receiverId);
      if (!receiverEmail) {
        errors.push({ status: 404, error: 'User with that receiver id was not found' });
      }
    }
    if (errors.length >= 1) {
      return res.status(400).send({
        status: 400,
        errors,
      });
    }
    return next();
  },

  async verifyDraftMessage(req, res, next) {
    if (!req.body.message && !req.body.subject && !req.body.receiverId) {
      return res.status(400).send({ status: 400, error: 'Please enter a subject, message or receiver id' });
    }
    return next();
  },
};


export default messagesValidator;
