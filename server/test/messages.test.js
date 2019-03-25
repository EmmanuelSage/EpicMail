import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';

chai.use(chaiHttp);

const { expect } = chai;

let authToken;
describe('Tests for messsages route', () => {
  describe('User can send message to individuals ', () => {
    before((done) => {
      chai
        .request(app)
        .post('/api/v1/auth/signup')
        .send({
          firstName: 'Sage',
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
        .post('/api/v1/messages')
        .set('x-access-token', authToken)
        .send({
          subject: 'The Weather',
          message: 'Lagos is very hot this days, like what',
          receiverId: '1',
        })
        .end((err, res) => {
          expect(res).to.have.status(201);
          expect(res.body.status).to.be.equal(201);
          done(err);
        });
    });

    it('Should return error if one sends message to a receiver id not found', (done) => {
      chai
        .request(app)
        .post('/api/v1/messages')
        .set('x-access-token', authToken)
        .send({
          subject: 'The Weather',
          message: 'Lagos is very hot this days, like what',
          receiverId: '999',
        })
        .end((err, res) => {
          expect(res).to.have.status(400);
          done(err);
        });
    });

    it('Should return error if token is not provided', (done) => {
      chai
        .request(app)
        .post('/api/v1/messages')
        .set('x-access-token', '')
        .send({
          subject: 'The Weather',
          message: 'Lagos is very hot this days, like what',
          receiverId: '1',
          parentMessageId: '1',
        })
        .end((err, res) => {
          expect(res).to.have.status(401);
          expect(res.body.status).to.be.equal(401);
          expect(res.body.error).to.be.equal('Token is not provided');
          done(err);
        });
    });

    it('Should return error if subject is empty', (done) => {
      chai
        .request(app)
        .post('/api/v1/messages')
        .set('x-access-token', authToken)
        .send({
          subject: '',
          message: 'Lagos is very hot this days, like what',
          receiverId: '1',
          parentMessageId: '1',
        })
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body.status).to.be.equal(400);
          done(err);
        });
    });

    it('Should return error if message is empty', (done) => {
      chai
        .request(app)
        .post('/api/v1/messages')
        .set('x-access-token', authToken)
        .send({
          subject: 'The weather',
          message: '',
          receiverId: '1',
          parentMessageId: '1',
        })
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body.status).to.be.equal(400);
          done(err);
        });
    });

    it('Should return error if receiverId is empty', (done) => {
      chai
        .request(app)
        .post('/api/v1/messages')
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
          done(err);
        });
    });
  });

  // User can Get message tests
  describe('User can get all received messages', () => {
    before((done) => {
      chai
        .request(app)
        .post('/api/v1/messages')
        .set('x-access-token', authToken)
        .send({
          subject: 'The Weather',
          message: 'Lagos is very hot this days, like what',
          receiverId: '1',
          parentMessageId: '1',
        })
        .end((err) => {
          done(err);
        });
    });
    it('Should return all received messages', (done) => {
      chai
        .request(app)
        .get('/api/v1/messages')
        .set('x-access-token', authToken)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body.status).to.be.equal(200);
          done(err);
        });
    });
    it('Should return error if token is not provided', (done) => {
      chai
        .request(app)
        .get('/api/v1/messages')
        .set('x-access-token', '')
        .end((err, res) => {
          expect(res).to.have.status(401);
          expect(res.body.status).to.be.equal(401);
          expect(res.body.error).to.be.equal('Token is not provided');
          done(err);
        });
    });

    it('Should return error if token is incorrect', (done) => {
      chai
        .request(app)
        .get('/api/v1/messages')
        .set('x-access-token', 'sdsdscdc')
        .end((err, res) => {
          expect(res).to.have.status(401);
          expect(res.body.status).to.be.equal(401);
          expect(res.body.error).to.be.equal('Token is incorrect');
          done(err);
        });
    });
  });

  // User can Get unread message tests
  describe('User can get all unread messages', () => {
    before((done) => {
      chai
        .request(app)
        .post('/api/v1/messages/unread')
        .set('x-access-token', authToken)
        .send({
          subject: 'The Weather',
          message: 'Lagos is very hot this days, like what',
          receiverId: '1',
          parentMessageId: '1',
        })
        .end((err) => {
          done(err);
        });
    });
    it('Should return all unread messages', (done) => {
      chai
        .request(app)
        .get('/api/v1/messages/unread')
        .set('x-access-token', authToken)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body.status).to.be.equal(200);
          done(err);
        });
    });
  });

  // User can Get Sent message tests
  describe('User can get Sent messages', () => {
    before((done) => {
      chai
        .request(app)
        .post('/api/v1/messages')
        .set('x-access-token', authToken)
        .send({
          subject: 'The Weather',
          message: 'Lagos is very hot this days, like what',
          receiverId: '9',
          parentMessageId: '1',
        })
        .end((err) => {
          done(err);
        });
    });
    it('Should return all Sent messages', (done) => {
      chai
        .request(app)
        .get('/api/v1/messages/sent')
        .set('x-access-token', authToken)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body.status).to.be.equal(200);
          // expect(res.body.data[0].status).to.be.equal('Sent');
          done(err);
        });
    });
  });

  // User can Get specific message tests
  describe('User can get Specific message', () => {
    before((done) => {
      chai
        .request(app)
        .post('/api/v1/messages/1')
        .set('x-access-token', authToken)
        .send({
          subject: 'The Weather',
          message: 'Lagos is very hot this days, like what',
          receiverId: '9',
          parentMessageId: '1',
        })
        .end((err) => {
          done(err);
        });
    });
    it('Should return a specific message', (done) => {
      chai
        .request(app)
        .get('/api/v1/messages/5')
        .set('x-access-token', authToken)
        .end((err, res) => {
          expect(res).to.have.status(200);
          done(err);
        });
    });
    it('Should return error if specific message id iis incorrect', (done) => {
      chai
        .request(app)
        .get('/api/v1/messages/50ade0')
        .set('x-access-token', authToken)
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body.status).to.be.equal(400);
          expect(res.body.error).to.be.equal('Please enter a valid message Id');
          done(err);
        });
    });
    it('Should return error if specific message cannot be found', (done) => {
      chai
        .request(app)
        .get('/api/v1/messages/500')
        .set('x-access-token', authToken)
        .end((err, res) => {
          expect(res).to.have.status(404);
          expect(res.body.status).to.be.equal(404);
          expect(res.body.error).to.be.equal('Message not found');
          done(err);
        });
    });
  });

  // User can Delete Specific message tests
  describe('User can delete Specific message', () => {
    before((done) => {
      chai
        .request(app)
        .post('/api/v1/messages')
        .set('x-access-token', authToken)
        .send({
          subject: 'The Weather',
          message: 'Lagos is very hot this days, like what',
          receiverId: '1',
          parentMessageId: '1',
        })
        .end((err) => {
          done(err);
        });
    });
    it('Should delete a specific message', (done) => {
      chai
        .request(app)
        .delete('/api/v1/messages/3')
        .set('x-access-token', authToken)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body.status).to.be.equal(200);
          done(err);
        });
    });
    it('Should return error if id to delete a specific message is wrong', (done) => {
      chai
        .request(app)
        .delete('/api/v1/messages/adsa3')
        .set('x-access-token', authToken)
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body.status).to.be.equal(400);
          expect(res.body.error).to.be.equal('Please enter a valid message Id');
          done(err);
        });
    });
    it('Should return error if id to delete a specific message is not found', (done) => {
      chai
        .request(app)
        .delete('/api/v1/messages/342')
        .set('x-access-token', authToken)
        .end((err, res) => {
          expect(res).to.have.status(404);
          expect(res.body.status).to.be.equal(404);
          expect(res.body.error).to.be.equal('Message not found');
          done(err);
        });
    });
  });
});
