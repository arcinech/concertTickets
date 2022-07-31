const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../../server');
const Workshop = require('../../../models/workshop.model');

chai.use(chaiHttp);

const expect = chai.expect;
const request = chai.request;

describe('PUT /api/workshops', () => {
  before(async () => {
    const testWsOne = new Workshop({
      _id: '5d9f1140f10a81216cfd4408',
      name: 'Workshop #1',
      concertId: '62e260ecf22805eafedf72ba',
    });
    testWsOne.save();
  });

  after(async () => {
    await Workshop.deleteMany();
  });

  it('/:id should update a workshop and return success', async () => {
    const res = await request(server)
      .put('/api/workshops/5d9f1140f10a81216cfd4408')
      .send({ name: 'Updated Workshop #1' });
    expect(res.status).to.equal(200);
    expect(res.body).to.not.be.null;
  });
});
