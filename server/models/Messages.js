class Messages {
  constructor() {
    this.messages = [];
    this.logMessages = [[0]];
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

  getReceivedMessages(userId) {
    const allReceived = [];
    let currentMessage = {};
    this.messages.forEach((message) => {
      if (message.receiverId === userId) {
        currentMessage = message;
        if (this.logMessages[0].indexOf(userId) !== -1) {
          if (this.logMessages[userId].indexOf(currentMessage.id) !== -1) {
            currentMessage.status = 'Read';
          }
        } else {
          currentMessage.status = 'Unread';
        }
        allReceived.push(currentMessage);
      }
    });
    return allReceived;
  }

  getUnreadMessages() {
    this.notImplemented = '';
  }
}

export default new Messages();
