class Messages {
  constructor() {
    this.messages = [];
    this.logMessages = [[0]];
    this.deletedMessages = [[0]];
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
      status: 'Not Assigned',
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
        if (!this.isMessageDeleted(userId, currentMessage.id)) {
          allReceived.push(currentMessage);
        }
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
            // allUnread.push(currentMessage);
            if (!this.isMessageDeleted(userId, currentMessage.id)) {
              allUnread.push(currentMessage);
            }
          }
        } else {
          currentMessage.status = 'Unread';
          if (!this.isMessageDeleted(userId, currentMessage.id)) {
            allUnread.push(currentMessage);
          }
          // allUnread.push(currentMessage);
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
        if (!this.isMessageDeleted(userId, currentMessage.id)) {
          allSent.push(currentMessage);
        }
        // allSent.push(currentMessage);
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
        if (!this.isMessageDeleted(userId, foundMessage.id)) {
          return foundMessage;
        }
        // return foundMessage;
      }
    }

    return 'not Found';
  }

  deleteSpecificMessage(userId, messageId) {
    const foundMessage = this.messages
      .find(message => parseInt(message.id, 10) === parseInt(messageId, 10));
    let returnMessage = '';

    if (foundMessage) {
      if (foundMessage.receiverId === userId || foundMessage.senderId === userId) {
        if (this.deletedMessages[0].indexOf(userId) !== -1) {
          if (this.deletedMessages[userId].indexOf(foundMessage.id) !== -1) {
            returnMessage = 'Message does not exist, had already been deleted';
          } else {
            this.deletedMessages[userId].push(foundMessage.id);
            returnMessage = 'Message has been deleted';
          }
          // this.deletedMessages[userId].push(foundMessage.id);
        } else {
          this.deletedMessages[0].push(userId);
          this.deletedMessages[userId] = [];
          this.deletedMessages[userId].push(foundMessage.id);
          returnMessage = 'Message has been deleted user first time deleting';
        }
      }
    }
    return returnMessage;
  }

  isMessageDeleted(userId, messageId) {
    if (this.deletedMessages[0].indexOf(userId) !== -1) {
      if (this.deletedMessages[userId].indexOf(messageId) !== -1) {
        return true;
      }
    }
    return false;
  }
}

export default new Messages();
