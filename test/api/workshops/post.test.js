const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../../server');

const Workshop = require('../../../models/workshop.model');

chai.use(chaiHttp);

const expect = chai.expect;
const request = chai.request;

describe('POST /api/workshops', () => {
  after(async () => {
    await Workshop.deleteMany();
  });

  it('/should insert new document to db and return success', async () => {
    const res = await request(server)
      .post('/api/workshops')
      .send({ name: 'Workshop #1', concertId: '5d9f1140f10a81216cfd4408' });
    const newWorkshop = await Workshop.findOne({
      name: 'Workshop #1',
      concertId: '5d9f1140f10a81216cfd4408',
    });
    expect(res.status).to.equal(200);
    expect(res.body.message).to.be.equal('OK');
    expect(newWorkshop).to.be.not.null;
  });
});
