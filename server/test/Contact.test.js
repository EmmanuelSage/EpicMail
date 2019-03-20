// import { use, request } from 'chai';
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';
import testHelper from '../utilities/testHelper';

chai.use(chaiHttp);

const { expect } = chai;

let authToken;
describe('Tests for contact route', () => {
  describe('Create Contact suite', () => {
    before((done) => {
      chai
        .request(app)
        .post('/api/v1/auth/signup')
        .send({
          firstName: 'bobby',
          lastName: 'west',
          email: 'bobbywest@gmail.com',
          password: 'bbywster',
        })
        .end((err, res) => {
          authToken = res.body.data[0].token;
          done(err);
        });
    });

    it('should create a new contact if logged in', (done) => {
      const firstName = 'james';
      const lastName = 'chadwick';
      chai
        .request(app)
        .post('/api/v1/contact')
        .set('x-access-token', authToken)
        .send({
          email: 'xesddf@gjfd.com',
          firstName,
          lastName,
        })
        .end((err, res) => {
          expect(res).to.have.status(201);
          expect(res.body.status).to.be.equal(201);
          expect(res.body.data[0].message).to.equal(`Contact ${firstName} ${lastName} has been created.`);
          done(err);
        });
    });
  });
  after(() => {
    testHelper.clearUsersTable();
  });
});
