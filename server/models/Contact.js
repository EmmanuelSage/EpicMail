class Contact {
  constructor() {
    this.contacts = [];
  }

  create(data) {
    const numOfContacts = (this.contacts.length);
    const countId = (numOfContacts === 0) ? 1 : (this.contacts[numOfContacts - 1].id + 1);
    const newContact = {
      id: countId,
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
    };

    this.contacts.push(newContact);
    return newContact;
  }
}

export default new Contact();
