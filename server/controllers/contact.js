import db from '../models/Contact';

const Contact = {

  create(req, res) {
    const reqContact = {
      email: req.body.email,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
    };

    const newContact = db.create(reqContact);

    return res.status(201).send({
      status: 201,
      data: [{
        newContact,
        message: `Contact ${newContact.firstName} ${newContact.lastName} has been created.`,
      }],
    });
  },

};

export default Contact;
