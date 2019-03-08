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
};

export default Group;
