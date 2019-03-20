import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';
import testHelper from '../utilities/testHelper';

chai.use(chaiHttp);

const { expect } = chai;

let authToken;

describe('Tests for group route', () => {
  describe('Create Group suite', () => {
    before((done) => {
      chai
        .request(app)
        .post('/api/v1/auth/signup')
        .send({
          firstName: 'mark',
          lastName: 'markert',
          email: 'marke@gmail.com',
          password: 'marjerur',
        })
        .end((err, res) => {
          authToken = res.body.data[0].token;
          done(err);
        });
    });

    it('should create a new group if logged in', (done) => {
      const groupName = 'co-workers';
      chai
        .request(app)
        .post('/api/v1/group')
        .set('x-access-token', authToken)
        .send({
          groupName,
        })
        .end((err, res) => {
          expect(res).to.have.status(201);
          expect(res.body.status).to.be.equal(201);
          expect(res.body.data[0].message).to.equal(`Group ${groupName} has been created.`);
          expect(res.body.data[0].newGroup.id).to.equal(1);
          done(err);
        });
    });

    it('should add a new member if logged in', (done) => {
      chai
        .request(app)
        .post('/api/v1/group/member')
        .set('x-access-token', authToken)
        .send({
          groupId: 1,
          memberId: 1,
        })
        .end((err, res) => {
          expect(res).to.have.status(201);
          expect(res.body.status).to.be.equal(201);
          expect(res.body.data[0].message).to.equal('Member has been added to group');
          done(err);
        });
    });
  });
  after(() => {
    testHelper.clearUsersTable();
  });
});
