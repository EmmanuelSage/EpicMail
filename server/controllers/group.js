import db from '../models/Group';

const Group = {
  async create(req, res) {
    const reqGroup = {
      name: req.body.name,
      adminid: req.user.id,
    };

    const newGroup = await db.create(reqGroup);

    return res.status(201).send({
      status: 201,
      data: [{
        newGroup,
        message: `Group ${newGroup.name} has been created.`,
      }],
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
    // console.log(users);
  },

  async getGroups(req, res) {
    const currentUserId = req.user.id;
    const data = await db.getAllGroups(currentUserId);
    return res.status(200).send({
      status: 200,
      data,
    });
  },
};

export default Group;
