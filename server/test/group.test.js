import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';

chai.use(chaiHttp);

const { expect } = chai;

let authToken;

describe('Create Group suite', () => {
  before((done) => {
    chai
      .request(app)
      .post('/api/v1/auth/signup')
      .send({
        firstName: 'david',
        lastName: 'Oluyale',
        email: 'david@gmail.com',
        password: 'david1',
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
});
