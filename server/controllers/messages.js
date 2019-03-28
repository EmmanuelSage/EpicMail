import db from '../models/Messages';

const Messages = {
  async create(req, res) {
    const reqMessage = {
      subject: req.body.subject,
      message: req.body.message,
      senderId: req.user.id,
      receiverId: req.body.receiverId,
      parentMessageId: parseInt(req.body.parentMessageId, 10) || -1,
    };
    const newMessage = await db.create(reqMessage);
    return res.status(201).send({
      status: 201,
      data: {
        id: newMessage[0].id,
        createdon: newMessage[0].createdon,
        subject: newMessage[0].subject,
        message: newMessage[0].message,
        parentmessageid: newMessage[0].parentmessageid,
        status: newMessage[0].status,
      },
    });
  },

  async getUserReceivedMessages(req, res) {
    const currentUserId = req.user.id;
    const data = await db.getReceivedMessages(currentUserId);
    return res.status(200).send({
      status: 200,
      data,
    });
  },

  async getUserUnreadMessages(req, res) {
    const currentUserId = req.user.id;
    const data = await db.getUnreadMessages(currentUserId);
    return res.status(200).send({
      status: 200,
      data,
    });
  },

  async getUserSentMessages(req, res) {
    const currentUserId = req.user.id;
    const data = await db.getSentMessages(currentUserId);
    return res.status(200).send({
      status: 200,
      data,
    });
  },

  async getUserSpecificMessage(req, res) {
    const currentUserId = req.user.id;
    const paramsId = req.params.id;
    if (!Number(paramsId)) {
      return res.status(400).send({ status: 400, error: 'Please enter a valid message Id' });
    }
    const specificMessage = await db.getSpecificMessage(currentUserId, paramsId);
    if (!specificMessage) {
      return res.status(404).send({
        status: 404,
        error: 'Message not found',
      });
    }
    return res.status(200).send({
      status: 200,
      data: specificMessage,
    });
  },

  async deleteUserSpecificMessage(req, res) {
    const currentUserId = req.user.id;
    const paramsId = req.params.id;
    if (!Number(paramsId)) {
      return res.status(400).send({ status: 400, error: 'Please enter a valid message Id' });
    }
    const specificMessage = await db.getSpecificMessage(currentUserId, req.params.id);
    if (!specificMessage) {
      return res.status(404).send({
        status: 404,
        error: 'Message not found',
      });
    }
    db.deleteSpecificMessage(currentUserId, req.params.id);
    return res.status(200).send({
      status: 200,
      data: [{ message: 'Message has been deleted' }],
    });
  },

  async createDraft(req, res) {
    const reqMessage = {
      subject: req.body.subject,
      message: req.body.message,
      senderId: req.user.id,
      receiverId: req.body.receiverId,
      parentMessageId: parseInt(req.body.parentMessageId, 10) || -1,
    };
    const newMessage = await db.createDraftMessage(reqMessage);
    return res.status(201).send({
      status: 201,
      data: {
        id: newMessage[0].id,
        createdon: newMessage[0].createdon,
        subject: newMessage[0].subject,
        message: newMessage[0].message,
        parentmessageid: newMessage[0].parentmessageid,
        status: newMessage[0].status,
      },
    });
  },

  async getUserDraftMessages(req, res) {
    const currentUserId = req.user.id;
    const data = await db.getDraftMessages(currentUserId);
    return res.status(200).send({
      status: 200,
      data,
    });
  },

  async deleteDraft(req, res) {
    const currentUserId = req.user.id;
    const paramsId = req.params.id;
    if (!Number(paramsId)) {
      return res.status(400).send({ status: 400, error: 'Please enter a valid message Id' });
    }
    const specificMessage = await db.getSpecificDraft(currentUserId, req.params.id);
    if (!specificMessage) {
      return res.status(404).send({
        status: 404,
        error: 'Message not found',
      });
    }
    db.deleteSpecificMessage(currentUserId, req.params.id);
    return res.status(200).send({
      status: 200,
      data: [{ message: 'Message has been deleted' }],
    });
  },
};

export default Messages;
