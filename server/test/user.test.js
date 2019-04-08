import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';

chai.use(chaiHttp);

const { expect } = chai;

let authToken;
describe('Tests for users route', () => {
  describe('Create User Post route authentication', () => {
    it('should signup a new user if the details are correct', (done) => {
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
          expect(res).to.have.status(201);
          expect(res.body.status).to.be.equal(201);
          expect(res.body.data[0].message).to.equal('User sign up was succesfull');
          done(err);
        });
    });

    it('Should return an error if email is not provided', (done) => {
      chai
        .request(app)
        .post('/api/v1/auth/signup')
        .send({
          firstName: 'David',
          lastName: 'Oluyale',
          email: '',
          password: 'david1',
        })
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body.status).to.be.equal(400);
          done(err);
        });
    });

    it('Should return an error if firstName is not provided', (done) => {
      chai
        .request(app)
        .post('/api/v1/auth/signup')
        .send({
          firstName: '',
          lastName: 'Oluyale',
          email: 'david@gmail.com',
          password: 'david1',
        })
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body.status).to.be.equal(400);
          done(err);
        });
    });

    it('Should return an error if lastName is not provided', (done) => {
      chai
        .request(app)
        .post('/api/v1/auth/signup')
        .send({
          firstName: 'David',
          lastName: '',
          email: 'david@gmail.com',
          password: 'david1',
        })
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body.status).to.be.equal(400);
          done(err);
        });
    });

    it('Should return an error if firstName is not a name', (done) => {
      chai
        .request(app)
        .post('/api/v1/auth/signup')
        .send({
          firstName: 'Davi$%#d',
          lastName: 'Oluyale',
          email: 'david@gmail.com',
          password: 'david1',
        })
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body.status).to.be.equal(400);
          done(err);
        });
    });

    it('Should return an error if lastName is not a name', (done) => {
      chai
        .request(app)
        .post('/api/v1/auth/signup')
        .send({
          firstName: 'David',
          lastName: 'Oluya^&%$le',
          email: 'david@gmail.com',
          password: 'david1',
        })
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body.status).to.be.equal(400);
          done(err);
        });
    });

    it('Should return an error if email is not an email', (done) => {
      chai
        .request(app)
        .post('/api/v1/auth/signup')
        .send({
          firstName: 'David',
          lastName: 'Oluyale',
          email: 'david3gmailcom',
          password: 'david1',
        })
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body.status).to.be.equal(400);
          done(err);
        });
    });
  });

  // Login Post Tests

  describe('Login User Post route authentication ', () => {
    before((done) => {
      chai
        .request(app)
        .post('/api/v1/auth/login')
        .send({
          email: 'david@gmail.com',
          password: 'david1',
        })
        .end((err, res) => {
          authToken = res.body.data[0].token;
          done(err);
        });
    });

    it('Should login if credentials are correct', (done) => {
      chai
        .request(app)
        .post('/api/v1/auth/login')
        .set('x-access-token', authToken)
        .send({
          email: 'david@gmail.com',
          password: 'david1',
        })
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body.status).to.be.equal(200);
          expect(res.body.data[0]).to.have.property('token');
          done(err);
        });
    });

    it('Should return error if password is not provided', (done) => {
      chai
        .request(app)
        .post('/api/v1/auth/login')
        .set('x-access-token', authToken)
        .send({
          email: 'david@gmail.com',
          password: '',
        })
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body.status).to.be.equal(400);
          done(err);
        });
    });

    it('Should return an error if password is incorrect', (done) => {
      chai
        .request(app)
        .post('/api/v1/auth/login')
        .set('x-access-token', authToken)
        .send({
          email: 'david@gmail.com',
          password: '1a2b3',
        })
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body.status).to.be.equal(400);
          done(err);
        });
    });

    it('Should return an error if email is not provided', (done) => {
      chai
        .request(app)
        .post('/api/v1//auth/login')
        .set('x-access-token', authToken)
        .send({
          email: '',
          password: 'david1',
        })
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body.status).to.be.equal(400);
          done(err);
        });
    });

    it('Should return an error if email is not registered', (done) => {
      chai
        .request(app)
        .post('/api/v1/auth/login')
        .set('x-access-token', authToken)
        .send({
          email: 'ferate@gmil.com',
          password: 'david1',
        })
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body.status).to.be.equal(400);
          done(err);
        });
    });

    it('Should return an error if password is incorrect', (done) => {
      chai
        .request(app)
        .post('/api/v1/auth/login')
        .set('x-access-token', authToken)
        .send({
          email: 'david@gmail.com',
          password: '1a2b3e32',
        })
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body.status).to.be.equal(400);
          done(err);
        });
    });

    it('should return error if password is not provided ', (done) => {
      chai
        .request(app)
        .post('/api/v1/auth/signup')
        .send({
          firstName: 'hezebah',
          lastName: 'newking',
          email: 'hezebahNK@gmail.com',
          password: '',
        })
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body.status).to.be.equal(400);
          done(err);
        });
    });

    it('should return error if password is less than six characters', (done) => {
      chai
        .request(app)
        .post('/api/v1/auth/signup')
        .send({
          firstName: 'hezebah',
          lastName: 'newking',
          email: 'hezebahNK@gmail.com',
          password: 'dd',
        })
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body.status).to.be.equal(400);
          done(err);
        });
    });

    it('should return error if email has already been registered', (done) => {
      chai
        .request(app)
        .post('/api/v1/auth/signup')
        .send({
          firstName: 'hezebah',
          lastName: 'newking',
          email: 'sagewills@gmail.com',
          password: 'dddfres',
        })
        .end((err, res) => {
          expect(res).to.have.status(409);
          expect(res.body.status).to.be.equal(409);
          done(err);
        });
    });

    it('should send email for reset password if registered', (done) => {
      chai
        .request(app)
        .post('/api/v1/auth/resetemail')
        .send({
          email: 'david@gmail.com',
        })
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body.status).to.be.equal(200);
          expect(res.body.data.message).to.be.equal('Email has been sent to david@gmail.com');
          done(err);
        });
    });

    it('should return error for email for reset password if not registered', (done) => {
      chai
        .request(app)
        .post('/api/v1/auth/resetemail')
        .send({
          email: 'davdsdsdid@gmail.com',
        })
        .end((err, res) => {
          expect(res).to.have.status(404);
          expect(res.body.status).to.be.equal(404);
          expect(res.body.error).to.be.equal('User not found');
          done(err);
        });
    });

    it('should return error for reset password if password is not provided', (done) => {
      chai
        .request(app)
        .post('/api/v1/auth/resetpassword')
        .set('x-access-token', authToken)
        .send({
          password: '',
        })
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body.status).to.be.equal(400);
          expect(res.body.error).to.be.equal('Password is required');
          done(err);
        });
    });

    it('should return reset password if password is provided', (done) => {
      chai
        .request(app)
        .post('/api/v1/auth/resetpassword')
        .set('x-access-token', authToken)
        .send({
          password: 'david23',
        })
        .end((err, res) => {
          expect(res).to.have.status(201);
          expect(res.body.status).to.be.equal(201);
          expect(res.body.data.message).to.be.equal('Password has been changed');
          done(err);
        });
    });
  });
});
