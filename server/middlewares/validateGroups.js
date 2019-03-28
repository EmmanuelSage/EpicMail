import db from '../models/Group';
import helper from '../utilities/helper';

const GroupValidations = {
  async createGroup(req, res, next) {
    if (!req.body.name) {
      return res.status(400).send({ status: 400, error: 'Please enter a group name' });
    }
    return next();
  },

  async addMember(req, res, next) {
    const usersArray = req.body.users;
    const errors = [];
    if (!Array.isArray(usersArray)) {
      return res.status(400).send({ status: 400, error: 'Please pass an Array' });
    }
    if (usersArray.length < 1) {
      return res.status(400).send({ status: 400, error: 'Please enter a receiver id in Array' });
    }
    usersArray.forEach((ele) => {
      if (!helper.isValidEmail(ele) || !helper.verifyEmail(ele)) {
        errors.push(`Email ${ele} is not valid`);
      }
    });
    if (errors.length >= 1) {
      return res.status(400).send({
        status: 400,
        errors,
      });
    }
    return next();
  },

  async updateName(req, res, next) {
    const errors = [];
    if (!req.body.name) {
      errors.push({ error: 'Please enter a new group name' });
    }
    if (!Number(req.params.id)) {
      errors.push({ error: 'Please enter a valid group Id' });
    }
    if (errors.length >= 1) {
      return res.status(400).send({
        status: 400,
        errors,
      });
    }
    const groupId = await db.checkgroupId(req.params.id, req.user.id);
    if (groupId.length < 1) {
      return res.status(404).send({ status: 404, error: `Group id ${req.params.id} was not found` });
    }
    return next();
  },

  async sendMessageToGroup(req, res, next) {
    const errors = [];
    if (!req.body.subject) {
      errors.push({ status: 400, error: 'Please enter a subject' });
    }
    if (!req.body.message) {
      errors.push({ status: 400, error: 'Please enter a message' });
    }
    if (req.body.parentMessageId && !Number(req.body.parentMessageId)) {
      errors.push({ status: 400, error: 'Please enter a Valid parentMessageId' });
    }
    if (!Number(req.params.id)) {
      errors.push({ status: 400, error: 'Please enter a valid group Id' });
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

export default GroupValidations;