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
      .post('/api/v1/auth/signup')
      .send({
        firstName: 'sage',
        lastName: 'Oluyale',
        email: 'sage@gmail.com',
        password: 'sage57',
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

  it('Should return error if subject is empty', (done) => {
    chai
      .request(app)
      .post('/api/v1/auth/messages')
      .set('x-access-token', authToken)
      .send({
        subject: '',
        message: 'Lagos is very hot this days, like what',
        receiverId: '2',
        parentMessageId: '1',
      })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.status).to.be.equal(400);
        expect(res.body.error).to.be.equal('Please enter a subject');
        done(err);
      });
  });

  it('Should return error if message is empty', (done) => {
    chai
      .request(app)
      .post('/api/v1/auth/messages')
      .set('x-access-token', authToken)
      .send({
        subject: 'The weather',
        message: '',
        receiverId: '2',
        parentMessageId: '1',
      })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.status).to.be.equal(400);
        expect(res.body.error).to.be.equal('Please enter a message');
        done(err);
      });
  });

  it('Should return error if receiverId is empty', (done) => {
    chai
      .request(app)
      .post('/api/v1/auth/messages')
      .set('x-access-token', authToken)
      .send({
        subject: 'The weather',
        message: 'Lagos is very hot this days, like what',
        receiverId: '',
        parentMessageId: '1',
      })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.status).to.be.equal(400);
        expect(res.body.error).to.be.equal('Please enter a receiverId');
        done(err);
      });
  });
});
