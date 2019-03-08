class Group {
  constructor() {
    this.groups = [];
  }

  create(data) {
    const numOfGroups = (this.groups.length);
    const countId = (numOfGroups === 0) ? 1 : (this.groups[numOfGroups - 1].id + 1);
    const newGroup = {
      id: countId,
      groupName: data.groupName,
    };

    this.groups.push(newGroup);
    return newGroup;
  }

  addMember() {
    this.notImplemented = '';
  }
}

export default new Group();
