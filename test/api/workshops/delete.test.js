const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../../server');

const Workshop = require('../../../models/workshop.model');

chai.use(chaiHttp);

const expect = chai.expect;
const request = chai.request;

describe('DELETE /api/workshops', () => {
  beforeEach(async () => {
    const testWorkshopOne = new Workshop({
      _id: '62e260ecf22805eafedf72ba',
      name: 'Workshop #1',
      concertId: '5d9f1140f10a81216cfd4408',
    });
    await testWorkshopOne.save();

    const testWorkshopTwo = new Workshop({
      _id: '62e267f87e2b0bc1072ee9ba',
      name: 'Workshop #2',
      concertId: '5d9f1140f10a81216cfd4408',
    });
    await testWorkshopTwo.save();
  });

  afterEach(async () => {
    await Workshop.deleteMany();
  });

  it('/:id should delete a workshop', async () => {
    const res = await request(server).delete('/api/workshops/62e260ecf22805eafedf72ba');
    const deletedWorkshop = await request(server).get(
      '/api/workshops/62e260ecf22805eafedf72ba'
    );
    expect(res.status).to.equal(200);
    expect(res.body.message).to.be.equal('OK');
    expect(deletedWorkshop.body.message).to.be.equal('Not found');
  });
});
