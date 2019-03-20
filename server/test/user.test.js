import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';
import testHelper from '../utilities/testHelper';

chai.use(chaiHttp);

const { expect } = chai;

let authToken;
describe('Tests for users route', () => {
  before((done) => {
    chai
      .request(app)
      .post('/api/v1/auth/signup')
      .send({
        firstName: 'Emmanuel',
        lastName: 'Oluyale',
        email: 'xyemmanuel@gmail.com',
        password: '1a2b3c',
      })
      .end((err) => {
        done(err);
      });
  });
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
          expect(res.body.error).to.be.equal('Please enter a valid email address');
          done(err);
        });
    });

    it('Should return an error if password has less than six characters', (done) => {
      chai
        .request(app)
        .post('/api/v1/auth/signup')
        .send({
          firstName: 'David',
          lastName: 'Oluyale',
          email: 'david@gmail.com',
          password: 'david',
        })
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body.status).to.be.equal(400);
          expect(res.body.error).to.be.equal('Please enter a password of at least six characters');
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
          expect(res.body.error).to.be.equal('Please enter a valid firstName');
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
          expect(res.body.error).to.be.equal('Please enter a valid lastName');
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
          expect(res.body.error).to.be.equal('Please enter a valid firstName');
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
          expect(res.body.error).to.be.equal('Please enter a valid lastName');
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
          expect(res.body.error).to.be.equal('Please enter a valid email address');
          done(err);
        });
    });

    after(() => {
      testHelper.clearEmailFromDb('david@gmail.com');
    });
  });

  // Create
  describe('Create User Post route authentication ', () => {
    before((done) => {
      chai
        .request(app)
        .post('/api/v1/auth/signup')
        .send({
          firstName: 'emmanuelder',
          lastName: 'Oluyale',
          email: 'emmanuelder@gmail.com',
          password: 'emmanuelder',
        })
        .end((err) => {
          done(err);
        });
    });

    it('Should return an error if email is already registered', (done) => {
      chai
        .request(app)
        .post('/api/v1/auth/signup')
        .send({
          firstName: 'david',
          lastName: 'Oluyale',
          email: 'emmanuelder@gmail.com',
          password: 'david1',
        })
        .end((err, res) => {
          expect(res).to.have.status(409);
          expect(res.body.status).to.be.equal(409);
          expect(res.body.error).to.equal('Email has already been registered');
          done(err);
        });
    });
    after(() => {
      testHelper.clearEmailFromDb('emmanuelder@gmail.com');
    });
  });

  // Login Post Tests

  describe('Login User Post route authentication ', () => {
    before((done) => {
      chai
        .request(app)
        .post('/api/v1/auth/login')
        .send({
          email: 'xyemmanuel@gmail.com',
          password: '1a2b3c',
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
          email: 'xyemmanuel@gmail.com',
          password: '1a2b3c',
        })
        .end((err, res) => {
          expect(res).to.have.status(201);
          expect(res.body.status).to.be.equal(201);
          expect(res.body.data[0]).to.have.property('token');
          done(err);
        });
    });

    it('Should return an error if password is incorrect', (done) => {
      chai
        .request(app)
        .post('/api/v1/auth/login')
        .set('x-access-token', authToken)
        .send({
          email: 'xyemmanuel@gmail.com',
          password: '1a2b3',
        })
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body.status).to.be.equal(400);
          expect(res.body.error).to.equal('email or pasword is incorrect');
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
          password: '1a2b3c',
        })
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body.status).to.be.equal(400);
          expect(res.body.error).to.equal('Email is empty');
          done(err);
        });
    });

    it('Should return an error email is not registered', (done) => {
      chai
        .request(app)
        .post('/api/v1/auth/login')
        .set('x-access-token', authToken)
        .send({
          email: 'ferate@gmil.com',
          password: 'david1',
        })
        .end((err, res) => {
          expect(res).to.have.status(404);
          expect(res.body.status).to.be.equal(404);
          expect(res.body.error).to.equal('Email not found');
          done(err);
        });
    });

    it('Should return an error if password is incorrect', (done) => {
      chai
        .request(app)
        .post('/api/v1/auth/login')
        .set('x-access-token', authToken)
        .send({
          email: 'xyemmanuel@gmail.com',
          password: '1a2b3e32',
        })
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body.status).to.be.equal(400);
          expect(res.body.error).to.equal('email or pasword is incorrect');
          done(err);
        });
    });
  });

  after(() => {
    testHelper.clearUsersTable();
  });
});
