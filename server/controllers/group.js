import db from '../models/Group';

const Group = {
  async create(req, res) {
    const reqGroup = {
      name: req.body.name,
      adminid: req.user.id,
    };

    const nameCheck = await db.checkgroupName(req.body.name, req.user.id);

    if (nameCheck === 'duplicate') {
      return res.status(400).send({ status: 400, error: `Sorry Group name ${req.body.name} already exists.` });
    }

    const newGroup = await db.create(reqGroup);
    return res.status(201).send({
      status: 201,
      message: `Group ${newGroup.name} has been created.`,
      data: {
        id: newGroup.id,
        name: newGroup.name,
        userId: newGroup.adminid,
      },
    });
  },

  async addMember(req, res) {
    const usersString = (req.body.users);
    const users = usersString.map(ele => parseInt(ele, 10));

    const newMember = await db.addMember(req.params.groupid, users);

    return res.status(201).send({
      status: 201,
      data: [{
        newMember,
        message: 'Members have been added to group',
      }],
    });
  },

  async getGroups(req, res) {
    const currentUserId = req.user.id;
    const data = await db.getAllGroups(currentUserId);
    return res.status(200).send({
      status: 200,
      data,
    });
  },

  async updateName(req, res) {
    const currentUserId = req.user.id;
    const groupId = req.params.id;
    const newName = req.body.name;
    const data = await db.updateGroupName(currentUserId, groupId, newName);
    return res.status(201).send({
      status: 201,
      data,
    });
  },

  async deleteGroup(req, res) {
    const currentUserId = req.user.id;
    const groupId = req.params.id;
    await db.deleteGroup(currentUserId, groupId);
    return res.status(200).send({
      status: 200,
      data: { message: 'Group has been deleted' },
    });
  },

  async deleteGroupMember(req, res) {
    const currentUserId = req.user.id;
    const groupId = req.params.groupid;
    const userId = req.params.userid;
    await db.deleteGroupMember(currentUserId, groupId, userId);
    return res.status(200).send({
      status: 200,
      data: [{ message: 'Group Member has been deleted' }],
    });
  },

  async SendMessageGroup(req, res) {
    const reqMessage = {
      subject: req.body.subject,
      message: req.body.message,
      senderId: parseInt(req.user.id, 10),
      groupId: req.params.id,
      parentMessageId: parseInt(req.body.parentMessageId, 10) || -1,
    };
    const newMessage = await db.SendMessageGroup(reqMessage);
    return res.status(201).send({
      status: 201,
      data: [newMessage],
    });
  },

};

export default Group;
