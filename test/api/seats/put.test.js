const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../../server');
const Seat = require('../../../models/seat.model');

chai.use(chaiHttp);

const expect = chai.expect;
const request = chai.request;

describe('PUT /api/seats', () => {
  before(async () => {
    const testSeatOne = new Seat({
      _id: '62e260ecf22805eafedf72ba',
      day: 1,
      seat: 1,
      client: 'Client #1',
      email: 'client1@example.com',
    });
    await testSeatOne.save();

    const testSeatTwo = new Seat({
      _id: '62e267f87e2b0bc1072ee9ba',
      day: 2,
      seat: 2,
      client: 'Client #2',
      email: 'client2@example.com',
    });
    await testSeatTwo.save();
  });

  after(async () => {
    await Seat.deleteMany();
  });

  it('should update a seat and return a success', async () => {
    const res = await request(server).put('/api/seats/62e260ecf22805eafedf72ba').send({
      day: 3,
      seat: 3,
      client: 'Client #3',
      email: 'client3@example.com',
    });

    expect(res.status).to.equal(200);
    expect(res.body).to.not.be.null;
  });
});
