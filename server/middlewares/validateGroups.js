
const GroupValidations = {
  async createGroup(req, res, next) {
    if (!req.body.name) {
      return res.status(400).send({ status: 400, error: 'Please enter a group name' });
    }
    return next();
  },

  async addMember(req, res, next) {
    const usersArray = req.body.users;
    if (!Array.isArray(usersArray)) {
      return res.status(400).send({ status: 400, error: 'Please pass an Array' });
    }
    if (!Number(usersArray.join(''))) {
      return res.status(400).send({ status: 400, error: 'Please enter valid Ids in Array' });
    }
    return next();
  },

  async updateName(req, res, next) {
    if (!req.body.name) {
      return res.status(400).send({ status: 400, error: 'Please enter a new group name' });
    }
    if (!Number(req.params.id)) {
      return res.status(400).send({ status: 400, error: 'Please enter a valid group Id' });
    }
    return next();
  },

  async sendMessageToGroup(req, res, next) {
    if (!req.body.subject) {
      return res.status(400).send({ status: 400, error: 'Please enter a subject' });
    }
    if (!req.body.message) {
      return res.status(400).send({ status: 400, error: 'Please enter a message' });
    }
    if (req.body.parentMessageId && !Number(req.body.parentMessageId)) {
      return res.status(400).send({ status: 400, error: 'Please enter a Valid parentMessageId' });
    }
    if (!Number(req.params.id)) {
      return res.status(400).send({ status: 400, error: 'Please enter a valid group Id' });
    }
    return next();
  },
};

export default GroupValidations;
