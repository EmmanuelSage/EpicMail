import db from '../models/Group';

const Group = {
  create(req, res) {
    const reqGroup = {
      groupName: req.body.groupName,
    };

    const newGroup = db.create(reqGroup);

    return res.status(201).send({
      status: 201,
      data: [{
        newGroup,
        message: `Group ${newGroup.groupName} has been created.`,
      }],
    });
  },

  addMember(req, res) {
    const reqMember = {
      groupId: req.body.groupId,
      memberId: req.body.memberId,
    };

    const newMember = db.addMember(reqMember);

    return res.status(201).send({
      status: 201,
      data: [{
        newMember,
        message: 'Member has been added to group',
      }],
    });
  },
};

export default Group;
