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


  getUnreadMessages(userId) {
    const allUnread = [];
    let currentMessage = {};
    this.messages.forEach((message) => {
      if (message.receiverId === userId) {
        currentMessage = message;
        if (this.logMessages[0].indexOf(userId) !== -1) {
          if (this.logMessages[userId].indexOf(currentMessage.id) === -1) {
            currentMessage.status = 'Unread';
            allUnread.push(currentMessage);
          }
        } else {
          currentMessage.status = 'Read';

          allUnread.push(currentMessage);
        }
      }
    });
    return allUnread;
  }

  getSentMessages(userId) {
    const allSent = [];
    let currentMessage = {};
    this.messages.forEach((message) => {
      if (message.senderId === userId) {
        currentMessage = message;
        currentMessage.status = 'Sent';
        allSent.push(currentMessage);
      }
    });
    return allSent;
  }

  getSpecificMessage(userId, messageId) {
    const foundMessage = this.messages
      .find(message => parseInt(message.id, 10) === parseInt(messageId, 10));

    if (foundMessage) {
      if (foundMessage.receiverId === userId || foundMessage.senderId === userId) {
        if (this.logMessages[0].indexOf(userId) !== -1) {
          this.logMessages[userId].push(foundMessage.id);
        } else {
          this.logMessages[0].push(userId);
          this.logMessages[userId] = [];
          this.logMessages[userId].push(foundMessage.id);
        }
        foundMessage.status = 'Read';
        return foundMessage;
      }
    }

    return 'not Found';
  }

  deleteSpecificMessage() {
    this.notImplemented = '';
  }
}

export default new Messages();
