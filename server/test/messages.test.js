import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';

chai.use(chaiHttp);

const { expect } = chai;

let authToken;

describe('User can send message to individuals ', () => {
  before((done) => {
    chai
      .request(app)
      .post('/api/v1/auth/login')
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

  it('Should Post Messages if details are correct', (done) => {
    chai
      .request(app)
      .post('/api/v1/auth/messages')
      .set('x-access-token', authToken)
      .send({
        subject: 'The Weather',
        message: 'Lagos is very hot this days, like what',
        receiverId: '2',
        parentMessageId: '1',
      })
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body.status).to.be.equal(201);
        expect(res.body.data).to.deep.equal([
          {
            id: res.body.data[0].id,
            createdOn: res.body.data[0].createdOn,
            subject: 'The Weather',
            message: 'Lagos is very hot this days, like what',
            receiverId: 2,
            parentMessageId: 1,
          },
        ]);
        done(err);
      });
  });

  it('Should Assign 0 to parentMessageId if not given', (done) => {
    chai
      .request(app)
      .post('/api/v1/auth/messages')
      .set('x-access-token', authToken)
      .send({
        subject: 'The Weather',
        message: 'Lagos is very hot this days, like what',
        receiverId: '2',
        parentMessageId: '',
      })
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body.status).to.be.equal(201);
        expect(res.body.data[0].parentMessageId).to.be.equal(0);
        expect(res.body.data).to.deep.equal([
          {
            id: res.body.data[0].id,
            createdOn: res.body.data[0].createdOn,
            subject: 'The Weather',
            message: 'Lagos is very hot this days, like what',
            receiverId: 2,
            parentMessageId: 0,
          },
        ]);
        done(err);
      });
  });

  it('Should return error if token is not provided', (done) => {
    chai
      .request(app)
      .post('/api/v1/auth/messages')
      .set('x-access-token', '')
      .send({
        subject: 'The Weather',
        message: 'Lagos is very hot this days, like what',
        receiverId: '2',
        parentMessageId: '1',
      })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.status).to.be.equal(400);
        expect(res.body.error).to.be.equal('Token is not provided');
        done(err);
      });
  });

  it('Should return error if token is invalid', (done) => {
    chai
      .request(app)
      .post('/api/v1/auth/messages')
      .set('x-access-token', 'efniu&#&*h')
      .send({
        subject: 'The Weather',
        message: 'Lagos is very hot this days, like what',
        receiverId: '2',
        parentMessageId: '1',
      })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.status).to.be.equal(400);
        expect(res.body.error).to.be.equal('The token you provided is invalid');
        done(err);
      });
  });
});
