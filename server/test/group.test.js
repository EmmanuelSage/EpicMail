import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';

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
        .post('/api/v1/groups')
        .set('x-access-token', authToken)
        .send({
          name: groupName,
        })
        .end((err, res) => {
          expect(res).to.have.status(201);
          expect(res.body.status).to.be.equal(201);
          done(err);
        });
    });

    it('should get all groups', (done) => {
      chai
        .request(app)
        .get('/api/v1/groups')
        .set('x-access-token', authToken)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body.status).to.be.equal(200);
          done(err);
        });
    });

    it('should add a new user to a group', (done) => {
      chai
        .request(app)
        .post('/api/v1/groups/1/users')
        .set('x-access-token', authToken)
        .send({
          users: [1, 2, 3],
        })
        .end((err, res) => {
          expect(res).to.have.status(201);
          expect(res.body.status).to.be.equal(201);
          done(err);
        });
    });

    it('should update group name', (done) => {
      chai
        .request(app)
        .patch('/api/v1/groups/1/name')
        .set('x-access-token', authToken)
        .send({
          name: 'Andela',
        })
        .end((err, res) => {
          expect(res).to.have.status(201);
          expect(res.body.status).to.be.equal(201);
          done(err);
        });
    });

    it('should add users to group', (done) => {
      chai
        .request(app)
        .post('/api/v1/groups/1/users')
        .set('x-access-token', authToken)
        .send({
          users: [2, 3, 4],
        })
        .end((err, res) => {
          expect(res).to.have.status(201);
          expect(res.body.status).to.be.equal(201);
          done(err);
        });
    });
    it('should delete a group member', (done) => {
      chai
        .request(app)
        .delete('/api/v1/groups/1/users/1')
        .set('x-access-token', authToken)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body.status).to.be.equal(200);
          done(err);
        });
    });

    it('should send email to group', (done) => {
      chai
        .request(app)
        .post('/api/v1/groups/1/messages')
        .set('x-access-token', authToken)
        .send({
          subject: 'This is awesome',
          message: 'I can code all day',
        })
        .end((err, res) => {
          expect(res).to.have.status(201);
          expect(res.body.status).to.be.equal(201);
          done(err);
        });
    });

    it('should send email to group with parentid', (done) => {
      chai
        .request(app)
        .post('/api/v1/groups/1/messages')
        .set('x-access-token', authToken)
        .send({
          subject: 'This is awesome',
          message: 'I can code all day',
          parentMessageId: '1',
        })
        .end((err, res) => {
          expect(res).to.have.status(201);
          expect(res.body.status).to.be.equal(201);
          done(err);
        });
    });
  });

  describe('Group validations', () => {
    it('should return error if group name in create group is absent', (done) => {
      chai
        .request(app)
        .post('/api/v1/groups')
        .set('x-access-token', authToken)
        .send({
          name: '',
        })
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body.status).to.be.equal(400);
          done(err);
        });
    });

    it('should add a new user to a group', (done) => {
      chai
        .request(app)
        .post('/api/v1/groups/1/users')
        .set('x-access-token', authToken)
        .send({
          users: '',
        })
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body.status).to.be.equal(400);
          done(err);
        });
    });

    it('should add a new user to a group', (done) => {
      chai
        .request(app)
        .post('/api/v1/groups/1/users')
        .set('x-access-token', authToken)
        .send({
          users: ['2ert', 'as'],
        })
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body.status).to.be.equal(400);
          done(err);
        });
    });

    it('should return error if new group name is empty', (done) => {
      chai
        .request(app)
        .patch('/api/v1/groups/1/name')
        .set('x-access-token', authToken)
        .send({
          name: '',
        })
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body.status).to.be.equal(400);
          done(err);
        });
    });

    it('should update group name', (done) => {
      chai
        .request(app)
        .patch('/api/v1/groups/hey/name')
        .set('x-access-token', authToken)
        .send({
          name: 'Andela',
        })
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body.status).to.be.equal(400);
          done(err);
        });
    });

    it('should return error if send email to group subject is empty', (done) => {
      chai
        .request(app)
        .post('/api/v1/groups/1/messages')
        .set('x-access-token', authToken)
        .send({
          subject: '',
          message: 'I can code all day',
        })
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body.status).to.be.equal(400);
          done(err);
        });
    });

    it('should return error if send email to group message is empty', (done) => {
      chai
        .request(app)
        .post('/api/v1/groups/1/messages')
        .set('x-access-token', authToken)
        .send({
          subject: 'Hello world',
          message: '',
        })
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body.status).to.be.equal(400);
          done(err);
        });
    });

    it('should return error if group is for send mail to group is invalid', (done) => {
      chai
        .request(app)
        .post('/api/v1/groups/hey/messages')
        .set('x-access-token', authToken)
        .send({
          subject: 'Hello world',
          message: 'Let us code Javascript',
        })
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body.status).to.be.equal(400);
          done(err);
        });
    });

    it('should return error if group is for send mail to group is invalid', (done) => {
      chai
        .request(app)
        .post('/api/v1/groups/hey/messages')
        .set('x-access-token', authToken)
        .send({
          subject: 'Hello world',
          message: 'Let us code Javascript',
          parentMessageId: 'hello',
        })
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body.status).to.be.equal(400);
          done(err);
        });
    });
  });
});
