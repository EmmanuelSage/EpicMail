import db from '../models/User';

const messagesValidator = {
  async verifyMessage(req, res, next) {
    const errors = [];
    if (!req.body.subject) {
      errors.push({ status: 400, error: 'Please enter a subject' });
    }
    if (!req.body.message) {
      errors.push({ status: 400, error: 'Please enter a message' });
    }
    if (!req.body.receiverId || !Number(req.body.receiverId)) {
      errors.push({ status: 400, error: 'Please enter a valid receiver Id' });
    }
    if (!errors.length >= 1) {
      const receiverId = await db.findUserId(req.body.receiverId);
      if (!receiverId) {
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
};


export default messagesValidator;
