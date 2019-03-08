class Group {
  constructor() {
    this.groups = [];
    this.members = [];
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

  addMember(data) {
    const numOfMembers = (this.members.length);
    const countId = (numOfMembers === 0) ? 1 : (this.members[numOfMembers - 1].id + 1);
    const newMember = {
      id: countId,
      groupId: data.groupId,
      memberId: data.memberId,
    };

    this.members.push(newMember);
    return newMember;
  }
}

export default new Group();
