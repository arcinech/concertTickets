const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../../server');
const Concert = require('../../../models/concert.model');

chai.use(chaiHttp);

const expect = chai.expect;
const request = chai.request;

describe('PUT /api/concerts', () => {
  before(async () => {
    const testConOne = new Concert({
      _id: '5d9f1140f10a81216cfd4408',
      performer: 'John Doe',
      genre: 'Rock',
      price: '50',
      day: '1',
      image: 'img/uploads/1fsd324fsdg.jpg',
    });
    await testConOne.save();
  });

  after(async () => {
    await Concert.deleteMany();
  });

  it('/:id should update a concert and return success', async () => {
    const res = await request(server)
      .put('/api/concerts/5d9f1140f10a81216cfd4408')
      .send({ performer: 'Updated Doe' });
    expect(res.status).to.equal(200);
    expect(res.body).to.not.be.null;
  });
});
