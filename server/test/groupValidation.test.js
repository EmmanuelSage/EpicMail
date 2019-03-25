import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';

chai.use(chaiHttp);

const { expect } = chai;

let authToken;

describe('Tests for group route', () => {
  before((done) => {
    chai
      .request(app)
      .post('/api/v1/auth/signup')
      .send({
        firstName: 'jean',
        lastName: 'grey',
        email: 'jeangry@gmail.com',
        password: 'jeangreyoh',
      })
      .end((err, res) => {
        authToken = res.body.data[0].token;
        done(err);
      });
  });
  describe('Create Group suite', () => {
    before((done) => {
      const groupName = 'Collegues';
      chai
        .request(app)
        .post('/api/v1/groups')
        .set('x-access-token', authToken)
        .send({
          name: groupName,
        })
        .end((err) => {
          done(err);
        });
    });

    it('should return an error if one tries to create an existing group', (done) => {
      const groupName = 'Collegues';
      chai
        .request(app)
        .post('/api/v1/groups')
        .set('x-access-token', authToken)
        .send({
          name: groupName,
        })
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body.status).to.be.equal(400);
          expect(res.body.error).to.be.equal(`Sorry Group name ${groupName} already exists.`);
          done(err);
        });
    });
    it('should delete a group if authenticated', (done) => {
      chai
        .request(app)
        .delete('/api/v1/groups/3')
        .set('x-access-token', authToken)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body.status).to.be.equal(200);
          expect(res.body.data.message).to.be.equal('Group has been deleted');
          done(err);
        });
    });
  });
});
