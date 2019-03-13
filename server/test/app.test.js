import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';

chai.use(chaiHttp);

const { expect } = chai;

describe('Default route', () => {
  it('Should return a 200 status code',
    (done) => {
      chai.request(app)
        .get('/')
        .end((error, res) => {
          expect(res).to.have.status(200);
          expect(res.body.status).to.be.equal(200);
          expect(res.body.data.message).to.equal('Welcome to Epic Mail. visit /api-docs for api. documentation');
          done();
        });
    });
});

describe('Invalid Url', () => {
  it('Should return a 404 status code and an error message',
    (done) => {
      chai.request(app)
        .get('/v2/ersds')
        .end((error, res) => {
          expect(res).to.have.status(404);
          expect(res.body.status).to.be.equal(404);
          expect(res.body.error).to.equal('This url does not exist');
          done();
        });
    });
});
