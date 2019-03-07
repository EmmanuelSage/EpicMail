class Messages {
  constructor() {
    this.messages = [];
  }

  create(data) {
    const numOfMessages = (this.messages.length);
    const messageId = (numOfMessages === 0) ? 1 : (this.messages[numOfMessages - 1].id + 1);
    const newMessage = {
      id: messageId,
      createdOn: new Date(),
      subject: data.subject,
      message: data.message,
      senderId: data.senderId,
      receiverId: data.receiverId,
      parentMessageId: data.parentMessageId,
      status: 'Sent',
    };
    this.messages.push(newMessage);
    return newMessage;
  }
}

export default new Messages();
