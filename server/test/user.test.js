import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';

chai.use(chaiHttp);

const { expect } = chai;

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
});

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
        email: 'david@gmail.com',
        password: 'david1',
      })
      .end((err, res) => {
        expect(res).to.have.status(409);
        expect(res.body.status).to.be.equal(409);
        expect(res.body.error).to.equal('Email has already been registered');
        done(err);
      });
  });
});
